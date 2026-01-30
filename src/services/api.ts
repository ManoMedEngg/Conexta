// API layer for Conexta Medical IoT Platform using Client-Side Python (Pyodide)

import {
  User,
  Patient,
  Device,
  Appointment,
  Alert,
  Prescription,
} from './mockData';

// Pyodide Singleton
let pyodide: any = null;
let pyodideReadyPromise: Promise<any> | null = null;

async function initPyodide() {
  if (pyodide) return pyodide;
  if (pyodideReadyPromise) return pyodideReadyPromise;

  pyodideReadyPromise = (async () => {
    console.log("Initializing Pyodide...");
    // Wait for the script tag to load
    let retries = 0;
    while (!(window as any).loadPyodide && retries < 50) {
      await new Promise(r => setTimeout(r, 100));
      retries++;
    }

    if (!(window as any).loadPyodide) {
      throw new Error("Pyodide script failed to load");
    }

    pyodide = await (window as any).loadPyodide();

    // Load the Python logic file
    try {
      const response = await fetch('/python/logic.py');
      if (!response.ok) throw new Error('Failed to fetch python logic');
      const logicCode = await response.text();
      pyodide.runPython(logicCode);
      console.log("Python logic loaded successfully");
    } catch (e) {
      console.error("Error loading python logic:", e);
      throw e;
    }

    return pyodide;
  })();

  return pyodideReadyPromise;
}

async function callPython<T>(funcName: string, ...args: any[]): Promise<T> {
  const py = await initPyodide();
  const pyFunc = py.globals.get(funcName);

  if (!pyFunc) {
    console.error(`Python function '${funcName}' not found`);
    throw new Error(`Python function '${funcName}' not found`);
  }

  try {
    // Create a typed array or just pass strings/numbers. 
    // For objects, we pass them as JSON strings because our Python logic expects that.
    const pyArgs = args.map(arg => (typeof arg === 'object' && arg !== null) ? JSON.stringify(arg) : arg);

    const resultJson = pyFunc(...pyArgs);

    // If result is null/None
    if (!resultJson) return null as any;

    return JSON.parse(resultJson);
  } catch (e) {
    console.error(`Error executing Python function ${funcName}:`, e);
    throw e;
  }
}

// User CRUD
export const createUser = async (_user: Omit<User, 'id'>): Promise<User> => {
  // Not implemented in logic.py yet, just a placeholder or could add it
  return {} as User;
};

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  const res = await callPython<User | { error: string }>('login', JSON.stringify({ email, password }));
  if ('error' in res) return null;
  return res as User;
};

export const demoAuthenticateUser = async (role: string): Promise<User | null> => {
  const res = await callPython<User | { error: string }>('login_demo', JSON.stringify({ role }));
  if ('error' in res) return null;
  return res as User;
}

export const getUserByEmail = async (_email: string): Promise<User | undefined> => {
  return undefined;
};


// Patient CRUD
export const getPatients = async (): Promise<Patient[]> => {
  return callPython<Patient[]>('get_patients');
};

export const getPatientById = async (id: string): Promise<Patient | undefined> => {
  const patients = await getPatients();
  return patients.find(p => p.id === id);
};

export const createPatient = async (patient: Omit<Patient, 'id'>): Promise<Patient> => {
  return callPython<Patient>('create_patient', JSON.stringify(patient));
};

export const updatePatient = async (_id: string, _updates: Partial<Patient>): Promise<Patient | null> => {
  return null;
};

export const deletePatient = async (id: string): Promise<boolean> => {
  await callPython('delete_patient', id);
  return true;
};

// Device CRUD
export const getDevices = async (): Promise<Device[]> => {
  return callPython<Device[]>('get_devices');
};

export const updateDevice = async (id: string, updates: Partial<Device>): Promise<Device | null> => {
  const res = await callPython<Device | { error: string }>('update_device', id, JSON.stringify(updates));
  if ('error' in res) return null;
  return res as Device;
};

// --- Mocks/Placeholders for other entities ---

export const getAppointments = (): Appointment[] => [];
export const getAppointmentById = (_id: string): Appointment | undefined => undefined;
export const getAppointmentsByDoctor = (_doctorId: string): Appointment[] => [];
export const getAppointmentsByPatient = (_patientId: string): Appointment[] => [];
export const createAppointment = (_appointment: Omit<Appointment, 'id'>): Appointment => ({} as Appointment);
export const updateAppointment = (_id: string, _updates: Partial<Appointment>): Appointment | null => null;
export const deleteAppointment = (_id: string): boolean => false;

export const getAlerts = (): Alert[] => [];
export const getUnreadAlerts = (): Alert[] => [];
export const getAlertsByType = (_type: Alert['type']): Alert[] => [];
export const createAlert = (_alert: Omit<Alert, 'id'>): Alert => ({} as Alert);
export const markAlertAsRead = (_id: string): Alert | null => null;
export const deleteAlert = (_id: string): boolean => false;

export const getPrescriptions = (): Prescription[] => [];
export const getPrescriptionById = (_id: string): Prescription | undefined => undefined;
export const getPrescriptionsByPatient = (_patientId: string): Prescription[] => [];
export const createPrescription = (_prescription: Omit<Prescription, 'id'>): Prescription => ({} as Prescription);
export const updatePrescription = (_id: string, _updates: Partial<Prescription>): Prescription | null => null;
export const deletePrescription = (_id: string): boolean => false;

export const simulateVitalsUpdate = (_patientId: string) => {
  return null;
};

export const resetAllData = () => { };
