import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ParanoiaScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.title, { color: '#D0021B' }]}>Reality Check</Text>
            <Text style={styles.subtitle}>When your mind starts running away with fearful thoughts, ask yourself these three questions:</Text>

            <View style={styles.card}>
                <Text style={styles.stepTitle}>1. What is the evidence?</Text>
                <Text style={styles.stepText}>Is this a proven fact, or is it a feeling I am treating as a fact?</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.stepTitle}>2. Is there another explanation?</Text>
                <Text style={styles.stepText}>If a friend was in this exact situation, what would I tell them?</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.stepTitle}>3. What is the worst-case scenario?</Text>
                <Text style={styles.stepText}>If it did happen, could I survive it? What steps would I take?</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, marginTop: 20 },
    subtitle: { fontSize: 16, color: '#718096', lineHeight: 24, marginBottom: 20 },
    card: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, marginBottom: 15, elevation: 2 },
    stepTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3748', marginBottom: 5 },
    stepText: { fontSize: 15, color: '#4A5568', lineHeight: 22 },
});