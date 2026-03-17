import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../theme/theme';

const SchemesScreen = () => {
  const [activeTab, setActiveTab] = useState('Current');
  const [searchQuery, setSearchQuery] = useState('');

  // Reusable component for the scheme cards
  const SchemeCard = ({ title, date, amount }: { title: string; date: string; amount: string }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDate}>{date}</Text>
      </View>
      <Text style={styles.cardAmount}>{amount}</Text>
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>View Details/Apply</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Schemes"
        placeholderTextColor={theme.colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Custom Tab Toggles */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Current' && styles.activeTabButton]}
          onPress={() => setActiveTab('Current')}
        >
          <Text style={[styles.tabText, activeTab === 'Current' && styles.activeTabText]}>
            Current
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Upcoming' && styles.activeTabButton]}
          onPress={() => setActiveTab('Upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'Upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
      </View>

      {/* List of Schemes */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'Current' ? (
          <>
            <SchemeCard title="PM Vidya Yojna" date="03/28" amount="2000/Month" />
            <SchemeCard title="Scheme 1" date="28/03" amount="TBD" />
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No upcoming schemes right now.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
  },
  searchInput: {
    height: 50,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.m,
    fontSize: 16,
    marginBottom: theme.spacing.m,
    color: theme.colors.textPrimary,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    padding: theme.spacing.xs,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: theme.colors.background,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  cardTitle: {
    ...theme.typography.subHeader,
    fontWeight: '600' as const,
  },
  cardDate: {
    ...theme.typography.caption,
  },
  cardAmount: {
    ...theme.typography.body,
    marginBottom: theme.spacing.m,
    color: theme.colors.textSecondary,
  },
  applyButton: {
    alignSelf: 'flex-start',
  },
  applyButtonText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyState: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  }
});

export default SchemesScreen;
