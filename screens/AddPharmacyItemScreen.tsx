import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight } from '../lib/theme';
import { useStore } from '../lib/store';
import { PharmacyItem } from '../lib/types';
import Input from '../components/Input';
import Button from '../components/Button';

export default function AddPharmacyItemScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { pharmacyItems, addPharmacyItem } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    category: '',
    stock: '',
    price: '',
    manufacturer: '',
    prescription: false,
    dosage: '',
  });

  const handleSubmit = () => {
    const newId = `PH${pharmacyItems.length + 1}`;
    
    const newItem: PharmacyItem = {
      id: newId,
      name: formData.name || 'Unknown Medicine',
      genericName: formData.genericName,
      category: formData.category || 'General',
      stock: parseInt(formData.stock) || 0,
      minStock: 20, // default
      price: parseFloat(formData.price) || 0.0,
      manufacturer: formData.manufacturer,
      expiryDate: '2026-12-31', // Placeholder
      prescription: formData.prescription,
      dosage: formData.dosage,
    };

    addPharmacyItem(newItem);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Medicine</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Input 
          label="Medicine Name" 
          placeholder="e.g. Amoxicillin 500mg" 
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
        />
        <Input 
          label="Generic Name" 
          placeholder="e.g. Amoxicillin" 
          value={formData.genericName}
          onChangeText={(text) => setFormData({...formData, genericName: text})}
        />
        <Input 
          label="Category" 
          placeholder="e.g. Antibiotics" 
          value={formData.category}
          onChangeText={(text) => setFormData({...formData, category: text})}
        />
        <Input 
          label="Stock Quantity" 
          placeholder="e.g. 100" 
          keyboardType="numeric"
          value={formData.stock}
          onChangeText={(text) => setFormData({...formData, stock: text})}
        />
        <Input 
          label="Price (₹)" 
          placeholder="e.g. 15.50" 
          keyboardType="numeric"
          value={formData.price}
          onChangeText={(text) => setFormData({...formData, price: text})}
        />
        <Input 
          label="Manufacturer" 
          placeholder="e.g. Pfizer" 
          value={formData.manufacturer}
          onChangeText={(text) => setFormData({...formData, manufacturer: text})}
        />
        <Input 
          label="Dosage Instructions" 
          placeholder="e.g. Take 1 pill twice a day" 
          value={formData.dosage}
          onChangeText={(text) => setFormData({...formData, dosage: text})}
        />
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Requires Prescription (Rx)</Text>
          <Switch 
            value={formData.prescription} 
            onValueChange={(val) => setFormData({...formData, prescription: val})} 
            trackColor={{ false: colors.gray300, true: colors.primary }}
          />
        </View>

        <View style={styles.actionContainer}>
          <Button title="Save Medicine" onPress={handleSubmit} />
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
