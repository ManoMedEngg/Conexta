// Demo / fake data generators and localStorage helpers for Conexta

const CONEXTA_AUTH_KEY = "conexta_auth";
const CONEXTA_USERS_KEY = "conexta_users";
const CONEXTA_PATIENTS_KEY = "conexta_patients";
const CONEXTA_DEVICES_KEY = "conexta_devices";
const CONEXTA_SETTINGS_KEY = "conexta_settings";

const tamilNames = [
  "Dr. Suganya",
  "Dr. Ashok",
  "Mohan",
  "Meena",
  "Karthik",
  "Lakshmi",
  "Sundar",
  "Revathi",
  "Vignesh",
  "Anitha",
];

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (_) {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_) {
    // ignore in demo
  }
}

function getDemoUsers() {
  const existing = loadJson(CONEXTA_USERS_KEY, null);
  if (existing && existing.length) return existing;
  const demo = [
    {
      id: "demo-doctor",
      password: "doctor123",
      role: "doctor",
      name: "Dr. Suganya",
    },
    {
      id: "demo-patient",
      password: "patient123",
      role: "patient",
      name: "Mohan",
    },
    {
      id: "demo-engineer",
      password: "engineer123",
      role: "engineer",
      name: "Karthik",
    },
    {
      id: "demo-vendor",
      password: "vendor123",
      role: "vendor",
      name: "Lakshmi",
    },
  ];
  saveJson(CONEXTA_USERS_KEY, demo);
  return demo;
}

function registerUser(user) {
  const users = loadJson(CONEXTA_USERS_KEY, getDemoUsers());
  users.push(user);
  saveJson(CONEXTA_USERS_KEY, users);
}

function authenticate(userId, password) {
  const users = loadJson(CONEXTA_USERS_KEY, getDemoUsers());
  const found = users.find(
    (u) => u.id.toLowerCase() === String(userId).toLowerCase() && u.password === password
  );
  if (!found) return null;
  const session = {
    id: found.id,
    name: found.name || found.id,
    role: found.role || "doctor",
  };
  saveJson(CONEXTA_AUTH_KEY, session);
  return session;
}

function setAuthSession(session) {
  saveJson(CONEXTA_AUTH_KEY, session);
}

function getAuthSession() {
  return loadJson(CONEXTA_AUTH_KEY, null);
}

function clearAuthSession() {
  try {
    localStorage.removeItem(CONEXTA_AUTH_KEY);
  } catch (_) {
    // ignore
  }
}

function getSettings() {
  return loadJson(CONEXTA_SETTINGS_KEY, { displayName: null, hue: 200 });
}

function saveSettings(settings) {
  saveJson(CONEXTA_SETTINGS_KEY, settings);
}

function generateFakeVitals() {
  const now = new Date();
  const base = now.getSeconds();
  const heartRate = 72 + Math.round(Math.sin(base / 5) * 10);
  const spo2 = 96 + Math.round(Math.cos(base / 3));
  const systolic = 118 + Math.round(Math.sin(base / 7) * 8);
  const diastolic = 76 + Math.round(Math.cos(base / 6) * 6);
  const temp = 36.7 + Math.sin(base / 11) * 0.3;

  return {
    heartRate,
    spo2,
    bp: `${systolic}/${diastolic}`,
    temp: temp.toFixed(1),
  };
}

function ensurePatientsSeeded() {
  const existing = loadJson(CONEXTA_PATIENTS_KEY, null);
  if (existing && existing.length) return existing;
  const demoPatients = [
    { id: "P-1001", name: "Mohan", age: 52, department: "Cardiology" },
    { id: "P-1002", name: "Meena", age: 44, department: "Neurology" },
    { id: "P-1003", name: "Karthik", age: 35, department: "ICU" },
  ];
  saveJson(CONEXTA_PATIENTS_KEY, demoPatients);
  return demoPatients;
}

