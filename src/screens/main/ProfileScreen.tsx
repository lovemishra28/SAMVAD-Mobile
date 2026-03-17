import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme/theme';

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {/* Avatar Placeholder */}
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>R</Text>
      </View>
      
      {/* User Info */}
      <Text style={styles.nameText}>Ramesh Kumar</Text>
      <Text style={styles.phoneText}>+91 7668678890</Text>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Edit Profile</Text>
        </TouchableOpacity>
        
        {/* Simple mock logout returning to Starter screen */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.replace('Starter')}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.m,
  },
  avatarText: {
    color: theme.colors.background,
    fontSize: 40,
    fontWeight: 'bold',
  },
  nameText: {
    ...theme.typography.header,
    marginBottom: theme.spacing.xs,
  },
  phoneText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  actionsContainer: {
    width: '100%',
    marginTop: theme.spacing.xl,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  buttonOutlineText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.error,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: theme.colors.error,
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ProfileScreen;
