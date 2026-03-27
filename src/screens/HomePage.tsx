import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, BackHandler, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// --- INSIDE OUT COLOR MAP ---
// Format: [Background Color, Floating Blob Color]
const MOOD_COLORS: Record<string, string[]> = {
	default: ['#F5F7FA', '#E2E8F0'], // Light Gray (Starting State)
	'1': ['#EBF8FF', '#BEE3F8'],     // Blue (Sadness)
	'2': ['#FAF5FF', '#D6BCFA'],     // Purple (Anxiety/Fear)
	'3': ['#F0FFF4', '#9AE6B4'],     // Green (Neutral/Balance)
	'4': ['#FFFFF0', '#F6E05E'],     // Yellow (Positive/Joy)
	'5': ['#FFF5F5', '#FEB2B2'],     // Peach/Red (Energy/Anger)
};

const CATEGORIES = [
	{ id: '1', title: 'Depression', color: '#4A90E2' },
	{ id: '2', title: 'Anxiety', color: '#50E3C2' },
	{ id: '3', title: 'Paranoia', color: '#D0021B' },
	{ id: '4', title: 'Hyperactivity', color: '#F5A623' },
	{ id: '5', title: 'Anger', color: '#9013FE' },
	{ id: '6', title: 'Stress', color: '#7ED321' },
];

const MOODS = [
	{ id: '1', emoji: '😢', title: "Navigating Sadness", message: "It's entirely normal to feel low. Let's start by validating this feeling without judgment.", actionText: "Try a Depression Exercise", route: "Depression" },
	{ id: '2', emoji: '😕', title: "Calming Anxiety", message: "Your nervous system is on high alert. Let's try the 5-4-3-2-1 grounding method right now.", actionText: "Start Anxiety Relief", route: "Anxiety" },
	{ id: '3', emoji: '😐', title: "Finding Balance", message: "A neutral day is a great opportunity to build resilience. Let's do a quick body scan.", actionText: "Try Box Breathing", route: "Breathing" },
	{ id: '4', emoji: '🙂', title: "Positive Momentum", message: "It's wonderful that you are feeling okay. Take a moment to acknowledge one small thing you are grateful for today.", actionText: null, route: null },
	{ id: '5', emoji: '😄', title: "Harnessing Energy", message: "Great energy! This is the perfect state of mind to tackle a challenging task.", actionText: "Focus Your Energy", route: "Hyperactivity" },
];

