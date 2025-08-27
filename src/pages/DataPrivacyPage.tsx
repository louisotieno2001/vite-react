// import React from 'react';
import { apiClient } from '@/services/api';
import { useTranslation } from 'react-i18next';
import analytics from '@/services/analytics';
import { useAuthStore } from '@/stores/authStore';


const DataPrivacyPage = () => {
    const { t } = useTranslation();
    const { logout } = useAuthStore();

    const handleExport = async () => {
        analytics.track('User Data Exported');
        const response = await apiClient.post('/users/export-data/', {}, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'applaude_user_data.csv');
        document.body.appendChild(link);
        link.click();
    };

    const handleDelete = async () => {
        if (window.confirm(t('privacy.delete_confirmation'))) {
            analytics.track('User Account Deleted');
            await apiClient.delete('/users/delete-account/');
            logout();
            // Redirect to homepage
        }
    };

    return (
        <div>
            <h1>{t('privacy.title')}</h1>
            <p>{t('privacy.description')}</p>
            <button onClick={handleExport}>{t('privacy.export_button')}</button>
            <button onClick={handleDelete}>{t('privacy.delete_button')}</button>
        </div>
    );
};

export default DataPrivacyPage;
