function id() {
  return Math.random().toString(36).slice(2, 9);
}

const db = {
  users: [
    { id: "u1", name: "Dr. Arivazhagan", email: "dr.suganya@hospital.com", password: "demo", role: "doctor" },
    { id: "u2", name: "Ms. Kanimozhi", email: "patient.anitha@home.com", password: "demo", role: "patient" },
    { id: "u3", name: "Er. Karthik", email: "eng.karthik@service.com", password: "demo", role: "engineer" },
    { id: "u4", name: "Vendor Ravi", email: "vendor.ravi@amc.com", password: "demo", role: "vendor" }
  ],
  patients: [
    { id: "p1", name: "Mohan", latestVitals: "78 bpm / 120-80 / 98%" },
    { id: "p2", name: "Siva", latestVitals: "82 bpm / 130-85 / 97%" },
    { id: "p3", name: "Meena", latestVitals: "72 bpm / 118-76 / 99%" }
  ],
  selfPatient: {
    id: "pSelf",
    name: "Anitha",
    vitals: { hr: 78, bp: "120/80", spo2: 98 }
  },
  devices: [
    { id: "d1", name: "CT Scanner A", type: "CT", status: "online" },
    { id: "d2", name: "X-Ray B", type: "X-ray", status: "maintenance" },
    { id: "d3", name: "ECG C", type: "ECG", status: "offline" }
  ],
  alerts: [
    {
      id: "a1",
      type: "critical",
      title: "CT Scan completed",
      message: "Report ready for Meena · simultaneously visible to technician and doctor"
    }
  ],
  amcContracts: [
    { id: "c1", machineName: "CT Scanner A", status: "Active", expires: "2026-05-10" },
    { id: "c2", machineName: "ECG C", status: "Expiring", expires: "2026-02-01" }
  ]
};

function delay(ms = 120) {
  return new Promise((r) => setTimeout(r, ms));
}

export const api = {
  async signup({ name, email, password, role }) {
    await delay();
    if (db.users.some((u) => u.email === email)) {
      throw new Error("User already exists");
    }
    const user = { id: id(), name: name || email, email, password, role };
    db.users.push(user);
    return user;
  },
  async login({ email, password, role }) {
    await delay();
    const user = db.users.find((u) => u.email === email && u.password === password && u.role === role);
    if (!user) throw new Error("Invalid credentials");
    return user;
  },
  async trialLogin(role) {
    await delay();
    let user = db.users.find((u) => u.role === role);
    if (!user) {
      user = { id: id(), name: role, email: `${role}@trial.local`, password: "demo", role };
      db.users.push(user);
    }
    return user;
  },
  async getPatients() {
    await delay();
    return db.patients.slice();
  },
  async getAlerts(filter = {}) {
    await delay();
    if (filter.type) return db.alerts.filter((a) => a.type === filter.type);
    return db.alerts.slice();
  },
  async getDevices() {
    await delay();
    return db.devices.slice();
  },
  async getAmcContracts() {
    await delay();
    return db.amcContracts.slice();
  },
  async getPatientSelf() {
    await delay();
    return db.selfPatient;
  }
};

