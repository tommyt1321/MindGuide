import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Alert } from 'react-native';

export default function AngerScreen() {
    // This is the "short-term memory" holding whatever the user types
    const [ventText, setVentText] = useState('');

    // This function runs when they press the release button
    const handleRelease = () => {
        if (ventText.trim() === '') {
            Alert.alert('Empty Journal', 'Try typing what is frustrating you first.');
            return;
        }

        // 1. Erase the text from memory
        setVentText('');
        // 2. Hide the phone keyboard
        Keyboard.dismiss();
        // 3. Give them a reassuring message
        Alert.alert('Released', 'Take a deep breath. You have let it go.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Venting Journal</Text>
            <Text style={styles.subtitle}>
                Type out everything that is making you angry right now. Nobody will see this. When you are ready, tap the button below to destroy it and let it go.
            </Text>

            <TextInput
                style={styles.input}
                multiline={true}
                placeholder="I am so angry because..."
                placeholderTextColor="#A0AEC0"
                value={ventText}
                onChangeText={(text) => setVentText(text)} // Updates memory as they type
                textAlignVertical="top" // Keeps text at the top of the box on Android
            />

            <TouchableOpacity style={styles.releaseButton} onPress={handleRelease}>
                <Text style={styles.buttonText}>Destroy & Let Go</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 10,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#718096',
        lineHeight: 24,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFF',
        flex: 1, // Takes up remaining middle space
        borderRadius: 12,
        padding: 20,
        fontSize: 18,
        color: '#2D3748',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        marginBottom: 20,
    },
    releaseButton: {
        backgroundColor: '#9013FE', // The purple Anger category color
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 30, // Keeps it above the bottom of the screen
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});