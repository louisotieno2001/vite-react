import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Project } from '@/types';
import { Loader2 } from 'lucide-react';
import AppSimulator from '@/components/core/AppSimulator';
import TestimonialSlider from '@/components/core/TestimonialSlider';

const getProjectDetails = async (id: string): Promise<Project> => {
  const { data } = await apiClient.get(`/projects/${id}/`);
  return data;
};

const PreviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isTestimonialVisible, setIsTestimonialVisible] = useState(false);
  
  const { data: project, isLoading, isError } = useQuery<Project, Error>({
    queryKey: ['projectPreview', id],
    queryFn: () => getProjectDetails(id!),
    enabled: !!id,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTestimonialVisible(true);
    }, 5000); // Show testimonial after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-ion-blue" />
      </div>
    );
  }

  if (isError || !project) {
    navigate('/dashboard'); // Redirect if project not found or error
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Preview: {project.name}</h1>
      <AppSimulator palette={project.brand_palette}>
        {isTestimonialVisible ? (
          <TestimonialSlider projectId={project.id} />
        ) : (
          <div className="p-4">
            <h2 className="text-xl font-bold">Welcome to {project.name}</h2>
            <p>This is a preview of your application.</p>
          </div>
        )}
      </AppSimulator>
    </div>
  );
};

export default PreviewPage;
