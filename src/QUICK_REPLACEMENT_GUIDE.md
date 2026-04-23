# Quick Replacement Guide - Step by Step

This guide shows you exactly how to replace inline functions in App.tsx with the extracted services.

---

## Step 1: Replace Speech Functions (~100 lines saved)

### Find these functions in App.tsx:

```typescript
const handleReadAloud = (text) => {
  // ~30 lines of code
};

const handleVoiceInput = (callback) => {
  // ~40 lines of code
};

const isValidTextInput = (text) => {
  // ~20 lines of code
};
```

### Replace with:

Already imported at top:
```typescript
import * as SpeechHelpers from './utils/speechHelpers';
```

Then delete the inline functions and use directly:
```typescript
// Wherever handleReadAloud is called:
SpeechHelpers.handleReadAloud(text, () => setIsSpeaking(false));

// Wherever handleVoiceInput is called:
SpeechHelpers.handleVoiceInput((transcript) => {
  // your callback code
});

// Wherever isValidTextInput is called:
if (SpeechHelpers.isValidTextInput(userInput)) {
  // your code
}
```

---

## Step 2: Replace Image Generation (~55 lines saved)

### Find in App.tsx (around line 1126):

```typescript
const generateImage = async (text, searchTerm = null, originalTag = null, subjectId = 'science') => {
  setImageLoading(true);
  // ... 71 lines of code
  setImageLoading(false);
};
```

### Replace with:

```typescript
const generateImage = async (text, searchTerm = null, originalTag = null, subjectId = 'science') => {
  await ImageService.getImageForNugget(text, searchTerm, originalTag, subjectId, {
    onLoading: (loading) => setImageLoading(loading),
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

---

## Step 3: Replace Stardust Quiz Generation (~40 lines saved)

### Find in App.tsx (around line 1568):

```typescript
const generateStardustQuestion = async () => {
  if (!apiKey || !currentNugget) return;
  
  setStardustQuizLoading(true);
  try {
    // ... 40 lines of Gemini API code
  } finally {
    setStardustQuizLoading(false);
  }
};
```

### Replace with:

```typescript
const generateStardustQuestion = async () => {
  if (!apiKey || !currentNugget) return;
  
  setStardustQuizLoading(true);
  try {
    const question = await GeminiService.generateStardustQuestion(apiKey, currentNugget.text);
    setStardustQuestion(question);
  } catch (error) {
    console.error('Question generation error:', error);
    setStardustQuestion(null);
  } finally {
    setStardustQuizLoading(false);
  }
};
```

---

## Step 4: Replace Collection Quiz (~50 lines saved)

### Find in App.tsx (around line 1616):

```typescript
const startCollectionQuiz = async () => {
  if (!apiKey) {
    showNotification("Add API Key in Settings!");
    setTimeout(() => navigateTo('settings'), 1000);
    return;
  }
  
  if (collection.length < 3) {
    showNotification("Collect at least 3 nuggets first!");
    return;
  }
  
  setQuizLoading(true);
  try {
    // ... 50 lines of Gemini API code
  } finally {
    setQuizLoading(false);
  }
};
```

### Replace with:

```typescript
const startCollectionQuiz = async () => {
  if (!apiKey) {
    showNotification("Add API Key in Settings!");
    setTimeout(() => navigateTo('settings'), 1000);
    return;
  }
  
  if (collection.length < 3) {
    showNotification("Collect at least 3 nuggets first!");
    return;
  }
  
  setQuizLoading(true);
  try {
    const questions = await GeminiService.generateCollectionQuiz(apiKey, collection, 5);
    if (questions) {
      setQuizQuestions(questions);
      setCurrentQuizIndex(0);
      setShowCollectionQuiz(true);
    } else {
      showNotification("Could not generate quiz!");
    }
  } catch (error) {
    console.error('Quiz generation error:', error);
    showNotification("Could not generate quiz!");
  } finally {
    setQuizLoading(false);
  }
};
```

---

## Step 5: Replace Word Quiz (~50 lines saved)

### Find in App.tsx:

```typescript
const startWordQuiz = async () => {
  // Similar structure to collection quiz
  // ... 50 lines
};
```

### Replace with:

```typescript
const startWordQuiz = async () => {
  if (!apiKey) {
    showNotification("Add API Key in Settings!");
    setTimeout(() => navigateTo('settings'), 1000);
    return;
  }
  
  if (wordCollection.length < 3) {
    showNotification("Collect at least 3 words first!");
    return;
  }
  
  setWordQuizLoading(true);
  try {
    const questions = await GeminiService.generateWordQuiz(apiKey, wordCollection, 5);
    if (questions) {
      setWordQuizQuestions(questions);
      setCurrentWordQuizIndex(0);
      setShowWordQuiz(true);
    } else {
      showNotification("Could not generate quiz!");
    }
  } catch (error) {
    console.error('Word quiz generation error:', error);
    showNotification("Could not generate quiz!");
  } finally {
    setWordQuizLoading(false);
  }
};
```

---

## Step 6: Replace AI Question Response (~60 lines saved)

### Find in App.tsx (the callGemini function for AI responses):

```typescript
// Wherever you have inline Gemini API calls for AI chat responses
const handleAskQuestion = async (question) => {
  setAiLoading(true);
  try {
    // ... Gemini API call
    // ... response parsing
  } finally {
    setAiLoading(false);
  }
};
```

### Replace with:

```typescript
const handleAskQuestion = async (question) => {
  if (!apiKey) {
    showNotification("Add API Key in Settings!");
    return;
  }
  
  setAiLoading(true);
  try {
    const response = await GeminiService.generateAIResponse(apiKey, question, currentNugget);
    if (response) {
      setAiResponse(response);
    } else {
      showNotification("Could not get AI response!");
    }
  } catch (error) {
    console.error('AI response error:', error);
    showNotification("Could not get AI response!");
  } finally {
    setAiLoading(false);
  }
};
```

---

## Step 7: Replace Learn More (~50 lines saved)

### Find:

```typescript
const handleLearnMore = async () => {
  // Gemini API call for more facts
  // ... ~50 lines
};
```

### Replace with:

```typescript
const handleLearnMore = async () => {
  if (!apiKey || !currentNugget) return;
  
  setLearnLoading(true);
  try {
    const response = await GeminiService.generateLearnMore(apiKey, currentNugget.text);
    if (response) {
      setLearnResponse(response);
    } else {
      showNotification("Could not generate more info!");
    }
  } catch (error) {
    console.error('Learn more error:', error);
    showNotification("Could not generate more info!");
  } finally {
    setLearnLoading(false);
  }
};
```

---

## Step 8: Replace Activity Generation (~50 lines saved)

### Find:

```typescript
const handleActivity = async () => {
  // Gemini API call for activity suggestions
  // ... ~50 lines
};
```

### Replace with:

```typescript
const handleActivity = async () => {
  if (!apiKey || !currentNugget) return;
  
  setActivityLoading(true);
  try {
    const response = await GeminiService.generateActivity(
      apiKey, 
      currentNugget.text, 
      currentNugget.subjectId
    );
    if (response) {
      setActivityResponse(response);
    } else {
      showNotification("Could not generate activity!");
    }
  } catch (error) {
    console.error('Activity generation error:', error);
    showNotification("Could not generate activity!");
  } finally {
    setActivityLoading(false);
  }
};
```

---

## Step 9: Use useNavigation Hook (~30 lines saved)

### Find these in App.tsx:

```typescript
const [view, setView] = useState('home');
const [navigationHistory, setNavigationHistory] = useState(['home']);

