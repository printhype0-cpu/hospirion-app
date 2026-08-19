import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';
import Badge from '../components/Badge';

export default function AppointmentDetailScreen({ route, navigation }: { route: any; navigation: any }) {
  const { apt } = route.params;
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (!apt) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled': return { text: 'Scheduled', variant: 'info' as const };
      case 'in-progress': return { text: 'In Progress', variant: 'warning' as const };
      case 'completed': return { text: 'Completed', variant: 'success' as const };
      case 'cancelled': return { text: 'Cancelled', variant: 'danger' as const };
      default: return { text: status, variant: 'default' as const };
    }
  };

  const badge = getStatusBadge(apt.status);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerCard}>
          <View style={styles.statusRow}>
            <Badge text={badge.text} variant={badge.variant} />
            <Text style={styles.appointmentId}>{apt.id}</Text>
          </View>
          <Text style={styles.dateText}>{apt.date} • {apt.time}</Text>
          <Text style={styles.durationText}>Duration: {apt.duration} mins</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Participants</Text>
          <View style={styles.participantRow}>
            <View style={[styles.avatar, { backgroundColor: colors.primaryBg }]}><Ionicons name="person" size={20} color={colors.primary} /></View>
            <View>
              <Text style={styles.participantRole}>Patient</Text>
              <Text style={styles.participantName}>{apt.patientName}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.participantRow}>
            <View style={[styles.avatar, { backgroundColor: colors.secondaryBg }]}><Ionicons name="medkit" size={20} color={colors.secondary} /></View>
            <View>
              <Text style={styles.participantRole}>Doctor ({apt.department})</Text>
              <Text style={styles.participantName}>{apt.doctorName}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Visit Information</Text>
          <View style={styles.infoRow}><Ionicons name="list" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>Type: <Text style={{ textTransform: 'capitalize' }}>{apt.type}</Text></Text></View>
          {apt.room && <View style={styles.infoRow}><Ionicons name="location" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>Room: {apt.room}</Text></View>}
          <View style={styles.infoRow}><Ionicons name="flag" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>Priority: <Text style={{ textTransform: 'capitalize' }}>{apt.priority}</Text></Text></View>
          
          {apt.notes && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: Spacing.md, fontSize: FontSize.md }]}>Notes</Text>
              <Text style={styles.notesText}>{apt.notes}</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  backBtn: { padding: Spacing.xs, width: 40 },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  content: { padding: Spacing.xl },
  headerCard: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder, alignItems: 'center' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: Spacing.sm },
  appointmentId: { fontSize: FontSize.sm, color: colors.textSecondary, fontWeight: FontWeight.semibold },
  dateText: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text, marginVertical: Spacing.xs },
  durationText: { fontSize: FontSize.sm, color: colors.textSecondary },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text, marginBottom: Spacing.md },
  participantRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  participantRole: { fontSize: FontSize.xs, color: colors.textSecondary, marginBottom: 2 },
  participantName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: Spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  infoText: { fontSize: FontSize.md, color: colors.text, marginLeft: Spacing.sm, flex: 1 },
  notesText: { fontSize: FontSize.md, color: colors.textSecondary, lineHeight: 22 },
});
