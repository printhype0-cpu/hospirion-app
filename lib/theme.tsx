import React, { createContext, useContext, useState, ReactNode } from 'react';

// Light Theme Colors
const lightColors = {
  primary: '#2563EB',
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  primaryBg: '#EFF6FF',
  secondary: '#0891B2',
  secondaryLight: '#06B6D4',
  secondaryBg: '#ECFEFF',
  accent: '#7C3AED',
  accentLight: '#8B5CF6',
  accentBg: '#F5F3FF',
  success: '#059669',
  successLight: '#10B981',
  successBg: '#ECFDF5',
  warning: '#D97706',
  warningLight: '#F59E0B',
  warningBg: '#FFFBEB',
  danger: '#DC2626',
  dangerLight: '#EF4444',
  dangerBg: '#FEF2F2',
  info: '#2563EB',
  infoLight: '#3B82F6',
  infoBg: '#EFF6FF',
  white: '#FFFFFF',
  black: '#0F172A',
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  gray900: '#0F172A',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E2E8F0',
  divider: '#F1F5F9',
  text: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',
  headerBg: '#FFFFFF',
  tabBarBg: '#FFFFFF',
  tabBarBorder: '#E2E8F0',
  inputBg: '#F1F5F9',
  cardBorder: '#E2E8F0',
  overlayBg: 'rgba(0,0,0,0.5)',
  statusBarStyle: 'dark' as const,
};

// Dark Theme Colors
const darkColors = {
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  primaryDark: '#2563EB',
  primaryBg: '#1E3A5F',
  secondary: '#06B6D4',
  secondaryLight: '#22D3EE',
  secondaryBg: '#164E63',
  accent: '#8B5CF6',
  accentLight: '#A78BFA',
  accentBg: '#2E1065',
  success: '#10B981',
  successLight: '#34D399',
  successBg: '#064E3B',
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  warningBg: '#78350F',
  danger: '#EF4444',
  dangerLight: '#F87171',
  dangerBg: '#7F1D1D',
  info: '#3B82F6',
  infoLight: '#60A5FA',
  infoBg: '#1E3A5F',
  white: '#FFFFFF',
  black: '#0F172A',
  gray50: '#1E293B',
  gray100: '#1E293B',
  gray200: '#334155',
  gray300: '#475569',
  gray400: '#64748B',
  gray500: '#94A3B8',
  gray600: '#CBD5E1',
  gray700: '#E2E8F0',
  gray800: '#F1F5F9',
  gray900: '#F8FAFC',
  background: '#0F172A',
  surface: '#1E293B',
  card: '#1E293B',
  border: '#334155',
  divider: '#334155',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  textInverse: '#0F172A',
  headerBg: '#1E293B',
  tabBarBg: '#1E293B',
  tabBarBorder: '#334155',
  inputBg: '#334155',
  cardBorder: '#334155',
  overlayBg: 'rgba(0,0,0,0.7)',
  statusBarStyle: 'light' as const,
};

type ThemeColors = typeof lightColors;

interface ThemeContextType {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// Re-export for backward compatibility
export const Shadows = {
  none: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  xl: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  hero: 32,
  display: 40,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

// Legacy Colors export for backward compatibility (will use light theme)
export const Colors = lightColors;
