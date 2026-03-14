import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function BreathingCircle() {
    const circleScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const breathingAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(circleScale, {
                    toValue: 1.5,
                    duration: 4000,
                    useNativeDriver: true,
                }),
                Animated.timing(circleScale, {
                    toValue: 1,
                    duration: 4000,
                    useNativeDriver: true,
                }),
            ])
        );

        breathingAnimation.start();
        return () => breathingAnimation.stop();
    }, [circleScale]);

    return (
        <Animated.View
            style={[styles.circle, { transform: [{ scale: circleScale }] }]}
        />
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#4A90E2',
        opacity: 0.8,
    },
});