import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  // Mock bar chart data
  const weeklyData = [
    { day: 'Mon', patients: 45, height: 60 },
    { day: 'Tue', patients: 52, height: 80 },
    { day: 'Wed', patients: 38, height: 50 },
    { day: 'Thu', patients: 65, height: 100 },
    { day: 'Fri', patients: 48, height: 70 },
    { day: 'Sat', patients: 25, height: 30 },
    { day: 'Sun', patients: 15, height: 20 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics Dashboard</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Patient Flow</Text>
          <View style={styles.chartContainer}>
            {weeklyData.map((d, i) => (
              <View key={i} style={styles.barWrapper}>
                <Text style={styles.barValue}>{d.patients}</Text>
                <View style={[styles.bar, { height: d.height, backgroundColor: colors.primary }]} />
                <Text style={styles.barLabel}>{d.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.card, { flex: 1, marginRight: Spacing.sm }]}>
            <Text style={styles.cardTitle}>Avg Wait Time</Text>
            <Text style={styles.bigStat}>18<Text style={styles.statUnit}> min</Text></Text>
            <Text style={[styles.trend, { color: colors.success }]}><Ionicons name="arrow-down" /> 2 mins</Text>
          </View>
          <View style={[styles.card, { flex: 1, marginLeft: Spacing.sm }]}>
            <Text style={styles.cardTitle}>Bed Occupancy</Text>
            <Text style={styles.bigStat}>82<Text style={styles.statUnit}>%</Text></Text>
            <Text style={[styles.trend, { color: colors.danger }]}><Ionicons name="arrow-up" /> 5%</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Department Performance</Text>
          
          <View style={styles.progressRow}>
            <View style={styles.progressHeader}><Text style={styles.depName}>Cardiology</Text><Text style={styles.depScore}>94%</Text></View>
            <View style={styles.progressBg}><View style={[styles.progressFill, { width: '94%', backgroundColor: colors.success }]} /></View>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.progressHeader}><Text style={styles.depName}>Orthopedics</Text><Text style={styles.depScore}>88%</Text></View>
            <View style={styles.progressBg}><View style={[styles.progressFill, { width: '88%', backgroundColor: colors.primary }]} /></View>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.progressHeader}><Text style={styles.depName}>Pediatrics</Text><Text style={styles.depScore}>76%</Text></View>
            <View style={styles.progressBg}><View style={[styles.progressFill, { width: '76%', backgroundColor: colors.warning }]} /></View>
          </View>
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
  content: { padding: Spacing.lg },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder },
  cardTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text, marginBottom: Spacing.md },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 150, paddingTop: 20 },
  barWrapper: { alignItems: 'center', flex: 1 },
  bar: { width: 12, borderRadius: 6, marginVertical: Spacing.xs },
  barLabel: { fontSize: FontSize.xs, color: colors.textSecondary },
  barValue: { fontSize: FontSize.xs, color: colors.textSecondary, marginBottom: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  bigStat: { fontSize: 32, fontWeight: FontWeight.bold, color: colors.text, marginVertical: Spacing.sm },
  statUnit: { fontSize: FontSize.md, color: colors.textSecondary, fontWeight: 'normal' },
  trend: { fontSize: FontSize.sm, fontWeight: FontWeight.medium },
  progressRow: { marginBottom: Spacing.md },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs },
  depName: { fontSize: FontSize.sm, color: colors.text },
  depScore: { fontSize: FontSize.sm, fontWeight: 'bold', color: colors.text },
  progressBg: { height: 8, backgroundColor: colors.gray200, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
});
