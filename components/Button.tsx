import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { useTheme, Spacing, FontSize, BorderRadius } from '../lib/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

export default function Button({ title, variant = 'primary', loading, style, disabled, ...props }: ButtonProps) {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.gray300;
    if (variant === 'secondary') return colors.secondary;
    if (variant === 'danger') return colors.danger;
    return colors.primary;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        style
      ]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={[styles.text, { color: colors.white }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
  },
  text: {
    fontSize: FontSize.md,
    fontWeight: '600',
  }
});
