// Patient Dashboard for Conexta Medical IoT Platform

import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Heart, Activity, Thermometer, Wind } from 'lucide-react';
import { motion } from 'motion/react';

export default function PatientDashboard() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {t('dashboard.welcome')}, {user?.name}
          </h1>
          <p className="text-slate-400 mt-1">{t('patient.healthStatus')}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
          {t('auth.logout')}
        </button>
      </div>

      {/* Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-red-400" />
            <p className="text-slate-300">{t('doctor.heartRate')}</p>
          </div>
          <p className="text-3xl font-bold">72 <span className="text-lg text-slate-400">bpm</span></p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-6 h-6 text-blue-400" />
            <p className="text-slate-300">{t('doctor.bloodPressure')}</p>
          </div>
          <p className="text-3xl font-bold">120/80 <span className="text-lg text-slate-400">mmHg</span></p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Wind className="w-6 h-6 text-purple-400" />
            <p className="text-slate-300">{t('doctor.spo2')}</p>
          </div>
          <p className="text-3xl font-bold">98 <span className="text-lg text-slate-400">%</span></p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Thermometer className="w-6 h-6 text-orange-400" />
            <p className="text-slate-300">{t('doctor.temperature')}</p>
          </div>
          <p className="text-3xl font-bold">37.0 <span className="text-lg text-slate-400">°C</span></p>
        </motion.div>
      </div>

      {/* Prescriptions & Health Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">{t('patient.prescriptions')}</h2>
          <div className="space-y-3">
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="font-medium">Paracetamol 500mg</p>
              <p className="text-sm text-slate-400 mt-1">Twice daily - 5 days</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">08:00 AM</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">08:00 PM</span>
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="font-medium">Amoxicillin 250mg</p>
              <p className="text-sm text-slate-400 mt-1">Three times daily - 7 days</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">08:00 AM</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">02:00 PM</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">08:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">{t('patient.healthTips')}</h2>
          <div className="space-y-3">
            {[
              'Drink at least 8 glasses of water daily',
              'Walk for 20 minutes after meals',
              'Get 7-8 hours of sleep every night',
              'Practice deep breathing exercises',
            ].map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2" />
                <p className="text-sm text-slate-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
