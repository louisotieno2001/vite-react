import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { apiClient as api } from '../../services/api';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface Project {
    id: number;
    name: string;
    website_url: string;
    app_type: 'iOS' | 'Android';
    status: string;
    status_message: string;
}

interface NewProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProjectCreated: (project: Project) => void;
}

const NewProjectModal = ({ isOpen, onClose, onProjectCreated }: NewProjectModalProps) => {
    const { t } = useTranslation();
    const [projectName, setProjectName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [appType, setAppType] = useState<'iOS' | 'Android'>('iOS');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectName || !websiteUrl) {
            toast.error("Please fill in all fields.");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await api.post('/projects/create/', {
                name: projectName,
                website_url: websiteUrl,
                app_type: appType,
            });
            toast.success("Project created! Starting AI analysis...");
            onProjectCreated(response.data);
            onClose();
        } catch (error) {
            toast.error("Failed to create project. Please try again.");
            console.error("Project creation error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md animate-fade-in">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('new_project')}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">{t('project_name')}</label>
                                <Input
                                    id="projectName"
                                    type="text"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    placeholder="e.g., My Awesome App"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-1">{t('website_url')}</label>
                                <Input
                                    id="websiteUrl"
                                    type="url"
                                    value={websiteUrl}
                                    onChange={(e) => setWebsiteUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('target_platform')}</label>
                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant={appType === 'iOS' ? 'primary' : 'outline'}
                                        onClick={() => setAppType('iOS')}
                                        className="w-full"
                                    >
                                        iOS
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={appType === 'Android' ? 'primary' : 'outline'}
                                        onClick={() => setAppType('Android')}
                                        className="w-full"
                                    >
                                        Android
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
                             <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {t('start_analysis')}
                            </Button>
                            <Button type="button" variant="secondary" onClick={onClose} className="w-full sm:w-auto">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewProjectModal;
