import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';
import Badge from '../components/Badge';

export default function BillDetailScreen({ route, navigation }: { route: any; navigation: any }) {
  const { bill } = route.params;
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (!bill) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return { text: 'Paid', variant: 'success' as const };
      case 'pending': return { text: 'Pending', variant: 'warning' as const };
      case 'overdue': return { text: 'Overdue', variant: 'danger' as const };
      case 'partial': return { text: 'Partial', variant: 'info' as const };
      default: return { text: status, variant: 'default' as const };
    }
  };

  const badge = getStatusBadge(bill.status);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoice Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerCard}>
          <View style={styles.statusRow}>
            <Text style={styles.billId}>{bill.id}</Text>
            <Badge text={badge.text} variant={badge.variant} />
          </View>
          <Text style={styles.totalText}>${bill.total.toFixed(2)}</Text>
          <Text style={styles.patientName}>Patient: {bill.patientName}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Invoice Info</Text>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Invoice Date:</Text><Text style={styles.infoValue}>{bill.date}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Due Date:</Text><Text style={[styles.infoValue, bill.status === 'overdue' && { color: colors.danger }]}>{bill.dueDate}</Text></View>
          {bill.paymentMethod && <View style={styles.infoRow}><Text style={styles.infoLabel}>Payment Method:</Text><Text style={styles.infoValue}>{bill.paymentMethod}</Text></View>}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Itemized Charges</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCol, { flex: 2 }]}>Description</Text>
            <Text style={[styles.tableCol, { flex: 1, textAlign: 'center' }]}>Qty</Text>
            <Text style={[styles.tableCol, { flex: 1, textAlign: 'right' }]}>Amount</Text>
          </View>
          
          {bill.items.map((item: any, idx: number) => (
            <View key={idx} style={styles.tableRow}>
              <View style={{ flex: 2 }}>
                <Text style={styles.itemName}>{item.description}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
              </View>
              <Text style={[styles.itemText, { flex: 1, textAlign: 'center' }]}>{item.quantity}</Text>
              <Text style={[styles.itemText, { flex: 1, textAlign: 'right' }]}>${item.total.toFixed(2)}</Text>
            </View>
          ))}
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>${bill.subtotal.toFixed(2)}</Text></View>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Tax</Text><Text style={styles.summaryValue}>${bill.tax.toFixed(2)}</Text></View>
            {bill.discount > 0 && <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Discount</Text><Text style={[styles.summaryValue, { color: colors.success }]}>-${bill.discount.toFixed(2)}</Text></View>}
            
            <View style={styles.divider} />
            <View style={styles.summaryRow}><Text style={[styles.summaryLabel, { fontWeight: 'bold' }]}>Total</Text><Text style={[styles.summaryValue, { fontWeight: 'bold', fontSize: FontSize.lg }]}>${bill.total.toFixed(2)}</Text></View>
          </View>
        </View>

        {bill.insuranceClaim && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Insurance Coverage</Text>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Covered Amount</Text><Text style={styles.summaryValue}>${bill.insuranceAmount?.toFixed(2)}</Text></View>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Patient Responsibility</Text><Text style={styles.summaryValue}>${bill.patientAmount?.toFixed(2)}</Text></View>
          </View>
        )}
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
  headerCard: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder, alignItems: 'center' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: Spacing.sm },
  billId: { fontSize: FontSize.sm, color: colors.textSecondary, fontWeight: FontWeight.semibold },
  totalText: { fontSize: 32, fontWeight: FontWeight.bold, color: colors.primary, marginVertical: Spacing.xs },
  patientName: { fontSize: FontSize.md, color: colors.textSecondary },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text, marginBottom: Spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  infoLabel: { fontSize: FontSize.sm, color: colors.textSecondary, width: 120 },
  infoValue: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: colors.text, flex: 1 },
  tableHeader: { flexDirection: 'row', paddingBottom: Spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border, marginBottom: Spacing.sm },
  tableCol: { fontSize: FontSize.xs, color: colors.textSecondary, fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.gray100 },
  itemName: { fontSize: FontSize.sm, color: colors.text, fontWeight: '500' },
  itemCategory: { fontSize: FontSize.xs, color: colors.textSecondary },
  itemText: { fontSize: FontSize.sm, color: colors.text },
  summaryContainer: { marginTop: Spacing.lg, paddingTop: Spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  summaryLabel: { fontSize: FontSize.sm, color: colors.textSecondary },
  summaryValue: { fontSize: FontSize.sm, color: colors.text, fontWeight: '500' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: Spacing.sm },
});
