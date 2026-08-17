import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgColor: string;
  trend?: string;
  trendUp?: boolean;
  onPress?: () => void;
  small?: boolean;
}

export default function StatCard({ title, value, icon, color, bgColor, trend, trendUp, onPress, small }: StatCardProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const content = (
    <View style={[styles.card, small && styles.cardSmall]}>
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        <Ionicons name={icon} size={small ? 20 : 24} color={color} />
      </View>
      <Text style={[styles.value, small && styles.valueSmall]} numberOfLines={1}>{value}</Text>
      <Text style={[styles.title, small && styles.titleSmall]} numberOfLines={1}>{title}</Text>
      {trend && (
        <View style={styles.trendRow}>
          <Ionicons name={trendUp ? 'trending-up' : 'trending-down'} size={12} color={trendUp ? colors.success : colors.danger} />
          <Text style={[styles.trend, { color: trendUp ? colors.success : colors.danger }]}>{trend}</Text>
        </View>
      )}
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ flex: 1 }}>{content}</TouchableOpacity>;
  }
  return <View style={{ flex: 1 }}>{content}</View>;
}

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.xs,
    ...Shadows.md,
    minWidth: 140,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  cardSmall: {
    padding: Spacing.md,
    minWidth: 110,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  value: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: colors.text,
    marginBottom: 2,
  },
  valueSmall: {
    fontSize: FontSize.xl,
  },
  title: {
    fontSize: FontSize.sm,
    color: colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  titleSmall: {
    fontSize: FontSize.xs,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  trend: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    marginLeft: 3,
  },
});
