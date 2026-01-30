import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { TiltedCard } from '../components/ui/TiltedCard';
import { Button } from '../components/ui/Button';
import { DecryptedText } from '../components/ui/DecryptedText';
import { getPatients, createPatient, deletePatient } from '../services/api';
import { Activity, AlertTriangle, FileText, UserPlus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const VitalsChart = ({ color = "#00f3ff", delay = 0 }) => {
    return (
        <div className="h-24 flex items-end justify-between gap-1 overflow-hidden opacity-80">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-2 rounded-t"
                    style={{ backgroundColor: color }}
                    animate={{ height: ['10%', '60%', '30%', '80%', '20%'] }}
                    transition={{ duration: 0.8 + Math.random(), repeat: Infinity, ease: 'linear', delay: i * 0.05 }}
                />
            ))}
        </div>
    );
};

export const DoctorDashboard = () => {
    const { t } = useTranslation();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        const data = await getPatients();
        setPatients(data);
        setLoading(false);
    };

    const handleAddPatient = async () => {
        const name = prompt("Enter Patient Name:");
        if (name) {
            await createPatient({ name, age: 30, diagnosis: 'Observation', status: 'Stable' });
            loadPatients();
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Delete patient?")) {
            await deletePatient(id);
            loadPatients();
        }
    };

    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Welcome & Stats */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neon-blue">
                        <DecryptedText text={t('dashboard.welcome')} />
                    </h2>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button onClick={handleAddPatient} className="flex items-center gap-2 w-full md:w-auto justify-center">
                            <UserPlus size={16} /> {t('common.add')} Patient
                        </Button>
                    </div>
                </div>

                {/* Live Vitals Monitor */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-3 border-neon-blue/30" glow>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <Activity className="text-neon-blue" /> Live Vitals Monitoring
                        </h3>
                        <span className="text-xs text-neon-blue animate-pulse">LIVE - ICU WARD 4</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                            <span className="text-xs text-gray-400">ECG</span>
                            <VitalsChart color="#00f3ff" />
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                            <span className="text-xs text-gray-400">SpO2</span>
                            <VitalsChart color="#05ff00" />
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                            <span className="text-xs text-gray-400">BP</span>
                            <VitalsChart color="#bc13fe" />
                        </div>
                    </div>
                </Card>

                {/* Alerts Panel */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-1 border-alert-red/30 bg-alert-red/5">
                    <h3 className="font-bold text-alert-red mb-4 flex items-center gap-2">
                        <AlertTriangle size={18} /> Critical Alerts
                    </h3>
                    <div className="space-y-3">
                        <div className="bg-black/40 p-3 rounded border-l-2 border-alert-red flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold text-white">Patient Meena</p>
                                <p className="text-xs text-alert-red">Low Oxygen Saturation (88%)</p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-alert-red animate-ping" />
                        </div>
                        <div className="bg-black/40 p-3 rounded border-l-2 border-orange-500">
                            <p className="text-sm font-bold text-white">CT Scanner 01</p>
                            <p className="text-xs text-orange-400">Scan Complete - Report Ready</p>
                        </div>
                    </div>
                </Card>

                {/* Patients List */}
                <div className="lg:col-span-4">
                    <h3 className="font-bold text-gray-400 mb-4 uppercase text-sm tracking-wider">Active Patients</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {patients.map(patient => (
                            <TiltedCard key={patient.id} className="bg-glass-panel backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-neon-blue/30 cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-lg text-white group-hover:text-neon-blue transition">{patient.name}</h4>
                                        <p className="text-xs text-gray-400">ID: {patient.id}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${patient.status === 'Critical' ? 'bg-alert-red/20 text-alert-red' :
                                        patient.status === 'Stable' ? 'bg-success-green/20 text-success-green' : 'bg-neon-blue/20 text-neon-blue'
                                        }`}>
                                        {patient.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-300 space-y-1">
                                    <p><span className="text-gray-500">Diagnosis:</span> {patient.diagnosis}</p>
                                    <p><span className="text-gray-500">Last Visit:</span> {patient.lastVisit}</p>
                                </div>
                                <div className="mt-4 flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="danger" className="py-1 px-3 text-xs" onClick={(e) => { e.stopPropagation(); handleDelete(patient.id); }}>
                                        <Trash2 size={14} />
                                    </Button>
                                    <Button className="py-1 px-3 text-xs flex items-center gap-1">
                                        <FileText size={14} /> Report
                                    </Button>
                                </div>
                            </TiltedCard>
                        ))}
                    </div>
                </div>

            </div>
        </Layout>
    );
};
