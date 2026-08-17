import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { useAuth } from '../lib/auth';
import { UserRole } from '../lib/types';

const { width } = Dimensions.get('window');

const roles: { role: UserRole; title: string; subtitle: string; icon: keyof typeof Ionicons.glyphMap; color: string }[] = [
  { role: 'admin', title: 'Hospital Admin', subtitle: 'Full system access & management', icon: 'shield-checkmark', color: '#2563EB' },
  { role: 'doctor', title: 'Doctor', subtitle: 'Patient care & clinical tools', icon: 'medkit', color: '#0891B2' },
  { role: 'nurse', title: 'Nurse', subtitle: 'Patient monitoring & care', icon: 'heart-pulse', color: '#E11D48' },
  { role: 'receptionist', title: 'Receptionist', subtitle: 'Front desk & scheduling', icon: 'desktop', color: '#D97706' },
  { role: 'patient', title: 'Patient', subtitle: 'My health & appointments', icon: 'person', color: '#7C3AED' },
];

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors, isDark } = useTheme();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const styles = createStyles(colors, isDark);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="medical" size={40} color={colors.white} />
            </View>
            <Text style={styles.logoText}>HOSPIRION</Text>
            <Text style={styles.logoSubtext}>Enterprise Hospital Management</Text>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Select Your Role</Text>
          <Text style={styles.sectionSubtitle}>Choose your role to access the appropriate dashboard</Text>

          {roles.map((item) => (
            <TouchableOpacity
              key={item.role}
              style={[
                styles.roleCard,
                selectedRole === item.role && { borderColor: item.color, borderWidth: 2 },
              ]}
              onPress={() => setSelectedRole(item.role)}
              activeOpacity={0.7}
            >
              <View style={[styles.roleIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <View style={styles.roleInfo}>
                <Text style={styles.roleTitle}>{item.title}</Text>
                <Text style={styles.roleSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={[
                styles.radio,
                selectedRole === item.role && { borderColor: item.color, backgroundColor: item.color },
              ]}>
                {selectedRole === item.role && (
                  <Ionicons name="checkmark" size={14} color={colors.white} />
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.loginBtn, !selectedRole && styles.loginBtnDisabled]}
            onPress={() => selectedRole && login(selectedRole)}
            disabled={!selectedRole}
            activeOpacity={0.8}
          >
            <Text style={styles.loginBtnText}>Sign In</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.white} style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Secured by Supabase Auth</Text>
            <View style={styles.footerIcons}>
              <Ionicons name="lock-closed" size={14} color={colors.gray400} />
              <Ionicons name="shield-checkmark" size={14} color={colors.gray400} style={{ marginLeft: 8 }} />
              <Ionicons name="finger-print" size={14} color={colors.gray400} style={{ marginLeft: 8 }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, paddingBottom: Spacing.xxxl },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  logoContainer: { alignItems: 'center' },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  logoText: {
    fontSize: FontSize.hero,
    fontWeight: FontWeight.extrabold,
    color: colors.white,
    letterSpacing: 3,
  },
  logoSubtext: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.7)',
    marginTop: Spacing.xs,
    letterSpacing: 1,
  },
  formSection: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: colors.text,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: FontSize.sm,
    color: colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    ...Shadows.sm,
  },
  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  roleTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: colors.text,
  },
  roleSubtitle: {
    fontSize: FontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xxl,
    ...Shadows.md,
  },
  loginBtnDisabled: {
    backgroundColor: colors.gray300,
  },
  loginBtnText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: colors.white,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  footerText: {
    fontSize: FontSize.xs,
    color: colors.gray400,
    marginBottom: Spacing.sm,
  },
  footerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
