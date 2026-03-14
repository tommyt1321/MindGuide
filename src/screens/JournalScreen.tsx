import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function JournalScreen() {
    const [note, setNote] = useState('');

    // Mock data for now (we'll make this "real" in the next stage!)
    const [entries, setEntries] = useState([
        { id: '1', date: 'Oct 24', mood: '🙂', text: 'Had a productive morning and did the box breathing.' },
        { id: '2', date: 'Oct 23', mood: '😕', text: 'Feeling a bit overwhelmed with work today.' },
    ]);

    const addEntry = () => {
        if (note.trim().length === 0) return;
        const newEntry = {
            id: Date.now().toString(),
            date: 'Today',
            mood: '💭',
            text: note
        };
        setEntries([newEntry, ...entries]);
        setNote('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thought Vault</Text>

            {/* Input Section */}
            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="What's on your mind?"
                    placeholderTextColor="#A0AEC0"
                    multiline
                    value={note}
                    onChangeText={setNote}
                />
                <TouchableOpacity style={styles.saveButton} onPress={addEntry}>
                    <Text style={styles.saveButtonText}>Secure Note</Text>
                </TouchableOpacity>
            </View>

            {/* History List */}
            <Text style={styles.historyTitle}>Previous Reflections</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20, paddingTop: 50 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#2D3748', marginBottom: 20 },
    inputArea: { backgroundColor: '#FFF', padding: 15, borderRadius: 15, elevation: 3, marginBottom: 30 },
    input: { fontSize: 16, color: '#4A5568', minHeight: 80, textAlignVertical: 'top' },
    saveButton: { backgroundColor: '#4A90E2', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    saveButtonText: { color: '#FFF', fontWeight: 'bold' },
    historyTitle: { fontSize: 18, fontWeight: 'bold', color: '#718096', marginBottom: 15 },
    entryCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 12, borderLeftWidth: 5, borderLeftColor: '#CBD5E0' },
    entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    entryDate: { fontSize: 12, fontWeight: 'bold', color: '#A0AEC0' },
    entryMood: { fontSize: 18 },
    entryText: { fontSize: 15, color: '#4A5568', lineHeight: 22 },
});