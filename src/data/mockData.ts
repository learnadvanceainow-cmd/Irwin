import { Patient, ReviewItem, Recommendation, ClinicalHistoryItem, Doctor, SystemLog, Appointment } from '../types';

export const INITIAL_PATIENT: Patient = {
  id: 'PAT-10245',
  name: 'John Smith',
  dob: '05/12/1985',
  age: 38,
  allergies: ['Penicillin'],
  medicalConditions: ['High BP'],
  phone: '(555) 382-9012',
  email: 'john.smith@example.com',
  lastVisit: 'Oct 12, 2023',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvBUg-7X0l_EJsbqNLojSZyNWoi8Q8kHbNLWDHDqKUkR5soz-sb5MDSVsttx6sC3GbUC3Ctm0aaEWTDxZVjulf3gBgmcKxrLCnpZd0Ouk2TQZNXAH2NfrL2GabAJxUS90ozvbnDL8VqiMzxhwV3A9-DThKWZzrVXXHdyg1fIzMod-VPOmqlg5R5SJE6KK0z7FBoYL3yXqM8om7B4Z6-qVdGvafF95WWjlM9XZfCau4Eve_dc84kEmDVA'
};

export const CLINICAL_HISTORY: ClinicalHistoryItem[] = [
  {
    id: 'ch-1',
    type: 'xray',
    title: 'Panoramic X-Ray',
    date: 'Oct 12, 2023',
    icon: 'radiology',
    details: 'Digital orthopantomogram showing impacted lower right third molar (tooth #32) with mesioangular angulation.',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ch-2',
    type: 'treatment',
    title: 'Treatment History',
    date: 'Last visit: Sep 05, 2023',
    icon: 'history',
    details: 'Scaling & root planing (quadrants 1-4), fluoride varnish applied, composite resin restoration on tooth #14.'
  },
  {
    id: 'ch-3',
    type: 'blood',
    title: 'Blood Panel (Pending)',
    date: 'Uploaded Today',
    status: 'Pending Review',
    highlightBorder: true,
    icon: 'summarize',
    details: 'Complete Blood Count (CBC) and Coagulation Panel (PT/INR) awaiting pre-op surgical clearance.'
  }
];

export const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    patientId: 'PAT-10245',
    doctorName: 'Dr. Sarah Wilson',
    date: 'NOV 02',
    title: 'Wisdom Tooth Extraction Plan',
    observations: 'Mild pericoronitis around lower right third molar (#32). Bone density is adequate. High blood pressure noted, patient is stable on amlodipine.',
    treatmentPlan: 'Based on your recent panoramic x-ray, we recommend scheduling an extraction for the lower right third molar to prevent crowding and recurrent soft tissue inflammation. Procedure will be completed under local anesthesia.',
    medications: 'Amoxicillin 500mg TID for 5 days post-op (or Clindamycin if penicillin allergy confirmed), Ibuprofen 600mg PRN for pain.',
    nextAppointment: '2024-11-15',
    followUpNotes: 'Soft diet for 48 hours, avoid straws or vigorous rinsing, ice packs 20 min on / 20 min off.',
    status: 'sent',
    lastSaved: '2m ago'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    patientId: 'P-4921',
    patientName: 'Elena Jenkins',
    patientInitials: 'EJ',
    type: 'xray',
    title: 'Post-Op X-Ray Review',
    timeAgo: '2h ago',
    date: 'Today, 2h ago',
    icon: 'medical_information',
    status: 'pending'
  },
  {
    id: 'rev-2',
    patientId: 'P-1184',
    patientName: 'Marcus Reed',
    patientInitials: 'MR',
    type: 'photo',
    title: 'Intraoral Photos Uploaded',
    timeAgo: '5h ago',
    date: 'Today, 5h ago',
    icon: 'photo_camera',
    status: 'pending'
  },
  {
    id: 'rev-3',
    patientId: 'P-9023',
    patientName: 'Sarah Liu',
    patientInitials: 'SL',
    type: 'form',
    title: 'Patient Intake Form',
    timeAgo: '1d ago',
    date: 'Yesterday',
    icon: 'description',
    status: 'pending'
  }
];

export const DOCTORS_LIST: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Smith',
    initials: 'DS',
    specialty: 'Orthodontics',
    status: 'Active',
    patientsToday: 24
  },
  {
    id: 'doc-2',
    name: 'Dr. James Doe',
    initials: 'JD',
    specialty: 'General Dentistry',
    status: 'Active',
    patientsToday: 18
  },
  {
    id: 'doc-3',
    name: 'Dr. Sarah Wilson',
    initials: 'SW',
    specialty: 'Oral & Maxillofacial',
    status: 'Active',
    patientsToday: 16
  }
];

