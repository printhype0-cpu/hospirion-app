import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {  View, Text, StyleSheet, FlatList, TouchableOpacity , Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { mockOPDQueue } from '../lib/data';
import Badge from '../components/Badge';

export default function OPDScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting': return { text: 'Waiting', variant: 'warning' as const };
      case 'in-consultation': return { text: 'In Consultation', variant: 'info' as const };
      case 'completed': return { text: 'Completed', variant: 'success' as const };
      default: return { text: status, variant: 'default' as const };
    }
  };

  const waitingCount = mockOPDQueue.filter(q => q.status === 'waiting').length;
  const inConsultation = mockOPDQueue.filter(q => q.status === 'in-consultation').length;
  const completed = mockOPDQueue.filter(q => q.status === 'completed').length;

  const renderItem = ({ item }: { item: typeof mockOPDQueue[0] }) => {
    const badge = getStatusBadge(item.status);
    return (
      <View style={[styles.card, item.status === 'in-consultation' && styles.activeCard]}>
        <View style={styles.tokenContainer}><Text style={styles.tokenLabel}>Token</Text><Text style={styles.tokenNumber}>{item.tokenNumber}</Text></View>
        <View style={styles.cardContent}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <Text style={styles.doctorName}>{item.doctorName}</Text>
          <Text style={styles.department}>{item.department}</Text>
        </View>
        <View style={styles.cardRight}>
          <Badge text={badge.text} variant={badge.variant} />
          {item.status === 'waiting' && <Text style={styles.waitTime}>~{item.waitTime} min</Text>}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>OPD Queue</Text>
        <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'This action will be fully functional in the next update!')}><Ionicons name="person-add" size={24} color={colors.primary} /></TouchableOpacity>
      </View>
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { borderLeftColor: colors.warning, borderLeftWidth: 3 }]}><Text style={[styles.statValue, { color: colors.warning }]}>{waitingCount}</Text><Text style={styles.statLabel}>Waiting</Text></View>
        <View style={[styles.statCard, { borderLeftColor: colors.info, borderLeftWidth: 3 }]}><Text style={[styles.statValue, { color: colors.info }]}>{inConsultation}</Text><Text style={styles.statLabel}>In Consultation</Text></View>
        <View style={[styles.statCard, { borderLeftColor: colors.success, borderLeftWidth: 3 }]}><Text style={[styles.statValue, { color: colors.success }]}>{completed}</Text><Text style={styles.statLabel}>Completed</Text></View>
      </View>
      <FlatList data={mockOPDQueue} renderItem={renderItem} keyExtractor={item => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  backBtn: { padding: Spacing.xs, width: 40 },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  statsRow: { flexDirection: 'row', paddingHorizontal: Spacing.xl, gap: Spacing.md, marginBottom: Spacing.xl },
  statCard: { flex: 1, backgroundColor: colors.surface, padding: Spacing.md, borderRadius: BorderRadius.md, ...Shadows.sm, borderWidth: 1, borderColor: colors.cardBorder },
  statValue: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold },
  statLabel: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 2 },
  list: { padding: Spacing.xl, paddingTop: 0 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder, ...Shadows.sm },
  activeCard: { borderLeftWidth: 3, borderLeftColor: colors.info, backgroundColor: colors.infoBg },
  tokenContainer: { alignItems: 'center', marginRight: Spacing.md, minWidth: 50 },
  tokenLabel: { fontSize: FontSize.xs, color: colors.gray400 },
  tokenNumber: { fontSize: FontSize.xxl, fontWeight: FontWeight.extrabold, color: colors.primary },
  cardContent: { flex: 1 },
  patientName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  doctorName: { fontSize: FontSize.sm, color: colors.textSecondary, marginTop: 2 },
  department: { fontSize: FontSize.xs, color: colors.gray500, marginTop: 2 },
  cardRight: { alignItems: 'flex-end' },
  waitTime: { fontSize: FontSize.xs, color: colors.warning, fontWeight: FontWeight.semibold, marginTop: Spacing.xs },
});
