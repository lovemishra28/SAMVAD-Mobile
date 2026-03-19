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
import SegmentedTabContainer from '../../components/SegmentedTabContainer';

const SchemesScreen = () => {
  const [activeTab, setActiveTab] = useState('Current');
  const [searchQuery, setSearchQuery] = useState('');

  const currentSchemes = [
    { id: '1', title: 'PM Vidya Yojna', desc: 'Educational scholarship for students', amount: '2,000/month', deadline: '30 Mar 2026' },
    { id: '2', title: 'Ladli Behna Yojna', desc: 'Financial support for women', amount: '1,250/month', deadline: '15 Apr 2026' },
    { id: '3', title: 'Kisan Samman Nidhi', desc: 'Farmer income support scheme', amount: '6,000/year', deadline: '01 May 2026' },
  ];

  const upcomingSchemes = [
    { id: '4', title: 'Ayushman Bharat', desc: 'Health insurance scheme', amount: '5,00,000', deadline: 'Coming Soon' },
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
        <View style={[styles.chip, styles.deadlineChip]}>
          <Calendar size={12} color={theme.colors.warning} />
          <Text style={styles.deadlineLabel}>Deadline</Text>
          <Text style={styles.deadlineValue}>{scheme.deadline}</Text>
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

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Schemes</Text>
      </View>

      <View style={styles.heroContainer}>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Schemes"
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} activeOpacity={0.8}>
            <Search size={17} color={theme.colors.textPrimary} strokeWidth={2.1} />
          </TouchableOpacity>
        </View>

        {/* Tab toggle */}
        <SegmentedTabContainer
          tabs={['Current', 'Upcoming']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Scheme list */}
        <ScrollView
          style={styles.heroScroll}
          contentContainerStyle={styles.heroScrollContent}
          showsVerticalScrollIndicator={false}
        >
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.m,
  },
  headerContainer: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    marginTop: -theme.spacing.l,
    marginBottom: 0,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.m,
    zIndex: 1, 
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: 40,
    fontWeight: '800',
    lineHeight: 48,
  },
  heroContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: -20,
    marginBottom: 0,
    paddingTop: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    zIndex: 2,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  heroScroll: {
    flex: 1,
  },
  heroScrollContent: {
    paddingBottom: theme.spacing.m,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B7DBE8',
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 7,
    minHeight: 54,
    marginBottom: theme.spacing.m,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
    lineHeight: 20,
    color: theme.colors.textPrimary,
    fontWeight: '500',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  searchButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B7DBE8',
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
  deadlineChip: {
    backgroundColor: '#FFF6EA',
    borderWidth: 1,
    borderColor: '#FFE1B3',
  },
  deadlineLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A56500',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  deadlineValue: {
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
