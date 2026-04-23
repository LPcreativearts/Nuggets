import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Singleton Supabase client to prevent multiple GoTrueClient instances
export const supabase = createClient(supabaseUrl, publicAnonKey);
