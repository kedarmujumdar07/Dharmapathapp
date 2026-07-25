import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserCohort = 'general' | 'student' | 'practitioner' | 'family';

export type LearningGoal =
  | 'stories_epics'
  | 'daily_practice'
  | 'cultural_connection'
  | 'academic_study'
  | 'family_heritage';

export type KnowledgeLevel =
  | 'beginner_curious'
  | 'intermediate'
  | 'advanced'
  | 'scholar_practitioner';

export type AgeGroup =
  | 'under_13'
  | '13_17'
  | '18_24'
  | '25_34'
  | '35_50'
  | '50_plus';

export type ReferralSource =
  | 'friend_family'
  | 'social_media'
  | 'app_store'
  | 'blog_article'
  | 'other';

export interface UserPreferencesData {
  isOnboarded: boolean;
  name: string;
  ageGroup: AgeGroup | string;
  referredBy: ReferralSource | string;
  knowledgeLevel: KnowledgeLevel | string;
  learningGoal: LearningGoal | string;
  userCohort: UserCohort;
  hasCompletedPreferences: boolean;
}

export interface PreferencesContextValue extends UserPreferencesData {
  setIsOnboarded: (val: boolean) => void;
  setName: (val: string) => void;
  setAgeGroup: (val: string) => void;
  setReferredBy: (val: string) => void;
  setKnowledgeLevel: (val: string) => void;
  setLearningGoal: (val: string) => void;
  setUserCohort: (val: UserCohort) => void;
  setHasCompletedPreferences: (val: boolean) => void;
  resetPreferences: () => Promise<void>;
  isLoading: boolean;
}

const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);

const STORAGE_KEY = 'dharmapath_user_preferences_v1';

const initialPreferences: UserPreferencesData = {
  isOnboarded: false,
  name: '',
  ageGroup: '',
  referredBy: '',
  knowledgeLevel: '',
  learningGoal: '',
  userCohort: 'general',
  hasCompletedPreferences: false,
};

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferencesData>(initialPreferences);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from AsyncStorage on mount
  useEffect(() => {
    let isMounted = true;
    async function loadPreferences() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored && isMounted) {
          const parsed = JSON.parse(stored);
          setPreferences((prev) => ({ ...prev, ...parsed }));
        }
      } catch (e) {
        console.error('Failed to load user preferences', e);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadPreferences();
    return () => {
      isMounted = false;
    };
  }, []);

  // Save preference helper (immutable update)
  const savePreference = useCallback((updates: Partial<UserPreferencesData>) => {
    setPreferences((prev) => {
      const nextState = { ...prev, ...updates };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextState)).catch((err) =>
        console.error('Failed to save user preferences', err)
      );
      return nextState;
    });
  }, []);

  const setIsOnboarded = useCallback((val: boolean) => savePreference({ isOnboarded: val }), [savePreference]);
  const setName = useCallback((val: string) => savePreference({ name: val }), [savePreference]);
  const setAgeGroup = useCallback((val: string) => savePreference({ ageGroup: val }), [savePreference]);
  const setReferredBy = useCallback((val: string) => savePreference({ referredBy: val }), [savePreference]);
  const setKnowledgeLevel = useCallback((val: string) => savePreference({ knowledgeLevel: val }), [savePreference]);
  const setLearningGoal = useCallback((val: string) => savePreference({ learningGoal: val }), [savePreference]);
  const setUserCohort = useCallback((val: UserCohort) => savePreference({ userCohort: val }), [savePreference]);
  const setHasCompletedPreferences = useCallback(
    (val: boolean) => savePreference({ hasCompletedPreferences: val }),
    [savePreference]
  );

  const resetPreferences = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setPreferences(initialPreferences);
    } catch (e) {
      console.error('Failed to clear user preferences', e);
    }
  }, []);

  const contextValue = useMemo<PreferencesContextValue>(
    () => ({
      ...preferences,
      setIsOnboarded,
      setName,
      setAgeGroup,
      setReferredBy,
      setKnowledgeLevel,
      setLearningGoal,
      setUserCohort,
      setHasCompletedPreferences,
      resetPreferences,
      isLoading,
    }),
    [
      preferences,
      setIsOnboarded,
      setName,
      setAgeGroup,
      setReferredBy,
      setKnowledgeLevel,
      setLearningGoal,
      setUserCohort,
      setHasCompletedPreferences,
      resetPreferences,
      isLoading,
    ]
  );

  return <PreferencesContext.Provider value={contextValue}>{children}</PreferencesContext.Provider>;
};

export const usePreferences = (): PreferencesContextValue => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