function getPatients() {
  return ensurePatientsSeeded();
}

function createPatient(patient) {
  const patients = ensurePatientsSeeded();
  patients.push(patient);
  saveJson(CONEXTA_PATIENTS_KEY, patients);
}

function updatePatient(id, updates) {
  const patients = ensurePatientsSeeded();
  const idx = patients.findIndex((p) => p.id === id);
  if (idx === -1) return;
  patients[idx] = { ...patients[idx], ...updates };
  saveJson(CONEXTA_PATIENTS_KEY, patients);
}

function deletePatient(id) {
  const patients = ensurePatientsSeeded().filter((p) => p.id !== id);
  saveJson(CONEXTA_PATIENTS_KEY, patients);
}

function ensureDevicesSeeded() {
  const existing = loadJson(CONEXTA_DEVICES_KEY, null);
  if (existing && existing.length) return existing;
  const demoDevices = [
    {
      id: "D-CT-01",
      name: "CT Scanner",
      type: "CT",
      location: "Radiology",
      status: "online",
    },
    {
      id: "D-ECG-02",
      name: "ECG Monitor",
      type: "ECG",
      location: "ICU-2",
      status: "online",
    },
    {
      id: "D-INF-03",
      name: "Infusion Pump",
      type: "Infusion",
      location: "Ward-5",
      status: "attention",
    },
  ];
  saveJson(CONEXTA_DEVICES_KEY, demoDevices);
  return demoDevices;
}

function getDevices() {
  return ensureDevicesSeeded();
}

function createDevice(device) {
  const devices = ensureDevicesSeeded();
  devices.push(device);
  saveJson(CONEXTA_DEVICES_KEY, devices);
}

function updateDevice(id, updates) {
  const devices = ensureDevicesSeeded();
  const idx = devices.findIndex((d) => d.id === id);
  if (idx === -1) return;
  devices[idx] = { ...devices[idx], ...updates };
  saveJson(CONEXTA_DEVICES_KEY, devices);
}

function deleteDevice(id) {
  const devices = ensureDevicesSeeded().filter((d) => d.id !== id);
  saveJson(CONEXTA_DEVICES_KEY, devices);
}

function generateFakeAppointments() {
  return [
    {
      id: "A-01",
      patient: "Mohan",
      time: "09:30",
      department: "Cardiology",
      status: "upcoming",
    },
    {
      id: "A-02",
      patient: "Meena",
      time: "10:15",
      department: "Neurology",
      status: "upcoming",
    },
    {
      id: "A-03",
      patient: "Karthik",
      time: "08:10",
      department: "ICU Review",
      status: "completed",
    },
  ];
}

function generateFakeAlarms() {
  const now = new Date();
  const timestamp = now.toLocaleTimeString();
  return [
    {
      id: "AL-01",
      patient: "Mohan",
      device: "ICU ECG",
      parameter: "Heart rate",
      value: "132 bpm",
      time: timestamp,
    },
    {
      id: "AL-02",
      patient: "Meena",
      device: "SPO₂ Probe",
      parameter: "SpO₂",
      value: "86 %",
      time: timestamp,
    },
  ];
}

function generateFakeReports() {
  const now = new Date();
  return [
    {
      id: "R-CT-01",
      patient: "Karthik",
      modality: "CT Brain",
      completedAt: now.toLocaleTimeString(),
      summary:
        "No acute intracranial bleed. Mild age-related cerebral atrophy. Recommend routine follow up.",
    },
  ];
}


