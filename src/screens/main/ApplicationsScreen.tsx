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
import { Search, ChevronRight } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import SegmentedTabContainer from '../../components/SegmentedTabContainer';
import HeaderContainer from '../../components/HeaderContainer';
import HeroContainer from '../../components/HeroContainer';

const ApplicationsScreen = () => {
  const [activeTab, setActiveTab] = useState('Applied');
  const [searchQuery, setSearchQuery] = useState('');

  const appliedItems = [
    {
      id: '1',
      title: 'PM Vidya Yojna',
      description: 'Educational scholarship for students',
      benefit: '₹2,000/month',
      deadline: '30 Mar 2026',
      date: '15 March 2026',
    },
    {
      id: '2',
      title: 'Ladli Behna Yojna',
      description: 'Financial support for women',
      benefit: '₹1,250/month',
      deadline: '15 Apr 2026',
      date: '12 March 2026',
    },
  ];

  const availableItems = [
    {
      id: '3',
      title: 'Kisan Samman Nidhi',
      description: 'Farmer income support scheme',
      benefit: '₹6,000/year',
      deadline: '01 May 2026',
    },
    {
      id: '4',
      title: 'Solar Pump Yojna',
      description: 'Subsidy for solar irrigation pumps',
      benefit: '₹10,000 subsidy',
      deadline: '20 Apr 2026',
    },
  ];

  const data = activeTab === 'Applied' ? appliedItems : availableItems;

  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const ApplicationCard = ({ item }: { item: any }) => {
    const isApplied = activeTab === 'Applied';

    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.85}>
        <View style={styles.cardTop}>
          <View
            style={[
              styles.tag,
              {
                backgroundColor: isApplied
                  ? theme.colors.badgeSuccessBg
                  : '#E6F6FB',
              },
            ]}
          >
            <Text
              style={[
                styles.tagText,
                {
                  color: isApplied
                    ? theme.colors.success
                    : theme.colors.primary,
                },
              ]}
            >
              {isApplied ? 'Applied' : 'Available'}
            </Text>
          </View>

          <ChevronRight size={18} color={theme.colors.textSecondary} />
        </View>

        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc}>{item.description}</Text>

        {/* SAME CHIP SYSTEM */}
        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{item.benefit}</Text>
          </View>

          <View style={[styles.chip, styles.deadlineChip]}>
            <Text style={styles.deadlineLabel}>Deadline</Text>
            <Text style={styles.deadlineValue}>{item.deadline}</Text>
          </View>
        </View>

        <View style={styles.applyRow}>
          <Text style={styles.applyText}>
            {isApplied ? 'View Details' : 'View & Apply'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

      {/* ✅ SAME HEADER */}
      <HeaderContainer title="Applications" />

      {/* ✅ SAME HERO CONTAINER */}
      <HeroContainer>

        {/* ✅ SAME SEARCH BAR */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Applications"
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} activeOpacity={0.8}>
            <Search size={17} color={theme.colors.textPrimary} strokeWidth={2.1} />
          </TouchableOpacity>
        </View>

        {/* TABS */}
        <SegmentedTabContainer
          tabs={['Applied', 'Available']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* LIST */}
        <ScrollView
          style={styles.heroScroll}
          contentContainerStyle={styles.heroScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filtered.length > 0 ? (
            filtered.map(item => (
              <ApplicationCard key={item.id} item={item} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                {searchQuery
                  ? 'No applications match your search.'
                  : 'No applications available.'}
              </Text>
            </View>
          )}
        </ScrollView>

      </HeroContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  /* MATCHED SCROLL */
  heroScroll: {
    flex: 1,
  },

  heroScrollContent: {
    paddingBottom: theme.spacing.m,
  },

  /* SAME SEARCH BAR */
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
    color: theme.colors.textPrimary,
    fontWeight: '500',
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

  /* CARD */
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.card,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },

  tagText: {
    fontSize: 11,
    fontWeight: '700',
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
  },

  deadlineValue: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },

  applyRow: {
    alignItems: 'flex-end',
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

export default ApplicationsScreen;