// Doctor Dashboard for Conexta Medical IoT Platform

import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Activity, Users, Calendar, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function DoctorDashboard() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {t('dashboard.welcome')}, {user?.name}
          </h1>
          <p className="text-slate-400 mt-1">{t('roles.doctor')} {t('dashboard.overview')}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
          {t('auth.logout')}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">{t('doctor.patients')}</p>
              <p className="text-3xl font-bold mt-1">5</p>
            </div>
            <Users className="w-12 h-12 text-cyan-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">{t('doctor.appointments')}</p>
              <p className="text-3xl font-bold mt-1">2</p>
            </div>
            <Calendar className="w-12 h-12 text-purple-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">{t('doctor.alerts')}</p>
              <p className="text-3xl font-bold mt-1">3</p>
            </div>
            <AlertCircle className="w-12 h-12 text-orange-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">{t('doctor.reports')}</p>
              <p className="text-3xl font-bold mt-1">8</p>
            </div>
            <Activity className="w-12 h-12 text-green-400" />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">{t('doctor.patients')}</h2>
          <div className="space-y-3">
            {['Mohan', 'Lakshmi', 'Siva', 'Meena', 'Ravi'].map((name, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-slate-400">ID: P{idx + 1}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">{t('doctor.alerts')}</h2>
          <div className="space-y-3">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <p className="font-medium text-red-400">High Blood Pressure</p>
                  <p className="text-sm text-slate-400 mt-1">Patient: Siva - BP: 135/88</p>
                  <p className="text-xs text-slate-500 mt-1">30 minutes ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-400">CT Scan Completed</p>
                  <p className="text-sm text-slate-400 mt-1">Report ready for review</p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
