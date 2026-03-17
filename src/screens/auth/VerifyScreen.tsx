import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

const VerifyScreen = ({ navigation }: { navigation: any }) => {
  const [otp, setOtp] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SAMVAD</Text>
      <Text style={styles.subtitle}>Enter OTP to Verify</Text>
      
      <TextInput
        style={styles.input}
        placeholder='Enter 4-digit OTP'
        keyboardType='number-pad'
        maxLength={4}
        value={otp}
        onChangeText={setOtp}
        placeholderTextColor={theme.colors.textSecondary}
        textAlign='center'
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
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
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.m,
    fontSize: 20,
    letterSpacing: 8,
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

export default VerifyScreen;
