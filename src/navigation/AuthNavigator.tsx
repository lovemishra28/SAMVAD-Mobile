import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StarterScreen from '../screens/auth/StarterScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import VerifyScreen from '../screens/auth/VerifyScreen';
import MainTabNavigator from './MainTabNavigator';
import SchemeDetailsScreen from '../screens/main/SchemeDetailsScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Starter"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Starter" component={StarterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
      <Stack.Screen name="MainApp" component={MainTabNavigator} />
      <Stack.Screen name="SchemeDetails" component={SchemeDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
