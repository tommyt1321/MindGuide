import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Sound from 'react-native-sound';

// Enable audio playback in silent mode
Sound.setCategory('Playback');

const { width } = Dimensions.get('window');

export default function BreathingScreen({ navigation }: any) {
    const [isActive, setIsActive] = useState(false);
    const [instruction, setInstruction] = useState('Ready to relax?');

    // The animation engine for our breathing circle
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const soundRef = useRef<Sound | null>(null);

    // FIX 1: Use TypeScript's native return type instead of NodeJS
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        // FIX 2: Use 'undefined' instead of 'null' for the remote URL base path
        const audio = new Sound('https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg', undefined, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
            audio.setVolume(0.5);
            audio.setNumberOfLoops(-1); // -1 means infinite loop
            soundRef.current = audio;
        });

        // Cleanup: Stop audio when the user leaves the screen
        return () => {
            if (soundRef.current) {
                soundRef.current.stop();
                soundRef.current.release();
            }
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const startExercise = () => {
        setIsActive(true);
        setInstruction('Inhale deeply...');

        if (soundRef.current) soundRef.current.play();

        const breatheIn = Animated.timing(scaleAnim, {
            toValue: 2.2,
            duration: 4000,
            useNativeDriver: true,
        });

        const breatheOut = Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
        });

        Animated.loop(Animated.sequence([breatheIn, breatheOut])).start();

        intervalRef.current = setInterval(() => {
            setInstruction((prev) => (prev === 'Inhale deeply...' ? 'Exhale slowly...' : 'Inhale deeply...'));
        }, 4000);
    };

    const stopExercise = () => {
        setIsActive(false);
        setInstruction('Session Paused');

        if (soundRef.current) soundRef.current.pause();
        if (intervalRef.current) clearInterval(intervalRef.current);
        scaleAnim.stopAnimation();

        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Box Breathing</Text>
                <View style={{ width: 60 }} />
            </View>

            <View style={styles.metronomeContainer}>
                <Animated.View style={[styles.breathingCircle, { transform: [{ scale: scaleAnim }] }]} />
                <Text style={styles.instructionText}>{instruction}</Text>
            </View>

            <View style={styles.controls}>
                {!isActive ? (
                    <TouchableOpacity style={styles.startButton} onPress={startExercise}>
                        <Text style={styles.startButtonText}>Start Breathing</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.stopButton} onPress={stopExercise}>
                        <Text style={styles.stopButtonText}>Pause</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0FFF4' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 20 },
    backButton: { padding: 10, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 20 },
    backText: { fontSize: 16, color: '#2D3748', fontWeight: 'bold' },
    title: { fontSize: 20, fontWeight: 'bold', color: '#2F855A' },

    metronomeContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    breathingCircle: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: (width * 0.3) / 2,
        backgroundColor: 'rgba(72, 187, 120, 0.3)',
        position: 'absolute',
    },
    instructionText: { fontSize: 28, fontWeight: 'bold', color: '#276749', textAlign: 'center', zIndex: 10 },

    controls: { padding: 40, paddingBottom: 60 },
    startButton: { backgroundColor: '#48BB78', paddingVertical: 18, borderRadius: 15, alignItems: 'center', elevation: 3 },
    startButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    stopButton: { backgroundColor: '#E2E8F0', paddingVertical: 18, borderRadius: 15, alignItems: 'center' },
    stopButtonText: { color: '#4A5568', fontSize: 18, fontWeight: 'bold' },
});