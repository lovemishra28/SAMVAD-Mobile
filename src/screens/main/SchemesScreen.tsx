import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Search, Calendar, IndianRupee, ArrowRight } from 'lucide-react-native';
import { theme } from '../../theme/theme';

const SchemesScreen = () => {
  const [activeTab, setActiveTab] = useState('Current');
  const [searchQuery, setSearchQuery] = useState('');

  const currentSchemes = [
    { id: '1', title: 'PM Vidya Yojna', desc: 'Educational scholarship for students', amount: '₹2,000/month', deadline: '30 Mar 2026' },
    { id: '2', title: 'Ladli Behna Yojna', desc: 'Financial support for women', amount: '₹1,250/month', deadline: '15 Apr 2026' },
    { id: '3', title: 'Kisan Samman Nidhi', desc: 'Farmer income support scheme', amount: '₹6,000/year', deadline: '01 May 2026' },
  ];

  const upcomingSchemes = [
    { id: '4', title: 'Ayushman Bharat', desc: 'Health insurance scheme', amount: '₹5,00,000', deadline: 'Coming Soon' },
  ];

  const schemes = activeTab === 'Current' ? currentSchemes : upcomingSchemes;
  const filtered = schemes.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const SchemeCard = ({ scheme }: { scheme: any }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      {/* Card top */}
      <Text style={styles.cardTitle}>{scheme.title}</Text>
      <Text style={styles.cardDesc}>{scheme.desc}</Text>

      {/* Info chips row */}
      <View style={styles.chipsRow}>
        <View style={styles.chip}>
          <IndianRupee size={12} color={theme.colors.success} />
          <Text style={styles.chipText}>{scheme.amount}</Text>
        </View>
        <View style={styles.chip}>
          <Calendar size={12} color={theme.colors.warning} />
          <Text style={styles.chipText}>{scheme.deadline}</Text>
        </View>
      </View>

      {/* Apply link */}
      <View style={styles.applyRow}>
        <View style={styles.applyLink}>
          <Text style={styles.applyText}>View Details & Apply</Text>
          <ArrowRight size={14} color={theme.colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.background} barStyle="dark-content" />

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Search size={18} color={theme.colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search schemes..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tab toggle */}
      <View style={styles.tabContainer}>
        {['Current', 'Upcoming'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Scheme list */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.length > 0 ? (
          filtered.map(scheme => <SchemeCard key={scheme.id} scheme={scheme} />)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No schemes match your search.' : 'No schemes available right now.'}
            </Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.card,
  },
  searchInput: {
    flex: 1,
    height: 48,
    marginLeft: theme.spacing.s,
    fontSize: 15,
    color: theme.colors.textPrimary,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
    ...theme.shadows.card,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  activeTabButton: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: theme.colors.white,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.card,
  },
  cardTitle: {
    ...theme.typography.subHeader,
    marginBottom: theme.spacing.xs,
  },
  cardDesc: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: theme.spacing.m,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    gap: 4,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  applyRow: {
    alignItems: 'flex-end',
  },
  applyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  applyText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  emptyState: {
    padding: theme.spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default SchemesScreen;
