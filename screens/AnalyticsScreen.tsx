import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';

const monthlyData = [
  { month: 'Aug', revenue: 85000 }, { month: 'Sep', revenue: 92000 }, { month: 'Oct', revenue: 98000 },
  { month: 'Nov', revenue: 95000 }, { month: 'Dec', revenue: 108000 }, { month: 'Jan', revenue: 125000 },
];

const departmentStats = [
  { name: 'Cardiology', patients: 145, color: '#2563EB' },
  { name: 'Neurology', patients: 98, color: '#0891B2' },
  { name: 'Orthopedics', patients: 112, color: '#E11D48' },
  { name: 'Pediatrics', patients: 180, color: '#D97706' },
  { name: 'Dermatology', patients: 95, color: '#7C3AED' },
];

const kpis = [
  { label: 'Patient Satisfaction', value: '94%', icon: 'happy' as const, color: '#059669', change: '+2.3%' },
  { label: 'Avg Wait Time', value: '18 min', icon: 'time' as const, color: '#D97706', change: '-5 min' },
  { label: 'Bed Occupancy', value: '78%', icon: 'bed' as const, color: '#2563EB', change: '+3%' },
  { label: 'Readmission Rate', value: '4.2%', icon: 'refresh' as const, color: '#DC2626', change: '-0.8%' },
];

export default function AnalyticsScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
  const maxPatients = Math.max(...departmentStats.map(d => d.patients));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <TouchableOpacity><Ionicons name="calendar-outline" size={24} color={colors.primary} /></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}><Text style={styles.summaryValue}>₹125K</Text><Text style={styles.summaryLabel}>Revenue</Text><View style={styles.changeRow}><Ionicons name="trending-up" size={12} color={colors.success} /><Text style={[styles.changeText, { color: colors.success }]}>+15.8%</Text></View></View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}><Text style={styles.summaryValue}>560</Text><Text style={styles.summaryLabel}>Patients</Text><View style={styles.changeRow}><Ionicons name="trending-up" size={12} color={colors.success} /><Text style={[styles.changeText, { color: colors.success }]}>+5.7%</Text></View></View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}><Text style={styles.summaryValue}>48</Text><Text style={styles.summaryLabel}>Today</Text><View style={styles.changeRow}><Ionicons name="trending-up" size={12} color={colors.success} /><Text style={[styles.changeText, { color: colors.success }]}>+12%</Text></View></View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Trend</Text>
          <View style={styles.chartCard}>
            <View style={styles.barChart}>
              {monthlyData.map((d, i) => (
                <View key={i} style={styles.barColumn}>
                  <Text style={styles.barValue}>₹{(d.revenue / 1000).toFixed(0)}K</Text>
                  <View style={[styles.bar, { height: (d.revenue / maxRevenue) * 120, backgroundColor: i === monthlyData.length - 1 ? colors.primary : colors.primary + '60' }]} />
                  <Text style={styles.barLabel}>{d.month}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
          <View style={styles.kpiGrid}>
            {kpis.map((kpi, i) => (
              <View key={i} style={styles.kpiCard}>
                <View style={[styles.kpiIcon, { backgroundColor: kpi.color + '20' }]}><Ionicons name={kpi.icon} size={22} color={kpi.color} /></View>
                <Text style={styles.kpiValue}>{kpi.value}</Text>
                <Text style={styles.kpiLabel}>{kpi.label}</Text>
                <Text style={[styles.kpiChange, { color: colors.success }]}>{kpi.change}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>Department Performance</Text>
          {departmentStats.map((dept, i) => (
            <View key={i} style={styles.deptRow}>
              <View style={styles.deptInfo}><View style={[styles.deptDot, { backgroundColor: dept.color }]} /><Text style={styles.deptName}>{dept.name}</Text></View>
              <View style={styles.deptBarContainer}><View style={[styles.deptBar, { width: `${(dept.patients / maxPatients) * 100}%`, backgroundColor: dept.color }]} /></View>
              <Text style={styles.deptValue}>{dept.patients}</Text>
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
  scroll: { paddingBottom: Spacing.xxl },
  summaryCard: { backgroundColor: colors.surface, margin: Spacing.xl, padding: Spacing.xl, borderRadius: BorderRadius.lg, ...Shadows.md, borderWidth: 1, borderColor: colors.cardBorder },
  summaryRow: { flexDirection: 'row', alignItems: 'center' },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryDivider: { width: 1, height: 50, backgroundColor: colors.border },
  summaryValue: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: colors.text },
  summaryLabel: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 2 },
  changeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  changeText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, marginLeft: 2 },
  section: { paddingHorizontal: Spacing.xl, marginTop: Spacing.xl },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text, marginBottom: Spacing.md },
  chartCard: { backgroundColor: colors.surface, padding: Spacing.xl, borderRadius: BorderRadius.lg, ...Shadows.sm, borderWidth: 1, borderColor: colors.cardBorder },
  barChart: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 180 },
  barColumn: { alignItems: 'center' },
  barValue: { fontSize: FontSize.xs, color: colors.gray500, marginBottom: 4 },
  bar: { width: 28, borderRadius: 4 },
  barLabel: { fontSize: FontSize.xs, color: colors.gray500, marginTop: 6 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  kpiCard: { width: '47%', backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, ...Shadows.sm, borderWidth: 1, borderColor: colors.cardBorder },
  kpiIcon: { width: 40, height: 40, borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  kpiValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  kpiLabel: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 2 },
  kpiChange: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, marginTop: 4 },
  deptRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: Spacing.md, borderRadius: BorderRadius.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: colors.cardBorder },
  deptInfo: { flexDirection: 'row', alignItems: 'center', width: 110 },
  deptDot: { width: 8, height: 8, borderRadius: 4, marginRight: Spacing.sm },
  deptName: { fontSize: FontSize.sm, color: colors.text, fontWeight: FontWeight.medium },
  deptBarContainer: { flex: 1, height: 8, backgroundColor: colors.gray100, borderRadius: 4, marginHorizontal: Spacing.md },
  deptBar: { height: 8, borderRadius: 4 },
  deptValue: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: colors.text, width: 40, textAlign: 'right' },
});
