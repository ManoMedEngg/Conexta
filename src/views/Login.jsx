import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { HeroScene } from '../components/3d/HeroScene';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ShinyButton } from '../components/ui/ShinyButton';
import { GridBackground } from '../components/ui/GridBackground';
import { DecryptedText } from '../components/ui/DecryptedText';
import { Activity, Stethoscope, User, Database, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login = () => {
    const { t } = useTranslation();
    const { login, demoLogin, loading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setError('');
            const user = await login(email, password);
            navigate(`/${user.role}`);
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    const handleDemoLogin = async (role) => {
        try {
            const user = await demoLogin(role);
            navigate(`/${user.role}`);
        } catch (err) {
            setError('Demo login failed');
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen bg-deep-bg flex relative overflow-hidden isolate">
            <GridBackground />
            {/* Abstract Background - Left Side */}
            <div className="hidden lg:block w-1/2 relative bg-gradient-to-br from-black/80 to-deep-bg/90 backdrop-blur-sm">
                <div className="absolute inset-0 z-10">
                    <HeroScene />
                </div>
                <div className="absolute bottom-10 left-10 z-20">
                    <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neon-blue">
                        <DecryptedText text={t('app.title')} speed={30} />
                    </h1>
                    <p className="text-neon-blue font-mono mt-2 tracking-[0.5em] text-lg">{t('app.tagline')}</p>
                </div>
            </div>

            {/* Login Form - Right Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-30">
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="w-full max-w-md">
                    <Card glow className="bg-black/40 backdrop-blur-xl border-white/5">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-neon-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-neon-blue/30 shadow-neon">
                                <Activity size={32} className="text-neon-blue" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">{t('auth.login')}</h2>
                            <p className="text-gray-400 mt-2">{t('auth.login')} to continue</p>
                        </div>

                        {error && <div className="bg-alert-red/20 text-alert-red p-3 rounded mb-4 text-center text-sm">{error}</div>}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder={t('auth.email')}
                                    className="input-field"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder={t('auth.password')}
                                    className="input-field"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <ShinyButton type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Processing...' : t('auth.login')}
                            </ShinyButton>
                        </form>

                        <div className="mt-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px flex-1 bg-white/10"></div>
                                <span className="text-xs text-gray-500 uppercase">{t('auth.tryDemo')}</span>
                                <div className="h-px flex-1 bg-white/10"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <ShinyButton variant="secondary" onClick={() => handleDemoLogin('doctor')} className="flex flex-col items-center py-4 gap-2 h-auto text-xs normal-case">
                                    <Stethoscope size={20} className="text-neon-blue" />
                                    {t('auth.tryAsDoctor')}
                                </ShinyButton>
                                <ShinyButton variant="secondary" onClick={() => handleDemoLogin('patient')} className="flex flex-col items-center py-4 gap-2 h-auto text-xs normal-case">
                                    <User size={20} className="text-neon-purple" />
                                    {t('auth.tryAsPatient')}
                                </ShinyButton>
                                <ShinyButton variant="secondary" onClick={() => handleDemoLogin('engineer')} className="flex flex-col items-center py-4 gap-2 h-auto text-xs normal-case">
                                    <Database size={20} className="text-success-green" />
                                    {t('auth.tryAsEngineer')}
                                </ShinyButton>
                                <ShinyButton variant="secondary" onClick={() => handleDemoLogin('vendor')} className="flex flex-col items-center py-4 gap-2 h-auto text-xs normal-case">
                                    <ShoppingBag size={20} className="text-orange-400" />
                                    {t('auth.tryAsVendor')}
                                </ShinyButton>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
