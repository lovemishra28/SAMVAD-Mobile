import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, ActivityIndicator } from 'react-native';
import { theme } from '../../theme/theme';
import { getToken, authApi, clearAuth } from '../../api/client';

const StarterScreen = ({ navigation }: { navigation: any }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Fade-in + scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // Check for existing valid session
    const checkSession = async () => {
      try {
        const token = await getToken();
        if (token) {
          // Validate token against server
          const res = await authApi.getMe();
          if (res?.user) {
            // Valid session — skip to main app
            navigation.replace('MainApp');
            return;
          }
        }
      } catch {
        // Token expired or invalid — clear and proceed to login
        await clearAuth();
      }

      setChecking(false);
      // Auto-navigate to Login after brief splash
      setTimeout(() => {
        navigation.replace('Login');
      }, 1200);
    };

    checkSession();
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Logo emblem circle */}
        <View style={styles.emblem}>
          <Text style={styles.emblemText}>S</Text>
        </View>

        <Text style={styles.logoText}>SAMVAD</Text>
        <Text style={styles.tagline}>सम्वाद — आपकी आवाज़, सरकार तक</Text>
      </Animated.View>

      {checking && (
        <ActivityIndicator
          size="small"
          color="rgba(255,255,255,0.7)"
          style={{ position: 'absolute', bottom: 80 }}
        />
      )}

      <Animated.Text style={[styles.footerText, { opacity: fadeAnim }]}>
        Empowering Citizens
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  logoContainer: {
    alignItems: 'center',
  },
  emblem: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  emblemText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  logoText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: theme.colors.white,
    letterSpacing: 4,
    marginBottom: theme.spacing.s,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
  },
  footerText: {
    position: 'absolute',
    bottom: 40,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 1,
  },
});

export default StarterScreen;
