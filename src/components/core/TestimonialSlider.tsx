import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Testimonial } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Loader2, MessageSquareQuote } from 'lucide-react';

interface TestimonialSliderProps {
    projectId: string;
}

const getTestimonials = async (projectId: string): Promise<Testimonial[]> => {
    const { data } = await apiClient.get(`/projects/${projectId}/testimonials/`);
    return data;
};

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ projectId }) => {
    const { data: testimonials, isLoading, isError } = useQuery<Testimonial[], Error>({
        queryKey: ['testimonials', projectId],
        queryFn: () => getTestimonials(projectId),
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin" /></div>;
    }

    if (isError || !testimonials || testimonials.length === 0) {
        return (
            <div className="p-4 text-center">
                <p className="text-gray-500">No testimonials available yet.</p>
            </div>
        );
    }
    
    // For simplicity, we'll just show the first testimonial. A real slider would be more complex.
    const testimonial = testimonials[0];

    return (
        <Card className="m-4">
            <CardContent className="p-6 text-center">
                <MessageSquareQuote className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg italic">"{testimonial.content}"</p>
                <footer className="mt-4 font-semibold text-gray-600">- {testimonial.user.username}</footer>
            </CardContent>
        </Card>
    );
};

export default TestimonialSlider;
