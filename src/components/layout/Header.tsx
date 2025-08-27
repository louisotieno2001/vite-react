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
];

const Header: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    Applaude
                </Link>
                <div className="flex items-center space-x-2 md:space-x-4">
                    <Link to="/blog" className="text-sm md:text-base text-gray-600 hover:text-gray-900">Blog</Link>
                    <Link to="/about" className="text-sm md:text-base text-gray-600 hover:text-gray-900">About</Link>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Globe className="h-5 w-5" />
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

                    {isAuthenticated ? (
                        <>
                            <span className="hidden md:inline text-gray-700">Hi, {user?.username}</span>
                            <Button variant="outline" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                            <Button onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
                            <Button onClick={() => navigate('/signup')}>Sign Up</Button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
