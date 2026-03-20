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

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
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

  const ActionButton = ({
    icon: Icon,
    label,
    color,
    onPress,
  }: {
    icon: any;
    label: string;
    color: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress} activeOpacity={0.7}>
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

      {/* Header with avatar */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User size={40} color={theme.colors.primary} />
        </View>
        <Text style={styles.name}>Ramesh Kumar</Text>
        <Text style={styles.phone}>+91 7668678890</Text>
      </View>

      <View style={styles.body}>
        {/* Profile info card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Personal Information</Text>
          {profileInfo.map((item, index) => (
            <React.Fragment key={item.label}>
              <InfoRow icon={item.icon} label={item.label} value={item.value} />
              {index < profileInfo.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Action buttons */}
        <View style={styles.actionsCard}>
          <ActionButton icon={Edit3} label="Edit Profile" color={theme.colors.primary} />
          <View style={styles.divider} />
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
  header: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl + 10,
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
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  phone: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: theme.spacing.xs,
  },
  body: {
    padding: theme.spacing.m,
    marginTop: -theme.spacing.m,
  },
  infoCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.card,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.m,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  actionsCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.m,
    ...theme.shadows.card,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default ProfileScreen;
