import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { useAuth } from '../lib/auth';

function SettingItem({ icon, label, subtitle, color, onPress, hasToggle, toggleValue, onToggle, danger }: any) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  
  return (
    <TouchableOpacity style={styles.settingItem} onPress={hasToggle ? undefined : onPress} activeOpacity={hasToggle ? 1 : 0.7}>
      <View style={[styles.settingIcon, { backgroundColor: color + '20' }]}><Ionicons name={icon} size={20} color={color} /></View>
      <View style={styles.settingInfo}><Text style={[styles.settingLabel, danger && { color: colors.danger }]}>{label}</Text>{subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}</View>
      {hasToggle ? <Switch value={toggleValue} onValueChange={onToggle} trackColor={{ true: colors.primary }} thumbColor={colors.white} /> : <Ionicons name="chevron-forward" size={20} color={colors.gray400} />}
    </TouchableOpacity>
  );
}

export default function SettingsScreen({ navigation }: { navigation: any }) {
  const { user, logout } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = createStyles(colors);
  
  const handleLogout = () => { Alert.alert('Logout', 'Are you sure you want to logout?', [{ text: 'Cancel', style: 'cancel' }, { text: 'Logout', style: 'destructive', onPress: logout }]); };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>{user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || ''}</Text></View>
          <View style={styles.profileInfo}><Text style={styles.profileName}>{user?.name}</Text><Text style={styles.profileEmail}>{user?.email}</Text><Text style={styles.profileRole}>{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}</Text></View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingItem icon="person-outline" label="Personal Information" subtitle="Name, email, phone" color={colors.primary} />
          <SettingItem icon="lock-closed-outline" label="Security" subtitle="Password, 2FA" color={colors.secondary} />
          <SettingItem icon="notifications-outline" label="Notifications" subtitle="Push, email, SMS" color={colors.warning} hasToggle toggleValue={true} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <SettingItem icon="moon-outline" label="Dark Mode" subtitle={isDark ? 'Dark theme active' : 'Light theme active'} color={colors.accent} hasToggle toggleValue={isDark} onToggle={toggleTheme} />
          <SettingItem icon="language-outline" label="Language" subtitle="English (US)" color={colors.info} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingItem icon="help-circle-outline" label="Help Center" subtitle="FAQs, guides" color={colors.primary} />
          <SettingItem icon="chatbubbles-outline" label="Contact Support" subtitle="24/7 available" color={colors.secondary} />
        </View>
        <View style={styles.section}>
          <SettingItem icon="log-out-outline" label="Logout" color={colors.danger} onPress={handleLogout} danger />
        </View>
        <View style={styles.versionInfo}><Text style={styles.versionText}>HOSPIRION v5.0.0</Text><Text style={styles.versionSubtext}>Build 2025.01.15</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  backBtn: { padding: Spacing.xs, width: 40 },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  scroll: { paddingBottom: Spacing.xxxl },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, margin: Spacing.xl, padding: Spacing.xl, borderRadius: BorderRadius.lg, ...Shadows.md, borderWidth: 1, borderColor: colors.cardBorder },
  profileAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primaryBg, alignItems: 'center', justifyContent: 'center' },
  profileAvatarText: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.primary },
  profileInfo: { flex: 1, marginLeft: Spacing.md },
  profileName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text },
  profileEmail: { fontSize: FontSize.sm, color: colors.textSecondary, marginTop: 2 },
  profileRole: { fontSize: FontSize.xs, color: colors.primary, fontWeight: FontWeight.medium, marginTop: 2 },
  section: { marginBottom: Spacing.xl },
  sectionTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, paddingHorizontal: Spacing.xl, marginBottom: Spacing.md },
  settingItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl, borderBottomWidth: 1, borderBottomColor: colors.border },
  settingIcon: { width: 36, height: 36, borderRadius: BorderRadius.sm, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  settingInfo: { flex: 1 },
  settingLabel: { fontSize: FontSize.md, color: colors.text, fontWeight: FontWeight.medium },
  settingSubtitle: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 2 },
  versionInfo: { alignItems: 'center', marginTop: Spacing.xxl },
  versionText: { fontSize: FontSize.sm, color: colors.gray400, fontWeight: FontWeight.medium },
  versionSubtext: { fontSize: FontSize.xs, color: colors.gray400, marginTop: 2 },
});
