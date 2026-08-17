import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { useAuth } from '../lib/auth';
import { dashboardStats, mockAppointments, mockNotifications } from '../lib/data';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import { UserRole } from '../lib/types';

const { width } = Dimensions.get('window');

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'scheduled': return { text: 'Scheduled', variant: 'info' as const };
    case 'in-progress': return { text: 'In Progress', variant: 'warning' as const };
    case 'completed': return { text: 'Completed', variant: 'success' as const };
    case 'cancelled': return { text: 'Cancelled', variant: 'danger' as const };
    default: return { text: status, variant: 'default' as const };
  }
};

const getQuickActions = (role: UserRole) => {
  const base = [
    { icon: 'calendar' as const, label: 'Appointments', color: '#2563EB', screen: 'Appointments' },
    { icon: 'people' as const, label: 'Patients', color: '#0891B2', screen: 'Patients' },
  ];
  
  if (role === 'admin') return [...base,
    { icon: 'medkit' as const, label: 'Doctors', color: '#E11D48', screen: 'Doctors' },
    { icon: 'analytics' as const, label: 'Analytics', color: '#7C3AED', screen: 'Analytics' },
    { icon: 'receipt' as const, label: 'Billing', color: '#D97706', screen: 'Billing' },
    { icon: 'flask' as const, label: 'Lab Reports', color: '#059669', screen: 'LabReports' },
    { icon: 'storefront' as const, label: 'Pharmacy', color: '#0891B2', screen: 'Pharmacy' },
    { icon: 'videocam' as const, label: 'Telemedicine', color: '#7C3AED', screen: 'Telemedicine' },
  ];
  if (role === 'doctor') return [...base,
    { icon: 'list' as const, label: 'OPD Queue', color: '#D97706', screen: 'OPD' },
    { icon: 'flask' as const, label: 'Lab Reports', color: '#059669', screen: 'LabReports' },
    { icon: 'videocam' as const, label: 'Telemedicine', color: '#7C3AED', screen: 'Telemedicine' },
  ];
  if (role === 'patient') return [
    { icon: 'heart' as const, label: 'My Health', color: '#E11D48', screen: 'Patients' },
    { icon: 'flask' as const, label: 'Lab Reports', color: '#059669', screen: 'LabReports' },
    { icon: 'videocam' as const, label: 'Telemedicine', color: '#7C3AED', screen: 'Telemedicine' },
    { icon: 'receipt' as const, label: 'Billing', color: '#D97706', screen: 'Billing' },
  ];
  return base;
};

