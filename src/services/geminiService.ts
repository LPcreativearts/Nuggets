/**
 * Gemini API Service
 * Handles all AI content generation using Google Gemini API
 */

export const callGemini = async (
  apiKey: string,
  userPrompt: string,
  systemPrompt: string
) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      })
    }
  );

  const data = await response.json();

  if (data.error) {
    console.error('❌ API Error:', data.error);
    throw new Error(data.error.message || 'API Error');
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text;
};

export const parseJSONResponse = (content: string) => {
  try {
    const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('JSON parse error:', e);
    return null;
  }
};

// Safety filter for image search terms
const UNSAFE_TERMS = [
  'nude', 'nudity', 'naked', 'underwear', 'lingerie', 'bikini',
  'body', 'anatomy', 'bathing', 'shower', 'bedroom', 'adult',
  'classical statue', 'classical sculpture', 'renaissance art'
];

export const sanitizeImageSearchTerm = (searchTerm: string, fallbackTag: string): string => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  if (UNSAFE_TERMS.some(term => lowerSearchTerm.includes(term))) {
    console.warn('Unsafe image search term blocked:', searchTerm);
    return fallbackTag + ' educational children';
  }
  
  return searchTerm;
};

export const generateNuggetByTag = async (
  apiKey: string,
  tag: string,
  subjectId: string | null,
  callbacks: {
    onCacheHit?: (nugget: any) => void;
    onLoadingStart?: (tempNugget: any) => void;
    onSuccess: (nugget: any, searchTerm: string) => void;
    onError: (error: Error) => void;
  }
) => {
  // CHECK CACHE FIRST for pre-generated nuggets
  const cacheKey = `nugget_${tag}_${subjectId || 'general'}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    try {
      const cachedNugget = JSON.parse(cached);
      console.log('✨ Using cached nugget for:', tag);
      
      if (callbacks.onCacheHit) {
        callbacks.onCacheHit(cachedNugget);
      }
      return;
    } catch (e) {
      console.error('Cache parse error:', e);
    }
  }

  // Show loading state
  console.log('🎯 Starting nugget generation for:', tag);
  const tempNugget = {
    text: '...',
    tags: [tag],
    subjectId: subjectId || 'science',
    id: Date.now(),
    searchTerm: tag,
    originalTag: tag,
    isLoading: true
  };

  if (callbacks.onLoadingStart) {
    callbacks.onLoadingStart(tempNugget);
  }

  try {
    console.log('🤖 Calling Gemini API...');
    
    const systemPrompt = `You are an educational guide for children (ages 7-8). Generate a single fascinating fact about the topic provided. DO NOT start with conversational phrases like "Did you know" or "Here's a fun fact". Launch directly into the fact itself. 

IMPORTANT CONTENT GUIDELINES:
- Keep content age-appropriate and positive for young children
- Use factual, straightforward language
- STRICTLY AVOID: human sacrifice, death rituals, violence, warfare, executions, torture, nudity, anatomy, bathing, underwear, classical sculptures/statues (often nude), adult content, medical procedures, drugs, alcohol, horror, crime
- When generating facts about sculpture as an art form, focus on modern, abstract, or assembled sculptures rather than classical statues
- Focus on fascinating, educational, uplifting aspects of topics
- When discussing ancient civilizations or historical topics, emphasize culture, achievements, daily life, inventions, and contributions to society

Return ONLY valid JSON in this exact format: { "fact": "The fact text here", "topic": "Topic Name", "imageSearchTerm": "2-4 specific descriptive words about the main subject", "relatedTopics": ["Topic 1", "Topic 2", "Topic 3"] }`;

    const userPrompt = `Tell me a cool educational fact about: ${tag}`;
    
    const content = await callGemini(apiKey, userPrompt, systemPrompt);
    console.log('✅ Got content from API, processing...');
    
    let parsed = {
      fact: 'The universe is full of mysteries waiting to be discovered!',
      topic: tag,
      imageSearchTerm: tag,
      relatedTopics: [tag, 'Space', 'Science']
    };

    if (content) {
      const parsedContent = parseJSONResponse(content);
      if (parsedContent) {
        parsed = parsedContent;
      }
    }

    // CRITICAL SAFETY: Filter image search terms
    const safeSearchTerm = sanitizeImageSearchTerm(parsed.imageSearchTerm, tag);

    const newNugget = {
      text: parsed.fact,
      tags: parsed.relatedTopics || [tag],
      subjectId: subjectId || 'science',
      id: Date.now(),
      searchTerm: safeSearchTerm,
      originalTag: tag
    };

    // Cache the nugget for instant future access
    localStorage.setItem(cacheKey, JSON.stringify(newNugget));
    console.log('💾 Cached nugget, updating UI...');

    callbacks.onSuccess(newNugget, safeSearchTerm);

  } catch (e) {
    console.error('❌ AI Error:', e);
    callbacks.onError(e as Error);
  }
};

export const generateStardustQuestion = async (
  apiKey: string,
  nuggetText: string
): Promise<{ question: string; options: string[]; correctIndex: number } | null> => {
  try {
    const systemPrompt = `You are a question creator for children (ages 7-8). Create ONE simple multiple choice question about the given fact. Keep it age-appropriate and straightforward.`;
    
    const userPrompt = `Create a simple multiple choice question about this fact: "${nuggetText}"

CRITICAL: Respond with ONLY a valid JSON object. No markdown, no explanations, no additional text.

{
  "question": "The question text?",
  "options": ["Option A", "Option B", "Option C"],
  "correctIndex": 0
}`;

    const content = await callGemini(apiKey, userPrompt, systemPrompt);

    if (content) {
      const parsed = parseJSONResponse(content);
      return parsed;
    }

    return null;
  } catch (e) {
    console.error('Question generation error:', e);
    return null;
  }
};

export const generateCollectionQuiz = async (
  apiKey: string,
  collection: any[],
  numberOfQuestions: number = 5
): Promise<any[] | null> => {
  try {
    const facts = collection.slice(0, 10).map(n => n.text).join('\n- ');
    
    const systemPrompt = `You are a quiz creator for children (ages 7-8). Create ${numberOfQuestions} simple multiple choice questions about the given facts. Keep them age-appropriate and fun.`;
    
    const userPrompt = `Create ${numberOfQuestions} simple multiple choice questions about these facts:
- ${facts}

CRITICAL: Respond with ONLY a valid JSON array. No markdown, no explanations.

[
  {
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C"],
    "correctIndex": 0
  }
]`;

    const content = await callGemini(apiKey, userPrompt, systemPrompt);

    if (content) {
      const parsed = parseJSONResponse(content);
      return parsed;
    }

    return null;
  } catch (e) {
    console.error('Quiz generation error:', e);
    return null;
  }
};

export const generateWordQuiz = async (
  apiKey: string,
  wordCollection: any[],
  numberOfQuestions: number = 5
): Promise<any[] | null> => {
  try {
    const words = wordCollection.slice(0, 10).map(w => `${w.word}: ${w.definition}`).join('\n- ');
    
    const systemPrompt = `You are a vocabulary quiz creator for children (ages 7-8). Create ${numberOfQuestions} simple vocabulary questions. Keep them age-appropriate and fun.`;
    
    const userPrompt = `Create ${numberOfQuestions} vocabulary questions about these words:
- ${words}

CRITICAL: Respond with ONLY a valid JSON array. No markdown, no explanations.

[
  {
    "question": "What does [word] mean?",
    "options": ["Option A", "Option B", "Option C"],
    "correctIndex": 0
  }
]`;

    const content = await callGemini(apiKey, userPrompt, systemPrompt);

    if (content) {
      const parsed = parseJSONResponse(content);
      return parsed;
    }

    return null;
  } catch (e) {
    console.error('Word quiz generation error:', e);
    return null;
  }
};

export const generateAIResponse = async (
  apiKey: string,
  userQuestion: string,
  currentNugget: any
): Promise<string | null> => {
  try {
    const systemPrompt = `You are a friendly educational assistant for children (ages 7-8). Answer questions about facts in a simple, fun, age-appropriate way. Keep answers brief (2-3 sentences).

IMPORTANT CONTENT GUIDELINES:
- Keep content age-appropriate and positive
- STRICTLY AVOID: violence, death, adult content, medical procedures, drugs, alcohol, horror
- Focus on educational, uplifating aspects`;

    const userPrompt = `The child is learning about: "${currentNugget?.text || 'science'}"

They asked: "${userQuestion}"

Provide a brief, simple answer (2-3 sentences).`;

    const content = await callGemini(apiKey, userPrompt, systemPrompt);
    return content || null;

  } catch (e) {
    console.error('AI response error:', e);
    return null;
  }
};

export const generateLearnMore = async (
  apiKey: string,
  nuggetText: string
): Promise<string | null> => {
  try {
    const systemPrompt = `You are an educational guide for children (ages 7-8). Provide 2-3 additional simple facts related to the given fact. Keep it brief, fun, and age-appropriate.

IMPORTANT CONTENT GUIDELINES:
- Keep content age-appropriate and positive
- STRICTLY AVOID: violence, death, adult content, medical procedures, drugs, alcohol, horror
- Focus on fascinating, educational aspects`;

    const userPrompt = `Tell me 2-3 more cool facts related to: "${nuggetText}"`;

    const content = await callGemini(apiKey, userPrompt, systemPrompt);
    return content || null;

  } catch (e) {
    console.error('Learn more generation error:', e);
    return null;
  }
};

export const generateActivity = async (
  apiKey: string,
  nuggetText: string,
  subjectId: string
): Promise<string | null> => {
  try {
    const systemPrompt = `You are an activity creator for children (ages 7-8). Suggest a simple, fun activity related to the given fact. Keep it safe, age-appropriate, and doable at home with common materials.

IMPORTANT CONTENT GUIDELINES:
- Keep activities safe and age-appropriate
- Use simple, common household materials
- Focus on fun, educational, hands-on learning`;

    const userPrompt = `Suggest a fun activity for kids related to: "${nuggetText}"

Include:
- What they'll need
- Simple steps
- What they'll learn`;

    const content = await callGemini(apiKey, userPrompt, systemPrompt);
    return content || null;

  } catch (e) {
    console.error('Activity generation error:', e);
    return null;
  }
};

