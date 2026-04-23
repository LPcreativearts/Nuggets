/**
 * useNavigation Hook
 * Manages navigation history and view transitions
 */

import { useState, useCallback } from 'react';

export const useNavigation = (initialView: string = 'home') => {
  const [view, setView] = useState(initialView);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([initialView]);

  const navigateTo = useCallback((newView: string) => {
    setNavigationHistory(prev => [...prev, newView]);
    setView(newView);
  }, []);

  const goBack = useCallback(() => {
    setNavigationHistory(prev => {
      if (prev.length > 1) {
        const newHistory = prev.slice(0, -1);
        setView(newHistory[newHistory.length - 1]);
        return newHistory;
      }
      return prev;
    });
  }, []);

  const goHome = useCallback(() => {
    setView('home');
    setNavigationHistory(['home']);
  }, []);

  const resetNavigation = useCallback(() => {
    setView(initialView);
    setNavigationHistory([initialView]);
  }, [initialView]);

  return {
    view,
    navigationHistory,
    navigateTo,
    goBack,
    goHome,
    resetNavigation
  };
};
