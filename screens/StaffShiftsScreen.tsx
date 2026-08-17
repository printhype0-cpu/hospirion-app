import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { mockShifts } from '../lib/data';
import Badge from '../components/Badge';

export default function StaffShiftsScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return { text: 'Active', variant: 'success' as const };
      case 'scheduled': return { text: 'Scheduled', variant: 'info' as const };
      case 'completed': return { text: 'Completed', variant: 'default' as const };
      default: return { text: status, variant: 'default' as const };
    }
  };

  const renderItem = ({ item }: { item: typeof mockShifts[0] }) => {
    const badge = getStatusBadge(item.status);
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.staffIcon}><Ionicons name={item.staffRole === 'Doctor' ? 'medkit' : 'heart-pulse'} size={20} color={item.staffRole === 'Doctor' ? colors.secondary : '#E11D48'} /></View>
          <View style={styles.cardHeaderInfo}><Text style={styles.staffName}>{item.staffName}</Text><Text style={styles.staffRole}>{item.staffRole} • {item.department}</Text></View>
          <Badge text={badge.text} variant={badge.variant} />
        </View>
        <View style={styles.shiftDetails}>
          <View style={styles.shiftDetail}><Ionicons name="calendar-outline" size={14} color={colors.gray500} /><Text style={styles.shiftDetailText}>{item.date}</Text></View>
          <View style={styles.shiftDetail}><Ionicons name="time-outline" size={14} color={colors.gray500} /><Text style={styles.shiftDetailText}>{item.startTime} - {item.endTime}</Text></View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Staff & Shifts</Text>
        <TouchableOpacity><Ionicons name="add-circle" size={24} color={colors.primary} /></TouchableOpacity>
      </View>
      <FlatList data={mockShifts} renderItem={renderItem} keyExtractor={item => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  backBtn: { padding: Spacing.xs, width: 40 },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  list: { padding: Spacing.xl, paddingTop: 0 },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder, ...Shadows.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  staffIcon: { width: 44, height: 44, borderRadius: BorderRadius.md, backgroundColor: colors.gray100, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  cardHeaderInfo: { flex: 1 },
  staffName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  staffRole: { fontSize: FontSize.sm, color: colors.textSecondary, marginTop: 2 },
  shiftDetails: { flexDirection: 'row', gap: Spacing.lg, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  shiftDetail: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  shiftDetailText: { fontSize: FontSize.sm, color: colors.gray600 },
});
