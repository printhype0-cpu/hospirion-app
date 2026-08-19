import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { useStore } from '../lib/store';
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge';

export default function LabReportsScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState('');
  const { colors } = useTheme();
  const styles = createStyles(colors);
  
  const labReports = useStore(state => state.labReports);
  const filtered = labReports.filter(r => r.patientName.toLowerCase().includes(search.toLowerCase()) || r.testName.toLowerCase().includes(search.toLowerCase()));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return { text: 'Completed', variant: 'success' as const };
      case 'in-progress': return { text: 'In Progress', variant: 'warning' as const };
      case 'pending': return { text: 'Pending', variant: 'info' as const };
      default: return { text: status, variant: 'default' as const };
    }
  };

  const renderReport = ({ item }: { item: typeof labReports[0] }) => {
    const statusBadge = getStatusBadge(item.status);
    return (
      <TouchableOpacity onPress={() => navigation.navigate('LabReportDetail', { report: item })} style={styles.card} activeOpacity={0.7}>
        <View style={styles.cardContent}>
          <View style={styles.cardTopRow}>
            <Text style={styles.testName} numberOfLines={1}>{item.testName}</Text>
            {item.priority !== 'normal' && <Badge text={item.priority} variant={item.priority === 'critical' ? 'danger' : 'warning'} />}
          </View>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <View style={styles.cardBottom}>
            <Text style={styles.dateText}>{item.date}</Text>
            <Badge text={statusBadge.text} variant={statusBadge.variant} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Lab Reports</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.searchSection}><SearchBar value={search} onChangeText={setSearch} placeholder="Search lab reports..." /></View>
      <FlatList data={filtered} renderItem={renderReport} keyExtractor={item => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  backBtn: { padding: Spacing.xs, width: 40 },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  searchSection: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.md },
  list: { padding: Spacing.xl, paddingTop: 0 },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder, ...Shadows.sm },
  cardContent: { flex: 1 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  testName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text, flex: 1 },
  patientName: { fontSize: FontSize.sm, color: colors.textSecondary, marginBottom: Spacing.sm },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateText: { fontSize: FontSize.xs, color: colors.gray500 },
});
