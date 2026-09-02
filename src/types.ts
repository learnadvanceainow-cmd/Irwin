export type UserRole = 'patient' | 'doctor' | 'admin';

export interface Patient {
  id: string;
  name: string;
  dob: string;
  age: number;
  allergies: string[];
  medicalConditions: string[];
  phone: string;
  email: string;
  lastVisit: string;
  avatarUrl?: string;
}

export interface ReviewItem {
  id: string;
  patientId: string;
  patientName: string;
  patientInitials: string;
  type: string;
  title: string;
  timeAgo: string;
  icon: string;
  status: 'pending' | 'reviewed' | 'dismissed';
  reportUrl?: string;
  date: string;
}

export interface Recommendation {
  id: string;
  patientId: string;
  doctorName: string;
  date: string;
  title: string;
  observations: string;
  treatmentPlan: string;
  medications: string;
  nextAppointment: string;
  followUpNotes: string;
  status: 'draft' | 'sent';
  lastSaved?: string;
}

export interface ClinicalHistoryItem {
  id: string;
  type: 'xray' | 'treatment' | 'blood' | 'scan';
  title: string;
  date: string;
  status?: string;
  highlightBorder?: boolean;
  icon: string;
  details?: string;
  imageUrl?: string;
}

export interface Doctor {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  status: 'Active' | 'On Leave';
  patientsToday: number;
  avatarUrl?: string;
}

export interface SystemLog {
  id: string;
  title: string;
  time: string;
  icon: string;
  variant: 'primary' | 'secondary' | 'error';
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
}
