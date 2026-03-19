import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { ChevronRight, CheckCircle, Clock } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import SegmentedTabContainer from '../../components/SegmentedTabContainer';

const ApplicationsScreen = () => {
  const [activeTab, setActiveTab] = useState('Applied');

  const appliedItems = [
    { id: '1', title: 'PM Vidya Yojna', date: '15 March 2026', status: 'Applied' },
    { id: '2', title: 'Ladli Behna Yojna', date: '12 March 2026', status: 'Applied' },
  ];

  const pendingItems = [
    { id: '3', title: 'Kisan Samman Nidhi', date: '10 March 2026', status: 'Pending' },
  ];

  const items = activeTab === 'Applied' ? appliedItems : pendingItems;

  const ApplicationCard = ({ item }: { item: any }) => {
    const isApplied = item.status === 'Applied';
    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <View style={styles.cardLeft}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: isApplied ? theme.colors.badgeSuccessBg : theme.colors.badgeWarningBg },
            ]}
          >
            {isApplied ? (
              <CheckCircle size={20} color={theme.colors.success} />
            ) : (
              <Clock size={20} color={theme.colors.warning} />
            )}
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDate}>{item.date}</Text>
          </View>
        </View>

        <View style={styles.cardRight}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isApplied ? theme.colors.badgeSuccessBg : theme.colors.badgeWarningBg },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: isApplied ? theme.colors.success : theme.colors.warning },
              ]}
            >
              {item.status}
            </Text>
          </View>
          <ChevronRight size={18} color={theme.colors.textSecondary} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.background} barStyle="dark-content" />

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Applications</Text>
      </View>

      {/* Tab toggle */}
      <SegmentedTabContainer
        tabs={['Applied', 'Pending']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {items.length > 0 ? (
          items.map(item => <ApplicationCard key={item.id} item={item} />)
        ) : (
          <View style={styles.emptyState}>
            <Clock size={48} color={theme.colors.border} />
            <Text style={styles.emptyTitle}>No {activeTab} Applications</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'Applied'
                ? 'You haven\'t applied to any schemes yet.'
                : 'All your applications are up to date!'}
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
  headerContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 84,
    marginBottom: theme.spacing.m,
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: 0.2,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.card,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  cardDate: {
    ...theme.typography.caption,
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: theme.spacing.xxl * 2,
  },
  emptyTitle: {
    ...theme.typography.subHeader,
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.xs,
  },
  emptySubtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
});

export default ApplicationsScreen;
