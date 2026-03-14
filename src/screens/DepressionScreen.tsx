import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DepressionScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.label}>Daily Insight</Text>
				<Text style={styles.tip}>
					"Your feelings are valid, but they are not facts. Just for today, try to accomplish one small, 5-minute task."
				</Text>
			</View>

			<TouchableOpacity style={styles.actionButton}>
				<Text style={styles.buttonText}>Guided Breathing Exercise</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.actionButton, { backgroundColor: '#718096', marginTop: 15 }]}>
				<Text style={styles.buttonText}>Log My Thoughts</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F7FA',
		padding: 20,
		justifyContent: 'center',
	},
	card: {
		backgroundColor: '#FFF',
		padding: 25,
		borderRadius: 20,
		elevation: 2,
		marginBottom: 40,
	},
	label: {
		color: '#4A90E2',
		fontWeight: 'bold',
		fontSize: 14,
		textTransform: 'uppercase',
		marginBottom: 10,
	},
	tip: {
		fontSize: 18,
		color: '#2D3748',
		lineHeight: 28,
		fontStyle: 'italic',
	},
	actionButton: {
		backgroundColor: '#4A90E2',
		padding: 18,
		borderRadius: 12,
		alignItems: 'center',
	},
	buttonText: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: '600',
	},
});