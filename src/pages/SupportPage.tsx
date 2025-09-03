import React, { useState, useEffect } from 'react';
import { apiClient } from '@/services/api';
import { useTranslation } from 'react-i18next';
import analytics from '@/services/analytics';

const SupportPage = () => {
    const { t } = useTranslation();
    const [faqs, setFaqs] = useState([]);
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        analytics.track('View Support Page');
        const fetchFaqs = async () => {
            const response = await apiClient.get('/support/faqs/');
            setFaqs(response.data);
        };
        fetchFaqs();
    }, []);

    const handleTicketSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await apiClient.post('/support/tickets/', { subject, description });
        analytics.track('Support Ticket Created', { subject });
        setSubject('');
        setDescription('');
        // Add user feedback (e.g., toast notification)
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{t('faq')}</h1>

            <section className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">{t('faq_title')}</h2>
                {faqs.map((faq: any) => (
                    <div key={faq.id} className="mb-4">
                        <h3 className="text-xl font-medium text-gray-700">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                    </div>
                ))}
            </section>

            <section className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">{t('submit_ticket_title')}</h2>
                <form onSubmit={handleTicketSubmit} className="flex flex-col">
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder={t('subject_placeholder')}
                        required
                        className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t('description_placeholder')}
                        required
                        className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition duration-200"
                    >
                        {t('Submit')}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default SupportPage;