import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  User,
  Phone,
  MapPin,
  Building2,
  Landmark,
  CreditCard,
  Edit3,
  HelpCircle,
  LogOut,
  ChevronRight,
  MessageCircle,
} from 'lucide-react-native';
import { theme } from '../../theme/theme';

const ProfileScreen = ({ navigation }: { navigation: any }) => {

  const profileInfo = [
    { icon: CreditCard, label: 'Aadhaar', value: '**** **** 1234' },
    { icon: MapPin, label: 'Village', value: 'Rampur' },
    { icon: Building2, label: 'District', value: 'Sagar' },
    { icon: Landmark, label: 'State', value: 'Madhya Pradesh' },
    { icon: Phone, label: 'Phone', value: '+91 7668678890' },
  ];

  const InfoRow = ({ icon: Icon, label, value }: any) => (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <View style={styles.infoIconCircle}>
          <Icon size={16} color={theme.colors.primary} />
        </View>
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const ActionButton = ({ icon: Icon, label, color, onPress }: any) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={styles.actionLeft}>
        <Icon size={18} color={color} />
        <Text style={[styles.actionLabel, { color }]}>{label}</Text>
      </View>
      <ChevronRight size={16} color={color} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <User size={40} color={theme.colors.primary} />
          </View>

          <TouchableOpacity style={styles.editIcon}>
            <Edit3 size={14} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>Ramesh Kumar</Text>
        <Text style={styles.phone}>+91 7668678890</Text>
        <Text style={styles.booth}>Booth 21 • Rampur</Text>
      </View>

      {/* BODY */}
      <View style={styles.body}>

        {/* INFO CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Details</Text>
          {profileInfo.map((item, index) => (
            <React.Fragment key={item.label}>
              <InfoRow icon={item.icon} label={item.label} value={item.value} />
              {index < profileInfo.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* 🔥 BIG FEEDBACK CARD (LIKE SCHEME CARD) */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Feedback')}>
          <Text style={styles.cardTitle}>Give Feedback</Text>
          <Text style={styles.cardDesc}>
            Share your experience with schemes and help improve services
          </Text>

          <View style={styles.applyRow}>
            <View style={styles.applyLink}>
              <MessageCircle size={14} color={theme.colors.primary} />
              <Text style={styles.applyText}>Send Feedback</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* ACTIONS */}
        <View style={styles.card}>
          <ActionButton icon={HelpCircle} label="Help & Support" color={theme.colors.primary} />
          <View style={styles.divider} />
          <ActionButton
            icon={LogOut}
            label="Log Out"
            color={theme.colors.error}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Starter' }] })}
          />
        </View>

      </View>
    </ScrollView>
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
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl + 10,
  },

  avatarWrapper: {
    position: 'relative',
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },

  editIcon: {
    position: 'absolute',
    right: -4,
    bottom: 10,
    backgroundColor: theme.colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.white,
  },

  phone: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },

  booth: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
    fontWeight: '600',
  },

  /* BODY */
  body: {
    padding: theme.spacing.m,
    marginTop: -12,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: theme.colors.background,
  },

  /* CARD (MATCH SCHEMES) */
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.card,
  },

  sectionTitle: {
    ...theme.typography.subHeader,
    marginBottom: theme.spacing.m,
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

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.s,
  },

  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },

  infoLabel: {
    ...theme.typography.label,
  },

  infoValue: {
    ...theme.typography.body,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },

  /* ACTION BUTTON */
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.m,
  },

  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  actionLabel: {
    fontSize: 15,
    fontWeight: '600',
  },

  /* CTA LIKE SCHEME */
  applyRow: {
    alignItems: 'flex-end',
  },

  applyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  applyText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default ProfileScreen;