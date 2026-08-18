import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {  View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView , Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { mockAppointments } from '../lib/data';
import { Appointment } from '../lib/types';
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge';

const statusFilters = ['all', 'scheduled', 'in-progress', 'completed', 'cancelled'];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'scheduled': return { text: 'Scheduled', variant: 'info' as const };
    case 'in-progress': return { text: 'In Progress', variant: 'warning' as const };
    case 'completed': return { text: 'Completed', variant: 'success' as const };
    case 'cancelled': return { text: 'Cancelled', variant: 'danger' as const };
    default: return { text: status, variant: 'default' as const };
  }
};

export default function AppointmentsScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const filtered = mockAppointments.filter(a => {
    const matchSearch = a.patientName.toLowerCase().includes(search.toLowerCase()) || a.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || a.status === filter;
    return matchSearch && matchFilter;
  });

  const renderAppointment = ({ item }: { item: Appointment }) => {
    const badge = getStatusBadge(item.status);
    return (
      <TouchableOpacity style={styles.card} onPress={() => setSelectedApt(item)} activeOpacity={0.7}>
        <View style={styles.cardContent}>
          <View style={styles.cardTopRow}>
            <Text style={styles.patientName}>{item.patientName}</Text>
            <Badge text={badge.text} variant={badge.variant} />
          </View>
          <Text style={styles.doctorName}>{item.doctorName}</Text>
          <View style={styles.cardBottom}>
            <View style={styles.infoChip}>
              <Ionicons name="time-outline" size={12} color={colors.gray500} />
              <Text style={styles.chipText}>{item.time}</Text>
            </View>
            <View style={styles.infoChip}>
              <Ionicons name="business-outline" size={12} color={colors.gray500} />
              <Text style={styles.chipText}>{item.department}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'This action will be fully functional in the next update!')}><Ionicons name="add-circle" size={24} color={colors.primary} /></TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search appointments..." />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={styles.filtersContent}>
        {statusFilters.map(f => (
          <TouchableOpacity key={f} style={[styles.filterChip, filter === f && styles.filterChipActive]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList data={filtered} renderItem={renderAppointment} keyExtractor={item => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />

      <Modal visible={!!selectedApt} animationType="slide" presentationStyle="pageSheet">
        {selectedApt && (
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedApt(null)}><Ionicons name="close" size={28} color={colors.text} /></TouchableOpacity>
              <Text style={styles.modalTitle}>Appointment Details</Text>
              <View style={{ width: 28 }} />
            </View>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.detailCard}>
                <View style={styles.detailRow}><Ionicons name="person" size={20} color={colors.primary} /><View style={styles.detailInfo}><Text style={styles.detailLabel}>Patient</Text><Text style={styles.detailValue}>{selectedApt.patientName}</Text></View></View>
                <View style={styles.detailRow}><Ionicons name="medkit" size={20} color={colors.secondary} /><View style={styles.detailInfo}><Text style={styles.detailLabel}>Doctor</Text><Text style={styles.detailValue}>{selectedApt.doctorName}</Text></View></View>
                <View style={styles.detailRow}><Ionicons name="calendar" size={20} color={colors.accent} /><View style={styles.detailInfo}><Text style={styles.detailLabel}>Date & Time</Text><Text style={styles.detailValue}>{selectedApt.date} at {selectedApt.time}</Text></View></View>
                <View style={styles.detailRow}><Ionicons name="business" size={20} color={colors.warning} /><View style={styles.detailInfo}><Text style={styles.detailLabel}>Department</Text><Text style={styles.detailValue}>{selectedApt.department}</Text></View></View>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  backBtn: { padding: Spacing.xs },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  searchSection: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.md },
  filters: { maxHeight: 44 },
  filtersContent: { paddingHorizontal: Spacing.xl, gap: Spacing.sm },
  filterChip: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { fontSize: FontSize.sm, color: colors.gray600, fontWeight: FontWeight.medium },
  filterTextActive: { color: colors.white },
  list: { padding: Spacing.xl, paddingTop: Spacing.md },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder, ...Shadows.sm },
  cardContent: { flex: 1 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  patientName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  doctorName: { fontSize: FontSize.sm, color: colors.textSecondary, marginBottom: Spacing.sm },
  cardBottom: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  infoChip: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  chipText: { fontSize: FontSize.xs, color: colors.gray500 },
  modalContainer: { flex: 1, backgroundColor: colors.background },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md },
  modalTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text },
  modalContent: { padding: Spacing.xl },
  detailCard: { backgroundColor: colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.xl, ...Shadows.md, borderWidth: 1, borderColor: colors.cardBorder },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xl },
  detailInfo: { marginLeft: Spacing.md, flex: 1 },
  detailLabel: { fontSize: FontSize.xs, color: colors.textSecondary, marginBottom: 2 },
  detailValue: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
});
