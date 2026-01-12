import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from 'npm:@supabase/supabase-js';
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Initialize Supabase client with anon key for user token verification
const anonSupabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "apikey", "x-client-info", "x-user-token"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Explicit OPTIONS handler for all routes
app.options("/*", (c) => {
  return c.text("", 204);
});

// Health check endpoint
app.get("/make-server-c9fbfdc0/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint - creates user with auto-confirmed email
app.post("/make-server-c9fbfdc0/signup", async (c) => {
  try {
    const { email, password, displayName } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Create user with admin API to auto-confirm email
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { display_name: displayName || email.split('@')[0] },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      
      // If user already exists, provide a helpful message
      if (error.message.includes('already been registered') || error.code === 'email_exists') {
        return c.json({ error: 'This email is already registered. Please sign in instead.' }, 400);
      }
      
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true,
      user: data.user
    });
  } catch (error) {
    console.error('Signup route error:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Sign in endpoint - automatically confirms email if not confirmed
app.post("/make-server-c9fbfdc0/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // First, try to sign in with the credentials to check if email confirmation is the issue
    const { data: signInData, error: signInError } = await anonSupabase.auth.signInWithPassword({
      email,
      password
    });

    // If sign in succeeds, user is already confirmed
    if (signInData?.user) {
      console.log('User already confirmed:', email);
      return c.json({ success: true, confirmed: true });
    }

    // If error is NOT about email confirmation, return the error
    if (signInError && !signInError.message.includes('Email not confirmed')) {
      console.log('Sign in error (not email confirmation):', signInError.message);
      return c.json({ success: true, confirmed: false, error: signInError.message });
    }

    // Email not confirmed - find and confirm the user
    console.log('Email not confirmed, attempting to confirm:', email);
    
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error listing users:', listError);
      return c.json({ error: 'Could not verify user' }, 500);
    }

    const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      console.log('User not found:', email);
      return c.json({ success: true, confirmed: false, error: 'User not found' });
    }

    // Confirm the user's email
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { email_confirm: true }
    );
    
    if (updateError) {
      console.error('Error confirming email:', updateError);
      return c.json({ error: 'Could not confirm email' }, 500);
    }

    console.log('Email confirmed successfully:', email);
    return c.json({ success: true, confirmed: true });
    
  } catch (error) {
    console.error('Sign in route error:', error);
    return c.json({ error: 'Internal server error during sign in' }, 500);
  }
});

// Get user progress data
app.get("/make-server-c9fbfdc0/progress/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const userToken = c.req.header('x-user-token');
    
    if (!userToken) {
      return c.json({ error: 'No user token provided', success: false }, 401);
    }
    
    // Use service role client to verify the user's token
    const { data: { user }, error: authError } = await supabase.auth.getUser(userToken);
    
    if (authError) {
      console.error('Get progress auth error:', authError);
      return c.json({ error: 'Unauthorized: ' + authError.message, success: false }, 401);
    }
    
    if (!user || user.id !== userId) {
      console.error('User ID mismatch or no user');
      return c.json({ error: 'Unauthorized', success: false }, 401);
    }

    // Get user data from KV store
    const progressKey = `user_progress:${userId}`;
    const progress = await kv.get(progressKey);
    
    return c.json({ 
      success: true,
      data: progress || null
    });
  } catch (error) {
    console.error('Get progress error:', error);
    return c.json({ error: 'Failed to get progress', success: false }, 500);
  }
});

// Save user progress data
app.post("/make-server-c9fbfdc0/progress/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    
    console.log('=== SAVE REQUEST DEBUG ===');
    console.log('Save request for user:', userId);
    
    const userToken = c.req.header('x-user-token');
    console.log('User token exists:', !!userToken);
    
    if (!userToken) {
      console.error('No x-user-token header found');
      return c.json({ error: 'No user token header', success: false }, 401);
    }
    
    console.log('Token extracted, length:', userToken.length);
    
    // Use service role client to verify the user's token
    const { data: { user }, error: authError } = await supabase.auth.getUser(userToken);
    
    console.log('Auth check - user found:', !!user);
    console.log('Auth check - user id:', user?.id);
    console.log('Auth error:', authError?.message);
    console.log('Auth error details:', JSON.stringify(authError, null, 2));
    
    if (authError || !user) {
      console.error('Authentication failed:', authError);
      return c.json({ error: 'Unauthorized: ' + (authError?.message || 'No user found'), success: false }, 401);
    }
    
    if (user.id !== userId) {
      console.error('User ID mismatch:', user.id, 'vs', userId);
      return c.json({ error: 'Unauthorized - user mismatch', success: false }, 401);
    }

    const progressData = await c.req.json();
    console.log('Progress data to save:', Object.keys(progressData));
    
    // Save to KV store
    const progressKey = `user_progress:${userId}`;
    await kv.set(progressKey, {
      ...progressData,
      user_id: userId,
      updated_at: new Date().toISOString()
    });
    
    console.log('Successfully saved progress for user:', userId);
    
    return c.json({ 
      success: true
    });
  } catch (error) {
    console.error('Save progress error:', error);
    return c.json({ error: 'Failed to save progress: ' + error.message, success: false }, 500);
  }
});

// Save avatar configuration (no auth required - uses localStorage userId)
app.post("/make-server-c9fbfdc0/avatar/save", async (c) => {
  try {
    const { userId, avatarConfig } = await c.req.json();
    
    if (!userId || !avatarConfig) {
      return c.json({ error: 'userId and avatarConfig are required' }, 400);
    }
    
    const avatarKey = `avatar_config:${userId}`;
    await kv.set(avatarKey, {
      ...avatarConfig,
      userId,
      savedAt: new Date().toISOString()
    });
    
    console.log('Successfully saved avatar config for user:', userId);
    
    return c.json({ 
      success: true,
      message: 'Avatar configuration saved successfully'
    });
  } catch (error) {
    console.error('Save avatar config error:', error);
    return c.json({ error: 'Failed to save avatar configuration: ' + error.message }, 500);
  }
});

// Load avatar configuration (no auth required - uses localStorage userId)
app.get("/make-server-c9fbfdc0/avatar/load/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    
    if (!userId) {
      return c.json({ error: 'userId is required' }, 400);
    }
    
    const avatarKey = `avatar_config:${userId}`;
    const avatarConfig = await kv.get(avatarKey);
    
    return c.json({ 
      success: true,
      data: avatarConfig || null
    });
  } catch (error) {
    console.error('Load avatar config error:', error);
    return c.json({ error: 'Failed to load avatar configuration: ' + error.message }, 500);
  }
});

Deno.serve(app.fetch);