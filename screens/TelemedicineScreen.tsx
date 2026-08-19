import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';

export default function TelemedicineScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-down" size={28} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dr. Sarah Jenkins</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.mainVideoArea}>
        {/* Mock remote video */}
        <View style={[styles.remoteVideo, { backgroundColor: colors.gray800 }]}>
          <Ionicons name="person" size={120} color={colors.gray600} />
          <Text style={styles.callerName}>Dr. Sarah Jenkins</Text>
          <Text style={styles.callDuration}>12:45</Text>
        </View>

        {/* Mock local video (PiP) */}
        {!isVideoOff && (
          <View style={[styles.localVideo, { backgroundColor: colors.gray700 }]}>
            <Ionicons name="person" size={40} color={colors.gray500} />
          </View>
        )}
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={[styles.controlBtn, isMuted && { backgroundColor: colors.danger }]} 
          onPress={() => setIsMuted(!isMuted)}
        >
          <Ionicons name={isMuted ? "mic-off" : "mic"} size={28} color={colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.endCallBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="call" size={32} color={colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlBtn, isVideoOff && { backgroundColor: colors.danger }]} 
          onPress={() => setIsVideoOff(!isVideoOff)}
        >
          <Ionicons name={isVideoOff ? "videocam-off" : "videocam"} size={28} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' }, // Always dark for video call
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, position: 'absolute', top: 40, left: 0, right: 0, zIndex: 10 },
  backBtn: { padding: Spacing.xs },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: colors.white },
  mainVideoArea: { flex: 1, position: 'relative' },
  remoteVideo: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  callerName: { position: 'absolute', bottom: 120, fontSize: FontSize.xl, color: colors.white, fontWeight: FontWeight.bold },
  callDuration: { position: 'absolute', bottom: 90, fontSize: FontSize.md, color: colors.gray300 },
  localVideo: { position: 'absolute', right: 20, bottom: 20, width: 100, height: 150, borderRadius: BorderRadius.lg, overflow: 'hidden', borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  controlsContainer: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingBottom: 50, paddingTop: 30, backgroundColor: 'rgba(0,0,0,0.8)' },
  controlBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  endCallBtn: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.danger, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '135deg' }] },
});
