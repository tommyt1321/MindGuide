import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import our newly separated screens!
import WelcomeScreen from './src/screens/WelcomeScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import DepressionScreen from './src/screens/DepressionScreen';
import BreathingScreen from './src/screens/BreathingScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}