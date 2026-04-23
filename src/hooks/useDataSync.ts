/**
 * useDataSync Hook
 * Handles Supabase data persistence and synchronization
 */

import { useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DataSyncCallbacks {
  onDataLoaded?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useDataSync = (user: any, callbacks?: DataSyncCallbacks) => {
  // Load user data from server
  const loadUserData = useCallback(async () => {
    if (!user) return;

    try {
      const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
      if (!accessToken) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c9fbfdc0/user-data`,
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to load user data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📥 Loaded user data from server:', data);

      if (callbacks?.onDataLoaded) {
        callbacks.onDataLoaded(data);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      if (callbacks?.onError) {
        callbacks.onError(error as Error);
      }
    }
  }, [user, callbacks]);

  // Save data to server
  const saveData = useCallback(async (updates: any) => {
    console.log('saveData called - user:', user ? user.email : 'null');
    console.log('Updates to save:', updates);

    if (!user) {
      console.log('No user logged in, skipping save');
      return;
    }

    try {
      const accessToken = (await supabase.auth.getSession()).data.session?.access_token;

      if (!accessToken) {
        console.log('No access token, skipping save');
        return;
      }

      // Convert camelCase to snake_case for storage
      const dbUpdates: any = {};
      if (updates.collection !== undefined) dbUpdates.collection = updates.collection;
      if (updates.wordCollection !== undefined) dbUpdates.word_collection = updates.wordCollection;
      if (updates.activityCollection !== undefined)
        dbUpdates.activity_collection = updates.activityCollection;
      if (updates.starDust !== undefined) dbUpdates.star_dust = updates.starDust;
      if (updates.crumbs !== undefined) dbUpdates.crumbs = updates.crumbs;
      if (updates.inventory !== undefined) dbUpdates.inventory = updates.inventory;
      if (updates.equipped !== undefined) dbUpdates.equipped = updates.equipped;
      if (updates.darkMode !== undefined) dbUpdates.dark_mode = updates.darkMode;
      if (updates.selectedGuide !== undefined) dbUpdates.selected_guide = updates.selectedGuide;
      if (updates.avatarNuggetType !== undefined)
        dbUpdates.avatar_nugget_type = updates.avatarNuggetType;
      if (updates.selectedAccessories !== undefined)
        dbUpdates.selected_accessories = updates.selectedAccessories;

      console.log('Saving to database:', dbUpdates);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c9fbfdc0/save-data`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(dbUpdates)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save data: ${response.statusText} - ${errorText}`);
      }

      console.log('✅ Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      if (callbacks?.onError) {
        callbacks.onError(error as Error);
      }
    }
  }, [user, callbacks]);

  // Load data on mount and when user changes
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user, loadUserData]);

  return { loadUserData, saveData };
};
