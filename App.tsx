import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { useTheme, ThemeProvider, FontSize, Spacing, FontWeight } from './lib/theme';
import { AuthProvider, useAuth } from './lib/auth';
import { UserRole } from './lib/types';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import DoctorsScreen from './screens/DoctorsScreen';
import PatientsScreen from './screens/PatientsScreen';
import MessagesScreen from './screens/MessagesScreen';
import BillingScreen from './screens/BillingScreen';
import LabReportsScreen from './screens/LabReportsScreen';
import PharmacyScreen from './screens/PharmacyScreen';
import SettingsScreen from './screens/SettingsScreen';
import TelemedicineScreen from './screens/TelemedicineScreen';
import StaffShiftsScreen from './screens/StaffShiftsScreen';
import AIReceptionistScreen from './screens/AIReceptionistScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import OPDScreen from './screens/OPDScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabConfigs: Record<UserRole, Array<{ name: string; label: string; icon: keyof typeof Ionicons.glyphMap; component: any }>> = {
  admin: [
    { name: 'Dashboard', label: 'Home', icon: 'grid', component: DashboardScreen },
    { name: 'AppointmentsTab', label: 'Schedule', icon: 'calendar', component: AppointmentsScreen },
    { name: 'PatientsTab', label: 'Patients', icon: 'people', component: PatientsScreen },
    { name: 'MessagesTab', label: 'Messages', icon: 'chatbubbles', component: MessagesScreen },
    { name: 'MoreTab', label: 'More', icon: 'apps', component: MoreScreen },
  ],
  doctor: [
    { name: 'Dashboard', label: 'Home', icon: 'grid', component: DashboardScreen },
    { name: 'AppointmentsTab', label: 'Schedule', icon: 'calendar', component: AppointmentsScreen },
    { name: 'PatientsTab', label: 'Patients', icon: 'people', component: PatientsScreen },
    { name: 'MessagesTab', label: 'Messages', icon: 'chatbubbles', component: MessagesScreen },
    { name: 'MoreTab', label: 'More', icon: 'apps', component: MoreScreen },
  ],
  nurse: [
    { name: 'Dashboard', label: 'Home', icon: 'grid', component: DashboardScreen },
    { name: 'AppointmentsTab', label: 'Schedule', icon: 'calendar', component: AppointmentsScreen },
    { name: 'PatientsTab', label: 'Patients', icon: 'people', component: PatientsScreen },
    { name: 'MessagesTab', label: 'Messages', icon: 'chatbubbles', component: MessagesScreen },
    { name: 'MoreTab', label: 'More', icon: 'apps', component: MoreScreen },
  ],
  receptionist: [
    { name: 'Dashboard', label: 'Home', icon: 'grid', component: DashboardScreen },
    { name: 'AppointmentsTab', label: 'Schedule', icon: 'calendar', component: AppointmentsScreen },
    { name: 'DoctorsTab', label: 'Doctors', icon: 'medkit', component: DoctorsScreen },
    { name: 'MessagesTab', label: 'Messages', icon: 'chatbubbles', component: MessagesScreen },
    { name: 'MoreTab', label: 'More', icon: 'apps', component: MoreScreen },
  ],
  patient: [
    { name: 'Dashboard', label: 'Home', icon: 'grid', component: DashboardScreen },
    { name: 'AppointmentsTab', label: 'Appointments', icon: 'calendar', component: AppointmentsScreen },
    { name: 'LabReportsTab', label: 'Reports', icon: 'flask', component: LabReportsScreen },
    { name: 'MessagesTab', label: 'Messages', icon: 'chatbubbles', component: MessagesScreen },
    { name: 'MoreTab', label: 'More', icon: 'apps', component: MoreScreen },
  ],
};

