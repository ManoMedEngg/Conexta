// Mock data with Tamil names for Conexta Medical IoT Platform

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'doctor' | 'patient' | 'engineer' | 'vendor';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    spo2: number;
    temperature: number;
    timestamp: Date;
  };
  prescriptions: Prescription[];
}

export interface Prescription {
  id: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  time: string[];
}

export interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance' | 'warning';
  lastCommunication: Date;
  amcExpiry?: Date;
  calibrationDue?: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: Date;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Alert {
  id: string;
  type: 'critical' | 'amc' | 'calibration' | 'testing' | 'service';
  deviceId?: string;
  patientId?: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: Date;
  read: boolean;
}

// Demo Users with Tamil names
export const demoUsers: User[] = [
  {
    id: 'u1',
    name: 'Dr. Sundar',
    email: 'dr.sundar@hospital.com',
    password: 'demo',
    role: 'doctor',
  },
  {
    id: 'u2',
    name: 'Anitha',
    email: 'anitha.patient@email.com',
    password: 'demo',
    role: 'patient',
  },
  {
    id: 'u3',
    name: 'Er. Karthik',
    email: 'eng.karthik@service.com',
    password: 'demo',
    role: 'engineer',
  },
  {
    id: 'u4',
    name: 'Vendor Murugan',
    email: 'vendor.murugan@company.com',
    password: 'demo',
    role: 'vendor',
  },
];

// Patients with Tamil names
export const initialPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Mohan',
    age: 45,
    gender: 'Male',
    vitals: {
      heartRate: 72,
      bloodPressure: '120/80',
      spo2: 98,
      temperature: 37.0,
      timestamp: new Date(),
    },
    prescriptions: [],
  },
  {
    id: 'p2',
    name: 'Lakshmi',
    age: 38,
    gender: 'Female',
    vitals: {
      heartRate: 75,
      bloodPressure: '118/78',
      spo2: 97,
      temperature: 36.8,
      timestamp: new Date(),
    },
    prescriptions: [],
  },
  {
    id: 'p3',
    name: 'Siva',
    age: 52,
    gender: 'Male',
    vitals: {
      heartRate: 85,
      bloodPressure: '135/88',
      spo2: 95,
      temperature: 37.2,
      timestamp: new Date(),
    },
    prescriptions: [],
  },
  {
    id: 'p4',
    name: 'Meena',
    age: 29,
    gender: 'Female',
    vitals: {
      heartRate: 70,
      bloodPressure: '115/75',
      spo2: 99,
      temperature: 36.6,
      timestamp: new Date(),
    },
    prescriptions: [],
  },
  {
    id: 'p5',
    name: 'Ravi',
    age: 60,
    gender: 'Male',
    vitals: {
      heartRate: 80,
      bloodPressure: '140/90',
      spo2: 94,
      temperature: 37.1,
      timestamp: new Date(),
    },
    prescriptions: [],
  },
];

// Medical Devices
export const initialDevices: Device[] = [
  {
    id: 'd1',
    name: 'Ventilator-01',
    type: 'Ventilator',
    location: 'ICU Ward 1',
    status: 'online',
    lastCommunication: new Date(),
    amcExpiry: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    calibrationDue: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'd2',
    name: 'CT Scanner-A',
    type: 'CT Scanner',
    location: 'Radiology Dept',
    status: 'online',
    lastCommunication: new Date(),
    amcExpiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    calibrationDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'd3',
    name: 'X-Ray Machine-1',
    type: 'X-Ray',
    location: 'Radiology Dept',
    status: 'online',
    lastCommunication: new Date(),
    amcExpiry: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    calibrationDue: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'd4',
    name: 'ECG Monitor-03',
    type: 'ECG',
    location: 'Cardiology Ward',
    status: 'warning',
    lastCommunication: new Date(Date.now() - 2 * 60 * 60 * 1000),
    amcExpiry: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
    calibrationDue: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'd5',
    name: 'Ultrasound-B',
    type: 'Ultrasound',
    location: 'OB/GYN Dept',
    status: 'maintenance',
    lastCommunication: new Date(Date.now() - 24 * 60 * 60 * 1000),
    amcExpiry: new Date(Date.now() + 200 * 24 * 60 * 60 * 1000),
    calibrationDue: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'd6',
    name: 'MRI Scanner-1',
    type: 'MRI',
    location: 'Radiology Dept',
    status: 'online',
    lastCommunication: new Date(),
    amcExpiry: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000),
    calibrationDue: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
  },
];

// Appointments
export const initialAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    doctorId: 'u1',
    patientName: 'Mohan',
    doctorName: 'Dr. Sundar',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    time: '10:00 AM',
    type: 'Checkup',
    status: 'scheduled',
  },
  {
    id: 'a2',
    patientId: 'p3',
    doctorId: 'u1',
    patientName: 'Siva',
    doctorName: 'Dr. Sundar',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    time: '2:00 PM',
    type: 'Follow-up',
    status: 'scheduled',
  },
];

// Alerts
export const initialAlerts: Alert[] = [
  {
    id: 'al1',
    type: 'critical',
    patientId: 'p3',
    message: 'High Blood Pressure detected for patient Siva',
    severity: 'high',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
  },
  {
    id: 'al2',
    type: 'calibration',
    deviceId: 'd4',
    message: 'ECG Monitor-03 calibration overdue',
    severity: 'high',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 'al3',
    type: 'amc',
    deviceId: 'd3',
    message: 'X-Ray Machine-1 AMC contract expired',
    severity: 'high',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 'al4',
    type: 'calibration',
    deviceId: 'd2',
    message: 'CT Scanner-A calibration due in 30 days',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: false,
  },
];

// Health Tips
export const healthTips = [
  'Drink at least 8 glasses of water daily',
  'Walk for 20 minutes after meals',
  'Get 7-8 hours of sleep every night',
  'Practice deep breathing exercises for 10 minutes daily',
  'Eat fruits and vegetables with every meal',
  'Limit salt intake to less than 5g per day',
  'Regular health checkups can prevent serious illnesses',
  'Maintain a healthy body weight',
];

// Prescriptions
export const initialPrescriptions: Prescription[] = [
  {
    id: 'pr1',
    patientId: 'p1',
    medication: 'Paracetamol',
    dosage: '500mg',
    frequency: 'Twice daily',
    duration: '5 days',
    time: ['08:00 AM', '08:00 PM'],
  },
  {
    id: 'pr2',
    patientId: 'p1',
    medication: 'Amoxicillin',
    dosage: '250mg',
    frequency: 'Three times daily',
    duration: '7 days',
    time: ['08:00 AM', '02:00 PM', '08:00 PM'],
  },
  {
    id: 'pr3',
    patientId: 'p3',
    medication: 'Metformin',
    dosage: '500mg',
    frequency: 'Once daily',
    duration: '30 days',
    time: ['09:00 AM'],
  },
];
