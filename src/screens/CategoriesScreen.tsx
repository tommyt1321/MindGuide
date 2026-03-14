import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const CATEGORIES = [
	{ id: '1', title: 'Depression', color: '#4A90E2' },
	{ id: '2', title: 'Anxiety', color: '#50E3C2' },
	{ id: '3', title: 'Paranoia', color: '#D0021B' },
	{ id: '4', title: 'Hyperactivity', color: '#F5A623' },
	{ id: '5', title: 'Anger', color: '#9013FE' },
	{ id: '6', title: 'Stress', color: '#7ED321' },
];

export default function CategoriesScreen({ navigation }: any) {
	return (
		<ScrollView style={styles.main}>
			<View style={styles.container}>
				<Text style={styles.title}>How are you feeling?</Text>
				<Text style={styles.subtitle}>Select a category to explore helpful tools and exercises.</Text>

				<View style={styles.grid}>
					{CATEGORIES.map((item) => (
						<TouchableOpacity
							key={item.id}
							style={[styles.card, { backgroundColor: item.color }]}
							onPress={() => {
								if (item.title === 'Depression') {
									navigation.navigate('Depression');
								} else {
									console.log(`${item.title} pressed`);
								}
							}}
						>
							<Text style={styles.cardText}>{item.title}</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: '#F5F7FA',
	},
	container: {
		padding: 20,
		paddingTop: 40,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#2D3748',
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: '#718096',
		marginBottom: 30,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	card: {
		width: '48%', // This creates the two-column grid
		aspectRatio: 1, // Keeps the buttons square
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15,
		elevation: 4, // Adds a nice shadow on Android
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	cardText: {
		color: '#FFF',
		fontSize: 18,
		fontWeight: '600',
	},
});