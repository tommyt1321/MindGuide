export interface Category {
    id: string;
    title: string;
    color: string;
}

export interface Mood {
    id: string;
    emoji: string;
    title: string;
    message: string;
    actionText: string | null;
    route: string | null;
}

export interface JournalEntry {
    id: string;
    date: string;
    mood: string;
    text: string;
}

export type MoodColors = Record<string, string[]>;