import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { apiClient } from '@/services/api';
import { Project } from '@/types';
import { Plus, Rocket, Zap, Target } from 'lucide-react';

const getProjects = async (): Promise<Project[]> => {
    try {
        const { data } = await apiClient.get('/projects/');
        return data;
    } catch (error: any) {
        // If unauthorized or authentication error, return empty array
        if (error.response?.status === 401 || error.response?.status === 403) {
            return [];
        }
        throw error;
    }
};

const Dashboard = () => {
  const { data: projects, isLoading, isError } = useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Projects</h1>
        <Button asChild>
          <Link to="/create-project">Create New Project</Link>
        </Button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mt-1" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                <p className="text-gray-600 mb-4">{project.source_url}</p>
                <Button variant="outline" asChild>
                  <Link to={`/project/${project.id}`}>View Details</Link>
                </Button>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-16 px-8">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-8">
                    <Rocket className="mx-auto h-16 w-16 text-indigo-500 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Ready to Launch Your First Project?
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Start building amazing applications and collect valuable feedback from your users.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                      <Zap className="h-8 w-8 text-blue-600 mb-3 mx-auto" />
                      <h4 className="font-semibold text-gray-900 mb-2">Quick Setup</h4>
                      <p className="text-sm text-gray-600">Get started in minutes with our intuitive project builder</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
                      <Target className="h-8 w-8 text-green-600 mb-3 mx-auto" />
                      <h4 className="font-semibold text-gray-900 mb-2">Collect Feedback</h4>
                      <p className="text-sm text-gray-600">Gather testimonials and insights from your users</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-100">
                      <Plus className="h-8 w-8 text-purple-600 mb-3 mx-auto" />
                      <h4 className="font-semibold text-gray-900 mb-2">Scale Up</h4>
                      <p className="text-sm text-gray-600">Grow your project with powerful analytics and tools</p>
                    </div>
                  </div>

                  <Button size="lg" className="px-8 py-3 text-lg font-semibold">
                    <Plus className="h-5 w-5 mr-2" />
                    <Link to="/create-project">Create Your First Project</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {isError && projects && projects.length === 0 && (
        <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
          <p>Something went wrong while loading projects</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;