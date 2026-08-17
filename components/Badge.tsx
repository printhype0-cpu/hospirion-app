import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default' | 'purple';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
}

export default function Badge({ text, variant = 'default' }: BadgeProps) {
  const { colors } = useTheme();
  
  const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
    success: { bg: colors.successBg, text: colors.success },
    warning: { bg: colors.warningBg, text: colors.warning },
    danger: { bg: colors.dangerBg, text: colors.danger },
    info: { bg: colors.infoBg, text: colors.info },
    default: { bg: colors.gray100, text: colors.gray600 },
    purple: { bg: colors.accentBg, text: colors.accent },
  };

  const vs = variantStyles[variant];
  const styles = createStyles();

  return (
    <View style={[styles.badge, { backgroundColor: vs.bg }]}>
      <Text style={[styles.text, { color: vs.text }]}>{text}</Text>
    </View>
  );
}

const createStyles = () => StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    textTransform: 'capitalize',
  },
});
