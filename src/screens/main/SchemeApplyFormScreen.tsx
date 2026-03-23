import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import { authApi, getCachedUser, mobileApi } from '../../api/client';

type SchemeData = {
  title: string;
  schemeId?: string;
  benefit_type?: string;
};

const SchemeApplyFormScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const scheme: SchemeData = route.params?.scheme ?? { title: 'Scheme' };

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [applicantName, setApplicantName] = useState('');
  const [applicantMobileNumber, setApplicantMobileNumber] = useState('');
  const [applicantAddress, setApplicantAddress] = useState('');
  const [schemeWebsiteLink, setSchemeWebsiteLink] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const me = await authApi.getMe().catch(() => null);
        const user = me?.user || (await getCachedUser());

        if (user) {
          const address = [user.city, user.area_type].filter(Boolean).join(', ');
          setApplicantName(user.name || '');
          setApplicantMobileNumber(user.mobileNumber || '');
          setApplicantAddress(address || '');
        }
      } catch {
        // Keep default empty values; user can still edit.
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const handleSubmit = async () => {
    if (!scheme.schemeId) {
      Alert.alert('Missing Scheme', 'This scheme does not have a valid ID for application.');
      return;
    }

    if (!applicantName.trim() || !applicantMobileNumber.trim()) {
      Alert.alert('Missing Details', 'Please verify your name and mobile number before applying.');
      return;
    }

    setSubmitting(true);
    try {
      await mobileApi.applyForScheme({
        schemeId: scheme.schemeId,
        schemeName: scheme.title,
        comments: comments.trim(),
        applicantName: applicantName.trim(),
        applicantMobileNumber: applicantMobileNumber.trim(),
        applicantAddress: applicantAddress.trim(),
        schemeWebsiteLink: schemeWebsiteLink.trim(),
      });

      Alert.alert('Application Submitted', 'Your application has been registered successfully.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Unable to submit application right now.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderWrap}>
        <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <ArrowLeft size={20} color={theme.colors.white} />
        </TouchableOpacity>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>Apply for this Scheme</Text>
          <Text style={styles.headerSubtitle}>{scheme.title}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Applicant Details</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={applicantName}
            onChangeText={setApplicantName}
            placeholder="Full name"
            placeholderTextColor={theme.colors.textSecondary}
          />

          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            value={applicantMobileNumber}
            onChangeText={setApplicantMobileNumber}
            placeholder="Mobile number"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={applicantAddress}
            onChangeText={setApplicantAddress}
            placeholder="City, Area Type"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Scheme Details</Text>

          <Text style={styles.label}>Scheme Website Link</Text>
          <TextInput
            style={styles.input}
            value={schemeWebsiteLink}
            onChangeText={setSchemeWebsiteLink}
            placeholder="https://example.gov.in/scheme"
            placeholderTextColor={theme.colors.textSecondary}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Additional Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={comments}
            onChangeText={setComments}
            placeholder="Any extra information for this application"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[styles.applyButton, submitting && styles.applyButtonDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.85}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator size="small" color={theme.colors.white} />
          ) : (
            <Text style={styles.applyButtonText}>Apply</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loaderWrap: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.l,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.s,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginTop: 2,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
  headerSubtitle: {
    marginTop: theme.spacing.xs,
    color: 'rgba(255,255,255,0.92)',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.m,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.card,
  },
  sectionTitle: {
    ...theme.typography.subHeader,
    marginBottom: theme.spacing.m,
  },
  label: {
    ...theme.typography.label,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.s,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.s,
    color: theme.colors.textPrimary,
    backgroundColor: '#F9FBFF',
  },
  textArea: {
    minHeight: 100,
  },
  applyButton: {
    minHeight: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.button,
  },
  applyButtonDisabled: {
    opacity: 0.7,
  },
  applyButtonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default SchemeApplyFormScreen;
