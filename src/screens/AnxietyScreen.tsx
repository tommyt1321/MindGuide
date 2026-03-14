import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function AnxietyScreen({ navigation }: any) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Grounding Exercise</Text>
                <Text style={styles.subtitle}>
                    When anxiety peaks, use the 5-4-3-2-1 method to bring your mind back to the present.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.stepTitle}>👀 5 Things you can see</Text>
                <Text style={styles.stepText}>Look around and silently name five things you can see right now.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.stepTitle}>🖐️ 4 Things you can touch</Text>
                <Text style={styles.stepText}>Notice the texture of four things around you (your shirt, a desk, the floor).</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.stepTitle}>👂 3 Things you can hear</Text>
                <Text style={styles.stepText}>Listen closely. What are three distinct sounds you hear?</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.stepTitle}>👃 2 Things you can smell</Text>
                <Text style={styles.stepText}>Take a gentle breath in. Can you notice two smells?</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.stepTitle}>👅 1 Thing you can taste</Text>
                <Text style={styles.stepText}>What does the inside of your mouth taste like right now?</Text>
            </View>

            {/* Notice how we can reuse our breathing exercise here too! */}
            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('Breathing')}
            >
                <Text style={styles.buttonText}>Finish with Box Breathing</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} /> {/* Padding for the bottom of the scroll */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        padding: 20,
    },
    header: {
        marginBottom: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#718096',
        lineHeight: 24,
    },
    card: {
        backgroundColor: '#FFF',
        padding: 18,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 2,
        borderLeftWidth: 5,
        borderLeftColor: '#50E3C2', // Anxiety category color
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 5,
    },
    stepText: {
        fontSize: 15,
        color: '#4A5568',
        lineHeight: 22,
    },
    actionButton: {
        backgroundColor: '#50E3C2',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#1A202C',
        fontSize: 16,
        fontWeight: 'bold',
    },
});