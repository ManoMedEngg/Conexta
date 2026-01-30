// Login and Signup Page for Conexta Medical IoT Platform

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { availableLanguages } from '@/i18n';
import { Activity, Globe, Stethoscope, User, Wrench, Building } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const { login, signup, trialLogin } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient' as 'doctor' | 'patient' | 'engineer' | 'vendor',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      const success = signup(formData.name, formData.email, formData.password, formData.role);
      if (!success) {
        setError('User already exists with this email');
      }
    } else {
      const success = login(formData.email, formData.password);
      if (!success) {
        setError('Invalid email or password');
      }
    }
  };

  const handleTrialLogin = (role: typeof formData.role) => {
    trialLogin(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-lg border border-cyan-500/30 rounded-lg p-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-transparent text-white text-sm outline-none cursor-pointer"
          >
            {availableLanguages.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-slate-900">
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Left: Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center space-y-6"
        >
          <div className="flex items-center gap-3">
            <Activity className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t('app.title')}
              </h1>
              <p className="text-cyan-400/80 text-sm">{t('app.tagline')}</p>
            </div>
          </div>

          <p className="text-slate-300 text-lg">
            Convert legacy medical devices into IoT-enabled smart systems with real-time monitoring and cloud connectivity.
          </p>

          {/* Trial Login Buttons */}
          <div className="space-y-3">
            <p className="text-sm text-slate-400 uppercase tracking-wider">{t('auth.tryDemo')}</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleTrialLogin('doctor')}
                className="flex items-center gap-2 p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 rounded-lg transition-all group"
              >
                <Stethoscope className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{t('roles.doctor')}</span>
              </button>

              <button
                onClick={() => handleTrialLogin('patient')}
                className="flex items-center gap-2 p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 rounded-lg transition-all group"
              >
                <User className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{t('roles.patient')}</span>
              </button>

              <button
                onClick={() => handleTrialLogin('engineer')}
                className="flex items-center gap-2 p-3 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 hover:from-orange-500/30 hover:to-yellow-500/30 border border-orange-500/30 rounded-lg transition-all group"
              >
                <Wrench className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{t('roles.engineer')}</span>
              </button>

              <button
                onClick={() => handleTrialLogin('vendor')}
                className="flex items-center gap-2 p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 rounded-lg transition-all group"
              >
                <Building className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{t('roles.vendor')}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10"
        >
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">
                {isSignup ? t('auth.signup') : t('auth.login')}
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                {isSignup ? 'Create your account' : 'Access your dashboard'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div>
                  <label className="block text-sm text-slate-300 mb-2">{t('auth.name')}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-slate-300 mb-2">{t('auth.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">{t('auth.password')}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {isSignup && (
                <div>
                  <label className="block text-sm text-slate-300 mb-2">{t('auth.role')}</label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as typeof formData.role,
                      })
                    }
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="patient">{t('roles.patient')}</option>
                    <option value="doctor">{t('roles.doctor')}</option>
                    <option value="engineer">{t('roles.engineer')}</option>
                    <option value="vendor">{t('roles.vendor')}</option>
                  </select>
                </div>
              )}

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSignup ? t('auth.signup') : t('auth.login')}
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError('');
                }}
                className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
              >
                {isSignup
                  ? 'Already have an account? Login'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
