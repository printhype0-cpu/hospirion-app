import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';
import { useStore } from '../lib/store';
import { Appointment } from '../lib/types';
import Input from '../components/Input';
import Button from '../components/Button';

export default function BookAppointmentScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { appointments, addAppointment } = useStore();

  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    department: '',
    date: '',
    time: '',
    type: 'consultation',
    notes: '',
  });

  const handleSubmit = () => {
    const newId = `APT0${appointments.length + 1}`;
    
    const newAppointment: Appointment = {
      id: newId,
      patientName: formData.patientName || 'Unknown Patient',
      patientId: 'P999', // Placeholder
      doctorName: formData.doctorName || 'Unknown Doctor',
      doctorId: 'D999', // Placeholder
      department: formData.department || 'General',
      date: formData.date || new Date().toISOString().split('T')[0],
      time: formData.time || '09:00 AM',
      duration: 30,
      status: 'scheduled',
      type: formData.type as any,
      notes: formData.notes,
      priority: 'normal' as any,
    };

    addAppointment(newAppointment);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Input 
          label="Patient Name" 
          placeholder="e.g. Jane Doe" 
          value={formData.patientName}
          onChangeText={(text) => setFormData({...formData, patientName: text})}
        />
        <Input 
          label="Doctor Name" 
          placeholder="e.g. Dr. Smith" 
          value={formData.doctorName}
          onChangeText={(text) => setFormData({...formData, doctorName: text})}
        />
        <Input 
          label="Department" 
          placeholder="e.g. Cardiology" 
          value={formData.department}
          onChangeText={(text) => setFormData({...formData, department: text})}
        />
        <View style={styles.row}>
          <View style={{flex: 1, marginRight: Spacing.sm}}>
            <Input 
              label="Date" 
              placeholder="YYYY-MM-DD" 
              value={formData.date}
              onChangeText={(text) => setFormData({...formData, date: text})}
            />
          </View>
          <View style={{flex: 1, marginLeft: Spacing.sm}}>
            <Input 
              label="Time" 
              placeholder="e.g. 10:30 AM" 
              value={formData.time}
              onChangeText={(text) => setFormData({...formData, time: text})}
            />
          </View>
        </View>
        <Input 
          label="Type" 
          placeholder="consultation, follow-up, etc." 
          value={formData.type}
          onChangeText={(text) => setFormData({...formData, type: text})}
        />
        <Input 
          label="Notes" 
          placeholder="Optional notes for doctor" 
          value={formData.notes}
          onChangeText={(text) => setFormData({...formData, notes: text})}
        />
        
        <View style={styles.actionContainer}>
          <Button title="Book Appointment" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { padding: Spacing.xs, width: 40 },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  content: { padding: Spacing.xl },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  actionContainer: { marginTop: Spacing.xl, marginBottom: Spacing.xxl }
});
