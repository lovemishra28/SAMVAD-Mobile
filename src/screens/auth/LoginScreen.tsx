import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../../theme/theme';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [mobile, setMobile] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>SAMVAD</Text>
      <Text style={styles.subtitle}>Enter Your Mobile</Text>
      
      <TextInput
        style={styles.input}
        placeholder='+91 | Mobile Number'
        keyboardType='phone-pad'
        maxLength={10}
        value={mobile}
        onChangeText={setMobile}
        placeholderTextColor={theme.colors.textSecondary}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Verify')}
      >
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.l,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.header,
    fontSize: 32,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  subtitle: {
    ...theme.typography.subHeader,
    marginBottom: theme.spacing.m,
  },
  input: {
    height: 50,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.m,
    fontSize: 16,
    marginBottom: theme.spacing.xl,
    color: theme.colors.textPrimary,
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default LoginScreen;
