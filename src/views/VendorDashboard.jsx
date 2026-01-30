import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ClipboardList, Calendar, CheckCircle } from 'lucide-react';

export const VendorDashboard = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-400">
                    {t('dashboard.welcome')}
                </h2>

                <Card className="border-orange-400/30">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Calendar className="text-orange-400" /> Upcoming AMC Renewals
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="text-xs text-gray-500 uppercase bg-white/5">
                                <tr>
                                    <th className="p-3">Hospital</th>
                                    <th className="p-3">Device</th>
                                    <th className="p-3">Contract End</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr>
                                    <td className="p-3">Apollo Chennai</td>
                                    <td className="p-3">MRI Scanner V2</td>
                                    <td className="p-3">2023-12-15</td>
                                    <td className="p-3 text-yellow-400">Expiring Soon</td>
                                    <td className="p-3"><Button variant="secondary" className="py-1 px-3 text-xs">Renew</Button></td>
                                </tr>
                                <tr>
                                    <td className="p-3">KMCH Coimbatore</td>
                                    <td className="p-3">Ventilator X7</td>
                                    <td className="p-3">2023-11-20</td>
                                    <td className="p-3 text-alert-red font-bold">Overdue</td>
                                    <td className="p-3"><Button variant="primary" className="py-1 px-3 text-xs">Send Quote</Button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <ClipboardList className="text-gray-400" /> Service Logs
                    </h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-white/5 rounded flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">Routine Maintenance - X-Ray Unit</h4>
                                <p className="text-xs text-gray-400">Completed by Tech. Ramesh on 2023-10-10</p>
                            </div>
                            <div className="text-success-green flex items-center gap-1 text-sm font-bold">
                                <CheckCircle size={16} /> Closed
                            </div>
                        </div>
                        <div className="p-3 bg-white/5 rounded flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">Probe Sensor Calibration</h4>
                                <p className="text-xs text-gray-400">Scheduled for 2023-11-15</p>
                            </div>
                            <div className="text-neon-blue flex items-center gap-1 text-sm font-bold">
                                Pending
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};
