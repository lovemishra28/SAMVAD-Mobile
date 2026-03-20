import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CheckCircle2, FileText, ArrowLeft } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import HeroContainer from '../../components/HeroContainer';

type SchemeData = {
  id?: string;
  title: string;
  desc?: string;
  amount?: string;
  deadline?: string;
};

type SchemeDetails = {
  subtitle: string;
  benefit: string;
  about: string;
  eligibility: string[];
  documents: string[];
};

const detailsByTitle: Record<string, SchemeDetails> = {
  'Kisan Samman Nidhi': {
    subtitle: 'Farmer Welfare',
    benefit: '₹6,000 per year in 3 equal installments of ₹2,000 each',
    about:
      'Direct income support to all landholding farmers to supplement their financial needs for agriculture and allied activities as well as domestic needs.',
    eligibility: [
      'All landholding farmers families',
      'Small and marginal farmers with landholding up to 2 hectares',
      'The benefit will be transferred directly to bank accounts',
    ],
    documents: ['Aadhaar Card', 'Bank Account Details (Passbook)', 'Land Ownership Documents'],
  },
  'PM Vidya Yojna': {
    subtitle: 'Education Support',
    benefit: '₹2,000 per month scholarship for eligible students',
    about:
      'This scheme provides financial assistance to students from eligible families to support school and higher education expenses.',
    eligibility: [
      'Student must be enrolled in recognized institution',
      'Family income should be within notified limits',
      'Applicant should have valid identity and bank account',
    ],
    documents: ['Aadhaar Card', 'Latest Marksheet', 'Bonafide Certificate', 'Bank Account Details'],
  },
  'Ladli Behna Yojna': {
    subtitle: 'Women Empowerment',
    benefit: '₹1,250 per month direct financial support',
    about:
      'The scheme focuses on improving financial independence of eligible women through direct benefit transfer support.',
    eligibility: [
      'Woman applicant must satisfy state age criteria',
      'Applicant should belong to eligible household category',
      'Applicant must have active bank account linked to Aadhaar',
    ],
    documents: ['Aadhaar Card', 'Residence Proof', 'Income Certificate', 'Bank Account Details'],
  },
};

const fallbackDetails: SchemeDetails = {
  subtitle: 'Government Welfare Scheme',
  benefit: 'Benefits are provided as per official scheme rules.',
  about:
    'Detailed information for this scheme is updated periodically by the concerned department.',
  eligibility: [
    'Applicant should meet notified criteria',
    'Applicant should provide valid documents',
    'Final eligibility is subject to verification',
  ],
  documents: ['Identity Proof', 'Address Proof', 'Bank Account Details'],
};

const SchemeDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const scheme: SchemeData = route.params?.scheme ?? { title: 'Scheme Details' };
  const details = detailsByTitle[scheme.title] ?? fallbackDetails;

  const handleApplyPress = () => {
    navigation.navigate('MainApp', { screen: 'Applications' });
  };

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
        <Text style={styles.headerSubtitle}>{details.subtitle}</Text>
      </View>

      <HeroContainer>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.iconCircle}>
                <CheckCircle2 size={16} color={theme.colors.success} />
              </View>
              <Text style={styles.sectionTitle}>Benefit</Text>
            </View>
            <Text style={styles.sectionBody}>{details.benefit}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>About This Scheme</Text>
            <Text style={styles.sectionBody}>{details.about}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
            {details.eligibility.map(item => (
              <View key={item} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <View style={styles.sectionTitleRow}>
              <FileText size={16} color="#5046B5" />
              <Text style={styles.sectionTitle}>Required Documents</Text>
            </View>
            {details.documents.map(item => (
              <View key={item} style={styles.bulletRow}>
                <Text style={[styles.bullet, styles.docBullet]}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.applyButton}
            activeOpacity={0.85}
            onPress={handleApplyPress}
          >
            <Text style={styles.applyButtonText}>Apply for This Scheme</Text>
          </TouchableOpacity>
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
  header: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.l,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginBottom: theme.spacing.s,
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 38,
  },
  headerSubtitle: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.92)',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    gap: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: '#EBEDF7',
    ...theme.shadows.card,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CFF6DD',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0C1533',
    marginBottom: 8,
  },
  sectionBody: {
    fontSize: 14,
    color: '#2E3550',
    lineHeight: 24,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: theme.colors.primary,
    marginRight: 8,
    lineHeight: 22,
  },
  docBullet: {
    color: '#5046B5',
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: '#2E3550',
    lineHeight: 22,
  },
  applyButton: {
    backgroundColor: '#0898BB',
    minHeight: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.s,
    ...theme.shadows.button,
  },
  applyButtonText: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
});

export default SchemeDetailsScreen;
