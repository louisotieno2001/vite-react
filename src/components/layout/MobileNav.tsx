import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../contexts/AuthContext';

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const authContext = useContext(AuthContext);

    const languages = [
        { code: 'en', name: 'English' }, { code: 'zh', name: '中文' },
        { code: 'fr', name: 'Français' }, { code: 'es', name: 'Español' },
        { code: 'hi', name: 'हिन्दी' }, { code: 'ar', name: 'العربية' },
        { code: 'pt', name: 'Português' }, { code: 'ru', name: 'Русский' },
        { code: 'ja', name: '日本語' }, { code: 'de', name: 'Deutsch' }
    ];

    const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLangDropdownOpen(false);
        setSearchTerm('');
    };


    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <button onClick={toggleMenu} className="z-50 text-black">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={toggleMenu}
            >
                <div
                    className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-8 z-50 transform transition-transform ${
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ul className="space-y-6 text-xl text-black">
                        <li><Link to="/about" onClick={toggleMenu} className="hover:text-ion-blue transition-colors">{t('about')}</Link></li>
                        <li><Link to="/faq" onClick={toggleMenu} className="hover:text-ion-blue transition-colors">{t('faq')}</Link></li>
                        <li><Link to="/blog" onClick={toggleMenu} className="hover:text-ion-blue transition-colors">{t('blog')}</Link></li>
                        {authContext?.isAuthenticated ? (
                            <>
                                <li><Link to="/dashboard" onClick={toggleMenu} className="hover:text-ion-blue transition-colors">{t('dashboard')}</Link></li>
                                <li><button onClick={() => { authContext.logout(); toggleMenu(); }} className="hover:text-ion-blue transition-colors">{t('logout')}</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" onClick={toggleMenu} className="hover:text-ion-blue transition-colors">{t('login')}</Link></li>
                                <li><Link to="/signup" onClick={toggleMenu} className="px-4 py-2 bg-fusion-pink text-white font-bold rounded-lg hover:bg-opacity-90">{t('signup')}</Link></li>
                            </>
                        )}
                         <li className="relative">
                            <button onClick={() => setLangDropdownOpen(!isLangDropdownOpen)} className="flex items-center w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <Globe size={20} className="mr-2" /> Language
                            </button>
                            {isLangDropdownOpen && (
                                <div className="mt-2 w-full bg-gray-50 rounded-lg shadow-lg py-1">
                                     <div className="p-2 flex items-center border-b border-gray-200">
                                        <Search size={18} className="text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="w-full pl-2 bg-transparent focus:outline-none"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="max-h-48 overflow-y-auto">
                                    {filteredLanguages.map(lang => (
                                        <button key={lang.code} onClick={() => changeLanguage(lang.code)} className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-ion-blue hover:text-black">
                                            {lang.name}
                                        </button>
                                    ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MobileNav;