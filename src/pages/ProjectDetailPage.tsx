import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Project } from '@/types';
import { Button } from '@/components/ui/Button';
import { Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const getProject = async (id: string): Promise<Project> => {
    const { data } = await apiClient.get(`/projects/${id}/`);
    return data;
};


const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data: project, isLoading, isError, error } = useQuery<Project, Error>({
        queryKey: ['project', id],
        queryFn: () => getProject(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-16 w-16 animate-spin text-ion-blue" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto p-4 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
                <h2 className="mt-4 text-xl font-semibold text-red-600">
                    Error loading project
                </h2>
                <p className="text-red-500">{error.message}</p>
            </div>
        );
    }
    
    if (!project) {
        return <div className="text-center p-8">Project not found.</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-3xl">{project.name}</CardTitle>
                        <div className="flex space-x-2">
                           <Button asChild variant="outline">
                               <Link to={`/project/${project.id}/analytics`}>View Analytics</Link>
                           </Button>
                            <Button asChild>
                                <Link to={`/project/${project.id}/preview`}>Preview App</Link>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-gray-600 mb-4"><strong>Source URL:</strong> {project.source_url}</p>
                    <p className="text-lg text-gray-600 mb-4"><strong>Status:</strong> <span className="font-semibold">{project.status}</span></p>
                    {project.status_message && (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                            <p className="font-bold">Status Message</p>
                            <p>{project.status_message}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ProjectDetailPage;
