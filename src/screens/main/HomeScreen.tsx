import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Bell, ArrowRight, TrendingUp, ClipboardList, Clock } from 'lucide-react-native';
import { theme } from '../../theme/theme';

const HomeScreen = () => {
  // Quick stat data
  const stats = [
    { icon: TrendingUp, label: 'Active Schemes', value: '12', color: theme.colors.primary },
    { icon: ClipboardList, label: 'Applied', value: '2', color: theme.colors.success },
    { icon: Clock, label: 'Pending', value: '0', color: theme.colors.warning },
  ];

  // Mock scheme recommendations
  const recommendations = [
    { id: '1', title: 'PM Vidya Yojna', benefit: '₹2,000/month', deadline: '30 Mar 2026' },
    { id: '2', title: 'Ladli Behna Yojna', benefit: '₹1,250/month', deadline: '15 Apr 2026' },
    { id: '3', title: 'Kisan Samman Nidhi', benefit: '₹6,000/year', deadline: '01 May 2026' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

      {/* Header bar */}
      <View style={styles.headerBar}>
        <View>
          <Text style={styles.headerBrand}>SAMVAD</Text>
        </View>
        <TouchableOpacity style={styles.bellContainer}>
          <Bell size={22} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        {/* Quick Stats Row */}
        <View style={styles.statsRow}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { borderTopColor: stat.color }]}>
              <stat.icon size={20} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Recommendations */}
        <Text style={styles.sectionTitle}>Recommended for You</Text>

        {recommendations.map(scheme => (
          <TouchableOpacity key={scheme.id} style={styles.schemeCard} activeOpacity={0.7}>
            <View style={styles.schemeCardTop}>
              <Text style={styles.schemeName}>{scheme.title}</Text>
              <View style={styles.benefitBadge}>
                <Text style={styles.benefitText}>{scheme.benefit}</Text>
              </View>
            </View>
            <View style={styles.schemeCardBottom}>
              <Text style={styles.deadlineText}>Deadline: {scheme.deadline}</Text>
              <View style={styles.applyLink}>
                <Text style={styles.applyLinkText}>View & Apply</Text>
                <ArrowRight size={14} color={theme.colors.primary} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerBar: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.l,
  },
  headerBrand: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.white,
    letterSpacing: 2,
  },
  headerGreeting: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  bellContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    padding: theme.spacing.m,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.l,
    marginTop: theme.spacing.s,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.m,
    alignItems: 'center',
    borderTopWidth: 3,
    ...theme.shadows.card,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.micro,
    marginTop: 2,
    textAlign: 'center',
  },
  sectionTitle: {
    ...theme.typography.subHeader,
    marginBottom: theme.spacing.m,
  },
  schemeCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.card,
  },
  schemeCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.m,
  },
  schemeName: {
    ...theme.typography.subHeader,
    flex: 1,
    marginRight: theme.spacing.s,
  },
  benefitBadge: {
    backgroundColor: theme.colors.badgeSuccessBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  benefitText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.success,
  },
  schemeCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadlineText: {
    ...theme.typography.caption,
  },
  applyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  applyLinkText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default HomeScreen;
