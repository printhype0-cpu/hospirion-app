import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';
import { useStore } from '../lib/store';
import { Patient } from '../lib/types';
import Input from '../components/Input';
import Button from '../components/Button';

export default function AddPatientScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { patients, addPatient } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    phone: '',
    email: '',
    bloodGroup: '',
    address: '',
    conditions: '',
  });

  const handleSubmit = () => {
    // Generate new ID (simple approach)
    const newId = `P00${patients.length + 1}`;
    
    const newPatient: Patient = {
      id: newId,
      name: formData.name || 'Unknown Patient',
      age: parseInt(formData.age) || 0,
      gender: formData.gender as any,
      phone: formData.phone,
      email: formData.email,
      bloodGroup: formData.bloodGroup,
      address: formData.address,
      emergencyContact: 'Not provided',
      conditions: formData.conditions ? formData.conditions.split(',').map(s => s.trim()) : [],
      allergies: [],
      medications: [],
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'active',
      dateOfBirth: '2000-01-01', // Placeholder
    };

    addPatient(newPatient);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Patient</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Input 
          label="Full Name" 
          placeholder="e.g. John Doe" 
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
        />
        <Input 
          label="Age" 
          placeholder="e.g. 45" 
          keyboardType="numeric"
          value={formData.age}
          onChangeText={(text) => setFormData({...formData, age: text})}
        />
        <Input 
          label="Gender" 
          placeholder="male, female, or other" 
          value={formData.gender}
          onChangeText={(text) => setFormData({...formData, gender: text})}
        />
        <Input 
          label="Phone Number" 
          placeholder="e.g. +1 555-0123" 
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => setFormData({...formData, phone: text})}
        />
        <Input 
          label="Blood Group" 
          placeholder="e.g. O+, A-" 
          value={formData.bloodGroup}
          onChangeText={(text) => setFormData({...formData, bloodGroup: text})}
        />
        <Input 
          label="Medical Conditions (comma separated)" 
          placeholder="e.g. Asthma, Diabetes" 
          value={formData.conditions}
          onChangeText={(text) => setFormData({...formData, conditions: text})}
        />
        
        <View style={styles.actionContainer}>
          <Button title="Save Patient" onPress={handleSubmit} />
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
  actionContainer: { marginTop: Spacing.xl, marginBottom: Spacing.xxl }
});
