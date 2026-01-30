import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { TiltedCard } from '../components/ui/TiltedCard';
import { Pill, Sun, Moon, Coffee } from 'lucide-react';

const MedItem = ({ time, name, icon: Icon, color }) => (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
            <Icon size={20} />
        </div>
        <div className="flex-1">
            <p className="font-bold text-white">{name}</p>
            <p className="text-xs text-gray-400">{time}</p>
        </div>
        <div className="w-4 h-4 rounded-full border-2 border-gray-600" />
    </div>
);

export const PatientDashboard = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neon-purple">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neon-purple">
                            {t('dashboard.welcome')}
                        </h2>
                    </h2>

                    <TiltedCard className="bg-glass-panel backdrop-blur-md border border-neon-purple/30 rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-4">My Health Status</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-black/40 rounded text-center">
                                <div className="text-3xl font-bold text-neon-blue mb-1">98%</div>
                                <div className="text-xs text-gray-400 uppercase">SpO2</div>
                            </div>
                            <div className="p-4 bg-black/40 rounded text-center">
                                <div className="text-3xl font-bold text-success-green mb-1">72</div>
                                <div className="text-xs text-gray-400 uppercase">Heart Rate</div>
                            </div>
                            <div className="p-4 bg-black/40 rounded text-center">
                                <div className="text-3xl font-bold text-neon-purple mb-1">120/80</div>
                                <div className="text-xs text-gray-400 uppercase">Blood Pressure</div>
                            </div>
                            <div className="p-4 bg-black/40 rounded text-center">
                                <div className="text-3xl font-bold text-white mb-1">36.6°C</div>
                                <div className="text-xs text-gray-400 uppercase">Temperature</div>
                            </div>
                        </div>
                    </TiltedCard>

                    <Card>
                        <h3 className="text-lg font-bold mb-4">Health Tips</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                            <li>Drink at least 8 glasses of water today.</li>
                            <li>Walk for 20 minutes after dinner.</li>
                            <li>Reduce salt intake to maintain BP levels.</li>
                        </ul>
                    </Card>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-400">Medication Schedule</h3>
                    <div className="space-y-3 relative">
                        <div className="absolute left-9 top-0 bottom-0 w-px bg-white/10 -z-10" />
                        <MedItem time="08:00 AM" name="Thyronorm 50mg" icon={Sun} color="bg-orange-500/20 text-orange-400" />
                        <MedItem time="01:00 PM" name="Vitamin D Supplement" icon={Coffee} color="bg-yellow-500/20 text-yellow-400" />
                        <MedItem time="09:00 PM" name="Metformin 500mg" icon={Moon} color="bg-blue-500/20 text-blue-400" />
                        <MedItem time="09:30 PM" name="Atorvastatin 10mg" icon={Pill} color="bg-purple-500/20 text-purple-400" />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
