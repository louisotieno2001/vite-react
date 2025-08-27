import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Project } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Loader2, AlertCircle } from 'lucide-react';

const getProjects = async (): Promise<Project[]> => {
    const { data } = await apiClient.get('/projects/');
    return data;
};

// Mock analytics data
const mockAnalyticsData = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },
  { name: 'Apr', uv: 2780, pv: 3908 },
  { name: 'May', uv: 1890, pv: 4800 },
  { name: 'Jun', uv: 2390, pv: 3800 },
];

const ProjectAnalyticsPage: React.FC = () => {
    const { id: currentProjectId } = useParams<{ id: string }>();

    const { data: userProjects, isLoading, isError, error } = useQuery<Project[], Error>({
        queryKey: ['projects'],
        queryFn: getProjects
    });

    const currentProject = useMemo(() => {
        return userProjects?.find(p => p.id === currentProjectId);
    }, [userProjects, currentProjectId]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin"/></div>;
    }

    if (isError) {
        return (
            <div className="text-center p-8">
                <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
                <h2 className="mt-4 text-xl font-semibold text-red-600">Failed to load analytics</h2>
                <p className="text-red-500">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Analytics for {currentProject?.name || 'Project'}</h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>Usage Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={mockAnalyticsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" name="Page Views" />
                            <Bar dataKey="uv" fill="#82ca9d" name="Unique Visitors" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProjectAnalyticsPage;
