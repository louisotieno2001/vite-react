import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import { useAuthStore } from '../../stores/useAuth';
import { Link } from 'react-router-dom';
import { PlusCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface App {
    id: string;
    name: string;
    // Add other app properties as needed
}

interface Testimonial {
    id: string;
    content: string;
    // Add other testimonial properties as needed
}

interface ApiProject {
    id: string;
    name: string;
    source_url: string;
    created_at: string;
    apps?: App[];
    testimonials?: Testimonial[];
}

interface Project {
    id: string;
    name: string;
    source_url: string;
    created_at: string;
    apps_count: number;
    testimonials_count: number;
}

const fetchProjects = async (token: string | null): Promise<Project[]> => {
    if (!token) {
        throw new Error("Authentication token not found.");
    }
    const { data } = await api.get<ApiProject[]>('/projects/', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data.map((p: ApiProject) => ({
        ...p,
        apps_count: p.apps?.length || 0,
        testimonials_count: p.testimonials?.length || 0,
    }));
};

const ProjectList = () => {
    const { accessToken } = useAuthStore();
    const { data: projects, isLoading, isError, error } = useQuery<Project[], Error>({
        queryKey: ['projects'],
        queryFn: () => fetchProjects(accessToken),
        enabled: !!accessToken,
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <Skeleton height={28} width="60%" />
                            <Skeleton height={20} width="40%" className="mt-2" />
                            <Skeleton height={20} width="50%" className="mt-4" />
                        </div>
                        <div className="bg-gray-50 px-6 py-4">
                            <Skeleton height={24} width="30%" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <div className="flex">
                    <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                    <div>
                        <p className="font-bold">Error loading projects</p>
                        <p>{error.message}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (projects && projects.length > 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h2>
                            <p className="text-sm text-gray-500 mb-4">
                                Created on: {new Date(project.created_at).toLocaleDateString()}
                            </p>
                            <div className="flex space-x-4 text-sm text-gray-600">
                                <span>{project.apps_count} App(s)</span>
                                <span>{project.testimonials_count} Testimonial(s)</span>
                            </div>
                        </div>
                        <Link to={`/project/${project.id}`} className="block bg-gray-50 px-6 py-4 text-ion-blue font-semibold hover:bg-gray-100 transition-colors">
                            <div className="flex justify-between items-center">
                                <span>Manage Project</span>
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your dashboard is ready!</h2>
            <p className="text-gray-500 mb-6">Start by creating your first project to upload an app and collect feedback.</p>
            <Link
                to="/create-project"
                className="inline-flex items-center px-6 py-3 font-semibold text-white bg-ion-blue rounded-lg hover:bg-blue-700 transition-all shadow-sm"
            >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Your First Project
            </Link>
        </div>
    );
};

export default ProjectList;
