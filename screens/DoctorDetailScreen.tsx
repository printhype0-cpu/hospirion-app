import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';
import Badge from '../components/Badge';

export default function DoctorDetailScreen({ route, navigation }: { route: any; navigation: any }) {
  const { doctor } = route.params;
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (!doctor) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="medkit" size={40} color={colors.primary} />
          </View>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.subtitle}>{doctor.specialization}</Text>
          <View style={styles.statusBadge}>
            <Badge text={doctor.available ? 'Available' : 'Unavailable'} variant={doctor.available ? 'success' : 'danger'} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.description}>{doctor.bio || 'No bio available.'}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{doctor.experience}y</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{doctor.rating}★</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{doctor.patients}+</Text>
              <Text style={styles.statLabel}>Patients</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.infoRow}><Ionicons name="business" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>Department: {doctor.department}</Text></View>
          <View style={styles.infoRow}><Ionicons name="time" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>Schedule: {doctor.schedule}</Text></View>
          <View style={styles.infoRow}><Ionicons name="cash" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>Consultation Fee: ₹{doctor.consultationFee}</Text></View>
          <View style={styles.infoRow}><Ionicons name="language" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>Languages: {doctor.languages.join(', ')}</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.infoRow}><Ionicons name="call" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>{doctor.phone}</Text></View>
          <View style={styles.infoRow}><Ionicons name="mail" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>{doctor.email}</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Qualifications</Text>
          {doctor.qualifications.map((q: string, i: number) => (
            <View key={i} style={styles.qualRow}>
              <View style={styles.bullet} />
              <Text style={styles.qualText}>{q}</Text>
            </View>
          ))}
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
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primaryBg, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  name: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: colors.text, marginBottom: 4 },
  subtitle: { fontSize: FontSize.md, color: colors.textSecondary, marginBottom: Spacing.sm },
  statusBadge: { marginTop: Spacing.sm },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text, marginBottom: Spacing.md },
  description: { fontSize: FontSize.md, color: colors.textSecondary, lineHeight: 22, marginBottom: Spacing.lg },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.primary },
  statLabel: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  infoText: { fontSize: FontSize.md, color: colors.textSecondary, marginLeft: Spacing.sm, flex: 1 },
  qualRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary, marginRight: Spacing.sm },
  qualText: { fontSize: FontSize.md, color: colors.textSecondary, flex: 1 },
});
