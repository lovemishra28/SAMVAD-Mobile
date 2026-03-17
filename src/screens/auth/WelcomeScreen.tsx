import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME!</Text>
      <Text style={styles.subtitle}>Ramesh Ji</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('MainApp')}
      >
        <Text style={styles.buttonText}>Continue to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.header,
    fontSize: 40,
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    ...theme.typography.subHeader,
    fontSize: 24,
    marginBottom: theme.spacing.xl,
    color: theme.colors.textSecondary,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: theme.spacing.xl,
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default WelcomeScreen;
