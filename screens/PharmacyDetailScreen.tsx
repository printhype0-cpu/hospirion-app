import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';
import Badge from '../components/Badge';

export default function PharmacyDetailScreen({ route, navigation }: { route: any; navigation: any }) {
  const { item } = route.params;
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (!item) return null;

  const lowStock = item.stock < item.minStock;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medicine Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="medical" size={40} color={colors.secondary} />
          </View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.genericName}</Text>
          <View style={styles.statusBadge}>
            <Badge text={item.prescription ? 'Prescription Required' : 'Over the Counter (OTC)'} variant={item.prescription ? 'info' : 'success'} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Inventory Details</Text>
          <View style={styles.infoRow}><Ionicons name="pricetag" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>Price: ₹{item.price.toFixed(2)}</Text></View>
          <View style={styles.infoRow}><Ionicons name="layers" size={16} color={colors.textSecondary} /><Text style={[styles.infoText, lowStock && { color: colors.danger, fontWeight: 'bold' }]}>Current Stock: {item.stock} (Min: {item.minStock})</Text></View>
          <View style={styles.infoRow}><Ionicons name="business" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>Manufacturer: {item.manufacturer}</Text></View>
          <View style={styles.infoRow}><Ionicons name="calendar" size={16} color={colors.textSecondary} /><Text style={styles.infoText}>Expiry Date: {item.expiryDate}</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Usage Information</Text>
          <Text style={styles.label}>Dosage</Text>
          <Text style={styles.description}>{item.dosage}</Text>
          
          {item.sideEffects && item.sideEffects.length > 0 && (
            <>
              <Text style={[styles.label, { marginTop: Spacing.md }]}>Side Effects</Text>
              <View style={styles.chipContainer}>
                {item.sideEffects.map((s: string, i: number) => (
                  <View key={i} style={styles.chip}><Text style={styles.chipText}>{s}</Text></View>
                ))}
              </View>
            </>
          )}

          {item.interactions && item.interactions.length > 0 && (
            <>
              <Text style={[styles.label, { marginTop: Spacing.md }]}>Interactions</Text>
              <View style={styles.chipContainer}>
                {item.interactions.map((inter: string, i: number) => (
                  <View key={i} style={[styles.chip, { backgroundColor: colors.warningBg }]}><Text style={[styles.chipText, { color: colors.warning }]}>{inter}</Text></View>
                ))}
              </View>
            </>
          )}
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
  content: { padding: Spacing.xl },
  profileSection: { alignItems: 'center', marginBottom: Spacing.xl },
  avatar: { width: 80, height: 80, borderRadius: 16, backgroundColor: colors.secondaryBg, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  name: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: colors.text, marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: FontSize.md, color: colors.textSecondary, marginBottom: Spacing.sm },
  statusBadge: { marginTop: Spacing.sm },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text, marginBottom: Spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  infoText: { fontSize: FontSize.md, color: colors.textSecondary, marginLeft: Spacing.sm, flex: 1 },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: colors.text, marginBottom: Spacing.xs },
  description: { fontSize: FontSize.md, color: colors.textSecondary, lineHeight: 22 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  chip: { backgroundColor: colors.gray100, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full },
  chipText: { fontSize: FontSize.sm, color: colors.textSecondary },
});
