# Nugget School - Code Optimization Guide

## Current Status

### ✅ Completed Optimizations

1. **Removed Dead Code** (~593 lines)
   - Removed malformed JSX in lines 2189-2774
   - Fixed duplicate `renderNugget` functions
   - Cleaned up broken JSX structure

2. **Extracted View Components** (9 components)
   - `/components/AuthModal.tsx`
   - `/components/AvatarView.tsx`
   - `/components/HomeView.tsx`
   - `/components/CurriculumView.tsx`
   - `/components/NuggetDetailView.tsx`
   - `/components/SubjectMenuView.tsx`
   - `/components/SettingsView.tsx`
   - `/components/StardustQuizModal.tsx`
   - `/components/CollectionQuizModal.tsx`
   - `/components/WordQuizModal.tsx`

3. **Created Service Modules**
   - `/services/geminiService.ts` - All AI/Gemini API functions
   - `/services/imageService.ts` - Image fetching and management
   - `/utils/speechHelpers.ts` - Text-to-speech and speech recognition

4. **Created Custom Hooks**
   - `/hooks/useNavigation.ts` - Navigation state management
   - `/hooks/useDataSync.ts` - Supabase data persistence

### 📊 File Size Progress

- **Starting:** ~7,551 lines (before your initial extractions)
- **Before this session:** ~3,774 lines  
- **After dead code removal:** ~3,146 lines
- **After service extraction:** ~3,063 lines
- **Target for Google AI Studio:** Under 2,500 lines (recommended)

---

## 🚀 Next Steps to Further Reduce App.tsx

### Priority 1: Replace Inline Functions with Service Calls

#### Large Functions to Replace (in App.tsx):

**1. `generateNuggetByTag` (lines ~1199-1350, 151 lines)**
```typescript
// REPLACE THIS:
const generateNuggetByTag = async (tag, subjectId = null) => {
  // 151 lines of code...
};

// WITH THIS:
const generateNuggetByTag = async (tag, subjectId = null) => {
  if (!apiKey) { 
    showNotification("Add API Key in Settings!"); 
    setTimeout(() => navigateTo('settings'), 1000);
    return; 
  }
  
  setAiLoading(true);
  
  await GeminiService.generateNuggetByTag(apiKey, tag, subjectId, {
    onCacheHit: (cachedNugget) => {
      setCurrentNugget(cachedNugget);
      setAiResponse(null);
      setAiContentImage(null);
      setLearnResponse(null);
      setActivityResponse(null);
      setActivityImage(null);
      navigateTo('nugget');
      generateImage(cachedNugget.text, cachedNugget.searchTerm, tag, cachedNugget.subjectId);
    },
    onLoadingStart: (tempNugget) => {
      navigateTo('nugget');
      setCurrentNugget(tempNugget);
      setNuggetImage(null);
    },
    onSuccess: (newNugget, safeSearchTerm) => {
      setCurrentNugget(newNugget);
      setAiResponse(null);
      setAiContentImage(null);
      setLearnResponse(null);
      setActivityResponse(null);
      setActivityImage(null);
      generateImage(newNugget.text, safeSearchTerm, tag, subjectId || 'science');
      setAiLoading(false);
    },
    onError: (error) => {
      showNotification("Could not generate nugget. Check your API key!");
      setCurrentNugget({
        text: "Oops! Something went wrong. Please try again.",
        tags: [tag],
        subjectId: subjectId || 'science',
        id: Date.now(),
        searchTerm: tag,
        originalTag: tag
      });
      setAiLoading(false);
    }
  });
};
```
**Savings: ~110 lines**

---

**2. `preGenerateNuggets` (lines ~1352-1438, 86 lines)**

This function can be moved to a separate utility file `/utils/nuggetPreloader.ts`:

