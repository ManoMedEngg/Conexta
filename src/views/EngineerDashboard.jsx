import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { TiltedCard } from '../components/ui/TiltedCard';
import { Button } from '../components/ui/Button';
import { ShinyButton } from '../components/ui/ShinyButton';
import { DeviceModel } from '../components/3d/DeviceModel';
import { getDevices, updateDevice } from '../services/api';
import { Server, Wrench, AlertOctagon, RefreshCw } from 'lucide-react';

export const EngineerDashboard = () => {
    const { t } = useTranslation();
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        loadDevices();
    }, []);

    const loadDevices = async () => {
        const data = await getDevices();
        setDevices(data);
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'online' ? 'maintenance' : 'online';
        await updateDevice(id, { status: newStatus });
        loadDevices();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'text-success-green';
            case 'maintenance': return 'text-yellow-400';
            default: return 'text-alert-red';
        }
    };

    const onlineCount = devices.filter(d => d.status === 'online').length;
    const maintenanceCount = devices.filter(d => d.status === 'maintenance').length;
    const offlineCount = devices.length - onlineCount - maintenanceCount;

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-success-green">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-success-green">
                            {t('dashboard.welcome')} - {t('roles.engineer')}
                        </h2>
                    </h2>
                    <Button onClick={loadDevices}><RefreshCw size={16} /></Button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <TiltedCard className="bg-glass-panel backdrop-blur-md border border-success-green/30 rounded-xl p-6 text-center py-8">
                        <div className="text-4xl font-bold text-success-green">{onlineCount}</div>
                        <div className="text-sm text-gray-400 uppercase tracking-widest mt-2">{t('engineer.online')}</div>
                    </TiltedCard>
                    <TiltedCard className="bg-glass-panel backdrop-blur-md border border-yellow-400/30 rounded-xl p-6 text-center py-8">
                        <div className="text-4xl font-bold text-yellow-400">{maintenanceCount}</div>
                        <div className="text-sm text-gray-400 uppercase tracking-widest mt-2">Under Maintenance</div>
                    </TiltedCard>
                    <TiltedCard className="bg-glass-panel backdrop-blur-md border border-alert-red/30 rounded-xl p-6 text-center py-8 sm:col-span-2 lg:col-span-1">
                        <div className="text-4xl font-bold text-alert-red">{offlineCount}</div>
                        <div className="text-sm text-gray-400 uppercase tracking-widest mt-2">Critical / Offline</div>
                    </TiltedCard>
                </div>

                {/* Devices Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {devices.map(device => (
                        <Card key={device.id} className="flex flex-col sm:flex-row gap-6 items-center">
                            <div className="w-full sm:w-1/3">
                                <DeviceModel status={device.status} />
                            </div>
                            <div className="flex-1 w-full space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold">{device.name}</h3>
                                        <p className="text-sm text-gray-400">{device.type} • {device.location}</p>
                                    </div>
                                    <div className={`px-2 py-1 rounded border border-white/10 ${getStatusColor(device.status)} bg-white/5`}>
                                        {device.status}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                                    <div className="bg-black/20 p-2 rounded">
                                        <span className="text-gray-500 block text-xs">Last Maintenance</span>
                                        {device.lastMaintenance}
                                    </div>
                                    <div className="bg-black/20 p-2 rounded">
                                        <span className="text-gray-500 block text-xs">Calibration Due</span>
                                        In 3 months
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2">
                                    <ShinyButton variant="secondary" className="flex-1 text-xs normal-case px-2" onClick={() => toggleStatus(device.id, device.status)}>
                                        <Wrench size={14} className="mr-2" />
                                        {device.status === 'online' ? 'Start Service' : 'Finish Service'}
                                    </ShinyButton>
                                    <Button variant="danger" className="text-xs">
                                        <AlertOctagon size={14} className="mr-2" /> Report Issue
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
