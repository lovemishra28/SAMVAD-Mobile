import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { Phone } from 'lucide-react-native';
import { theme } from '../../theme/theme';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [mobile, setMobile] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
    >
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

      {/* Top branded header */}
      <View style={styles.header}>
        <View style={styles.headerEmblem}>
          <Text style={styles.headerEmblemText}>S</Text>
        </View>
        <Text style={styles.headerTitle}>SAMVAD</Text>
        <Text style={styles.headerSubtitle}>Citizen Services Portal</Text>
      </View>

      {/* Bottom white card */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>Login to your account</Text>
        <Text style={styles.cardCaption}>Enter your registered mobile number</Text>

        {/* Phone input row */}
        <View style={styles.inputRow}>
          <View style={styles.prefixContainer}>
            <Phone size={18} color={theme.colors.primary} />
            <Text style={styles.prefixText}>+91</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, !mobile && styles.buttonDisabled]}
          onPress={() => navigation.navigate('Verify')}
          disabled={!mobile}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        <Text style={styles.privacyText}>
          By continuing, you agree to our Terms of Service & Privacy Policy
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  header: {
    flex: 4,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
  },
  headerEmblem: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  headerEmblemText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.white,
    letterSpacing: 3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: theme.spacing.xs,
  },
  card: {
    flex: 6,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.xl,
  },
  cardHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  cardCaption: {
    ...theme.typography.label,
    marginBottom: theme.spacing.l,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.l,
    backgroundColor: theme.colors.background,
    overflow: 'hidden',
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    height: 52,
  },
  prefixText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.s,
  },
  input: {
    flex: 1,
    height: 52,
    paddingHorizontal: theme.spacing.m,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 52,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.button,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  privacyText: {
    ...theme.typography.micro,
    textAlign: 'center',
    marginTop: theme.spacing.l,
    lineHeight: 16,
  },
});

export default LoginScreen;
