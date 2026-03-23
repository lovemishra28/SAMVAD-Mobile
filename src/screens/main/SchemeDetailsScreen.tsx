import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { CheckCircle2, FileText, ArrowLeft } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import HeroContainer from '../../components/HeroContainer';
import { mobileApi } from '../../api/client';

type SchemeData = {
  id?: string;
  title: string;
  desc?: string;
  schemeId?: string;
  deadline?: string;
  eligibility?: string;
  benefit_type?: string;
  isApplied?: boolean;
  appliedAt?: string;
};

const SchemeDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [applied, setApplied] = useState(!!route.params?.scheme?.isApplied);

  const scheme: SchemeData = route.params?.scheme ?? { title: 'Scheme Details' };

  useFocusEffect(
    useCallback(() => {
      const checkAppliedStatus = async () => {
        if (!scheme.schemeId) {
          return;
        }

        setLoadingStatus(true);
        try {
          const res = await mobileApi.getSchemeAppliedStatus(scheme.schemeId);
          setApplied(!!res?.isApplied);
        } catch {
          setApplied(!!scheme.isApplied);
        } finally {
          setLoadingStatus(false);
        }
      };

      checkAppliedStatus();
    }, [scheme.schemeId, scheme.isApplied])
  );

  const handleApplyNavigation = async () => {
    if (!scheme.schemeId) {
      Alert.alert('Unavailable', 'This scheme currently does not support direct apply.');
      navigation.navigate('MainApp', { screen: 'Applications' });
      return;
    }

    navigation.navigate('SchemeApplyForm', { scheme });
  };

  // Parse eligibility string into bullet points
  const eligibilityItems = scheme.eligibility
    ? scheme.eligibility.split(/[;,.]/).filter(e => e.trim()).map(e => e.trim())
    : ['Applicant should meet notified criteria', 'Applicant should provide valid documents', 'Final eligibility is subject to verification'];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <ArrowLeft size={20} color={theme.colors.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{scheme.title}</Text>
        {scheme.benefit_type && (
          <Text style={styles.headerSubtitle}>{scheme.benefit_type}</Text>
        )}
      </View>

      <HeroContainer>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {scheme.benefit_type && (
            <View style={styles.card}>
              <View style={styles.sectionTitleRow}>
                <View style={styles.iconCircle}>
                  <CheckCircle2 size={16} color={theme.colors.success} />
                </View>
                <Text style={styles.sectionTitle}>Benefit</Text>
              </View>
              <Text style={styles.sectionBody}>{scheme.benefit_type}</Text>
            </View>
          )}

          {scheme.desc && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>About This Scheme</Text>
              <Text style={styles.sectionBody}>{scheme.desc}</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
            {eligibilityItems.map(item => (
              <View key={item} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>

          {scheme.deadline && (
            <View style={styles.card}>
              <View style={styles.sectionTitleRow}>
                <FileText size={16} color="#5046B5" />
                <Text style={styles.sectionTitle}>Important Dates</Text>
              </View>
              <Text style={styles.sectionBody}>Deadline: {scheme.deadline}</Text>
            </View>
          )}

          {loadingStatus ? (
            <View style={styles.loadingStatusWrap}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
            </View>
          ) : applied ? (
            <View style={styles.alreadyAppliedWrap}>
              <Text style={styles.alreadyAppliedText}>Already Applied</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.applyButton}
              activeOpacity={0.85}
              onPress={handleApplyNavigation}
            >
              <Text style={styles.applyButtonText}>Apply for This Scheme</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </HeroContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { backgroundColor: theme.colors.primary, paddingHorizontal: theme.spacing.m, paddingTop: theme.spacing.xl, paddingBottom: theme.spacing.l },
  backButton: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.18)', marginBottom: theme.spacing.s },
  headerTitle: { color: theme.colors.white, fontSize: 28, fontWeight: '800', lineHeight: 34 },
  headerSubtitle: { marginTop: 4, color: 'rgba(255,255,255,0.92)', fontSize: 18, fontWeight: '600' },
  content: { gap: theme.spacing.m, paddingBottom: theme.spacing.xl },
  card: { backgroundColor: theme.colors.white, borderRadius: theme.borderRadius.lg, padding: theme.spacing.m, borderWidth: 1, borderColor: '#EBEDF7', ...theme.shadows.card },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  iconCircle: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#CFF6DD' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0C1533', marginBottom: 8 },
  sectionBody: { fontSize: 14, color: '#2E3550', lineHeight: 24 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  bullet: { fontSize: 16, color: theme.colors.primary, marginRight: 8, lineHeight: 22 },
  bulletText: { flex: 1, fontSize: 15, color: '#2E3550', lineHeight: 22 },
  loadingStatusWrap: { minHeight: 44, alignItems: 'center', justifyContent: 'center', marginTop: theme.spacing.s },
  alreadyAppliedWrap: { minHeight: 44, borderRadius: theme.borderRadius.md, alignItems: 'center', justifyContent: 'center', marginTop: theme.spacing.s, backgroundColor: theme.colors.badgeSuccessBg, borderWidth: 1, borderColor: '#BFE7CD' },
  alreadyAppliedText: { color: theme.colors.success, fontSize: 16, fontWeight: '700' },
  applyButton: { backgroundColor: '#0898BB', minHeight: 44, borderRadius: theme.borderRadius.md, alignItems: 'center', justifyContent: 'center', marginTop: theme.spacing.s, ...theme.shadows.button },
  applyButtonText: { color: theme.colors.white, fontSize: 20, fontWeight: '700' },
});

export default SchemeDetailsScreen;