export const generateGuideChatResponse = async (
  apiKey: string,
  userMessage: string,
  guideName: string,
  conversationHistory: Array<{ role: string; content: string }>
): Promise<string | null> => {
  try {
    const systemPrompt = `You are ${guideName}, a friendly and helpful guide for children (ages 7-8) using the "Nugget School" educational app. Your role is to help them navigate and use the app features in a warm, encouraging way.

Available features in the app:
- Home page with subject planets (Science, History, Geography, Arts, Math, Language)
- Search bar to discover facts about any topic
- "My Collections" to view saved nuggets, activities, and words
- Nugget pages with "Explain", "Do This" (activities), and "Photos" buttons
- Quiz challenges when you collect 5+ nuggets
- Crumbs currency earned by completing activities
- Shop to customize mascots with accessories
- Dark/light theme toggle in settings

Keep responses:
- Short and simple (2-3 sentences max)
- Friendly and encouraging
- Focused on helping them use the app
- Age-appropriate for 7-8 year olds

Previous conversation:
${conversationHistory.slice(-6).map(m => `${m.role === 'user' ? 'Child' : guideName}: ${m.content}`).join('\n')}

Respond as ${guideName} to help the child.`;

    const content = await callGemini(apiKey, userMessage, systemPrompt);
    return content || "I'm here to help! What would you like to know about the app?";

  } catch (e) {
    console.error('Guide chat error:', e);
    return null;
  }
};