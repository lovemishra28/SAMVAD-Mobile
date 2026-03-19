import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Bell, ArrowRight, TrendingUp, ClipboardList, Clock, MessageCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/theme';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  // Quick stat data
  const stats = [
    { icon: TrendingUp, label: 'Active Schemes', value: '12', color: theme.colors.primary },
    { icon: ClipboardList, label: 'Applied', value: '2', color: theme.colors.success },
    { icon: Clock, label: 'Pending', value: '0', color: theme.colors.warning },
  ];

  // Mock scheme recommendations
  const recommendations = [
    { id: '1', title: 'PM Vidya Yojna', benefit: '₹2,000/month', daysLeft: 5, deadline: '30 Mar 2026', badge: 'Trending', badgeColor: '#f7dcca', badgeBg:  '#f28d4a'},
    { id: '2', title: 'Ladli Behna Yojana', benefit: '₹1,250/month', daysLeft: 19, deadline: '15 Apr 2026', badge: 'NEW', badgeColor:'#E1FCE0'  , badgeBg: '#51CF66'},
    { id: '3', title: 'Kisan Samman Nidhi', benefit: '₹6,000/year', daysLeft: 35, deadline: '01 May 2026', badge: 'Closing Soon', badgeColor: '#FFE8CC', badgeBg: '#FF9F43' },
  ];

  const handleHelpPress = () => {
    console.log('Help button pressed');
    // Add navigation or modal logic here
  };

  const handleOpenScheme = (scheme: any) => {
    const normalizedScheme =
      scheme.title === 'Ladli Behna Yojana' ? { ...scheme, title: 'Ladli Behna Yojna' } : scheme;

    navigation.navigate('SchemeDetails', { scheme: normalizedScheme });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

      {/* Header bar */}
      <View style={styles.headerBar}>
        <View style={styles.headerSideSpacer} />
        <View style={styles.headerCenterContent}>
          <Text style={styles.headerWelcome}>WELCOME!</Text>
          <Text style={styles.headerName}>Ramesh Ji</Text>
        </View>
        <TouchableOpacity style={styles.bellContainer}>
          <Bell size={22} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        {/* Quick Stats Row */}
        <View style={styles.statsRow}>
          {stats.map(stat => (
            <View key={stat.label} style={[styles.statCard, { borderTopColor: stat.color }]}>
              <View style={[styles.statIconWrap, { backgroundColor: `${stat.color}1A` }]}>
                <stat.icon size={18} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Recommendations */}
        <Text style={styles.sectionTitle}>Recommended for You</Text>

        {recommendations.map(scheme => (
          <View
            key={scheme.id}
            style={styles.schemeCard}
          >
            <View style={styles.schemeTopRow}>
              <View style={[styles.badgeChip, { backgroundColor: scheme.badgeBg }]}>
                <Text style={[styles.badgeText, { color: scheme.badgeColor }]}>{scheme.badge}</Text>
              </View>
              <View style={styles.benefitBadge}>
                <Text style={styles.benefitText}>{scheme.benefit}</Text>
              </View>
            </View>

            <Text style={styles.schemeName}>{scheme.title}</Text>

            <View style={styles.schemeCardBottom}>
              <View style={styles.deadlineWrap}>
                <Clock size={13} color={theme.colors.textSecondary} />
                <Text style={styles.daysLeftText}>{scheme.daysLeft} days left</Text>
                <Text style={styles.dotText}>•</Text>
                <Text style={styles.deadlineText}>Deadline:</Text>
                <Text style={styles.deadlineDateText}>{scheme.deadline}</Text>
              </View>
              <TouchableOpacity
                style={styles.applyLink}
                activeOpacity={0.75}
                onPress={() => handleOpenScheme(scheme)}
              >
                <Text style={styles.applyLinkText}>View & Apply</Text>
                <ArrowRight size={14} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      </ScrollView>

      <TouchableOpacity style={styles.helpButton} activeOpacity={0.85} onPress={handleHelpPress}>
        <MessageCircle size={20} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 96,
  },
  headerBar: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.l,
    paddingBottom: theme.spacing.xl,
  },
  headerCenterContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWelcome: {
    fontSize: 30,
    fontWeight: '800',
    color: theme.colors.white,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  headerName: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.92)',
    marginTop: 2,
    textAlign: 'center',
  },
  headerSideSpacer: {
    width: 44,
    height: 44,
  },
  bellContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    padding: theme.spacing.m,
    marginTop: -12,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: theme.colors.background,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.l,
    marginTop: theme.spacing.xs,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    minHeight: 110,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.s,
    alignItems: 'center',
    borderTopWidth: 3,
    borderWidth: 1,
    borderColor: '#E8EAF1',
    ...theme.shadows.card,
  },
  statIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 30,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    lineHeight: 34,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionTitle: {
    ...theme.typography.subHeader,
    marginBottom: theme.spacing.m,
  },
  schemeCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: '#EDEFFA',
    ...theme.shadows.card,
  },
  schemeTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeChip: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  schemeName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 10,
  },
  benefitBadge: {
    backgroundColor: '#E9F8EC',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  benefitText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2B9D5A',
  },
  schemeCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8,
  },
  deadlineWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  daysLeftText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginLeft: 4,
    fontWeight: '600',
  },
  dotText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginHorizontal: 6,
  },
  deadlineText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  deadlineDateText: {
    ...theme.typography.caption,
    color: '#7B8299',
    marginLeft: 4,
  },
  applyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  applyLinkText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  helpButton: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#3E96E8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#245D93',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default HomeScreen;
