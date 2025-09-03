import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <footer className="bg-gray-100 border-t">
            <div className="container mx-auto py-8 px-4 lg:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Applaude</h3>
                        <p className="text-gray-600 text-sm">{t('tagline')}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">{t('resources')}</h3>
                        <ul className="space-y-2">
                            <li><Link to="/api" className="text-sm text-gray-600 hover:underline">{t('api')}</Link></li>
                            <li><Link to="/support" className="text-sm text-gray-600 hover:underline">{t('support')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">{t('company')}</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-sm text-gray-600 hover:underline">{t('about')}</Link></li>
                            <li><Link to="/blog" className="text-sm text-gray-600 hover:underline">{t('blog')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">{t('legal')}</h3>
                        <ul className="space-y-2">
                            <li><Link to="/terms" className="text-sm text-gray-600 hover:underline">{t('terms')}</Link></li>
                            <li><Link to="/privacy-policy" className="text-sm text-gray-600 hover:underline">{t('privacy')}</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} {t('copyright')}
                </div>
            </div>
        </footer>
    );
};

export default Footer;