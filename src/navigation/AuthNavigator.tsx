import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StarterScreen from '../screens/auth/StarterScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import VerifyScreen from '../screens/auth/VerifyScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Starter">
      <Stack.Screen name="Starter" component={StarterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'SAMVAD Login' }} />
      <Stack.Screen name="Verify" component={VerifyScreen} options={{ title: 'Verify OTP' }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      {/* Add the Main App tabs here as a screen with no header */}
      <Stack.Screen name="MainApp" component={MainTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