```typescript
// Create /utils/nuggetPreloader.ts
import * as GeminiService from '../services/geminiService';
import { SUBJECTS } from '../data/subjects';

export const preGenerateNuggets = async (
  apiKey: string, 
  callbacks: {
    onProgress?: (generated: number, cached: number) => void;
    onComplete: (generated: number, cached: number, elapsed: number) => void;
  }
) => {
  console.log('🚀 Pre-generating nuggets for instant loading...');
  const startTime = Date.now();
  let generated = 0;
  let cached = 0;

  for (const subject of SUBJECTS) {
    for (const subtopic of subject.subtopics) {
      const cacheKey = `nugget_${subtopic}_${subject.id}`;
      
      if (localStorage.getItem(cacheKey)) {
        cached++;
        continue;
      }

      try {
        if (generated > 0) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

        await GeminiService.generateNuggetByTag(apiKey, subtopic, subject.id, {
          onSuccess: (nugget) => {
            generated++;
            console.log(`✅ Pre-generated: ${subtopic} (${generated} total)`);
            if (callbacks.onProgress) {
              callbacks.onProgress(generated, cached);
            }
          },
          onError: (error) => {
            console.error(`❌ Failed to pre-generate ${subtopic}:`, error.message);
          }
        });
      } catch(e) {
        console.error(`❌ Failed to pre-generate ${subtopic}:`, e);
      }
    }
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  console.log(`🎉 Pre-generation complete! Generated: ${generated}, Cached: ${cached}, Time: ${elapsed}s`);
  callbacks.onComplete(generated, cached, elapsed);
};
```

Then in App.tsx:
```typescript
// REPLACE:
const preGenerateNuggets = async () => { /* 86 lines */ };

// WITH:
const preGenerateNuggets = async () => {
  if (!apiKey) return;
  setIsPreGenerating(true);
  
  await preGenerateNuggetsUtil(apiKey, {
    onComplete: (generated, cached, elapsed) => {
      setIsPreGenerating(false);
      showNotification(`✅ Pre-generated ${generated} nuggets! (${cached} already cached)`);
    }
  });
};
```
**Savings: ~70 lines**

---

**3. `generateImage` (lines ~1126-1197, 71 lines)**

Replace with ImageService call:
```typescript
// REPLACE:
const generateImage = async (text, searchTerm = null, originalTag = null, subjectId = 'science') => {
  // 71 lines...
};

// WITH:
const generateImage = async (text, searchTerm = null, originalTag = null, subjectId = 'science') => {
  await ImageService.getImageForNugget(text, searchTerm, originalTag, subjectId, {
    onLoading: setImageLoading,
    onImageFound: (url) => {
      setNuggetImage(url);
      setImageError(false);
    },
    onError: () => {
      setImageError(true);
      setNuggetImage(null);
    }
  });
};
```
**Savings: ~55 lines**

---

**4. Replace other Gemini API calls:**

These functions are already extracted to `geminiService.ts`, just need to replace the inline versions:

- `generateStardustQuestion` → Use `GeminiService.generateStardustQuestion`
- `startCollectionQuiz` → Use `GeminiService.generateCollectionQuiz`
- `startWordQuiz` → Use `GeminiService.generateWordQuiz`
- `callGemini` (for AI responses) → Use `GeminiService.generateAIResponse`
- `handleLearnMore` → Use `GeminiService.generateLearnMore`
- `handleActivity` → Use `GeminiService.generateActivity`

**Estimated savings: ~150-200 lines**

---

**5. Replace Speech Functions:**

These are already in `speechHelpers.ts`:

```typescript
// REPLACE inline functions with:
import * as SpeechHelpers from './utils/speechHelpers';

// Then use:
SpeechHelpers.handleReadAloud(text, onComplete);
SpeechHelpers.startSpeechRecognition(callbacks);
SpeechHelpers.isValidTextInput(text);
```
**Savings: ~80-100 lines**

---

### Priority 2: Use Custom Hooks

#### Replace Navigation State:

