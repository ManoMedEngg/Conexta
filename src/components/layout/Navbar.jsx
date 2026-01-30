import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { DecryptedText } from '../ui/DecryptedText';
import { LogOut, Globe, Activity } from 'lucide-react';

export const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();

    const toggleLanguage = () => {
        // Circle through a few main languages for demo
        const langs = ['en', 'ta', 'hi', 'ml'];
        const current = langs.indexOf(i18n.language);
        const next = langs[(current + 1) % langs.length];
        i18n.changeLanguage(next);
    };

    return (
        <nav className="h-16 border-b border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-neon-blue/20 flex items-center justify-center text-neon-blue">
                    <Activity size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-wider text-white flex items-center">
                        <DecryptedText text="CONEXTA" speed={50} className="mr-1" />
                    </h1>
                    <p className="text-[10px] text-gray-400 leading-none">V2.0 // IOT CORE</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={toggleLanguage} className="flex items-center gap-2">
                    <Globe size={18} />
                    <span className="uppercase text-xs font-bold">{i18n.language}</span>
                </Button>

                {user && (
                    <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-neon-purple uppercase">{t(`roles.${user.role}`)}</p>
                        </div>
                        <Button variant="danger" onClick={logout} className="p-2">
                            <LogOut size={18} />
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
};
