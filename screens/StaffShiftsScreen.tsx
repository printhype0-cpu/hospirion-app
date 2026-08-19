import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';
import Badge from '../components/Badge';

export default function StaffShiftsScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const shifts = [
    { id: '1', name: 'Dr. Sarah Jenkins', role: 'Cardiologist', shift: 'Morning', time: '08:00 AM - 04:00 PM', status: 'active' },
    { id: '2', name: 'Nurse Emma Watson', role: 'Head Nurse', shift: 'Morning', time: '07:00 AM - 03:00 PM', status: 'active' },
    { id: '3', name: 'Dr. Michael Chen', role: 'Neurologist', shift: 'Evening', time: '04:00 PM - 12:00 AM', status: 'upcoming' },
    { id: '4', name: 'Nurse John Doe', role: 'ICU Nurse', shift: 'Evening', time: '03:00 PM - 11:00 PM', status: 'upcoming' },
    { id: '5', name: 'Dr. Robert Smith', role: 'ER Physician', shift: 'Night', time: '12:00 AM - 08:00 AM', status: 'off' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Staff Shifts</Text>
        <TouchableOpacity onPress={() => {}}><Ionicons name="calendar" size={24} color={colors.primary} /></TouchableOpacity>
      </View>

      <View style={styles.dateSelector}>
        <Text style={styles.dateText}>Today, Oct 24</Text>
        <Ionicons name="chevron-down" size={16} color={colors.text} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {shifts.map(shift => (
          <View key={shift.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.nameRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{shift.name.split(' ').map(n => n[0]).join('').substring(0,2)}</Text>
                </View>
                <View>
                  <Text style={styles.staffName}>{shift.name}</Text>
                  <Text style={styles.staffRole}>{shift.role}</Text>
                </View>
              </View>
              <Badge 
                text={shift.status === 'active' ? 'On Duty' : shift.status === 'upcoming' ? 'Upcoming' : 'Off Duty'} 
                variant={shift.status === 'active' ? 'success' : shift.status === 'upcoming' ? 'info' : 'default'} 
              />
            </View>
            
            <View style={styles.shiftDetails}>
              <View style={styles.shiftInfo}>
                <Ionicons name="sunny-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.shiftText}>{shift.shift} Shift</Text>
              </View>
              <View style={styles.shiftInfo}>
                <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.shiftText}>{shift.time}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  backBtn: { padding: Spacing.xs },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  dateSelector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.sm, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  dateText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text, marginRight: 4 },
  content: { padding: Spacing.lg },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryBg, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm },
  avatarText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: colors.primary },
  staffName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  staffRole: { fontSize: FontSize.sm, color: colors.textSecondary },
  shiftDetails: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  shiftInfo: { flexDirection: 'row', alignItems: 'center' },
  shiftText: { fontSize: FontSize.sm, color: colors.textSecondary, marginLeft: 4 },
});
