import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Import all your screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import CategoriesScreen from './src/screens/HomePage';
import DepressionScreen from './src/screens/DepressionScreen';
import AnxietyScreen from './src/screens/AnxietyScreen';
import AngerScreen from './src/screens/AngerScreen';
import ParanoiaScreen from './src/screens/ParanoiaScreen';
import HyperactivityScreen from './src/screens/HyperactiveScreen';
import StressScreen from './src/screens/StressScreen';
import BreathingScreen from './src/screens/BreathingScreen';
import JournalScreen from './src/screens/JournalScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HomePage from './src/screens/HomePage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- NEW: THE BOTTOM TAB MENU ---
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hides the double header
        tabBarActiveTintColor: '#4A90E2', // Blue color when selected
        tabBarInactiveTintColor: '#A0AEC0', // Gray when not selected
        tabBarStyle: { paddingBottom: 5, height: 85 } // Makes it look slightly taller
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{ tabBarIcon: () => <Text style={{ fontSize: 24 }}>🏠</Text> }}
      />
      <Tab.Screen
        name="Journal"
        component={JournalScreen}
        options={{ tabBarIcon: () => <Text style={{ fontSize: 24 }}>📓</Text> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: () => <Text style={{ fontSize: 24 }}>👤</Text> }}
      />
    </Tab.Navigator>
  );
}

// --- THE MAIN APP STRUCTURE ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* The Welcome Screen */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />

        {/* When the user clicks "Start" on Welcome, they go here (which loads the Tabs!) */}
        <Stack.Screen name="Categories" component={MainTabs} options={{ headerShown: false }} />

        {/* The Distraction-Free Exercise Screens */}
        <Stack.Screen name="Depression" component={DepressionScreen} options={{ title: 'Depression Support' }} />
        <Stack.Screen name="Anxiety" component={AnxietyScreen} options={{ title: 'Anxiety Relief' }} />
        <Stack.Screen name="Anger" component={AngerScreen} options={{ title: 'Release Anger' }} />
        <Stack.Screen name="Paranoia" component={ParanoiaScreen} options={{ title: 'Reality Check' }} />
        <Stack.Screen name="Hyperactivity" component={HyperactivityScreen} options={{ title: 'Focus Energy' }} />
        <Stack.Screen name="Stress" component={StressScreen} options={{ title: 'Relieve Stress' }} />
        <Stack.Screen name="Breathing" component={BreathingScreen} options={{ title: 'Breathe', headerStyle: { backgroundColor: '#1A202C' }, headerTintColor: '#fff' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}