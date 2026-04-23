/**
 * Speech Helpers
 * Handles text-to-speech and speech recognition functionality
 */

export const isSpeechSynthesisSupported = (): boolean => {
  return 'speechSynthesis' in window;
};

export const isSpeechRecognitionSupported = (): boolean => {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};

export const initializeSpeechSynthesis = () => {
  if (!isSpeechSynthesisSupported()) return;
  
  // Load voices
  window.speechSynthesis.getVoices();
  
  // Some browsers fire this event when voices are loaded
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
};

export const stopSpeaking = () => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
};

export const handleReadAloud = (text: string, onComplete?: () => void) => {
  if (!isSpeechSynthesisSupported()) {
    alert('Text-to-speech is not supported in your browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Clean text: remove markdown-style formatting
  let cleanText = text
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\*/g, '')   // Remove italic markers
    .replace(/_/g, '')    // Remove underscores
    .replace(/#+\s/g, '') // Remove headers
    .replace(/`/g, '');   // Remove code markers

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Try to find a child-friendly voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.name.includes('Google') ||
        v.name.includes('Samantha') ||
        v.name.includes('Karen') ||
        v.name.includes('female') ||
        v.name.includes('child')
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      if (onComplete) onComplete();
    };

    window.speechSynthesis.speak(utterance);
  };

  // If voices aren't loaded yet, wait for them
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      speakText();
    };
  } else {
    speakText();
  }
};

export const startSpeechRecognition = (callbacks: {
  onResult: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}): any => {
  if (!isSpeechRecognitionSupported()) {
    if (callbacks.onError) {
      callbacks.onError('Speech recognition is not supported in your browser.');
    }
    return null;
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event: any) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }

    if (finalTranscript) {
      callbacks.onResult(finalTranscript.trim(), true);
    } else if (interimTranscript) {
      callbacks.onResult(interimTranscript, false);
    }
  };

  recognition.onerror = (event: any) => {
    console.error('Speech recognition error:', event.error);
    if (callbacks.onError) {
      callbacks.onError(event.error);
    }
  };

  recognition.onend = () => {
    if (callbacks.onEnd) {
      callbacks.onEnd();
    }
  };

  recognition.start();
  return recognition;
};

// Helper function to handle voice input for callbacks
export const handleVoiceInput = (callback: (text: string) => void) => {
  if (!isSpeechRecognitionSupported()) {
    alert('Speech recognition is not supported in your browser.');
    return null;
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    callback(transcript);
  };

  recognition.onerror = (event: any) => {
    console.error('Speech recognition error:', event.error);
    alert('Could not recognize speech. Please try again.');
  };

  recognition.start();
  return recognition;
};

// Validate if text input is meaningful (not random gibberish)
export const isValidTextInput = (text: string): boolean => {
  const trimmed = text.trim().toLowerCase();
  
  // Must be at least 2 characters
  if (trimmed.length < 2) return false;
  
  // Check for common gibberish patterns
  const gibberishPatterns = [
    /^(.)\1{3,}$/, // Repeated character (aaaa, 1111)
    /^[^aeiou\s]{6,}$/i, // Too many consonants without vowels
    /^[\d\W]+$/, // Only numbers and special characters
  ];
  
  for (const pattern of gibberishPatterns) {
    if (pattern.test(trimmed)) return false;
  }
  
  // Check if it contains at least one vowel (for English words)
  if (!/[aeiou]/i.test(trimmed)) return false;
  
  return true;
};
