import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { useStore } from '../lib/store';
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge';

export default function DoctorsScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState('');
  const { colors } = useTheme();
  const styles = createStyles(colors);
  
  const doctors = useStore(state => state.doctors);
  const filtered = doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase()));

  const renderDoctor = ({ item }: { item: typeof doctors[0] }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DoctorDetail', { doctor: item })} style={styles.card} activeOpacity={0.7}>
      <View style={styles.avatar}><Text style={styles.avatarText}>{item.name.split(' ').slice(1).map(n => n[0]).join('')}</Text></View>
      <View style={styles.cardContent}>
        <View style={styles.cardTopRow}>
          <Text style={styles.doctorName}>{item.name}</Text>
          <Badge text={item.available ? 'Available' : 'Busy'} variant={item.available ? 'success' : 'default'} />
        </View>
        <Text style={styles.specialization}>{item.specialization}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}><Ionicons name="star" size={12} color="#F59E0B" /><Text style={styles.metaText}>{item.rating}</Text></View>
          <View style={styles.metaItem}><Ionicons name="people" size={12} color={colors.gray500} /><Text style={styles.metaText}>{item.patients}</Text></View>
          <View style={styles.metaItem}><Ionicons name="time" size={12} color={colors.gray500} /><Text style={styles.metaText}>{item.experience}y</Text></View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Doctors</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddDoctor')}><Ionicons name="add-circle" size={24} color={colors.primary} /></TouchableOpacity>
      </View>
      <View style={styles.searchSection}><SearchBar value={search} onChangeText={setSearch} placeholder="Search doctors..." /></View>
      <FlatList data={filtered} renderItem={renderDoctor} keyExtractor={item => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
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
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder, ...Shadows.sm },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primaryBg, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  avatarText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: colors.primary },
  cardContent: { flex: 1 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  doctorName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  specialization: { fontSize: FontSize.sm, color: colors.textSecondary, marginTop: 2 },
  metaRow: { flexDirection: 'row', marginTop: Spacing.sm, gap: Spacing.md },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontSize: FontSize.xs, color: colors.gray500 },
});
