import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to MindGuide</Text>
			<Text style={styles.subtitle}>Your personal space for emotional clarity and support.</Text>

			<Button
				title="Get Started"
				onPress={() => navigation.navigate('Categories')}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#F5F7FA',
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#2D3748',
	},
	subtitle: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 30,
		color: '#718096',
		lineHeight: 24,
	},
});