export default function DashboardScreen({ navigation }: { navigation: any }) {
  const { user } = useAuth();
  const { colors, isDark } = useTheme();
  const styles = createStyles(colors);
  if (!user) return null;

  const quickActions = getQuickActions(user.role);
  const todayAppointments = mockAppointments.filter(a => a.date === '2025-01-15').slice(0, 4);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.userName}>{user.name}</Text>
            {user.department && <Text style={styles.department}>{user.department}</Text>}
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications" size={24} color={colors.textSecondary} />
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
          <StatCard title="Appointments" value={dashboardStats.todayAppointments} icon="calendar" color={colors.primary} bgColor={colors.primaryBg} trend="+12%" trendUp small />
          <StatCard title="Admitted" value={dashboardStats.patientsAdmitted} icon="bed" color={colors.secondary} bgColor={colors.secondaryBg} small />
          <StatCard title="OPD Waiting" value={dashboardStats.opdWaiting} icon="time" color={colors.warning} bgColor={colors.warningBg} small />
          <StatCard title="Surgeries" value={dashboardStats.surgeriesToday} icon="medkit" color="#E11D48" bgColor={colors.dangerBg} small />
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionItem}
                onPress={() => navigation.navigate(action.screen)}
                activeOpacity={0.7}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon} size={22} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Appointments</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {todayAppointments.map((apt) => {
            const badge = getStatusBadge(apt.status);
            return (
              <TouchableOpacity key={apt.id} style={styles.aptCard} activeOpacity={0.7}>
                <View style={styles.aptTimeCol}>
                  <Text style={styles.aptTime}>{apt.time}</Text>
                </View>
                <View style={styles.aptInfo}>
                  <Text style={styles.aptPatient}>{apt.patientName}</Text>
                  <Text style={styles.aptDoctor}>{apt.doctorName} • {apt.department}</Text>
                  {apt.room && <Text style={styles.aptRoom}>{apt.room}</Text>}
                </View>
                <Badge text={badge.text} variant={badge.variant} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          {mockNotifications.slice(0, 3).map((notif) => (
            <View key={notif.id} style={[styles.notifCard, !notif.read && styles.notifUnread]}>
              <View style={[styles.notifIcon, { backgroundColor: notif.type === 'appointment' ? colors.primaryBg : notif.type === 'lab' ? colors.successBg : colors.gray100 }]}>
                <Ionicons
                  name={notif.type === 'appointment' ? 'calendar' : notif.type === 'lab' ? 'flask' : 'information-circle'}
                  size={18}
                  color={notif.type === 'appointment' ? colors.primary : notif.type === 'lab' ? colors.success : colors.gray600}
                />
              </View>
              <View style={styles.notifInfo}>
                <Text style={styles.notifTitle}>{notif.title}</Text>
                <Text style={styles.notifBody} numberOfLines={1}>{notif.body}</Text>
                <Text style={styles.notifTime}>{notif.timestamp}</Text>
              </View>
              {!notif.read && <View style={styles.unreadDot} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: Spacing.xl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg, paddingBottom: Spacing.xl },
  greeting: { fontSize: FontSize.sm, color: colors.textSecondary, fontWeight: FontWeight.medium },
  userName: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: colors.text, marginTop: 2 },
  department: { fontSize: FontSize.sm, color: colors.primary, fontWeight: FontWeight.medium, marginTop: 2 },
  notificationBtn: { position: 'relative', padding: Spacing.sm },
  notifBadge: { position: 'absolute', top: 4, right: 4, backgroundColor: colors.danger, borderRadius: 8, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  notifBadgeText: { fontSize: 9, color: colors.white, fontWeight: FontWeight.bold },
  statsScroll: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl },
  section: { paddingHorizontal: Spacing.xl, marginTop: Spacing.lg },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text, marginBottom: Spacing.md },
  seeAll: { fontSize: FontSize.sm, color: colors.primary, fontWeight: FontWeight.semibold },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  actionItem: { alignItems: 'center', width: (width - Spacing.xl * 2 - Spacing.md * 3) / 4, marginBottom: Spacing.sm },
  actionIcon: { width: 52, height: 52, borderRadius: BorderRadius.lg, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  actionLabel: { fontSize: FontSize.xs, color: colors.textSecondary, fontWeight: FontWeight.medium, textAlign: 'center' },
  aptCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.sm, borderWidth: 1, borderColor: colors.cardBorder },
  aptTimeCol: { alignItems: 'center', marginRight: Spacing.md, minWidth: 65 },
  aptTime: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: colors.text },
  aptInfo: { flex: 1 },
  aptPatient: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  aptDoctor: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 2 },
  aptRoom: { fontSize: FontSize.xs, color: colors.primary, marginTop: 2, fontWeight: FontWeight.medium },
  notifCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: Spacing.md, borderRadius: BorderRadius.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: colors.cardBorder },
  notifUnread: { borderLeftWidth: 3, borderLeftColor: colors.primary },
  notifIcon: { width: 36, height: 36, borderRadius: BorderRadius.sm, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  notifInfo: { flex: 1 },
  notifTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: colors.text },
  notifBody: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 1 },
  notifTime: { fontSize: FontSize.xs, color: colors.gray400, marginTop: 2 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginLeft: Spacing.sm },
});
