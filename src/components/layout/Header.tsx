import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuth';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ja', name: '日本語' },
    { code: 'pr', name: 'Português' },
    { code: 'pt', name: 'Português (BR)' },
    { code: 'ru', name: 'Русский' },
    { code: 'zh', name: '中文' },
];

const Header: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="bg-white shadow-none sticky top-0 z-50">
            <nav className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
                <Link to="/" className="flex flex-row items-center justify-center text-2xl font-bold text-gray-800">
                    <img src="/logo_icon.png" alt="Logo" className="w-12 h-12" />
                    <p className="hidden md:block">Applaude</p>
                </Link>
                <div className="flex items-center border border-blue-800 border-2 pl-3 rounded-l-full rounded-r-full space-x-2 md:space-x-4">
                    <Link to="/" className="font-bold text-sm md:text-base text-gray-800 hover:text-gray-900">{t('home')}</Link>
                    <Link to="/blog" className="font-bold text-sm md:text-base text-gray-800 hover:text-gray-900">{t('blog')}</Link>
                    <Link to="/about" className="font-bold text-sm md:text-base text-gray-800 hover:text-gray-900">{t('about')}</Link>
                    {isAuthenticated ? (
                        <>
                            <span className="hidden md:inline text-gray-800">{t('welcome_back', { email: user?.username })}</span>
                            <Link to="/dashboard" onClick={() => navigate('/dashboard')}>{t('dashboard')}</Link>
                            <Link to="/" onClick={handleLogout}>{t('logout')}</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => navigate('/login')}>{t('login')}</Link>
                        </>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Globe className="h-7 w-7 text-blue-800" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {languages.map(lang => (
                                <DropdownMenuItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
                                    {lang.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </nav>
        </header>
    );
};

export default Header;
