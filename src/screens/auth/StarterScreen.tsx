import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { theme } from '../../theme/theme';

const StarterScreen = ({ navigation }: { navigation: any }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

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

    // Auto-navigate to Login after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
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