export const SYSTEM_LOGS: SystemLog[] = [
  {
    id: 'log-1',
    title: "Admin updated Dr. Smith's permissions",
    time: '10:42 AM',
    icon: 'edit',
    variant: 'primary'
  },
  {
    id: 'log-2',
    title: 'New patient account verified',
    time: '09:15 AM',
    icon: 'verified_user',
    variant: 'secondary'
  },
  {
    id: 'log-3',
    title: 'Failed login attempt (IP: 192.168...)',
    time: 'Yesterday, 11:30 PM',
    icon: 'warning',
    variant: 'error'
  }
];

export const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    patientName: 'John Smith',
    doctorName: 'Dr. Sarah Wilson',
    date: 'Nov 15, 2024',
    time: '09:30 AM',
    type: 'Wisdom Tooth Extraction',
    status: 'Confirmed'
  },
  {
    id: 'apt-2',
    patientName: 'Elena Jenkins',
    doctorName: 'Dr. Sarah Wilson',
    date: 'Nov 16, 2024',
    time: '11:00 AM',
    type: 'Post-Op Follow-up',
    status: 'Confirmed'
  },
  {
    id: 'apt-3',
    patientName: 'Marcus Reed',
    doctorName: 'Dr. James Doe',
    date: 'Nov 17, 2024',
    time: '02:15 PM',
    type: 'Routine Exam & Cleaning',
    status: 'Confirmed'
  },
  {
    id: 'apt-4',
    patientName: 'Sarah Liu',
    doctorName: 'Dr. Sarah Smith',
    date: 'Nov 18, 2024',
    time: '03:45 PM',
    type: 'Orthodontic Consultation',
    status: 'Pending'
  }
];

export const AVATARS = {
  doctor: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNana0wsxb6wpRSBafL9izNc6x8513EkJoY3ysGJrbUMKBbfmt8v1rNKA_notlN2Z_ShVoIQNETVH1aPstW_GKJuZW3CHZ0E0Icv5--rneF4-PKajIu3j7T1yMtXoagFQ3tfcSZFNaDxMl6xjqNXoDgZms050_6Vp84sPOCfj96Gb0i_1U-0lDBYF54IdqgQXutzoR2PSdLBWYgZDd7EyLPrGRMAPLsnTeR3q3JYPRESnORnqbaSC5MA',
  doctorAlt: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrxB-PmlK5JSJYg6cEGDYRwE-C1YL3eNtveoZ_tiIQmKSdbiZXzF3MJfICVDgng6UQyYdbJjlXq7-dH2k8Z_pfpYYRuhnPiVDUw9ei2F_KdIaKvXZIOTrIwKALetwYpt3GgHrTyfK3Pf-phS2FA-0JbEs3p62qfi0jpNiopPUN9lQpkUX-NoyOEWl9c9xE9MaugpKZJd0cIoN3X3eAhdtPTrHSBNiR8qTa1pBLFy8qX4PpBOuCJS8NzA',
  patient: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvBUg-7X0l_EJsbqNLojSZyNWoi8Q8kHbNLWDHDqKUkR5soz-sb5MDSVsttx6sC3GbUC3Ctm0aaEWTDxZVjulf3gBgmcKxrLCnpZd0Ouk2TQZNXAH2NfrL2GabAJxUS90ozvbnDL8VqiMzxhwV3A9-DThKWZzrVXXHdyg1fIzMod-VPOmqlg5R5SJE6KK0z7FBoYL3yXqM8om7B4Z6-qVdGvafF95WWjlM9XZfCau4Eve_dc84kEmDVA',
  patientAlt: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVQlCpErKdfNmsocjsarPm3xti4SQidGlZZViEoSmb5RC-WAVPjiks6XJ88MJYGZ_hE67nayFfHbtzAj4NnfNuhPY0b50GjG4VKYawWQ2znB1qobY57WMPg6f2XoTYT2FSnve51hDMbEsZfpWGZpdL6lwv7xnOHkovtCjp4iRVzm_1DUIhzvrImu0Cob9SxBZCjLDjxEyNOYj2-PPzdBJXzFl-SwqGo2a6jRvzdsXNAxRFbhVlcGJiog',
  admin: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC65y0LONCPr-NienFrm2saIPLDzDFilx7vbVGG51u_Xmr3HSBPqi2zBVs-Yq8Pff5iyZSLOiEIf07J3M71sFAwVmibu2to16Klmy9yrNsCQU8peD7sT2i912IPe3Owdnplht8ZnjYMtEpxfWcFdVO0Q2fAbJCAiX_Q2g1enL8zx5H2pKbwlJZOKmUQXMPDcmzYy3338kWGlx1oev8aLImO3jZb-rzvyJys8ALFgS5wllqeH_VDSSsQg'
};
