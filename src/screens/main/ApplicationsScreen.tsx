import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../theme/theme';

const ApplicationsScreen = () => {
  const [activeTab, setActiveTab] = useState('Applied');

  // Reusable component for Application cards
  const ApplicationCard = ({ title, status, date }: { title: string; status: string; date: string }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={[
          styles.statusBadge, 
          status === 'Applied' ? styles.statusApplied : styles.statusPending
        ]}>
          <Text style={[
            styles.statusText,
            status === 'Applied' ? styles.statusTextApplied : styles.statusTextPending
          ]}>
            {status}
          </Text>
        </View>
      </View>
      <Text style={styles.cardDate}>Applied On: {date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Custom Tab Toggles */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Applied' && styles.activeTabButton]}
          onPress={() => setActiveTab('Applied')}
        >
          <Text style={[styles.tabText, activeTab === 'Applied' && styles.activeTabText]}>
            Applied
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Pending' && styles.activeTabButton]}
          onPress={() => setActiveTab('Pending')}
        >
          <Text style={[styles.tabText, activeTab === 'Pending' && styles.activeTabText]}>
            Pending
          </Text>
        </TouchableOpacity>
      </View>

      {/* List of Applications */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'Applied' ? (
          <>
            <ApplicationCard 
              title="PM Vidya Yojna" 
              status="Applied" 
              date="15 March" 
            />
            <ApplicationCard 
              title="Ladli Behna Yojna" 
              status="Applied" 
              date="12 March" 
            />
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>You have no pending applications.</Text>
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
    alignItems: 'flex-start',
    marginBottom: theme.spacing.m,
  },
  cardTitle: {
    ...theme.typography.subHeader,
    fontWeight: '600' as const,
    flex: 1,
    marginRight: theme.spacing.s,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusApplied: {
    backgroundColor: '#E8F5E9', // Light green background
  },
  statusPending: {
    backgroundColor: '#FFF3E0', // Light orange background
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusTextApplied: {
    color: theme.colors.success,
  },
  statusTextPending: {
    color: '#FF9800', // Orange text
  },
  cardDate: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
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

export default ApplicationsScreen;
