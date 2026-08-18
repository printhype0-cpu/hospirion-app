import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {  View, Text, StyleSheet, FlatList, TouchableOpacity , Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { mockBills } from '../lib/data';
import Badge from '../components/Badge';

export default function BillingScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const totalRevenue = mockBills.reduce((sum, b) => sum + b.total, 0);
  const paidAmount = mockBills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.total, 0);
  const pendingAmount = mockBills.filter(b => b.status === 'pending' || b.status === 'overdue').reduce((sum, b) => sum + b.total, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return { text: 'Paid', variant: 'success' as const };
      case 'pending': return { text: 'Pending', variant: 'warning' as const };
      case 'overdue': return { text: 'Overdue', variant: 'danger' as const };
      default: return { text: status, variant: 'default' as const };
    }
  };

  const renderBill = ({ item }: { item: typeof mockBills[0] }) => {
    const badge = getStatusBadge(item.status);
    return (
      <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'This action will be fully functional in the next update!')} style={styles.card} activeOpacity={0.7}>
        <View style={styles.cardTop}>
          <View><Text style={styles.billId}>{item.id}</Text><Text style={styles.patientName}>{item.patientName}</Text></View>
          <Badge text={badge.text} variant={badge.variant} />
        </View>
        <View style={styles.cardMiddle}><Text style={styles.dateText}>{item.date}</Text><Text style={styles.itemsCount}>{item.items.length} items</Text></View>
        <View style={styles.cardBottom}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalAmount}>₹{item.total.toFixed(2)}</Text></View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Billing</Text>
        <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'This action will be fully functional in the next update!')}><Ionicons name="add-circle" size={24} color={colors.primary} /></TouchableOpacity>
      </View>
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}><Ionicons name="trending-up" size={20} color={colors.success} /><Text style={styles.summaryValue}>₹{totalRevenue.toFixed(0)}</Text><Text style={styles.summaryLabel}>Total</Text></View>
        <View style={styles.summaryCard}><Ionicons name="checkmark-circle" size={20} color={colors.primary} /><Text style={styles.summaryValue}>₹{paidAmount.toFixed(0)}</Text><Text style={styles.summaryLabel}>Collected</Text></View>
        <View style={styles.summaryCard}><Ionicons name="time" size={20} color={colors.warning} /><Text style={styles.summaryValue}>₹{pendingAmount.toFixed(0)}</Text><Text style={styles.summaryLabel}>Pending</Text></View>
      </View>
      <FlatList data={mockBills} renderItem={renderBill} keyExtractor={item => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  backBtn: { padding: Spacing.xs, width: 40 },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  summaryRow: { flexDirection: 'row', paddingHorizontal: Spacing.xl, gap: Spacing.md, marginBottom: Spacing.xl },
  summaryCard: { flex: 1, backgroundColor: colors.surface, padding: Spacing.md, borderRadius: BorderRadius.md, alignItems: 'center', borderWidth: 1, borderColor: colors.cardBorder, ...Shadows.sm },
  summaryValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text, marginTop: 4 },
  summaryLabel: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 2 },
  list: { padding: Spacing.xl, paddingTop: 0 },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder, ...Shadows.sm },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.sm },
  billId: { fontSize: FontSize.xs, color: colors.gray400, fontWeight: FontWeight.medium },
  patientName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text, marginTop: 2 },
  cardMiddle: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md },
  dateText: { fontSize: FontSize.sm, color: colors.textSecondary },
  itemsCount: { fontSize: FontSize.sm, color: colors.gray500 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  totalLabel: { fontSize: FontSize.sm, color: colors.textSecondary },
  totalAmount: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.primary },
});
