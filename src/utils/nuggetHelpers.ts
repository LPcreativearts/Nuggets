/**
 * Nugget Generation Helpers
 * Wrapper functions that connect App.tsx state to GeminiService
 */

import * as GeminiService from '../services/geminiService';

export const generateNuggetByTagWrapper = async (
  apiKey: string,
  tag: string,
  subjectId: string | null,
  callbacks: {
    onCacheHit: (nugget: any) => void;
    onLoadingStart: (tempNugget: any) => void;
    onSuccess: (nugget: any, searchTerm: string) => void;
    onError: (error: Error) => void;
  }
) => {
  await GeminiService.generateNuggetByTag(apiKey, tag, subjectId, callbacks);
};
