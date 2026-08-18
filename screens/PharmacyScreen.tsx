import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { mockPharmacy } from '../lib/data';
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge';

export default function PharmacyScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState('');
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const filtered = mockPharmacy.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }: { item: typeof mockPharmacy[0] }) => {
    const lowStock = item.stock < item.minStock;
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.medIcon}><Ionicons name="medical" size={22} color={colors.secondary} /></View>
          <View style={styles.cardHeaderInfo}>
            <Text style={styles.medName}>{item.name}</Text>
            <Text style={styles.medCategory}>{item.category}</Text>
          </View>
          <Badge text={item.prescription ? 'Rx' : 'OTC'} variant={item.prescription ? 'info' : 'success'} />
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.detailItem}><Text style={styles.detailLabel}>Stock</Text><Text style={[styles.detailValue, { color: lowStock ? colors.danger : colors.success }]}>{item.stock}</Text></View>
          <View style={styles.detailItem}><Text style={styles.detailLabel}>Price</Text><Text style={styles.detailValue}>₹{item.price.toFixed(2)}</Text></View>
        </View>
        {lowStock && <View style={styles.lowStockBanner}><Ionicons name="warning" size={14} color={colors.danger} /><Text style={styles.lowStockText}>Low Stock Alert</Text></View>}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Pharmacy</Text>
        <TouchableOpacity><Ionicons name="add-circle" size={24} color={colors.primary} /></TouchableOpacity>
      </View>
      <View style={styles.searchSection}><SearchBar value={search} onChangeText={setSearch} placeholder="Search medicines..." /></View>
      <FlatList data={filtered} renderItem={renderItem} keyExtractor={item => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
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
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  medIcon: { width: 44, height: 44, borderRadius: BorderRadius.md, backgroundColor: colors.secondaryBg, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  cardHeaderInfo: { flex: 1 },
  medName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  medCategory: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 2 },
  cardDetails: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  detailItem: { alignItems: 'center' },
  detailLabel: { fontSize: FontSize.xs, color: colors.textSecondary, marginBottom: 2 },
  detailValue: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: colors.text },
  lowStockBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.dangerBg, padding: Spacing.sm, borderRadius: BorderRadius.sm, marginTop: Spacing.md },
  lowStockText: { fontSize: FontSize.xs, color: colors.danger, fontWeight: FontWeight.semibold, marginLeft: Spacing.xs },
});
