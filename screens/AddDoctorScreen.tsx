import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';
import { useStore } from '../lib/store';
import { Doctor } from '../lib/types';
import Input from '../components/Input';
import Button from '../components/Button';

export default function AddDoctorScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { doctors, addDoctor } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    department: '',
    experience: '',
    phone: '',
    email: '',
    schedule: '',
    fee: '',
    available: true,
  });

  const handleSubmit = () => {
    const newId = `D00${doctors.length + 1}`;
    
    const newDoctor: Doctor = {
      id: newId,
      name: formData.name || 'Unknown Doctor',
      specialization: formData.specialization,
      department: formData.department || 'General',
      experience: parseInt(formData.experience) || 0,
      rating: 5.0,
      reviewCount: 0,
      patients: 0,
      available: formData.available,
      phone: formData.phone,
      email: formData.email,
      schedule: formData.schedule || 'Mon-Fri 9AM-5PM',
      consultationFee: parseInt(formData.fee) || 0,
      qualifications: ['MBBS'],
      languages: ['English'],
    };

    addDoctor(newDoctor);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Doctor</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Input 
          label="Full Name" 
          placeholder="e.g. Dr. John Smith" 
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
        />
        <Input 
          label="Specialization" 
          placeholder="e.g. Cardiologist" 
          value={formData.specialization}
          onChangeText={(text) => setFormData({...formData, specialization: text})}
        />
        <Input 
          label="Department" 
          placeholder="e.g. Cardiology" 
          value={formData.department}
          onChangeText={(text) => setFormData({...formData, department: text})}
        />
        <Input 
          label="Experience (years)" 
          placeholder="e.g. 10" 
          keyboardType="numeric"
          value={formData.experience}
          onChangeText={(text) => setFormData({...formData, experience: text})}
        />
        <Input 
          label="Consultation Fee" 
          placeholder="e.g. 500" 
          keyboardType="numeric"
          value={formData.fee}
          onChangeText={(text) => setFormData({...formData, fee: text})}
        />
        <Input 
          label="Phone" 
          placeholder="e.g. +1 555-1234" 
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => setFormData({...formData, phone: text})}
        />
        <Input 
          label="Email" 
          placeholder="e.g. doctor@hospirion.com" 
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
        />
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Available for Booking</Text>
          <Switch 
            value={formData.available} 
            onValueChange={(val) => setFormData({...formData, available: val})} 
            trackColor={{ false: colors.gray300, true: colors.primary }}
          />
        </View>

        <View style={styles.actionContainer}>
          <Button title="Save Doctor" onPress={handleSubmit} />
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
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: Spacing.md },
  switchLabel: { fontSize: FontSize.md, color: colors.text, fontWeight: '600' },
  actionContainer: { marginTop: Spacing.xl, marginBottom: Spacing.xxl }
});
