import { create } from 'zustand';
import { 
  mockAppointments, 
  mockPatients, 
  mockPharmacy,
  mockDoctors,
  mockLabReports,
  mockBills
} from './data';
import { Appointment, Patient, PharmacyItem, Doctor, LabReport, Bill } from './types';

interface AppState {
  patients: Patient[];
  appointments: Appointment[];
  pharmacyItems: PharmacyItem[];
  doctors: Doctor[];
  labReports: LabReport[];
  bills: Bill[];

  // Actions
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;

  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;

  addPharmacyItem: (item: PharmacyItem) => void;
  updatePharmacyItem: (id: string, updates: Partial<PharmacyItem>) => void;
  deletePharmacyItem: (id: string) => void;

  addDoctor: (doctor: Doctor) => void;
  addLabReport: (report: LabReport) => void;
  addBill: (bill: Bill) => void;
}

export const useStore = create<AppState>((set) => ({
  patients: mockPatients,
  appointments: mockAppointments,
  pharmacyItems: mockPharmacy,
  doctors: mockDoctors,
  labReports: mockLabReports,
  bills: mockBills,

  addPatient: (patient) => set((state) => ({ patients: [...state.patients, patient] })),
  updatePatient: (id, updates) => set((state) => ({
    patients: state.patients.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  deletePatient: (id) => set((state) => ({
    patients: state.patients.filter(p => p.id !== id)
  })),

  addAppointment: (appointment) => set((state) => ({ appointments: [...state.appointments, appointment] })),
  updateAppointment: (id, updates) => set((state) => ({
    appointments: state.appointments.map(a => a.id === id ? { ...a, ...updates } : a)
  })),
  deleteAppointment: (id) => set((state) => ({
    appointments: state.appointments.filter(a => a.id !== id)
  })),

  addPharmacyItem: (item) => set((state) => ({ pharmacyItems: [...state.pharmacyItems, item] })),
  updatePharmacyItem: (id, updates) => set((state) => ({
    pharmacyItems: state.pharmacyItems.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  deletePharmacyItem: (id) => set((state) => ({
    pharmacyItems: state.pharmacyItems.filter(p => p.id !== id)
  })),

  addDoctor: (doctor) => set((state) => ({ doctors: [...state.doctors, doctor] })),
  addLabReport: (report) => set((state) => ({ labReports: [...state.labReports, report] })),
  addBill: (bill) => set((state) => ({ bills: [...state.bills, bill] })),
}));
