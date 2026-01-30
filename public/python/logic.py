import json
import time
from datetime import datetime, timedelta

# Mock Data Storage
class MockDB:
    def __init__(self):
        self.users = [
            {'id': 'u1', 'name': 'Dr. Sundar', 'email': 'dr.sundar@hospital.com', 'password': 'demo', 'role': 'doctor'},
            {'id': 'u2', 'name': 'Anitha', 'email': 'anitha.patient@email.com', 'password': 'demo', 'role': 'patient'},
            {'id': 'u3', 'name': 'Er. Karthik', 'email': 'eng.karthik@service.com', 'password': 'demo', 'role': 'engineer'},
            {'id': 'u4', 'name': 'Vendor Murugan', 'email': 'vendor.murugan@company.com', 'password': 'demo', 'role': 'vendor'},
        ]

        self.patients = [
            {
                'id': 'p1', 'name': 'Mohan', 'age': 45, 'gender': 'Male',
                'vitals': { 'heartRate': 72, 'bloodPressure': '120/80', 'spo2': 98, 'temperature': 37.0, 'timestamp': datetime.now().isoformat() },
                'prescriptions': []
            },
            {
                'id': 'p2', 'name': 'Lakshmi', 'age': 38, 'gender': 'Female',
                'vitals': { 'heartRate': 75, 'bloodPressure': '118/78', 'spo2': 97, 'temperature': 36.8, 'timestamp': datetime.now().isoformat() },
                'prescriptions': []
            },
            {
                'id': 'p3', 'name': 'Siva', 'age': 52, 'gender': 'Male',
                'vitals': { 'heartRate': 85, 'bloodPressure': '135/88', 'spo2': 95, 'temperature': 37.2, 'timestamp': datetime.now().isoformat() },
                'prescriptions': []
            },
            {
                'id': 'p4', 'name': 'Meena', 'age': 29, 'gender': 'Female',
                'vitals': { 'heartRate': 70, 'bloodPressure': '115/75', 'spo2': 99, 'temperature': 36.6, 'timestamp': datetime.now().isoformat() },
                'prescriptions': []
            },
            {
                'id': 'p5', 'name': 'Ravi', 'age': 60, 'gender': 'Male',
                'vitals': { 'heartRate': 80, 'bloodPressure': '140/90', 'spo2': 94, 'temperature': 37.1, 'timestamp': datetime.now().isoformat() },
                'prescriptions': []
            },
        ]

        self.devices = [
            {'id': 'd1', 'name': 'Ventilator-01', 'type': 'Ventilator', 'location': 'ICU Ward 1', 'status': 'online', 'lastCommunication': datetime.now().isoformat(), 'lastMaintenance': '2023-11-15'},
            {'id': 'd2', 'name': 'CT Scanner-A', 'type': 'CT Scanner', 'location': 'Radiology Dept', 'status': 'online', 'lastCommunication': datetime.now().isoformat(), 'lastMaintenance': '2023-10-20'},
            {'id': 'd3', 'name': 'X-Ray Machine-1', 'type': 'X-Ray', 'location': 'Radiology Dept', 'status': 'online', 'lastCommunication': datetime.now().isoformat(), 'lastMaintenance': '2023-09-01'},
            {'id': 'd4', 'name': 'ECG Monitor-03', 'type': 'ECG', 'location': 'Cardiology Ward', 'status': 'warning', 'lastCommunication': (datetime.now() - timedelta(hours=2)).isoformat(), 'lastMaintenance': '2023-12-05'},
            {'id': 'd5', 'name': 'Ultrasound-B', 'type': 'Ultrasound', 'location': 'OB/GYN Dept', 'status': 'maintenance', 'lastCommunication': (datetime.now() - timedelta(days=1)).isoformat(), 'lastMaintenance': '2023-12-10'},
            {'id': 'd6', 'name': 'MRI Scanner-1', 'type': 'MRI', 'location': 'Radiology Dept', 'status': 'online', 'lastCommunication': datetime.now().isoformat(), 'lastMaintenance': '2023-08-30'},
        ]

db = MockDB()

# --- API Functions Called from JS ---

def login(data_json):
    data = json.loads(data_json)
    email = data.get('email')
    password = data.get('password')
    user = next((u for u in db.users if u['email'] == email and u['password'] == password), None)
    return json.dumps(user) if user else json.dumps({"error": "Invalid credentials"})

def login_demo(data_json):
    data = json.loads(data_json)
    role = data.get('role')
    user = next((u for u in db.users if u['role'] == role), None)
    return json.dumps(user) if user else json.dumps({"error": "User not found"})

def get_patients():
    return json.dumps(db.patients)

def create_patient(data_json):
    data = json.loads(data_json)
    new_patient = {
        'id': f"p{int(time.time())}",
        'name': data.get('name'),
        'age': data.get('age', 30),
        'diagnosis': data.get('diagnosis', 'Observation'),
        'status': data.get('status', 'Stable'),
        'gender': 'Unknown',
        'vitals': {},
        'prescriptions': []
    }
    db.patients.append(new_patient)
    return json.dumps(new_patient)

def delete_patient(pid):
    db.patients = [p for p in db.patients if p['id'] != pid]
    return json.dumps({"success": True})

def get_devices():
    return json.dumps(db.devices)

def update_device(id, data_json):
    data = json.loads(data_json)
    device = next((d for d in db.devices if d['id'] == id), None)
    if device:
        device.update(data)
        return json.dumps(device)
    return json.dumps({"error": "Device not found"})

print("Conexta Python Logic Loaded Successfully")
