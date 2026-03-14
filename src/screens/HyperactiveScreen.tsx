import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HyperactivityScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.title, { color: '#F5A623' }]}>Channel Your Energy</Text>
            <Text style={styles.subtitle}>You don't need to force yourself to sit still. Let's give your brain a physical task to burn off that extra energy.</Text>

            <View style={styles.card}>
                <Text style={styles.stepTitle}>⚡ The 3-Minute Burn</Text>
                <Text style={styles.stepText}>Do 10 jumping jacks, 10 pushups, or run in place for 1 minute. Do not stop until your heart rate is up.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.stepTitle}>🧩 The Micro-Task</Text>
                <Text style={styles.stepText}>Find one messy corner of your room. You have exactly 2 minutes to organize it. Go!</Text>
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