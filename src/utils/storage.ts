// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry } from '../types';

const KEYS = {
    JOURNAL: '@journal_entries',
    PIN: '@journal_pin',
};

export const StorageUtils = {
    // --- JOURNAL METHODS ---
    getJournalEntries: async (): Promise<JournalEntry[]> => {
        try {
            const data = await AsyncStorage.getItem(KEYS.JOURNAL);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Failed to load journal", e);
            return [];
        }
    },

    saveJournalEntries: async (entries: JournalEntry[]): Promise<void> => {
        try {
            await AsyncStorage.setItem(KEYS.JOURNAL, JSON.stringify(entries));
        } catch (e) {
            console.error("Failed to save journal", e);
        }
    },

    // --- PIN METHODS ---
    getPin: async (): Promise<string | null> => {
        try {
            return await AsyncStorage.getItem(KEYS.PIN);
        } catch (e) {
            return null;
        }
    },

    savePin: async (pin: string): Promise<void> => {
        try {
            await AsyncStorage.setItem(KEYS.PIN, pin);
        } catch (e) {
            console.error("Failed to save PIN", e);
        }
    }
};