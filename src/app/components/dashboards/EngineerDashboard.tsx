// Engineer Dashboard for Conexta Medical IoT Platform

import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Cpu, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function EngineerDashboard() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const devices = [
    { name: 'Ventilator-01', type: 'Ventilator', location: 'ICU Ward 1', status: 'online' },
    { name: 'CT Scanner-A', type: 'CT Scanner', location: 'Radiology Dept', status: 'online' },
    { name: 'X-Ray Machine-1', type: 'X-Ray', location: 'Radiology Dept', status: 'online' },
    { name: 'ECG Monitor-03', type: 'ECG', location: 'Cardiology Ward', status: 'warning' },
    { name: 'Ultrasound-B', type: 'Ultrasound', location: 'OB/GYN Dept', status: 'maintenance' },
    { name: 'MRI Scanner-1', type: 'MRI', location: 'Radiology Dept', status: 'online' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'warning':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'maintenance':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default:
        return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
            {t('dashboard.welcome')}, {user?.name}
          </h1>
          <p className="text-slate-400 mt-1">{t('engineer.deviceStats')}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
          {t('auth.logout')}
        </button>
      </div>

      {/* Device Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">{t('engineer.online')}</p>
              <p className="text-3xl font-bold mt-1">4</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">{t('engineer.offline')}</p>
              <p className="text-3xl font-bold mt-1">0</p>
            </div>
            <Activity className="w-12 h-12 text-red-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">{t('engineer.maintenance')}</p>
              <p className="text-3xl font-bold mt-1">1</p>
            </div>
            <Cpu className="w-12 h-12 text-yellow-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">{t('engineer.warning')}</p>
              <p className="text-3xl font-bold mt-1">1</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-orange-400" />
          </div>
        </motion.div>
      </div>

      {/* Device List */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-orange-500/30 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">{t('engineer.deviceList')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-sm text-slate-400">{device.type}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs border ${getStatusColor(device.status)}`}>
                  {device.status}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Cpu className="w-4 h-4" />
                <span>{device.location}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{t('engineer.lastCommunication')}</span>
                  <span className="text-slate-400">Just now</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-6 bg-slate-900/50 backdrop-blur-xl border border-orange-500/30 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">{t('engineer.calibrationAlerts')}</h2>
        <div className="space-y-3">
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="font-medium text-red-400">ECG Monitor-03 calibration overdue</p>
                <p className="text-sm text-slate-400 mt-1">Requires immediate attention</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
              <div>
                <p className="font-medium text-orange-400">X-Ray Machine-1 AMC expired</p>
                <p className="text-sm text-slate-400 mt-1">Contract renewal pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