const navigateTo = (newView) => {
  setNavigationHistory(prev => [...prev, newView]);
  setView(newView);
};

const goBack = () => {
  if (navigationHistory.length > 1) {
    const newHistory = navigationHistory.slice(0, -1);
    setView(newHistory[newHistory.length - 1]);
    setNavigationHistory(newHistory);
  }
};

const goHome = () => {
  setView('home');
  setNavigationHistory(['home']);
};
```

### Replace with:

```typescript
import { useNavigation } from './hooks/useNavigation';

// Inside component:
const { view, navigationHistory, navigateTo, goBack, goHome } = useNavigation('home');

// That's it! Delete all the navigation functions
```

---

## Step 10: Use useDataSync Hook (~150 lines saved)

### Find these in App.tsx:

```typescript
const loadUserData = async () => {
  try {
    // ... ~60 lines of code
  } catch (error) {
    // ...
  }
};

const saveData = async (updates) => {
  // ... ~90 lines of code
};

// And the useEffect:
useEffect(() => {
  if (user) {
    loadUserData();
  }
}, [user]);
```

### Replace with:

```typescript
import { useDataSync } from './hooks/useDataSync';

// Inside component:
const { saveData } = useDataSync(user, {
  onDataLoaded: (data) => {
    // Update all state from loaded data
    if (data.collection) setCollection(data.collection);
    if (data.word_collection) setWordCollection(data.word_collection);
    if (data.activity_collection) setActivityCollection(data.activity_collection);
    if (data.star_dust !== undefined) setStarDust(data.star_dust);
    if (data.crumbs !== undefined) setCrumbs(data.crumbs);
    if (data.inventory) setInventory(data.inventory);
    if (data.equipped) setEquipped(data.equipped);
    if (data.dark_mode !== undefined) setDarkMode(data.dark_mode);
    if (data.selected_guide) setSelectedGuide(data.selected_guide);
    if (data.avatar_nugget_type) setAvatarNuggetType(data.avatar_nugget_type);
    if (data.selected_accessories) setSelectedAccessories(data.selected_accessories);
  },
  onError: (error) => {
    console.error('Data sync error:', error);
  }
});

// Delete loadUserData function, delete the useEffect, keep saveData usage as is!
```

---

## Total Savings Summary

| Replacement | Lines Saved |
|-------------|-------------|
| Speech functions | ~100 |
| Image generation | ~55 |
| Stardust quiz | ~40 |
| Collection quiz | ~50 |
| Word quiz | ~50 |
| AI response | ~60 |
| Learn more | ~50 |
| Activity generation | ~50 |
| Navigation hook | ~30 |
| Data sync hook | ~150 |
| **TOTAL** | **~635 lines** |

**Current size:** 3,063 lines  
**After replacements:** ~2,428 lines ✅  
**Target:** Under 2,500 lines ✅

---

## ⚠️ Testing Checklist

After making replacements, test these features:

- [ ] Generate a nugget (tag selection)
- [ ] Generate nugget image
- [ ] Text-to-speech (read aloud)
- [ ] Speech recognition (voice input)
- [ ] AI chat responses
- [ ] Stardust quiz generation
- [ ] Collection quiz
- [ ] Word quiz
- [ ] Learn more feature
- [ ] Activity suggestions
- [ ] Navigation (back/forward)
- [ ] Data persistence (login/logout)

---

## 🎯 Recommended Order

1. Start with Speech functions (easy, low risk)
2. Replace quiz generation functions (straightforward)
3. Replace AI response functions
4. Replace image generation
5. Use navigation hook (be careful with state dependencies)
6. Use data sync hook last (most complex)

Good luck! 🚀