const HOSPITAL_STRUCTURE = [
  {
    category: "Clinical Departments",
    departments: [
      {
        name: "General Medicine",
        equipment: ["Patient beds", "Bedside monitors (NIBP, SpO₂, ECG)", "Infusion pumps", "Syringe pumps", "Glucometers", "Thermometers", "Pulse oximeters"]
      },
      {
        name: "Cardiology",
        equipment: ["12‑lead ECG machines", "Treadmill test (TMT) system", "Echocardiography machine", "Holter monitors", "Defibrillators (manual/automatic)"]
      },
      {
        name: "Neurology",
        equipment: ["EEG machines", "EMG/NCS systems", "Neuromonitoring devices", "Reflex hammers", "Tuning forks"]
      },
      {
        name: "Orthopedics & Spine",
        equipment: ["Ortho OT tables", "C‑arm image intensifier", "Power drills and saws", "Traction units", "CPM machines"]
      },
      {
        name: "Gastroenterology / Hepatology",
        equipment: ["Video endoscopy systems", "Endoscopic ultrasound system (EUS)", "ERCP setup", "Infusion pumps for sedation"]
      },
      {
        name: "Pulmonology",
        equipment: ["Spirometers", "Bronchoscopy system", "Non‑invasive ventilators", "Peak flow meters"]
      },
      {
        name: "Nephrology",
        equipment: ["Hemodialysis machines", "RO water treatment unit", "CRRT machines", "Dialysis chairs/beds"]
      },
      {
        name: "Endocrinology / Diabetology",
        equipment: ["Glucometers", "Continuous glucose monitors", "Insulin pump demo units", "Body composition analyzers"]
      },
      {
        name: "Rheumatology",
        equipment: ["Infusion pumps for biologics", "Ultrasound (for joint injections)"]
      },
      {
        name: "Oncology / Medical Oncology",
        equipment: ["Infusion pumps", "Chemo chairs", "Chemo safety cabinets", "Oncology day‑care monitors"]
      },
      {
        name: "Surgical Oncology / General Surgery",
        equipment: ["OT tables", "Anesthesia machines", "Electrosurgical units (cautery)", "Surgical lights", "Laparoscopy towers"]
      },
      {
        name: "Urology",
        equipment: ["Cystoscopy system", "Ureteroscopy systems", "TURP resectoscope sets", "Lithotripsy machine (ESWL)", "Urodynamics system"]
      },
      {
        name: "Nephrology & Kidney Transplant",
        equipment: ["ICU‑grade monitors", "Ventilators", "Hemodialysis units"]
      },
      {
        name: "Obstetrics & Gynecology",
        equipment: ["Fetal monitors (CTG)", "Delivery beds", "Colposcope", "Ultrasound machines (OB profile)"]
      },
      {
        name: "Pediatrics & Neonatology",
        equipment: ["Pediatric beds", "Infant warmers", "Phototherapy units", "Pediatric ventilators", "Incubators", "Syringe pumps"]
      },
      {
        name: "NICU (Neonatal ICU)",
        equipment: ["High‑end incubators", "Neonatal ventilators", "CPAP", "Multiparameter neonatal monitors", "Phototherapy units"]
      },
      {
        name: "Dermatology",
        equipment: ["Dermatoscopes", "Laser systems", "PUVA / phototherapy units"]
      },
      {
        name: "Ophthalmology",
        equipment: ["Slit lamps", "Autorefractors", "Keratometers", "Phacoemulsification unit", "Operating microscope", "Fundus camera"]
      },
      {
        name: "ENT (Otorhinolaryngology)",
        equipment: ["ENT examination units", "Operating microscope", "Rigid and flexible endoscopes", "Audiometry systems", "Tympanometry systems"]
      },
      {
        name: "Psychiatry",
        equipment: ["ECT machine", "Basic vital monitors"]
      },
      {
        name: "Dental & Maxillofacial",
        equipment: ["Dental chairs and units", "Intraoral X‑ray", "OPG/CBCT", "Surgical drills"]
      },
      {
        name: "Geriatrics",
        equipment: ["Standard monitors", "Mobility aids (walkers, wheelchairs)"]
      }
    ]
  },
  {
    category: "Diagnostic & Support Departments",
    departments: [
      {
        name: "Radiology & Imaging",
        equipment: ["MRI scanner", "CT scanner", "Digital X‑ray systems", "Portable X‑ray machines", "Ultrasound machines", "C‑arm in OT", "Mammography machine", "PACS workstations"]
      },
      {
        name: "Interventional Radiology / Cath Lab",
        equipment: ["Cath lab system", "DSA system", "Pressure injectors", "Hemodynamic monitoring systems"]
      },
      {
        name: "Laboratory Services",
        equipment: ["Fully automated analyzers", "Hematology analyzers", "Coagulation analyzers", "ABG analyzers", "Blood culture systems", "Microscopes"]
      },
      {
        name: "Blood Bank",
        equipment: ["Blood bank refrigerators", "Deep freezers", "Platelet agitator", "Blood collection monitors", "Component separators"]
      },
      {
        name: "Pharmacy",
        equipment: ["Refrigerators for cold‑chain drugs", "Automated dispensing cabinets"]
      },
      {
        name: "Physiotherapy & Rehabilitation",
        equipment: ["Shortwave diathermy", "Ultrasound therapy units", "TENS/IFT units", "CPM machines", "Exercise equipment"]
      }
    ]
  },
  {
    category: "Critical Care & Emergency",
    departments: [
      {
        name: "Emergency Department (ED)",
        equipment: ["Multiparameter monitors", "Defibrillators", "Ventilators", "Suction units", "Crash carts", "Point‑of‑care testing devices"]
      },
      {
        name: "Adult ICUs",
        equipment: ["ICU‑grade monitors", "Ventilators", "Syringe pumps", "Infusion pumps", "Dialysis machines", "Bedside ultrasound", "Portable X‑ray"]
      },
      {
        name: "HDU",
        equipment: ["HDU Monitors", "Basic support devices"]
      }
    ]
  },
  {
    category: "Surgical & Procedure Areas",
    departments: [
      {
        name: "Operating Theatres",
        equipment: ["Modular OT tables", "Anesthesia workstations", "Ventilators", "Surgical lights", "Electrocautery units", "Laparoscopy towers", "Surgical microscopes"]
      },
      {
        name: "Endoscopy Suite",
        equipment: ["Gastroscopes", "Colonoscopes", "Duodenoscopes", "Video processing units", "Light sources", "insufflators"]
      },
      {
        name: "Cath Lab (Cardiac)",
        equipment: ["Cath lab imaging system", "Hemodynamic recorders", "Contrast injectors", "Defibrillator", "External pacemaker"]
      }
    ]
  },
  {
    category: "Administrative / Non‑clinical",
    departments: [
      {
        name: "Nurse Stations & Wards",
        equipment: ["Nursing station computers", "Central monitoring consoles", "Barcode scanners"]
      },
      {
        name: "Hospital Administration",
        equipment: ["Servers", "PACS storage", "HIS workstations", "Network switches"]
      },
      {
        name: "Biomedical Engineering",
        equipment: ["Testing tools", "Calibration tools", "Ventilator testers", "Defibrillator analyzers", "Infusion pump analyzers"]
      }
    ]
  }
];

function generateEquipmentUsageData(equipmentName) {
  const names = ["Rajesh", "Priya", "Amit", "Sneha", "Vikram", "Anjali", "Suresh", "Divya", "Kamal", "Rani", "Arun", "Deepa"];
  const conditions = ["Routine Checkup", "Critical Observation", "Post-op Recovery", "Diagnostic Scan", "Therapy Session"];

  const generateList = (count, status) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `P-${Math.floor(Math.random() * 9000) + 1000}`,
      name: names[Math.floor(Math.random() * names.length)],
      age: Math.floor(Math.random() * 60) + 10,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      status: status
    }));
  };

  return {
    treated: generateList(Math.floor(Math.random() * 8) + 1, "Completed"),
    active: generateList(Math.floor(Math.random() * 3) + 1, "In Progress"),
    pending: generateList(3, "Pending")
  };
}
