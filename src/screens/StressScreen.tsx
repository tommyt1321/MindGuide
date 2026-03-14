import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function StressScreen({ navigation }: any) {
    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.title, { color: '#7ED321' }]}>Muscle Relaxation</Text>
            <Text style={styles.subtitle}>Stress hides in our muscles. Let's physically release it.</Text>

            <View style={styles.card}>
                <Text style={styles.stepText}>1. Squeeze your hands into tight fists for 5 seconds, then let go.</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.stepText}>2. Pull your shoulders up to your ears for 5 seconds, then drop them.</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.stepText}>3. Squeeze your eyes shut and clench your jaw for 5 seconds, then relax.</Text>
            </View>

            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Breathing')}>
                <Text style={styles.buttonText}>Finish with Box Breathing</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, marginTop: 20 },
    subtitle: { fontSize: 16, color: '#718096', lineHeight: 24, marginBottom: 20 },
    card: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 1 },
    stepText: { fontSize: 16, color: '#4A5568', lineHeight: 24 },
    actionButton: { backgroundColor: '#7ED321', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
    buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});