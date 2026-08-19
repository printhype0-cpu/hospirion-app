import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';
import Badge from '../components/Badge';

export default function OPDScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const queue = [
    { id: 'Q01', patient: 'Alice Brown', doctor: 'Dr. Sarah Jenkins', status: 'consulting', time: '09:15 AM' },
    { id: 'Q02', patient: 'Mark Davis', doctor: 'Dr. Sarah Jenkins', status: 'waiting', time: '09:30 AM', estWait: '15 mins' },
    { id: 'Q03', patient: 'Sophie Taylor', doctor: 'Dr. Michael Chen', status: 'waiting', time: '09:45 AM', estWait: '30 mins' },
    { id: 'Q04', patient: 'James Wilson', doctor: 'Dr. Robert Smith', status: 'completed', time: '08:45 AM' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>OPD Queue</Text>
        <TouchableOpacity onPress={() => {}}><Ionicons name="add-circle" size={24} color={colors.primary} /></TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Waiting</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Consulting</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>28</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Current Queue</Text>
        
        {queue.map(item => (
          <View key={item.id} style={[styles.card, item.status === 'consulting' && { borderColor: colors.primary, borderWidth: 2 }]}>
            <View style={styles.cardHeader}>
              <View style={styles.tokenBox}>
                <Text style={styles.tokenText}>{item.id}</Text>
              </View>
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>{item.patient}</Text>
                <Text style={styles.doctorName}>with {item.doctor}</Text>
              </View>
              <Badge 
                text={item.status === 'consulting' ? 'In Room' : item.status === 'waiting' ? 'Waiting' : 'Done'} 
                variant={item.status === 'consulting' ? 'success' : item.status === 'waiting' ? 'warning' : 'default'} 
              />
            </View>
            
            {item.status === 'waiting' && (
              <View style={styles.waitInfo}>
                <Ionicons name="time-outline" size={16} color={colors.warning} />
                <Text style={styles.waitText}>Est. Wait: {item.estWait}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  backBtn: { padding: Spacing.xs, width: 40 },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  statsRow: { flexDirection: 'row', paddingHorizontal: Spacing.lg, marginBottom: Spacing.md, gap: Spacing.sm },
  statBox: { flex: 1, backgroundColor: colors.surface, padding: Spacing.md, borderRadius: BorderRadius.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  statValue: { fontSize: FontSize.xl, fontWeight: 'bold', color: colors.primary },
  statLabel: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 4 },
  content: { padding: Spacing.lg },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text, marginBottom: Spacing.md },
  card: { backgroundColor: colors.surface, padding: Spacing.md, borderRadius: BorderRadius.lg, marginBottom: Spacing.sm, borderWidth: 1, borderColor: colors.cardBorder },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  tokenBox: { backgroundColor: colors.gray100, paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: 4, marginRight: Spacing.md },
  tokenText: { fontSize: FontSize.md, fontWeight: 'bold', color: colors.text },
  patientInfo: { flex: 1 },
  patientName: { fontSize: FontSize.md, fontWeight: 'bold', color: colors.text },
  doctorName: { fontSize: FontSize.sm, color: colors.textSecondary },
  waitInfo: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  waitText: { fontSize: FontSize.sm, color: colors.warning, marginLeft: 4, fontWeight: '500' },
});
