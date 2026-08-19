import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme, Spacing, FontSize, BorderRadius } from '../lib/theme';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  const { colors, isDark } = useTheme();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          { 
            backgroundColor: isDark ? colors.gray800 : colors.gray100,
            color: colors.text,
            borderColor: error ? colors.danger : colors.border
          }
        ]}
        placeholderTextColor={colors.gray400}
        {...props}
      />
      {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.md,
  },
  error: {
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
  }
});
