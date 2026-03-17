import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../theme/theme';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Header Area */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>SAMVAD</Text>
        <Text style={styles.headerDate}>28/03</Text>
      </View>

      {/* Recommendations Section */}
      <Text style={styles.sectionTitle}>Recommendations</Text>
      
      {/* Scheme Card */}
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Scheme 1</Text>
          <Text style={styles.cardDate}>28/03</Text>
        </View>
        
        <View style={styles.cardFooter}>
          <Text style={styles.linkText}>View Details/Apply</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.s,
  },
  headerTitle: {
    ...theme.typography.header,
    color: theme.colors.primary,
  },
  headerDate: {
    ...theme.typography.subHeader,
    color: theme.colors.textSecondary,
  },
  sectionTitle: {
    ...theme.typography.subHeader,
    marginBottom: theme.spacing.m,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  cardTitle: {
    ...theme.typography.subHeader,
  },
  cardDate: {
    ...theme.typography.caption,
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  linkText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 14,
  }
});

export default HomeScreen;
