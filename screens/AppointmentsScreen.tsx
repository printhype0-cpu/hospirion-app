import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius, Shadows } from '../lib/theme';
import { useStore } from '../lib/store';
import Badge from '../components/Badge';
import SearchBar from '../components/SearchBar';

const statusFilters = ['all', 'scheduled', 'completed', 'cancelled'];

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
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const appointments = useStore(state => state.appointments);

  const filtered = appointments.filter(a => {
    const matchSearch = a.patientName.toLowerCase().includes(search.toLowerCase()) || a.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || a.status === filter;
    return matchSearch && matchFilter;
  });

  const renderAppointment = ({ item }: { item: typeof appointments[0] }) => {
    const badge = getStatusBadge(item.status);
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AppointmentDetail', { apt: item })} activeOpacity={0.7}>
        <View style={styles.cardContent}>
          <View style={styles.cardTopRow}>
            <Text style={styles.patientName}>{item.patientName}</Text>
            <Badge text={badge.text} variant={badge.variant} />
          </View>
          <Text style={styles.doctorName}>{item.doctorName}</Text>
          <View style={styles.cardBottom}>
            <View style={styles.infoChip}>
              <Ionicons name="calendar-outline" size={12} color={colors.gray500} />
              <Text style={styles.chipText}>{item.date}</Text>
            </View>
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
        <TouchableOpacity onPress={() => navigation.navigate('BookAppointment')}><Ionicons name="add-circle" size={24} color={colors.primary} /></TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search appointments..." />
      </View>

      <View style={styles.filtersWrapper}>
        <FlatList 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          data={statusFilters}
          keyExtractor={item => item}
          style={styles.filters} 
          contentContainerStyle={styles.filtersContent}
          renderItem={({ item: f }) => (
            <TouchableOpacity style={[styles.filterChip, filter === f && styles.filterChipActive]} onPress={() => setFilter(f)}>
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList data={filtered} renderItem={renderAppointment} keyExtractor={item => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  backBtn: { padding: Spacing.xs },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  searchSection: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.md },
  filtersWrapper: { height: 40, marginBottom: Spacing.md },
  filters: { flexGrow: 0 },
  filtersContent: { paddingHorizontal: Spacing.xl, gap: Spacing.sm },
  filterChip: { paddingHorizontal: Spacing.md, paddingVertical: 6, borderRadius: BorderRadius.full, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { fontSize: FontSize.sm, color: colors.textSecondary, fontWeight: FontWeight.medium },
  filterTextActive: { color: colors.white },
  list: { padding: Spacing.xl, paddingTop: 0 },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder, ...Shadows.sm },
  cardContent: { flex: 1 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  patientName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  doctorName: { fontSize: FontSize.sm, color: colors.textSecondary, marginBottom: Spacing.md },
  cardBottom: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  infoChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.gray100, paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: BorderRadius.sm, gap: 4 },
  chipText: { fontSize: FontSize.xs, color: colors.gray600, fontWeight: FontWeight.medium },
});
