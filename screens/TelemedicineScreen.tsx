import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { mockAppointments } from '../lib/data';
import Badge from '../components/Badge';

export default function TelemedicineScreen({ navigation }: { navigation: any }) {
  const [inCall, setInCall] = useState(false);
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const telemedAppointments = mockAppointments.filter(a => a.type === 'telemedicine' || a.type === 'consultation').slice(0, 5);

  const renderAppointment = ({ item }: { item: typeof mockAppointments[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.callIcon}><Ionicons name="videocam" size={22} color={colors.accent} /></View>
        <View style={styles.cardHeaderInfo}><Text style={styles.patientName}>{item.patientName}</Text><Text style={styles.doctorName}>{item.doctorName}</Text></View>
        <Badge text={item.status} variant={item.status === 'scheduled' ? 'info' : 'default'} />
      </View>
      <View style={styles.cardMeta}>
        <View style={styles.metaItem}><Ionicons name="calendar-outline" size={14} color={colors.gray500} /><Text style={styles.metaText}>{item.date}</Text></View>
        <View style={styles.metaItem}><Ionicons name="time-outline" size={14} color={colors.gray500} /><Text style={styles.metaText}>{item.time}</Text></View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity style={[styles.actionBtn, styles.joinBtn]} onPress={() => setInCall(true)}><Ionicons name="videocam" size={18} color={colors.white} /><Text style={styles.joinBtnText}>Join Call</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.chatBtn]}><Ionicons name="chatbubble-outline" size={18} color={colors.primary} /><Text style={styles.chatBtnText}>Chat</Text></TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Telemedicine</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.banner}><Ionicons name="videocam" size={24} color={colors.white} /><View style={styles.bannerInfo}><Text style={styles.bannerTitle}>Virtual Consultations</Text><Text style={styles.bannerSubtitle}>Secure HD video calls with patients</Text></View></View>
      <FlatList data={telemedAppointments} renderItem={renderAppointment} keyExtractor={item => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
      <Modal visible={inCall} animationType="slide" presentationStyle="fullScreen">
        <SafeAreaView style={styles.callContainer}>
          <View style={styles.callScreen}>
            <View style={styles.callerInfo}><View style={styles.callerAvatar}><Ionicons name="person" size={48} color={colors.white} /></View><Text style={styles.callerName}>Maria Garcia</Text><Text style={styles.callStatus}>Connected • 05:23</Text></View>
            <View style={styles.callControls}>
              <TouchableOpacity style={styles.controlBtn}><Ionicons name="mic-off" size={24} color={colors.white} /><Text style={styles.controlLabel}>Mute</Text></TouchableOpacity>
              <TouchableOpacity style={styles.controlBtn}><Ionicons name="videocam-off" size={24} color={colors.white} /><Text style={styles.controlLabel}>Camera</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.controlBtn, styles.endCallBtn]} onPress={() => setInCall(false)}><Ionicons name="call" size={24} color={colors.white} style={{ transform: [{ rotate: '135deg' }] }} /><Text style={styles.controlLabel}>End</Text></TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  backBtn: { padding: Spacing.xs, width: 40 },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  banner: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.accent, marginHorizontal: Spacing.xl, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.xl },
  bannerInfo: { marginLeft: Spacing.md },
  bannerTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: colors.white },
  bannerSubtitle: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  list: { padding: Spacing.xl, paddingTop: 0 },
  card: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: colors.cardBorder, ...Shadows.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  callIcon: { width: 44, height: 44, borderRadius: BorderRadius.md, backgroundColor: colors.accentBg, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  cardHeaderInfo: { flex: 1 },
  patientName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  doctorName: { fontSize: FontSize.sm, color: colors.textSecondary, marginTop: 2 },
  cardMeta: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: FontSize.xs, color: colors.gray500 },
  cardActions: { flexDirection: 'row', gap: Spacing.sm },
  actionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, borderRadius: BorderRadius.md, gap: 4 },
  joinBtn: { backgroundColor: colors.accent, flex: 1 },
  joinBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: colors.white },
  chatBtn: { backgroundColor: colors.primaryBg, flex: 1 },
  chatBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: colors.primary },
  callContainer: { flex: 1, backgroundColor: '#1a1a2e' },
  callScreen: { flex: 1, justifyContent: 'space-between', padding: Spacing.xl },
  callerInfo: { alignItems: 'center', paddingTop: 60 },
  callerAvatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg },
  callerName: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: colors.white },
  callStatus: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.6)', marginTop: Spacing.sm },
  callControls: { flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 40 },
  controlBtn: { alignItems: 'center' },
  controlLabel: { fontSize: FontSize.xs, color: colors.white, marginTop: Spacing.xs },
  endCallBtn: { backgroundColor: colors.danger, width: 56, height: 56, borderRadius: 28, justifyContent: 'center' },
});
