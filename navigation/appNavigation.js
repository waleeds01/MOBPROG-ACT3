import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

// Replace this function with your actual authentication logic
const checkAuthentication = () => {

  return false; // Placeholder, replace with actual logic
};

export default function AppNavigation() {
  const isUserAuthenticated = checkAuthentication();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isUserAuthenticated ? (
          <>
            <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
            <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          </>
        ) : (
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}