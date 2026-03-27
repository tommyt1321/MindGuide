// src/constants/data.ts
import { Category, Mood, MoodColors } from '../types';

export const MOOD_COLORS: MoodColors = {
    default: ['#F5F7FA', '#E2E8F0'],
    '1': ['#EBF8FF', '#BEE3F8'],
    '2': ['#FAF5FF', '#D6BCFA'],
    '3': ['#F0FFF4', '#9AE6B4'],
    '4': ['#FFFFF0', '#F6E05E'],
    '5': ['#FFF5F5', '#FEB2B2'],
};

export const CATEGORIES: Category[] = [
    { id: '1', title: 'Depression', color: '#4A90E2' },
    { id: '2', title: 'Anxiety', color: '#50E3C2' },
    { id: '3', title: 'Paranoia', color: '#D0021B' },
    { id: '4', title: 'Hyperactivity', color: '#F5A623' },
    { id: '5', title: 'Anger', color: '#9013FE' },
    { id: '6', title: 'Stress', color: '#7ED321' },
];

export const MOODS: Mood[] = [
    { id: '1', emoji: '😢', title: "Navigating Sadness", message: "It's entirely normal to feel low. Let's start by validating this feeling without judgment.", actionText: "Try a Depression Exercise", route: "Depression" },
    { id: '2', emoji: '😕', title: "Calming Anxiety", message: "Your nervous system is on high alert. Let's try the 5-4-3-2-1 grounding method right now.", actionText: "Start Anxiety Relief", route: "Anxiety" },
    { id: '3', emoji: '😐', title: "Finding Balance", message: "A neutral day is a great opportunity to build resilience. Let's do a quick body scan.", actionText: "Try Box Breathing", route: "Breathing" },
    { id: '4', emoji: '🙂', title: "Positive Momentum", message: "It's wonderful that you are feeling okay. Take a moment to acknowledge one small thing you are grateful for today.", actionText: null, route: null },
    { id: '5', emoji: '😄', title: "Harnessing Energy", message: "Great energy! This is the perfect state of mind to tackle a challenging task.", actionText: "Focus Your Energy", route: "Hyperactivity" },
];