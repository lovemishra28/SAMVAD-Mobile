import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/HomeScreen';
import SchemesScreen from '../screens/main/SchemesScreen';
import ApplicationsScreen from '../screens/main/ApplicationsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { theme } from '../theme/theme';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.background,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'SAMVAD' }} />
      <Tab.Screen name="Schemes" component={SchemesScreen} options={{ title: 'Schemes' }} />
      <Tab.Screen name="Applications" component={ApplicationsScreen} options={{ title: 'Applications' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
