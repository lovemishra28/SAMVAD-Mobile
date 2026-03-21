import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { ArrowLeft, FileText, Upload, Search, Bell, Phone, MessageCircle, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import HeroContainer from '../../components/HeroContainer';

const HelpScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedHelp, setSelectedHelp] = useState<string | null>(null);

  const helpItems = [
    { id: 'apply', title: 'Apply for Scheme', icon: FileText },
    { id: 'upload', title: 'Upload Documents', icon: Upload },
    { id: 'eligibility', title: 'Check Eligibility', icon: Search },
    { id: 'notifications', title: 'Notifications', icon: Bell },
  ];

  const getSteps = () => {
    switch (selectedHelp) {
      case 'apply':
        return [
          'Open Schemes section',
          'Select a scheme',
          'Tap "Apply"',
          'Upload documents',
          'Submit application',
        ];
      case 'upload':
        return [
          'Open application page',
          'Tap upload document',
          'Select file or camera',
          'Confirm upload',
        ];
      case 'eligibility':
        return [
          'Go to Schemes',
          'Check recommended section',
          'See eligible schemes',
        ];
      case 'notifications':
        return [
          'Tap bell icon on home',
          'View new scheme alerts',
        ];
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color={theme.colors.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Help & Support</Text>

        <View style={{ width: 22 }} />
      </View>

      <HeroContainer>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* 🔹 QUICK HELP GRID */}
          <View style={styles.grid}>
            {helpItems.map(item => {
              const Icon = item.icon;
              const isActive = selectedHelp === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.gridCard, isActive && styles.activeCard]}
                  onPress={() => setSelectedHelp(item.id)}
                >
                  <Icon size={20} color={theme.colors.primary} />
                  <Text style={styles.gridText}>{item.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* 🔹 STEPS */}
          {selectedHelp && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Steps</Text>

              {getSteps().map((step, index) => (
                <View key={index} style={styles.stepRow}>
                  <View style={styles.stepCircle}>
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          )}

          {/* 🔹 CONTACT SUPPORT */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Contact Support</Text>

            <TouchableOpacity style={styles.supportItem}>
              <MessageCircle size={18} color={theme.colors.primary} />
              <Text style={styles.supportText}>WhatsApp Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.supportItem}>
              <Phone size={18} color={theme.colors.primary} />
              <Text style={styles.supportText}>Call Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.supportItem}>
              <User size={18} color={theme.colors.primary} />
              <Text style={styles.supportText}>Booth Contact</Text>
            </TouchableOpacity>
          </View>

          {/* 🔹 LANGUAGE */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Language</Text>

            <View style={styles.languageRow}>
              <Text style={styles.languageText}>English</Text>
              <Text style={styles.languageDivider}>|</Text>
              <Text style={styles.languageText}>हिंदी</Text>
            </View>
          </View>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.l,
    paddingBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },

  headerTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: '700',
  },

  /* GRID */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: theme.spacing.m,
  },

  gridCard: {
    width: '47%',
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    ...theme.shadows.card,
  },

  activeCard: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },

  gridText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  /* CARD */
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.card,
  },

  cardTitle: {
    ...theme.typography.subHeader,
    marginBottom: theme.spacing.m,
  },

  /* STEPS */
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  stepCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  stepNumber: {
    color: theme.colors.white,
    fontSize: 11,
    fontWeight: '700',
  },

  stepText: {
    fontSize: 13,
    color: theme.colors.textPrimary,
  },

  /* SUPPORT */
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },

  supportText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },

  /* LANGUAGE */
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  languageText: {
    fontSize: 14,
    fontWeight: '600',
  },

  languageDivider: {
    marginHorizontal: 8,
    color: theme.colors.textSecondary,
  },
});

export default HelpScreen;