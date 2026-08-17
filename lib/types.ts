// HOSPIRION Type Definitions
export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  specialization?: string;
  phone?: string;
  lastLogin?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  doctorId: string;
  department: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  type: 'consultation' | 'follow-up' | 'emergency' | 'telemedicine' | 'surgery';
  notes?: string;
  room?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  bloodGroup: string;
  address: string;
  emergencyContact: string;
  conditions: string[];
  allergies: string[];
  medications: string[];
  lastVisit: string;
  status: 'active' | 'discharged' | 'admitted' | 'critical';
  roomNumber?: string;
  insuranceProvider?: string;
  insuranceId?: string;
  dateOfBirth: string;
  weight?: number;
  height?: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  experience: number;
  rating: number;
  reviewCount: number;
  patients: number;
  available: boolean;
  phone: string;
  email: string;
  schedule: string;
  consultationFee: number;
  qualifications: string[];
  bio?: string;
  languages: string[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: string;
  read: boolean;
  conversationId: string;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole: UserRole;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  lastSeen?: string;
}

export interface LabReport {
  id: string;
  patientName: string;
  patientId: string;
  testName: string;
  category: 'blood' | 'urine' | 'imaging' | 'pathology' | 'cardiology' | 'genetic';
  date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  result?: string;
  normalRange?: string;
  doctorName: string;
  notes?: string;
  priority: 'normal' | 'urgent' | 'critical';
  technicianName?: string;
  sampleId?: string;
}

export interface BillItem {
  id: string;
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Bill {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  dueDate: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'pending' | 'paid' | 'overdue' | 'partial' | 'cancelled';
  paymentMethod?: string;
  insuranceClaim?: boolean;
  insuranceAmount?: number;
  patientAmount?: number;
}

export interface PharmacyItem {
  id: string;
  name: string;
  genericName: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  manufacturer: string;
  expiryDate: string;
  prescription: boolean;
  dosage: string;
  sideEffects?: string[];
  interactions?: string[];
}

export interface Shift {
  id: string;
  staffName: string;
  staffRole: string;
  department: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled' | 'no-show';
  hours: number;
  notes?: string;
}

export interface OPDQueue {
  id: string;
  tokenNumber: number;
  patientName: string;
  patientId: string;
  doctorName: string;
  department: string;
  status: 'waiting' | 'in-consultation' | 'completed' | 'skipped';
  waitTime: number;
  registeredAt: string;
  priority: 'normal' | 'priority' | 'emergency';
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'appointment' | 'lab' | 'billing' | 'message' | 'system' | 'alert';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}
