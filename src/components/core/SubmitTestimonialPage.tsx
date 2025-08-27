import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const formSchema = z.object({
  content: z.string().min(10, {
    message: "Testimonial must be at least 10 characters long.",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface SubmitPayload extends FormData {
    projectId: string;
}

const submitTestimonial = async ({ projectId, content }: SubmitPayload) => {
    const { data } = await apiClient.post(`/projects/${projectId}/testimonials/`, { content });
    return data;
};

const SubmitTestimonialPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    
    const mutation = useMutation({
        mutationFn: submitTestimonial,
        onSuccess: () => {
            toast.success("Thank you for your feedback!");
            navigate(`/project/${projectId}`);
        },
        onError: (error) => {
            toast.error(`Submission failed: ${error.message}`);
        }
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { content: "" },
    });

    const onSubmit = (data: FormData) => {
        if (projectId) {
            mutation.mutate({ ...data, projectId });
        }
    };

    return (
        <div className="container mx-auto flex justify-center items-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Submit a Testimonial</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Feedback</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Tell us what you think..." rows={5} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending ? "Submitting..." : "Submit Testimonial"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SubmitTestimonialPage;
