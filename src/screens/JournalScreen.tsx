import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

// --- CLEAN IMPORTS ---
import { StorageUtils } from '../utils/storage';
import { JournalEntry } from '../types';

export default function JournalScreen() {
    const [savedPin, setSavedPin] = useState<string | null>(null);
    const [inputPin, setInputPin] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);

    const [note, setNote] = useState('');
    const [entries, setEntries] = useState<JournalEntry[]>([]);

    useEffect(() => {
        loadVaultData();
    }, []);

    const loadVaultData = async () => {
        // Look how clean this is now!
        const storedPin = await StorageUtils.getPin();
        if (storedPin) setSavedPin(storedPin);

        const storedEntries = await StorageUtils.getJournalEntries();
        setEntries(storedEntries);
    };

    const handlePinSubmit = async () => {
        if (!savedPin) {
            if (inputPin.length === 4) {
                await StorageUtils.savePin(inputPin); // Clean save
                setSavedPin(inputPin);
                setIsUnlocked(true);
                setInputPin('');
                Alert.alert("Vault Secured", "Your private journal is now locked with this PIN.");
            } else {
                Alert.alert("Error", "PIN must be exactly 4 digits.");
            }
        } else {
            if (inputPin === savedPin) {
                setIsUnlocked(true);
                setInputPin('');
            } else {
                Alert.alert("Access Denied", "Incorrect PIN.");
                setInputPin('');
            }
        }
    };

    const addEntry = async () => {
        if (note.trim().length === 0) return;

        const newEntry: JournalEntry = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            mood: '💭',
            text: note
        };

        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        setNote('');

        await StorageUtils.saveJournalEntries(updatedEntries); // Clean save
    };

    const lockVault = () => setIsUnlocked(false);

    if (!isUnlocked) {
        return (
            <View style={styles.lockContainer}>
                <Text style={styles.lockIcon}>🔒</Text>
                <Text style={styles.lockTitle}>
                    {savedPin ? "Enter PIN to Unlock" : "Create a 4-Digit PIN"}
                </Text>
                <Text style={styles.lockSubtitle}>
                    {savedPin ? "Your thoughts are secured." : "Secure your private thoughts."}
                </Text>
                <TextInput
                    style={styles.pinInput} keyboardType="number-pad" secureTextEntry maxLength={4}
                    value={inputPin} onChangeText={setInputPin} placeholder="••••" placeholderTextColor="#A0AEC0"
                />
                <TouchableOpacity style={styles.unlockButton} onPress={handlePinSubmit}>
                    <Text style={styles.unlockButtonText}>{savedPin ? "Unlock Vault" : "Set PIN"}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.journalHeader}>
                <Text style={styles.title}>Thought Vault</Text>
                <TouchableOpacity style={styles.lockBtn} onPress={lockVault}>
                    <Text style={styles.lockBtnText}>Lock 🔒</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input} placeholder="What's on your mind today?" placeholderTextColor="#A0AEC0"
                    multiline value={note} onChangeText={setNote}
                />
                <TouchableOpacity style={styles.saveButton} onPress={addEntry}>
                    <Text style={styles.saveButtonText}>Save Securely</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.historyTitle}>Previous Reflections</Text>
            {entries.length === 0 ? (
                <Text style={styles.emptyText}>Your vault is empty. Write your first thought above.</Text>
            ) : (
                <FlatList
                    data={entries}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.entryCard}>
                            <View style={styles.entryHeader}>
                                <Text style={styles.entryDate}>{item.date}</Text>
                                <Text style={styles.entryMood}>{item.mood}</Text>
                            </View>
                            <Text style={styles.entryText}>{item.text}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    lockContainer: { flex: 1, backgroundColor: '#1A202C', justifyContent: 'center', alignItems: 'center', padding: 20 },
    lockIcon: { fontSize: 60, marginBottom: 20 },
    lockTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 10 },
    lockSubtitle: { fontSize: 16, color: '#A0AEC0', marginBottom: 40 },
    pinInput: { backgroundColor: '#2D3748', color: '#FFF', fontSize: 32, letterSpacing: 20, textAlign: 'center', width: '60%', borderRadius: 15, paddingVertical: 15, marginBottom: 30 },
    unlockButton: { backgroundColor: '#4A90E2', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, elevation: 5 },
    unlockButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20, paddingTop: 50 },
    journalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#2D3748' },
    lockBtn: { backgroundColor: '#E2E8F0', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
    lockBtnText: { color: '#4A5568', fontWeight: 'bold' },
    inputArea: { backgroundColor: '#FFF', padding: 15, borderRadius: 15, elevation: 3, marginBottom: 30 },
    input: { fontSize: 16, color: '#4A5568', minHeight: 80, textAlignVertical: 'top' },
    saveButton: { backgroundColor: '#4A90E2', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    saveButtonText: { color: '#FFF', fontWeight: 'bold' },
    historyTitle: { fontSize: 18, fontWeight: 'bold', color: '#718096', marginBottom: 15 },
    emptyText: { color: '#A0AEC0', fontStyle: 'italic', textAlign: 'center', marginTop: 20 },
    entryCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 12, borderLeftWidth: 5, borderLeftColor: '#CBD5E0' },
    entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    entryDate: { fontSize: 12, fontWeight: 'bold', color: '#A0AEC0' },
    entryMood: { fontSize: 18 },
    entryText: { fontSize: 15, color: '#4A5568', lineHeight: 22 },
});