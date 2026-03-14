import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.avatarCircle}>
                <Text style={styles.avatarEmoji}>👤</Text>
            </View>
            <Text style={styles.userName}>MindGuide User</Text>

            {/* Stats Row */}
            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statNum}>12</Text>
                    <Text style={styles.statLabel}>Check-ins</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNum}>4</Text>
                    <Text style={styles.statLabel}>Day Streak</Text>
                </View>
            </View>

            {/* Settings/Info */}
            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>My Safe Space Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Privacy & Encryption</Text>
                </TouchableOpacity>
            </View>

            {/* SOS SECTION */}
            <TouchableOpacity style={styles.sosButton}>
                <Text style={styles.sosTitle}>EMERGENCY SOS</Text>
                <Text style={styles.sosSub}>Call for immediate help</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20, paddingTop: 60 },
    avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E2E8F0', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    avatarEmoji: { fontSize: 50 },
    userName: { fontSize: 22, fontWeight: 'bold', color: '#2D3748', textAlign: 'center', marginBottom: 30 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    statBox: { backgroundColor: '#FFF', width: '45%', padding: 20, borderRadius: 15, alignItems: 'center', elevation: 2 },
    statNum: { fontSize: 24, fontWeight: 'bold', color: '#4A90E2' },
    statLabel: { fontSize: 14, color: '#718096' },
    menu: { backgroundColor: '#FFF', borderRadius: 15, padding: 5, marginBottom: 30 },
    menuItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#F7FAFC' },
    menuText: { fontSize: 16, color: '#4A5568' },
    sosButton: { backgroundColor: '#FED7D7', padding: 20, borderRadius: 15, borderContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FC8181' },
    sosTitle: { color: '#C53030', fontWeight: '900', fontSize: 18 },
    sosSub: { color: '#C53030', fontSize: 12, marginTop: 5 }
});