export default function HomePage({ navigation }: any) {
	const [selectedMood, setSelectedMood] = useState<any>(null);
	const [showBioAlert, setShowBioAlert] = useState<boolean>(true);

	// --- ANIMATION STATES ---
	const colorAnim = useRef(new Animated.Value(0)).current;
	const float1 = useRef(new Animated.Value(0)).current;
	const float2 = useRef(new Animated.Value(0)).current;

	const [currentColors, setCurrentColors] = useState(MOOD_COLORS.default);
	const [nextColors, setNextColors] = useState(MOOD_COLORS.default);

	// 1. The "Flowing" Floating Animation
	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(float1, { toValue: 1, duration: 4000, useNativeDriver: false }),
				Animated.timing(float1, { toValue: 0, duration: 4000, useNativeDriver: false })
			])
		).start();

		Animated.loop(
			Animated.sequence([
				Animated.timing(float2, { toValue: 1, duration: 5500, useNativeDriver: false }),
				Animated.timing(float2, { toValue: 0, duration: 5500, useNativeDriver: false })
			])
		).start();
	}, []);

	// 2. The Color Change Logic
	const handleMoodSelect = (mood: any) => {
		setSelectedMood(mood);
		setNextColors(MOOD_COLORS[mood.id]);
		colorAnim.setValue(0);

		Animated.timing(colorAnim, {
			toValue: 1,
			duration: 800, // Smooth 0.8 second fade
			useNativeDriver: false, // Must be false for background colors
		}).start(() => {
			setCurrentColors(MOOD_COLORS[mood.id]);
		});
	};

	const handleExit = () => {
		Alert.alert(
			"Wait a moment",
			"Are you sure you want to close MindGuide? Taking a break is fine, we'll be here when you return.",
			[{ text: "Stay", onPress: () => null, style: "cancel" }, { text: "Quit", onPress: () => BackHandler.exitApp() }]
		);
	};

	// --- INTERPOLATIONS ---
	const bgColor = colorAnim.interpolate({ inputRange: [0, 1], outputRange: [currentColors[0], nextColors[0]] });
	const blobColor = colorAnim.interpolate({ inputRange: [0, 1], outputRange: [currentColors[1], nextColors[1]] });
	const translateY1 = float1.interpolate({ inputRange: [0, 1], outputRange: [0, -40] });
	const translateY2 = float2.interpolate({ inputRange: [0, 1], outputRange: [0, 50] });

	return (
		<View style={styles.main}>
			{/* --- THE LIVING BACKGROUND --- */}
			<Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: bgColor }]} />
			<Animated.View style={[styles.blob1, { backgroundColor: blobColor, transform: [{ translateY: translateY1 }, { scale: 1.2 }] }]} />
			<Animated.View style={[styles.blob2, { backgroundColor: blobColor, transform: [{ translateY: translateY2 }, { scale: 1.5 }] }]} />

			{/* HEADER */}
			<View style={styles.headerBar}>
				<Text style={styles.headerTitle}>Home</Text>
				<TouchableOpacity onPress={handleExit} style={styles.exitButton}>
					<Text style={styles.exitText}>✕</Text>
				</TouchableOpacity>
			</View>

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

				{showBioAlert && (
					<View style={styles.bioAlertCard}>
						<View style={styles.bioAlertHeader}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text style={styles.bioAlertIcon}>⌚</Text>
								<Text style={styles.bioAlertTitle}>Elevated Heart Rate</Text>
							</View>
							<TouchableOpacity onPress={() => setShowBioAlert(false)}>
								<Text style={styles.bioAlertCloseText}>✕</Text>
							</TouchableOpacity>
						</View>
						<Text style={styles.bioAlertText}>
							We've detected a spike in your stress levels. Taking just 2 minutes to breathe can safely reset your nervous system.
						</Text>
						<TouchableOpacity style={styles.bioAlertButton} onPress={() => navigation.navigate('Breathing')}>
							<Text style={styles.bioAlertButtonText}>Start Breathing Guide</Text>
						</TouchableOpacity>
					</View>
				)}

				<Text style={styles.sectionTitle}>Daily Check-In</Text>
				<Text style={styles.subtitle}>How are you feeling right now?</Text>

				<View style={styles.moodRow}>
					{MOODS.map((mood) => (
						<TouchableOpacity
							key={mood.id}
							style={[styles.moodButton, selectedMood?.id === mood.id && styles.moodButtonSelected]}
							onPress={() => handleMoodSelect(mood)}
						>
							<Text style={styles.moodEmoji}>{mood.emoji}</Text>
						</TouchableOpacity>
					))}
				</View>

				{selectedMood && (
					<View style={styles.guidanceCard}>
						<View style={styles.guidanceHeader}>
							<Text style={styles.guidanceIcon}>🧠</Text>
							<Text style={styles.guidanceTitle}>{selectedMood.title}</Text>
						</View>
						<Text style={styles.guidanceText}>{selectedMood.message}</Text>
						{selectedMood.route && (
							<TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate(selectedMood.route)}>
								<Text style={styles.actionButtonText}>{selectedMood.actionText}</Text>
							</TouchableOpacity>
						)}
					</View>
				)}

				<Text style={[styles.sectionTitle, { marginTop: 40 }]}>Explore Tools</Text>
				<Text style={styles.subtitle}>Select a category to find helpful exercises.</Text>

				<View style={styles.grid}>
					{CATEGORIES.map((item) => (
						<TouchableOpacity
							key={item.id}
							style={[styles.card, { backgroundColor: item.color }]}
							onPress={() => {
								if (item.title === 'Depression') navigation.navigate('Depression');
								else if (item.title === 'Anxiety') navigation.navigate('Anxiety');
								else if (item.title === 'Anger') navigation.navigate('Anger');
								else if (item.title === 'Paranoia') navigation.navigate('Paranoia');
								else if (item.title === 'Hyperactivity') navigation.navigate('Hyperactivity');
								else if (item.title === 'Stress') navigation.navigate('Stress');
							}}
						>
							<Text style={styles.cardText}>{item.title}</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	main: { flex: 1 },

	// --- AURA BLOB STYLES ---
	blob1: { position: 'absolute', top: -100, left: -50, width: width * 0.8, height: width * 0.8, borderRadius: width * 0.4, opacity: 0.6, filter: 'blur(10px)' },
	blob2: { position: 'absolute', top: height * 0.3, right: -100, width: width * 0.9, height: width * 0.9, borderRadius: width * 0.45, opacity: 0.5 },

	headerBar: { height: 100, paddingTop: 30, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent' },
	headerTitle: { fontSize: 22, fontWeight: '900', color: '#2D3748', letterSpacing: 1 },
	exitButton: { padding: 5, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
	exitText: { fontSize: 20, color: '#4A5568', fontWeight: 'bold' },

	scrollContainer: { padding: 20, paddingBottom: 50 },
	sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#2D3748', marginBottom: 5 },
	subtitle: { fontSize: 16, color: '#4A5568', marginBottom: 20, opacity: 0.8 },

	// Smart Alert
	bioAlertCard: { backgroundColor: 'rgba(255, 245, 245, 0.9)', padding: 18, borderRadius: 15, borderWidth: 1, borderColor: '#FEB2B2', marginBottom: 25, elevation: 2 },
	bioAlertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
	bioAlertIcon: { fontSize: 18, marginRight: 8 },
	bioAlertTitle: { fontSize: 16, fontWeight: '900', color: '#C53030' },
	bioAlertCloseText: { fontSize: 18, color: '#FC8181', fontWeight: 'bold', paddingHorizontal: 5 },
	bioAlertText: { fontSize: 14, color: '#9B2C2C', lineHeight: 20, marginBottom: 15 },
	bioAlertButton: { backgroundColor: '#E53E3E', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
	bioAlertButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },

	// Moods
	moodRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
	moodButton: { padding: 10, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.7)', elevation: 1 },
	moodButtonSelected: { backgroundColor: '#FFF', borderWidth: 3, borderColor: '#4A90E2', transform: [{ scale: 1.15 }], elevation: 5 },
	moodEmoji: { fontSize: 32 },

	// Guidance Card
	guidanceCard: { backgroundColor: 'rgba(255,255,255,0.85)', padding: 20, borderRadius: 15, borderLeftWidth: 5, borderLeftColor: '#4A90E2', marginBottom: 20 },
	guidanceHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
	guidanceIcon: { fontSize: 22, marginRight: 8 },
	guidanceTitle: { fontSize: 18, fontWeight: 'bold', color: '#2B6CB0' },
	guidanceText: { fontSize: 15, color: '#2D3748', lineHeight: 22, marginBottom: 15 },
	actionButton: { backgroundColor: '#4A90E2', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
	actionButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

	// Grid
	grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
	card: { width: '48%', aspectRatio: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 4 },
	cardText: { color: '#FFF', fontSize: 18, fontWeight: '600', textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
});