function MoreScreen({ navigation }: { navigation: any }) {
  const { user, logout } = useAuth();
  const { colors } = useTheme();
  const styles = createMoreStyles(colors);
  if (!user) return null;

  const moreItems: Record<UserRole, Array<{ label: string; icon: keyof typeof Ionicons.glyphMap; color: string; screen: string }>> = {
    admin: [
      { label: 'Doctors', icon: 'medkit', color: '#E11D48', screen: 'Doctors' },
      { label: 'Billing', icon: 'receipt', color: '#D97706', screen: 'Billing' },
      { label: 'Lab Reports', icon: 'flask', color: '#059669', screen: 'LabReports' },
      { label: 'Pharmacy', icon: 'storefront', color: '#0891B2', screen: 'Pharmacy' },
      { label: 'Telemedicine', icon: 'videocam', color: '#7C3AED', screen: 'Telemedicine' },
      { label: 'Staff & Shifts', icon: 'time', color: '#0891B2', screen: 'StaffShifts' },
      { label: 'AI Receptionist', icon: 'sparkles', color: '#7C3AED', screen: 'AIReceptionist' },
      { label: 'Analytics', icon: 'analytics', color: '#2563EB', screen: 'Analytics' },
      { label: 'OPD Queue', icon: 'list', color: '#D97706', screen: 'OPD' },
      { label: 'Settings', icon: 'settings', color: colors.gray600, screen: 'Settings' },
    ],
    doctor: [
      { label: 'Lab Reports', icon: 'flask', color: '#059669', screen: 'LabReports' },
      { label: 'Pharmacy', icon: 'storefront', color: '#0891B2', screen: 'Pharmacy' },
      { label: 'Telemedicine', icon: 'videocam', color: '#7C3AED', screen: 'Telemedicine' },
      { label: 'OPD Queue', icon: 'list', color: '#D97706', screen: 'OPD' },
      { label: 'Settings', icon: 'settings', color: colors.gray600, screen: 'Settings' },
    ],
    nurse: [
      { label: 'Lab Reports', icon: 'flask', color: '#059669', screen: 'LabReports' },
      { label: 'Pharmacy', icon: 'storefront', color: '#0891B2', screen: 'Pharmacy' },
      { label: 'Staff & Shifts', icon: 'time', color: '#E11D48', screen: 'StaffShifts' },
      { label: 'OPD Queue', icon: 'list', color: '#D97706', screen: 'OPD' },
      { label: 'Settings', icon: 'settings', color: colors.gray600, screen: 'Settings' },
    ],
    receptionist: [
      { label: 'Patients', icon: 'people', color: '#0891B2', screen: 'Patients' },
      { label: 'Billing', icon: 'receipt', color: '#D97706', screen: 'Billing' },
      { label: 'AI Receptionist', icon: 'sparkles', color: '#7C3AED', screen: 'AIReceptionist' },
      { label: 'OPD Queue', icon: 'list', color: '#D97706', screen: 'OPD' },
      { label: 'Settings', icon: 'settings', color: colors.gray600, screen: 'Settings' },
    ],
    patient: [
      { label: 'Telemedicine', icon: 'videocam', color: '#7C3AED', screen: 'Telemedicine' },
      { label: 'Billing', icon: 'receipt', color: '#D97706', screen: 'Billing' },
      { label: 'Pharmacy', icon: 'storefront', color: '#0891B2', screen: 'Pharmacy' },
      { label: 'Settings', icon: 'settings', color: colors.gray600, screen: 'Settings' },
    ],
  };

  const items = moreItems[user.role];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
      </View>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gridItem}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.7}
          >
            <View style={[styles.gridIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={26} color={item.color} />
            </View>
            <Text style={styles.gridLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color={colors.danger} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const createMoreStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xxl, paddingBottom: Spacing.lg },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: colors.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.xl, gap: Spacing.lg },
  gridItem: { alignItems: 'center', width: '28%' },
  gridIcon: { width: 64, height: 64, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  gridLabel: { fontSize: FontSize.xs, color: colors.textSecondary, fontWeight: FontWeight.medium, textAlign: 'center' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: Spacing.xl, padding: Spacing.lg, backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.danger, gap: Spacing.sm },
  logoutText: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.danger },
});

function MainTabs() {
  const { user } = useAuth();
  const { colors } = useTheme();
  if (!user) return null;
  const tabs = tabConfigs[user.role];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray400,
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
          borderTopWidth: 1,
          borderTopColor: colors.tabBarBorder,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: FontWeight.semibold },
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? tab.icon : (`${tab.icon}-outline` as any)} size={22} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { isAuthenticated } = useAuth();
  const { colors } = useTheme();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Appointments" component={AppointmentsScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="Doctors" component={DoctorsScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="Patients" component={PatientsScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="Messages" component={MessagesScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="Billing" component={BillingScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="LabReports" component={LabReportsScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="Pharmacy" component={PharmacyScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="Telemedicine" component={TelemedicineScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="StaffShifts" component={StaffShiftsScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="AIReceptionist" component={AIReceptionistScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="OPD" component={OPDScreen} options={{ animation: 'slide_from_right' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

function AppContent() {
  const { isDark, colors } = useTheme();
  const [fontsLoaded] = useFonts({ ...Ionicons.font });
  if (!fontsLoaded) return null;

  const navigationTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: colors.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          notification: colors.danger,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: colors.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          notification: colors.danger,
        },
      };

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootNavigator />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
