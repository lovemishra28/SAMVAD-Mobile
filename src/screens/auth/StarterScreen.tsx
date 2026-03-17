import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

const StarterScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Starter Screen</Text>
      {/* We will add the actual UI later. For now, this button tests navigation */}
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    ...theme.typography.header,
    marginBottom: theme.spacing.m,
  },
});

export default StarterScreen;
