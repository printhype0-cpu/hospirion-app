import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { mockPatients } from '../lib/data';
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge';

export default function PatientsScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState('');
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const filtered = mockPatients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return { text: 'Active', variant: 'success' as const };
      case 'admitted': return { text: 'Admitted', variant: 'warning' as const };
      case 'critical': return { text: 'Critical', variant: 'danger' as const };
      default: return { text: status, variant: 'default' as const };
    }
  };

  const renderPatient = ({ item }: { item: typeof mockPatients[0] }) => {
    const badge = getStatusBadge(item.status);
    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <View style={[styles.avatar, { backgroundColor: item.gender === 'female' ? colors.dangerBg : colors.primaryBg }]}>
          <Ionicons name={item.gender === 'female' ? 'woman' : 'man'} size={22} color={item.gender === 'female' ? '#DB2777' : colors.primary} />
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardTopRow}>
            <Text style={styles.patientName}>{item.name}</Text>
            <Badge text={badge.text} variant={badge.variant} />
          </View>
          <Text style={styles.patientId}>{item.id} • {item.age}y • {item.bloodGroup}</Text>
          <View style={styles.conditionsRow}>
            {item.conditions.slice(0, 2).map((c, i) => (
              <View key={i} style={styles.conditionChip}><Text style={styles.conditionText}>{c}</Text></View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Patients (EHR)</Text>
        <TouchableOpacity><Ionicons name="person-add" size={24} color={colors.primary} /></TouchableOpacity>
      </View>
      <View style={styles.searchSection}><SearchBar value={search} onChangeText={setSearch} placeholder="Search patients..." /></View>
      <FlatList data={filtered} renderItem={renderPatient} keyExtractor={item => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
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
  card: { flexDirection: 'row', backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder, ...Shadows.sm },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  cardContent: { flex: 1 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  patientName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  patientId: { fontSize: FontSize.sm, color: colors.textSecondary },
  conditionsRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: Spacing.sm, gap: Spacing.xs },
  conditionChip: { backgroundColor: colors.gray100, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: BorderRadius.sm },
  conditionText: { fontSize: FontSize.xs, color: colors.gray600 },
});
