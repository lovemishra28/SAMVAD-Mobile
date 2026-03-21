import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
} from 'react-native';
import { Star, Send, ArrowLeft, CheckCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import HeroContainer from '../../components/HeroContainer';

const FeedbackScreen = () => {
  const navigation = useNavigation<any>();

  const [selectedType, setSelectedType] = useState('General');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const feedbackTypes = ['General', 'Scheme Issue', 'App Issue', 'Suggestion'];

  const handleSubmit = () => {
    // 👉 Later connect API here

    setShowSuccess(true);

    // reset form
    setMessage('');
    setRating(0);
    setSelectedType('General');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

      {/* 🔙 HEADER WITH BACK */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color={theme.colors.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Feedback</Text>

        <View style={styles.spacer} /> 
      </View>

      <HeroContainer>

        {/* TYPE */}
        <Text style={styles.sectionTitle}>Select Type</Text>
        <View style={styles.chipsRow}>
          {feedbackTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.chip,
                selectedType === type && styles.activeChip,
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedType === type && styles.activeChipText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RATING */}
        <Text style={styles.sectionTitle}>Rate Experience</Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Star
                size={30}
                color={star <= rating ? '#FFD700' : '#D1D5DB'}
                fill={star <= rating ? '#FFD700' : 'none'}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* MESSAGE */}
        <Text style={styles.sectionTitle}>Your Feedback</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Write your feedback..."
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />
        </View>

        {/* SUBMIT */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Send size={18} color={theme.colors.white} />
          <Text style={styles.submitText}>Submit Feedback</Text>
        </TouchableOpacity>

      </HeroContainer>

      {/* ✅ SUCCESS MODAL */}
      <Modal transparent visible={showSuccess} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <CheckCircle size={50} color="#2B9D5A" />

            <Text style={styles.modalTitle}>Thank You!</Text>
            <Text style={styles.modalText}>
              Your feedback has been submitted successfully.
            </Text>

            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setShowSuccess(false)}
            >
              <Text style={styles.modalBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  /* HEADER */
  header: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.l,
    paddingBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },

  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  spacer: {
    width: 40,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.white,
  },

  sectionTitle: {
    ...theme.typography.subHeader,
    marginBottom: theme.spacing.s,
    marginTop: theme.spacing.m,
  },

  /* 🔥 IMPROVED CHIPS */
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  chip: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#DDE2F1',
  },

  activeChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },

  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },

  activeChipText: {
    color: theme.colors.white,
  },

  /* RATING */
  ratingRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },

  /* INPUT */
  inputBox: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.m,
    minHeight: 120,
    ...theme.shadows.card,
  },

  input: {
    fontSize: 14,
    color: theme.colors.textPrimary,
  },

  /* BUTTON */
  submitBtn: {
    marginTop: theme.spacing.l,
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  submitText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: '700',
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    backgroundColor: theme.colors.white,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '80%',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },

  modalText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },

  modalBtn: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },

  modalBtnText: {
    color: theme.colors.white,
    fontWeight: '600',
  },
});

export default FeedbackScreen;