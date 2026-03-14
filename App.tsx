import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import our newly separated screens!
import WelcomeScreen from './src/screens/WelcomeScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import DepressionScreen from './src/screens/DepressionScreen';
import BreathingScreen from './src/screens/BreathingScreen';
import AnxietyScreen from './src/screens/AnxietyScreen';
import AngerScreen from './src/screens/AngerScreen';
import ParanoiaScreen from './src/screens/ParanoiaScreen';
import HyperactivityScreen from './src/screens/HyperactiveScreen';
import StressScreen from './src/screens/StressScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ title: 'Support Categories' }}
        />
        <Stack.Screen
          name="Depression"
          component={DepressionScreen}
          options={{ title: 'Depression Support' }}
        />
        <Stack.Screen
          name="Breathing"
          component={BreathingScreen}
          options={{ title: 'Breathe', headerStyle: { backgroundColor: '#1A202C' }, headerTintColor: '#fff' }}
        />
        <Stack.Screen
          name="Anxiety"
          component={AnxietyScreen}
          options={{ title: 'Anxiety Relief' }}
        />
        <Stack.Screen
          name="Anger"
          component={AngerScreen}
          options={{ title: 'Release Anger' }}
        />
        <Stack.Screen name="Paranoia" component={ParanoiaScreen} options={{ title: 'Reality Check' }} />
        <Stack.Screen name="Hyperactivity" component={HyperactivityScreen} options={{ title: 'Focus Energy' }} />
        <Stack.Screen name="Stress" component={StressScreen} options={{ title: 'Relieve Stress' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}