```typescript
// CURRENT (lines 188-189):
const [view, setView] = useState('home');
const [navigationHistory, setNavigationHistory] = useState(['home']);

// And functions (lines 805-828):
const navigateTo = (newView) => { /* ... */ };
const goBack = () => { /* ... */ };
const goHome = () => { /* ... */ };

// REPLACE WITH:
import { useNavigation } from './hooks/useNavigation';
const { view, navigateTo, goBack, goHome } = useNavigation('home');
```
**Savings: ~30 lines**

#### Replace Data Sync Logic:

```typescript
// CURRENT (lines 398-457, 830-928):
const loadUserData = async () => { /* ... */ };
const saveData = async (updates) => { /* ... */ };

// REPLACE WITH:
import { useDataSync } from './hooks/useDataSync';
const { saveData } = useDataSync(user, {
  onDataLoaded: (data) => {
    if (data.collection) setCollection(data.collection);
    if (data.word_collection) setWordCollection(data.word_collection);
    // ... etc
  }
});
```
**Savings: ~150 lines**

---

### Priority 3: Extract Remaining Large Inline Functions

#### Create `/utils/activityHelpers.ts`:
- `openScientificMethodStep`
- `openStoryActivity`
- All the activity opener functions

**Savings: ~100 lines**

#### Create `/components/ShowMeModal.tsx`:
- Extract `renderShowMeModal` function  
- Extract `loadShowMeImages` logic

**Savings: ~80 lines**

#### Create `/components/EnlargedImageModal.tsx`:
- Extract `renderEnlargedImage` function

**Savings: ~40 lines**

---

## 📝 Implementation Checklist

To get App.tsx under 2,500 lines for Google AI Studio:

- [ ] Replace `generateNuggetByTag` with `GeminiService` call (−110 lines)
- [ ] Move `preGenerateNuggets` to utility file (−70 lines)
- [ ] Replace `generateImage` with `ImageService` call (−55 lines)
- [ ] Replace all other Gemini functions with service calls (−150 lines)
- [ ] Replace speech functions with `SpeechHelpers` (−100 lines)
- [ ] Use `useNavigation` hook (−30 lines)
- [ ] Use `useDataSync` hook (−150 lines)
- [ ] Extract activity helpers (−100 lines)
- [ ] Extract ShowMeModal component (−80 lines)
- [ ] Extract EnlargedImageModal component (−40 lines)

**Total Potential Reduction: ~885 lines**

**Projected Final Size: ~2,178 lines** ✅

---

## 🎯 Quick Win Strategy

If you want the fastest reduction, focus on these three changes:

1. **Replace all Gemini API inline functions** with service calls (−260 lines)
2. **Replace speech/image helpers** with utility imports (−155 lines)
3. **Use custom hooks for navigation & data sync** (−180 lines)

**Quick win total: ~595 lines removed**
**New size: ~2,468 lines** ✅

---

## ⚠️ Important Notes

1. **All services and hooks are already created** - they just need to be integrated into App.tsx
2. **No functionality will be lost** - this is purely code organization
3. **Testing required** after each major change to ensure callbacks work correctly
4. **TypeScript types** may need to be added to service files for better type safety

---

## 📦 Files Created

### Services
- `/services/geminiService.ts` - All Gemini API interactions
- `/services/imageService.ts` - Image fetching with Wikipedia fallback

### Utilities
- `/utils/speechHelpers.ts` - Text-to-speech and speech recognition

### Hooks
- `/hooks/useNavigation.ts` - Navigation state management
- `/hooks/useDataSync.ts` - Supabase sync logic

### Components (Already Extracted)
- 9 view components in `/components/`

---

## 🚀 Ready for Google AI Studio

Once you complete the replacements listed above, your App.tsx will be:
- **Under 2,500 lines** (well within AI Studio limits)
- **Better organized** (concerns properly separated)
- **Easier to maintain** (services can be tested independently)
- **More reusable** (hooks and services can be used elsewhere)

The app will function exactly the same - just with a cleaner, more maintainable architecture!
