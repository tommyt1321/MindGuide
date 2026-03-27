// src/components/HeaderBar.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, BackHandler } from 'react-native';

interface HeaderBarProps {
    title: string;
    showExit?: boolean;
    onBack?: () => void;
}

export default function HeaderBar({ title, showExit = false, onBack }: HeaderBarProps) {
    const handleExit = () => {
        Alert.alert(
            "Wait a moment",
            "Are you sure you want to close MindGuide? Taking a break is fine, we'll be here when you return.",
            [
                { text: "Stay", onPress: () => null, style: "cancel" },
                { text: "Quit", onPress: () => BackHandler.exitApp() }
            ]
        );
    };

    return (
        <View style={styles.headerBar}>
            {onBack && (
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
            )}

            <Text style={styles.headerTitle}>{title}</Text>

            {showExit ? (
                <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
                    <Text style={styles.exitText}>✕</Text>
                </TouchableOpacity>
            ) : (
                <View style={{ width: 40 }} /> // Spacer for balance
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    headerBar: {
        height: 100,
        paddingTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    headerTitle: { fontSize: 22, fontWeight: '900', color: '#2D3748', letterSpacing: 1 },
    exitButton: { padding: 5, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    exitText: { fontSize: 20, color: '#4A5568', fontWeight: 'bold' },
    backButton: { padding: 10, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 20 },
    backText: { fontSize: 16, color: '#2D3748', fontWeight: 'bold' },
});