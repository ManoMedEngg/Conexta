// Vendor Dashboard for Conexta Medical IoT Platform

import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Package, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function VendorDashboard() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const amcContracts = [
    { machine: 'Ventilator-01', location: 'Apollo Hospital - ICU', expiry: '2025-07-15', status: 'active' },
    { machine: 'CT Scanner-A', location: 'Apollo Hospital - Radiology', expiry: '2025-04-20', status: 'active' },
    { machine: 'X-Ray Machine-1', location: 'Apollo Hospital - Radiology', expiry: '2025-01-10', status: 'expired' },
    { machine: 'MRI Scanner-1', location: 'Apollo Hospital - Radiology', expiry: '2025-06-30', status: 'active' },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            {t('dashboard.welcome')}, {user?.name}
          </h1>
          <p className="text-slate-400 mt-1">{t('vendor.amcContract')} {t('dashboard.overview')}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
          {t('auth.logout')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Contracts</p>
              <p className="text-3xl font-bold mt-1">4</p>
            </div>
            <Package className="w-12 h-12 text-green-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active</p>
              <p className="text-3xl font-bold mt-1">3</p>
            </div>
            <CheckCircle2 className="w-12 h-12 text-blue-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Expired</p>
              <p className="text-3xl font-bold mt-1">1</p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Due Soon</p>
              <p className="text-3xl font-bold mt-1">1</p>
            </div>
            <Calendar className="w-12 h-12 text-orange-400" />
          </div>
        </motion.div>
      </div>

      {/* AMC Contracts */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-green-500/30 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">{t('vendor.machines')}</h2>
        <div className="space-y-3">
          {amcContracts.map((contract, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-medium text-lg">{contract.machine}</p>
                    {contract.status === 'active' ? (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded border border-red-500/30">
                        Expired
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{contract.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">{t('vendor.expiryDate')}</p>
                  <p className="text-slate-300 font-medium">{contract.expiry}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Alerts */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-green-500/30 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">{t('vendor.serviceAlerts')}</h2>
        <div className="space-y-3">
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="font-medium text-red-400">X-Ray Machine-1 AMC Expired</p>
                <p className="text-sm text-slate-400 mt-1">Contract renewal required immediately</p>
                <p className="text-xs text-slate-500 mt-1">Expired on: 2025-01-10</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-orange-400 mt-0.5" />
              <div>
                <p className="font-medium text-orange-400">CT Scanner-A Service Due</p>
                <p className="text-sm text-slate-400 mt-1">Scheduled maintenance in 30 days</p>
                <p className="text-xs text-slate-500 mt-1">Due date: 2025-04-20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
