import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Preferences {
  isOnboarded: boolean;
  name: string;
  ageGroup: string;
  referredBy: string;
  knowledgeLevel: string;
  learningGoal: string;
  hasCompletedPreferences: boolean;
}

interface PreferencesContextType extends Preferences {
  setIsOnboarded: (val: boolean) => void;
  setName: (val: string) => void;
  setAgeGroup: (val: string) => void;
  setReferredBy: (val: string) => void;
  setKnowledgeLevel: (val: string) => void;
  setLearningGoal: (val: string) => void;
  setHasCompletedPreferences: (val: boolean) => void;
  resetPreferences: () => void;
  isLoading: boolean;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

const STORAGE_KEY = 'dharmapath_user_preferences';

const initialPreferences: Preferences = {
  isOnboarded: false,
  name: '',
  ageGroup: '',
  referredBy: '',
  knowledgeLevel: '',
  learningGoal: '',
  hasCompletedPreferences: false,
};

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<Preferences>(initialPreferences);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from AsyncStorage on mount
  useEffect(() => {
    async function loadPreferences() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setState(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load user preferences', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadPreferences();
  }, []);

  // Save preferences helper
  const savePreference = async (updates: Partial<Preferences>) => {
    setState((prev) => {
      const newState = { ...prev, ...updates };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState)).catch((err) =>
        console.error('Failed to save user preferences', err)
      );
      return newState;
    });
  };

  const setIsOnboarded = (val: boolean) => savePreference({ isOnboarded: val });
  const setName = (val: string) => savePreference({ name: val });
  const setAgeGroup = (val: string) => savePreference({ ageGroup: val });
  const setReferredBy = (val: string) => savePreference({ referredBy: val });
  const setKnowledgeLevel = (val: string) => savePreference({ knowledgeLevel: val });
  const setLearningGoal = (val: string) => savePreference({ learningGoal: val });
  const setHasCompletedPreferences = (val: boolean) => savePreference({ hasCompletedPreferences: val });

  const resetPreferences = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setState(initialPreferences);
    } catch (e) {
      console.error('Failed to clear user preferences', e);
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        ...state,
        setIsOnboarded,
        setName,
        setAgeGroup,
        setReferredBy,
        setKnowledgeLevel,
        setLearningGoal,
        setHasCompletedPreferences,
        resetPreferences,
        isLoading,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
