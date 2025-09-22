// script.js

document.addEventListener('DOMContentLoaded', () => {
    // =================================================================================
    // STATE MANAGEMENT
    // All application state is managed here, similar to React's useState.
    // =================================================================================
    let state = {
        theme: 'light',
        user: null, // Holds authenticated user object or null
        activeTab: 'dashboard',
        devices: [
             {
      id: 'dev-001',
      name: 'Ward A - Multiparameter Monitor',
      type: 'Multiparameter Monitor',
      status: 'online',
      lastUpdate: '2 minutes ago',
      vitals: {
        heartRate: 72,
        bloodPressure: { systolic: 120, diastolic: 80, mean: 93 },
        temperature: 98.6,
        oxygenSaturation: 98,
        respiratoryRate: 16,
        bloodGlucose: 95,
        painLevel: 3,
        consciousnessLevel: 15,
        capnography: 35,
        perfusionIndex: 1.2,
        pulseVariability: 8,
        ecgRhythm: 'normal'
      },
      patientId: 'PAT-001',
      patientName: 'John Smith'
    },
    {
      id: 'dev-002',
      name: 'ICU - Critical Care Monitor',
      type: 'Multiparameter Monitor',
      status: 'online',
      lastUpdate: '1 minute ago',
      vitals: {
        heartRate: 84,
        bloodPressure: { systolic: 130, diastolic: 85, mean: 100 },
        temperature: 99.1,
        oxygenSaturation: 97,
        respiratoryRate: 18,
        bloodGlucose: 110,
        painLevel: 5,
        consciousnessLevel: 14,
        capnography: 38,
        perfusionIndex: 0.9,
        pulseVariability: 12,
        ecgRhythm: 'arrhythmia'
      },
      patientId: 'PAT-002',
      patientName: 'Sarah Johnson'
    },
    {
      id: 'dev-003',
      name: 'Emergency - Portable Monitor',
      type: 'Multiparameter Monitor',
      status: 'maintenance',
      lastUpdate: '1 hour ago',
      vitals: {},
      patientId: 'PAT-003',
      patientName: 'Mike Wilson'
    }
        ],
        patients: [
             {
      id: 'PAT-001',
      name: 'John Smith',
      age: 65,
      gender: 'Male',
      condition: 'Hypertension',
      severity: 'medium',
      admissionDate: '2024-01-15',
      connectedDevices: 2,
      latestVitals: {
        heartRate: 72,
        bloodPressure: { systolic: 120, diastolic: 80, mean: 93 },
        temperature: 98.6,
        respiratoryRate: 16,
        oxygenSaturation: 98,
        bloodGlucose: 95,
        painLevel: 3,
        consciousnessLevel: 15,
        timestamp: '2 minutes ago'
      }
    },
    {
      id: 'PAT-002',
      name: 'Sarah Johnson',
      age: 42,
      gender: 'Female',
      condition: 'Cardiac Arrhythmia',
      severity: 'high',
      admissionDate: '2024-01-18',
      connectedDevices: 1,
      latestVitals: {
        heartRate: 84,
        bloodPressure: { systolic: 130, diastolic: 85, mean: 100 },
        temperature: 99.1,
        respiratoryRate: 18,
        oxygenSaturation: 97,
        bloodGlucose: 110,
        painLevel: 5,
        consciousnessLevel: 14,
        timestamp: '1 minute ago'
      }
    },
    {
      id: 'PAT-003',
      name: 'Mike Wilson',
      age: 58,
      gender: 'Male',
      condition: 'Post-Surgery Recovery',
      severity: 'low',
      admissionDate: '2024-01-20',
      connectedDevices: 1,
      latestVitals: {
        heartRate: 68,
        bloodPressure: { systolic: 115, diastolic: 75, mean: 88 },
        temperature: 98.2,
        respiratoryRate: 14,
        oxygenSaturation: 99,
        bloodGlucose: 88,
        painLevel: 2,
        consciousnessLevel: 15,
        timestamp: '5 minutes ago'
      }
    }
        ],
        chartData: {
            heartRate: [{ time: '10:00', value: 72 }, { time: '10:05', value: 74 }, { time: '10:10', value: 71 }, { time: '10:15', value: 73 }, { time: '10:20', value: 70 }, { time: '10:25', value: 72 }],
            temperature: [{ time: '10:00', value: 98.6 }, { time: '10:05', value: 98.7 }, { time: '10:10', value: 98.5 }, { time: '10:15', value: 98.8 }, { time: '10:20', value: 98.6 }, { time: '10:25', value: 98.7 }],
            respiratory: [{ time: '10:00', value: 16 }, { time: '10:05', value: 17 }, { time: '10:10', value: 15 }, { time: '10:15', value: 16 }, { time: '10:20', value: 18 }, { time: '10:25', value: 16 }],
            bloodPressure: [{ time: '10:00', systolic: 120, diastolic: 80 }, { time: '10:05', systolic: 122, diastolic: 82 }, { time: '10:10', systolic: 118, diastolic: 78 }, { time: '10:15', systolic: 125, diastolic: 85 }, { time: '10:20', systolic: 121, diastolic: 79 }, { time: '10:25', systolic: 120, diastolic: 80 }],
            oxygenSaturation: [{ time: '10:00', value: 98 }, { time: '10:05', value: 97 }, { time: '10:10', value: 99 }, { time: '10:15', value: 98 }, { time: '10:20', value: 96 }, { time: '10:25', value: 98 }],
            bloodGlucose: [{ time: '10:00', value: 95 }, { time: '10:05', value: 98 }, { time: '10:10', value: 92 }, { time: '10:15', value: 97 }, { time: '10:20', value: 94 }, { time: '10:25', value: 95 }],
        }
    };
    
    // Global object to hold chart instances for updates
    let charts = {};

    // =================================================================================
    // UTILITY & HELPER FUNCTIONS
    // =================================================================================

    const root = document.getElementById('root');

    // Capitalizes the first letter of a string
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    // =================================================================================
    // COMPONENT FUNCTIONS
    // These functions generate HTML strings, acting like React components.
    // =================================================================================

    // --- LoginPage Component ---
    function LoginPage() {
        return `
            <div class="min-h-screen bg-background flex items-center justify-center p-4 relative">
                <div class="absolute top-4 right-4">
                    <button id="theme-toggle-btn" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 gap-2">
                        ${state.theme === 'light' ? '<i data-lucide="moon" class="h-4 w-4"></i><span class="hidden sm:inline">Dark</span>' : '<i data-lucide="sun" class="h-4 w-4"></i><span class="hidden sm:inline">Light</span>'}
                    </button>
                </div>
                <div class="w-full max-w-4xl">
                    <div class="text-center mb-8">
                         <div class="flex items-center justify-center gap-3 mb-4">
                            <div class="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                                <i data-lucide="activity" class="h-8 w-8 text-primary-foreground"></i>
                            </div>
                            <div class="text-left">
                                <h1 class="text-3xl font-bold">Connexta</h1>
                                <p class="text-sm text-muted-foreground">IoT Medical Device Management Platform</p>
                            </div>
                        </div>
                    </div>
                    <div class="mx-auto max-w-2xl border bg-card text-card-foreground shadow-sm rounded-lg">
                        <div class="flex flex-col space-y-1.5 p-6 text-center">
                            <h3 class="text-2xl font-semibold">Sign In to Connexta</h3>
                            <p class="text-sm text-muted-foreground">Choose your role to access the appropriate dashboard</p>
                        </div>
                        <div class="p-6 pt-0">
                            <div id="login-tabs">
                                <div class="grid w-full grid-cols-2 lg:grid-cols-4">
                                    <button data-tab="doctor" class="login-tab-trigger flex-1 text-xs justify-center inline-flex items-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Doctor</button>
                                    <button data-tab="patient" class="login-tab-trigger flex-1 text-xs justify-center inline-flex items-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Patient</button>
                                    <button data-tab="vendor" class="login-tab-trigger flex-1 text-xs justify-center inline-flex items-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Vendor</button>
                                    <button data-tab="connexta" class="login-tab-trigger flex-1 text-xs justify-center inline-flex items-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Admin</button>
                                </div>
                                <div id="login-form-container" class="mt-6 space-y-4">
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // --- Login Form Content ---
    function LoginForm(userType) {
        const userTypes = {
            doctor: { label: 'Doctor', description: 'Access patient monitoring and medical records' },
            patient: { label: 'Patient', description: 'View your health data and vital signs' },
            vendor: { label: 'Vendor', description: 'Manage medical devices and equipment' },
            connexta: { label: 'Connexta Admin', description: 'Full system administration and oversight' }
        };
        const details = userTypes[userType];
        return `
            <div class="text-center mb-6">
                <h3 class="text-lg font-semibold">${details.label} Access</h3>
                <p class="text-sm text-muted-foreground">${details.description}</p>
            </div>
            <div class="space-y-4">
                <div>
                    <label class="text-sm font-medium">Email Address</label>
                    <input type="email" id="email-input" placeholder="Enter your email" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1" />
                </div>
                <div>
                    <label class="text-sm font-medium">Password</label>
                    <input type="password" id="password-input" placeholder="Enter your password" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1" />
                </div>
                <button id="login-submit-btn" data-type="${userType}" class="inline-flex items-center justify-center w-full h-10 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md">
                    Sign In as ${details.label}
                </button>
            </div>
        `;
    }

    // --- VitalChart Component (using Chart.js) ---
    function VitalChart(title, canvasId) {
        return `
            <div class="border bg-card text-card-foreground shadow-sm rounded-lg">
                <div class="p-6 pb-2">
                    <div class="flex items-center justify-between">
                         <h3 class="text-lg font-semibold">${title}</h3>
                         <div id="${canvasId}-current" class="text-right"></div>
                    </div>
                </div>
                <div class="p-6 pt-0">
                    <div class="h-48">
                        <canvas id="${canvasId}"></canvas>
                    </div>
                </div>
            </div>
        `;
    }

    // --- Main Application Shell ---
    function AppShell() {
        const onlineDevices = state.devices.filter(d => d.status === 'online').length;
        const totalPatients = state.patients.length;
        const activeAlerts = state.patients.filter(p => p.severity === 'high' || p.severity === 'critical').length;

        // User-specific tabs
        const getTabsForUser = (userType) => {
            let tabs = {
                'dashboard': 'Dashboard'
            };
            if (userType === 'doctor') {
                Object.assign(tabs, {
                    'device-status': 'Device Status',
                    'patient-details': 'Patient Details',
                    'live-monitoring': 'Live Monitoring',
                });
            }
            if (userType === 'patient') {
                 Object.assign(tabs, {
                    'medical-history': 'Medical History',
                    'health-benefits': 'Health Benefits',
                });
            }
             if (userType === 'vendor') {
                 Object.assign(tabs, {
                    'device-inventory': 'Device Inventory',
                    'maintenance': 'Maintenance',
                });
            }
            if (userType === 'connexta') {
                 Object.assign(tabs, {
                    'device-overview': 'Device Overview',
                    'system-analytics': 'System Analytics',
                });
            }
            return Object.entries(tabs).map(([key, value]) => `
                <button data-tab="${key}" class="main-tab-trigger whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium">
                    ${value}
                </button>
            `).join('');
        }

        return `
            <div class="min-h-screen bg-background">
                <header class="border-b bg-card">
                    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                                <i data-lucide="activity" class="h-6 w-6 text-primary-foreground"></i>
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold">Connexta</h1>
                                <p class="text-sm text-muted-foreground">IoT Medical Device Management Platform</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="flex items-center gap-2 px-3 py-1 bg-secondary rounded-lg">
                                <i data-lucide="user" class="h-4 w-4"></i>
                                <span class="text-sm">${state.user.name}</span>
                                <span class="text-xs inline-flex items-center rounded-md border px-2 py-0.5 font-semibold">${capitalize(state.user.userType)}</span>
                            </div>
                            <button id="logout-btn" class="inline-flex items-center justify-center h-9 px-3 border border-input rounded-md gap-2 text-sm">
                                <i data-lucide="log-out" class="h-4 w-4"></i>
                                <span class="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main class="container mx-auto px-6 py-6">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div class="border bg-card rounded-lg p-6 flex items-center gap-3"><div class="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"><i data-lucide="wifi" class="h-6 w-6 text-green-600"></i></div><div><p class="text-sm text-muted-foreground">Online Devices</p><p id="online-devices-stat" class="text-2xl font-bold">${onlineDevices}</p></div></div>
                        <div class="border bg-card rounded-lg p-6 flex items-center gap-3"><div class="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"><i data-lucide="users" class="h-6 w-6 text-blue-600"></i></div><div><p class="text-sm text-muted-foreground">Active Patients</p><p class="text-2xl font-bold">${totalPatients}</p></div></div>
                        <div class="border bg-card rounded-lg p-6 flex items-center gap-3"><div class="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center"><i data-lucide="heart" class="h-6 w-6 text-red-600"></i></div><div><p class="text-sm text-muted-foreground">Active Alerts</p><p id="active-alerts-stat" class="text-2xl font-bold">${activeAlerts}</p></div></div>
                        <div class="border bg-card rounded-lg p-6 flex items-center gap-3"><div class="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"><i data-lucide="bar-chart-3" class="h-6 w-6 text-purple-600"></i></div><div><p class="text-sm text-muted-foreground">Data Points Today</p><p class="text-2xl font-bold">1,247</p></div></div>
                    </div>

                    <div class="space-y-6">
                        <div class="overflow-x-auto">
                            <div class="flex w-max min-w-full p-1 bg-muted rounded-md">
                                ${getTabsForUser(state.user.userType)}
                            </div>
                        </div>
                        <div id="tabs-content-container">
                            </div>
                    </div>
                </main>
            </div>
        `;
    }

    // --- Tabs Content Renderer ---
    function renderTabContent(tabId) {
        let content = '';
        if (tabId === 'dashboard') {
            content = `
                <div class="border bg-card rounded-lg p-6">
                    <h3 class="text-2xl font-semibold mb-4">System Overview</h3>
                    <img src="https://i.ibb.co/6ngp6sM/341cc1fcdf6e9c27b234649c5055666ff4a6ab0e.png" alt="System Diagram" class="rounded-lg shadow-sm max-w-full h-auto mx-auto"/>
                    <div class="mt-4 bg-muted/50 p-4 rounded-lg">
                        <h4 class="text-lg mb-2">Welcome to the ${capitalize(state.user.userType)} Dashboard</h4>
                        <p class="text-sm text-muted-foreground">Monitor device status, patient vitals, and system analytics in real-time.</p>
                    </div>
                </div>`;
        } else if (tabId === 'live-monitoring') {
            content = `
                <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    ${VitalChart('Heart Rate', 'hr-chart')}
                    ${VitalChart('Body Temperature', 'temp-chart')}
                    ${VitalChart('Respiratory Rate', 'resp-chart')}
                    ${VitalChart('Oxygen Saturation', 'o2-chart')}
                    ${VitalChart('Blood Glucose', 'glucose-chart')}
                    <div class="lg:col-span-2 xl:col-span-1">
                        ${VitalChart('Blood Pressure', 'bp-chart')}
                    </div>
                </div>
            `;
        } else if (tabId === 'device-status' || tabId === 'device-inventory' || tabId === 'device-overview') {
             const getDeviceStatusBadge = (status) => {
                const colors = { online: 'bg-green-500', offline: 'bg-red-500', maintenance: 'bg-yellow-500' };
                return `<span class="text-xs text-white ${colors[status]} inline-flex items-center rounded-full px-2 py-0.5 font-semibold">${capitalize(status)}</span>`;
            };
            content = `
                <div class="border bg-card rounded-lg p-6">
                    <h3 class="text-2xl font-semibold mb-4">Device Status</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${state.devices.map(device => `
                            <div class="p-4 border rounded-lg">
                                <div class="flex items-center justify-between mb-3">
                                    <h4 class="font-semibold">${device.name}</h4>
                                    ${getDeviceStatusBadge(device.status)}
                                </div>
                                <div class="space-y-2 text-sm">
                                    <div><span class="font-medium">Type:</span> ${device.type}</div>
                                    <div><span class="font-medium">Patient:</span> ${device.patientName}</div>
                                    <div><span class="font-medium">Last Update:</span> ${device.lastUpdate}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
             content = `<div class="border bg-card rounded-lg p-6 text-center"><h3 class="text-xl font-semibold">Content for ${capitalize(tabId)}</h3><p class="text-muted-foreground">This section is under construction.</p></div>`;
        }
        document.getElementById('tabs-content-container').innerHTML = content;
        
        // If the live monitoring tab is active, initialize charts
        if (tabId === 'live-monitoring') {
            initCharts();
        }
    }

    // =================================================================================
    // CHARTING LOGIC (Chart.js)
    // =================================================================================

    function createChart(canvasId, config) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if (ctx) {
            // Destroy existing chart if it exists
            if (charts[canvasId]) {
                charts[canvasId].destroy();
            }
            charts[canvasId] = new Chart(ctx, config);
        }
    }
    
    function initCharts() {
        const gridColor = state.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        const labelColor = state.theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';

        const chartOptions = (unit) => ({
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: labelColor }, grid: { color: gridColor } },
                y: { ticks: { color: labelColor }, grid: { color: gridColor } }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.raw} ${unit}`
                    }
                }
            }
        });
        
        // Heart Rate Chart
        createChart('hr-chart', {
            type: 'line',
            data: {
                labels: state.chartData.heartRate.map(d => d.time),
                datasets: [{
                    label: 'Heart Rate',
                    data: state.chartData.heartRate.map(d => d.value),
                    borderColor: '#ef4444',
                    tension: 0.3,
                }]
            },
            options: chartOptions('bpm')
        });

        // Temperature Chart
        createChart('temp-chart', {
            type: 'line',
            data: {
                labels: state.chartData.temperature.map(d => d.time),
                datasets: [{
                    label: 'Temperature',
                    data: state.chartData.temperature.map(d => d.value),
                    borderColor: '#f97316',
                    tension: 0.3,
                }]
            },
            options: chartOptions('°F')
        });
        
        // Respiratory Rate Chart
        createChart('resp-chart', {
            type: 'line',
            data: {
                labels: state.chartData.respiratory.map(d => d.time),
                datasets: [{
                    label: 'Respiratory Rate',
                    data: state.chartData.respiratory.map(d => d.value),
                    borderColor: '#10b981',
                    tension: 0.3,
                }]
            },
            options: chartOptions('breaths/min')
        });

        // Blood Pressure Chart
        createChart('bp-chart', {
            type: 'line',
            data: {
                labels: state.chartData.bloodPressure.map(d => d.time),
                datasets: [
                    {
                        label: 'Systolic',
                        data: state.chartData.bloodPressure.map(d => d.systolic),
                        borderColor: '#ef4444',
                        tension: 0.3,
                    },
                    {
                        label: 'Diastolic',
                        data: state.chartData.bloodPressure.map(d => d.diastolic),
                        borderColor: '#3b82f6',
                        tension: 0.3,
                    }
                ]
            },
            options: { ...chartOptions('mmHg'), plugins: { legend: { display: true, labels: { color: labelColor } } } }
        });

        updateCurrentValues();
    }
    
    function updateCharts() {
        if (state.activeTab !== 'live-monitoring') return;
        
        const updateSingleChart = (chartId, data) => {
            const chart = charts[chartId];
            if (chart) {
                chart.data.labels = data.map(d => d.time);
                chart.data.datasets[0].data = data.map(d => d.value);
                chart.update();
            }
        };

        updateSingleChart('hr-chart', state.chartData.heartRate);
        updateSingleChart('temp-chart', state.chartData.temperature);
        updateSingleChart('resp-chart', state.chartData.respiratory);
        
        // Update Blood Pressure chart (multi-dataset)
        const bpChart = charts['bp-chart'];
        if (bpChart) {
            bpChart.data.labels = state.chartData.bloodPressure.map(d => d.time);
            bpChart.data.datasets[0].data = state.chartData.bloodPressure.map(d => d.systolic);
            bpChart.data.datasets[1].data = state.chartData.bloodPressure.map(d => d.diastolic);
            bpChart.update();
        }

        updateCurrentValues();
    }

    function updateCurrentValues() {
        const hr = state.chartData.heartRate.slice(-1)[0];
        const temp = state.chartData.temperature.slice(-1)[0];
        const bp = state.chartData.bloodPressure.slice(-1)[0];
        
        const hrEl = document.getElementById('hr-chart-current');
        if (hrEl) hrEl.innerHTML = `<div class="text-2xl font-bold text-red-500">${hr.value}</div><div class="text-sm text-muted-foreground">bpm</div>`;

        const tempEl = document.getElementById('temp-chart-current');
        if (tempEl) tempEl.innerHTML = `<div class="text-2xl font-bold text-orange-500">${temp.value}</div><div class="text-sm text-muted-foreground">°F</div>`;
        
        const bpEl = document.getElementById('bp-chart-current');
        if (bpEl) bpEl.innerHTML = `<div class="text-2xl font-bold text-red-500">${bp.systolic}/${bp.diastolic}</div><div class="text-sm text-muted-foreground">mmHg</div>`;
    }

    // =================================================================================
    // EVENT HANDLERS & BINDING
    // =================================================================================

    function attachEventListeners() {
        // Use event delegation on the root element for performance
        root.onclick = function(event) {
            let target = event.target.closest('button');
            if (!target) return;

            // Login Page Listeners
            if (target.id === 'theme-toggle-btn') handleToggleTheme();
            if (target.matches('.login-tab-trigger')) handleLoginTabSwitch(target.dataset.tab);
            if (target.id === 'login-submit-btn') handleLogin(target.dataset.type);

            // Main App Listeners
            if (target.id === 'logout-btn') handleLogout();
            if (target.matches('.main-tab-trigger')) handleMainTabSwitch(target.dataset.tab);
        };
    }
    
    function handleToggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', state.theme);
        applyTheme();
        renderApp(); // Re-render to update button icon/text
    }

    function applyTheme() {
        if (state.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Re-initialize charts if they exist to update colors
        if (charts['hr-chart']) {
            initCharts();
        }
    }
    
    function handleLoginTabSwitch(tabId) {
        document.querySelectorAll('.login-tab-trigger').forEach(btn => {
            btn.setAttribute('data-state', btn.dataset.tab === tabId ? 'active' : 'inactive');
        });
        document.getElementById('login-form-container').innerHTML = LoginForm(tabId);
    }

    function handleLogin(userType) {
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;

        if (!email || !password) {
            alert('Please enter email and password.');
            return;
        }

        const userNames = {
            doctor: 'Dr. Smith', patient: 'John Doe',
            vendor: 'TechCorp Rep', connexta: 'Admin User'
        };
        
        state.user = {
            email: email,
            userType: userType,
            name: userNames[userType] || 'User'
        };

        localStorage.setItem('connexta-user', JSON.stringify(state.user));
        state.activeTab = 'dashboard';
        renderApp();
    }
    
    function handleLogout() {
        state.user = null;
        localStorage.removeItem('connexta-user');
        renderApp();
    }
    
    function handleMainTabSwitch(tabId) {
        state.activeTab = tabId;
        document.querySelectorAll('.main-tab-trigger').forEach(btn => {
            if (btn.dataset.tab === tabId) {
                btn.classList.add('bg-background', 'text-foreground', 'shadow-sm');
            } else {
                btn.classList.remove('bg-background', 'text-foreground', 'shadow-sm');
            }
        });
        renderTabContent(tabId);
    }
    
    // =================================================================================
    // DATA SIMULATION (replicates useEffect with setInterval)
    // =================================================================================

    function startDataSimulation() {
        setInterval(() => {
            if (!state.user) return; // Don't run if logged out

            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            // Update chart data
            const updateDataArray = (data, valueFn) => [...data.slice(1), { time: timeStr, value: valueFn() }];
            
            state.chartData.heartRate = updateDataArray(state.chartData.heartRate, () => Math.floor(Math.random() * 20) + 65);
            state.chartData.temperature = updateDataArray(state.chartData.temperature, () => parseFloat((Math.random() * 2 + 98.0).toFixed(1)));
            state.chartData.respiratory = updateDataArray(state.chartData.respiratory, () => Math.floor(Math.random() * 6) + 14);

            state.chartData.bloodPressure = [
                ...state.chartData.bloodPressure.slice(1),
                { time: timeStr, systolic: Math.floor(Math.random() * 20) + 110, diastolic: Math.floor(Math.random() * 15) + 70 }
            ];

            // Update device vitals
            state.devices = state.devices.map(device => {
                if (device.status === 'online') {
                    return {
                        ...device,
                        vitals: {
                            ...device.vitals,
                            heartRate: Math.floor(Math.random() * 20) + 65,
                        },
                        lastUpdate: 'Just now'
                    };
                }
                return device;
            });

            // Update the UI with new data
            updateDynamicUI();

        }, 5000);
    }

    function updateDynamicUI() {
        // Update overview stats
        document.getElementById('online-devices-stat').innerText = state.devices.filter(d => d.status === 'online').length;
        document.getElementById('active-alerts-stat').innerText = state.patients.filter(p => p.severity === 'high' || p.severity === 'critical').length;
        
        // Update device cards in the list
        document.querySelectorAll('.device-last-update').forEach(el => {
            const device = state.devices.find(d => d.id === el.dataset.id);
            if (device) el.innerText = device.lastUpdate;
        });
        document.querySelectorAll('.device-hr').forEach(el => {
            const device = state.devices.find(d => d.id === el.dataset.id);
            if (device) el.innerText = `${device.vitals.heartRate} bpm`;
        });

        // Update charts if visible
        updateCharts();
    }


    // =================================================================================
    // MAIN RENDER FUNCTION
    // =================================================================================
    function renderApp() {
        if (!state.user) {
            root.innerHTML = LoginPage();
            // Default to doctor tab on login screen
            handleLoginTabSwitch('doctor');
        } else {
            root.innerHTML = AppShell();
            // Set the active tab visually and render its content
            handleMainTabSwitch(state.activeTab);
        }
        // Render all lucide icons after updating the DOM
        lucide.createIcons();
    }

    // =================================================================================
    // INITIALIZATION
    // =================================================================================
    function init() {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            state.theme = savedTheme;
        } else {
            state.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        applyTheme();

        // Load user from localStorage
        const savedUser = localStorage.getItem('connexta-user');
        if (savedUser) {
            state.user = JSON.parse(savedUser);
        }
        
        // Initial render
        renderApp();
        
        // Attach all event listeners
        attachEventListeners();

        // Start the real-time data simulation
        startDataSimulation();
    }

    // Run the application
    init();
});
