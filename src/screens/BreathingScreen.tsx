import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// 1. Import your brand new custom component!
import BreathingCircle from '../components/BreathingCircle';

export default function BreathingScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Box Breathing</Text>
            <Text style={styles.instructions}>
                Follow the circle. Inhale as it grows, exhale as it shrinks.
            </Text>

            <View style={styles.animationContainer}>
                {/* 2. Use it just like a normal React Native tool! */}
                <BreathingCircle />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A202C',
        alignItems: 'center',
        paddingTop: 60,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E2E8F0',
        marginBottom: 10,
    },
    instructions: {
        fontSize: 16,
        color: '#A0AEC0',
        textAlign: 'center',
        paddingHorizontal: 40,
        marginBottom: 60,
    },
    animationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});