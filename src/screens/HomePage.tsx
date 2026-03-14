import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, BackHandler } from 'react-native';

const CATEGORIES = [
	{ id: '1', title: 'Depression', color: '#4A90E2' },
	{ id: '2', title: 'Anxiety', color: '#50E3C2' },
	{ id: '3', title: 'Paranoia', color: '#D0021B' },
	{ id: '4', title: 'Hyperactivity', color: '#F5A623' },
	{ id: '5', title: 'Anger', color: '#9013FE' },
	{ id: '6', title: 'Stress', color: '#7ED321' },
];

const MOODS = [
	{ id: '1', emoji: '😢', message: "It's okay to have a hard day. We are here for you." },
	{ id: '2', emoji: '😕', message: "Take it easy today. Be kind to yourself." },
	{ id: '3', emoji: '😐', message: "A neutral day is a steady day. Keep breathing." },
	{ id: '4', emoji: '🙂', message: "Glad you are feeling okay! Keep up the positive momentum." },
	{ id: '5', emoji: '😄', message: "Wonderful! Harness that great energy today." },
];

export default function HomePage({ navigation }: any) {
	const [selectedMood, setSelectedMood] = useState<any>(null);

	// --- EXIT LOGIC ---
	const handleExit = () => {
		Alert.alert(
			"Wait a moment",
			"Are you sure you want to close MindGuide? Taking a break is fine, we'll be here when you return.",
			[
				{ text: "Stay", onPress: () => null, style: "cancel" },
				{ text: "Quit", onPress: () => BackHandler.exitApp() }
			]
		);
	};

	return (
		<View style={styles.main}>
			{/* --- TOP HEADER BAR --- */}
			<View style={styles.headerBar}>
				<Text style={styles.headerTitle}>Home</Text>
				<TouchableOpacity onPress={handleExit} style={styles.exitButton}>
					<Text style={styles.exitText}>✕</Text>
				</TouchableOpacity>
			</View>

			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{/* Daily Check-In Section */}
				<Text style={styles.sectionTitle}>Daily Check-In</Text>
				<Text style={styles.subtitle}>How are you feeling right now?</Text>

				<View style={styles.moodRow}>
					{MOODS.map((mood) => (
						<TouchableOpacity
							key={mood.id}
							style={[
								styles.moodButton,
								selectedMood?.id === mood.id && styles.moodButtonSelected
							]}
							onPress={() => setSelectedMood(mood)}
						>
							<Text style={styles.moodEmoji}>{mood.emoji}</Text>
						</TouchableOpacity>
					))}
				</View>

				{selectedMood && (
					<View style={styles.messageBox}>
						<Text style={styles.messageText}>{selectedMood.message}</Text>
					</View>
				)}

				{/* Categories Section */}
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
	main: { flex: 0, backgroundColor: '#F5F7FA' },
	headerBar: {
		height: 100,
		paddingTop: 30, // Margin for status bar
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#FFF',
		elevation: 4, // Shadow for Android
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	headerTitle: { fontSize: 20, fontWeight: '800', color: '#2D3748', letterSpacing: 1 },
	exitButton: { padding: 5 },
	exitText: { fontSize: 22, color: '#A0AEC0', fontWeight: 'bold' },
	scrollContainer: { padding: 20 },
	sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#2D3748', marginBottom: 5 },
	subtitle: { fontSize: 16, color: '#718096', marginBottom: 20 },
	moodRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
	moodButton: {
		padding: 10, borderRadius: 50, backgroundColor: '#FFF', elevation: 2,
	},
	moodButtonSelected: { backgroundColor: '#E2E8F0', borderWidth: 2, borderColor: '#4A90E2', transform: [{ scale: 1.1 }] },
	moodEmoji: { fontSize: 32 },
	messageBox: { backgroundColor: '#EBF8FF', padding: 15, borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#4A90E2' },
	messageText: { fontSize: 16, color: '#2B6CB0', fontStyle: 'italic' },
	grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
	card: { width: '48%', aspectRatio: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 4 },
	cardText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
});