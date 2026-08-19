import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';
import Badge from '../components/Badge';

export default function PatientDetailScreen({ route, navigation }: { route: any; navigation: any }) {
  const { patient } = route.params;
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (!patient) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <View style={[styles.avatar, { backgroundColor: patient.gender === 'female' ? colors.dangerBg : colors.primaryBg }]}>
            <Ionicons name={patient.gender === 'female' ? 'woman' : 'man'} size={40} color={patient.gender === 'female' ? '#DB2777' : colors.primary} />
          </View>
          <Text style={styles.name}>{patient.name}</Text>
          <Text style={styles.subtitle}>{patient.id} • {patient.age}y • {patient.bloodGroup}</Text>
          <View style={styles.statusBadge}>
            <Badge text={patient.status.toUpperCase()} variant={patient.status === 'active' ? 'success' : patient.status === 'critical' ? 'danger' : 'warning'} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoRow}><Ionicons name="call" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>{patient.phone}</Text></View>
          <View style={styles.infoRow}><Ionicons name="mail" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>{patient.email}</Text></View>
          <View style={styles.infoRow}><Ionicons name="location" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>{patient.address}</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Medical History</Text>
          <Text style={styles.label}>Conditions</Text>
          <View style={styles.chipContainer}>
            {patient.conditions.map((c: string, i: number) => (
              <View key={i} style={styles.chip}><Text style={styles.chipText}>{c}</Text></View>
            ))}
          </View>
          
          <Text style={[styles.label, { marginTop: Spacing.md }]}>Allergies</Text>
          <View style={styles.chipContainer}>
            {patient.allergies.length > 0 ? patient.allergies.map((a: string, i: number) => (
              <View key={i} style={[styles.chip, { backgroundColor: colors.dangerBg }]}><Text style={[styles.chipText, { color: colors.danger }]}>{a}</Text></View>
            )) : <Text style={styles.infoText}>No known allergies</Text>}
          </View>

          <Text style={[styles.label, { marginTop: Spacing.md }]}>Medications</Text>
          <View style={styles.chipContainer}>
            {patient.medications.map((m: string, i: number) => (
              <View key={i} style={styles.chip}><Text style={styles.chipText}>{m}</Text></View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <View style={styles.infoRow}><Ionicons name="alert-circle" size={16} color={colors.danger} /><Text style={styles.infoText}>{patient.emergencyContact}</Text></View>
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
  profileSection: { alignItems: 'center', marginBottom: Spacing.xl },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  name: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: colors.text, marginBottom: 4 },
  subtitle: { fontSize: FontSize.md, color: colors.textSecondary, marginBottom: Spacing.sm },
  statusBadge: { marginTop: Spacing.sm },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text, marginBottom: Spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  infoText: { fontSize: FontSize.md, color: colors.textSecondary, marginLeft: Spacing.sm, flex: 1 },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: colors.text, marginBottom: Spacing.xs },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  chip: { backgroundColor: colors.gray100, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full },
  chipText: { fontSize: FontSize.sm, color: colors.textSecondary },
});
