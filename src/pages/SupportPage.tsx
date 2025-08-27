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
        <div>
            <h1>{t('support.title')}</h1>

            <section>
                <h2>{t('support.faq_title')}</h2>
                {faqs.map((faq: any) => (
                    <div key={faq.id}>
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2>{t('support.submit_ticket_title')}</h2>
                <form onSubmit={handleTicketSubmit}>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder={t('support.subject_placeholder')}
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t('support.description_placeholder')}
                        required
                    />
                    <button type="submit">{t('support.submit_button')}</button>
                </form>
            </section>
        </div>
    );
};

export default SupportPage;
