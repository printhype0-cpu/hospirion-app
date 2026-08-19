import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';
import Badge from '../components/Badge';

export default function LabReportDetailScreen({ route, navigation }: { route: any; navigation: any }) {
  const { report } = route.params;
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (!report) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return { text: 'Completed', variant: 'success' as const };
      case 'in-progress': return { text: 'In Progress', variant: 'warning' as const };
      case 'pending': return { text: 'Pending', variant: 'default' as const };
      case 'cancelled': return { text: 'Cancelled', variant: 'danger' as const };
      default: return { text: status, variant: 'default' as const };
    }
  };

  const badge = getStatusBadge(report.status);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lab Report Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerCard}>
          <View style={styles.statusRow}>
            <Badge text={badge.text} variant={badge.variant} />
            <Text style={styles.reportId}>{report.id}</Text>
          </View>
          <Text style={styles.testName}>{report.testName}</Text>
          <Text style={styles.dateText}>Date: {report.date}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="person" size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>{report.patientName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="medkit" size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>Requested By: {report.doctorName}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Test Results</Text>
          {report.status === 'completed' ? (
            <>
              <Text style={styles.label}>Result</Text>
              <Text style={styles.resultText}>{report.result}</Text>
              
              {report.normalRange && (
                <>
                  <Text style={[styles.label, { marginTop: Spacing.md }]}>Reference Range</Text>
                  <Text style={styles.rangeText}>{report.normalRange}</Text>
                </>
              )}
            </>
          ) : (
            <View style={styles.pendingContainer}>
              <Ionicons name="time-outline" size={48} color={colors.gray400} />
              <Text style={styles.pendingText}>Results are currently {report.status}.</Text>
            </View>
          )}

          {report.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.label}>Notes</Text>
              <Text style={styles.notesText}>{report.notes}</Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Category:</Text><Text style={styles.infoValue}>{report.category}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Priority:</Text><Text style={[styles.infoValue, { color: report.priority === 'urgent' || report.priority === 'critical' ? colors.danger : colors.text }]}>{report.priority.toUpperCase()}</Text></View>
          {report.technicianName && <View style={styles.infoRow}><Text style={styles.infoLabel}>Technician:</Text><Text style={styles.infoValue}>{report.technicianName}</Text></View>}
          {report.sampleId && <View style={styles.infoRow}><Text style={styles.infoLabel}>Sample ID:</Text><Text style={styles.infoValue}>{report.sampleId}</Text></View>}
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
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: Spacing.md },
  reportId: { fontSize: FontSize.sm, color: colors.textSecondary, fontWeight: FontWeight.semibold },
  testName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.primary, textAlign: 'center', marginBottom: Spacing.sm },
  dateText: { fontSize: FontSize.sm, color: colors.textSecondary },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text, marginBottom: Spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  infoText: { fontSize: FontSize.md, color: colors.textSecondary, marginLeft: Spacing.sm, flex: 1 },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: colors.text, marginBottom: 4 },
  resultText: { fontSize: FontSize.md, color: colors.text, lineHeight: 22 },
  rangeText: { fontSize: FontSize.sm, color: colors.textSecondary, lineHeight: 20 },
  notesContainer: { marginTop: Spacing.lg, padding: Spacing.md, backgroundColor: colors.warningBg, borderRadius: BorderRadius.sm },
  notesText: { fontSize: FontSize.md, color: colors.warning, lineHeight: 20 },
  pendingContainer: { alignItems: 'center', padding: Spacing.xl },
  pendingText: { fontSize: FontSize.md, color: colors.gray500, marginTop: Spacing.md },
  infoLabel: { fontSize: FontSize.sm, color: colors.textSecondary, width: 100 },
  infoValue: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: colors.text, flex: 1, textTransform: 'capitalize' },
});
