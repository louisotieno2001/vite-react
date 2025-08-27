import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { BlogPost } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const getBlogPosts = async (): Promise<BlogPost[]> => {
    const { data } = await apiClient.get('/blog/posts/');
    return data;
};

const createBlogPost = async (postData: Partial<BlogPost>): Promise<BlogPost> => {
    const { data } = await apiClient.post('/blog/posts/', postData);
    return data;
};

const updateBlogPost = async (postData: Partial<BlogPost> & { id: number }): Promise<BlogPost> => {
    const { id, ...payload } = postData;
    const { data } = await apiClient.put(`/blog/posts/${id}/`, payload);
    return data;
};

const BlogDashboard: React.FC = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);

    const { data: posts, isLoading } = useQuery<BlogPost[], Error>({
        queryKey: ['blogPosts'],
        queryFn: getBlogPosts,
    });

    const mutation = useMutation({
        mutationFn: (postData: Partial<BlogPost>) => 
            currentPost?.id ? updateBlogPost({ ...postData, id: currentPost.id }) : createBlogPost(postData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
            toast.success(`Blog post ${currentPost?.id ? 'updated' : 'created'} successfully!`);
            setIsModalOpen(false);
            setCurrentPost(null);
        },
        onError: (error) => {
            toast.error(`Failed to ${currentPost?.id ? 'update' : 'create'} blog post: ${error.message}`);
        }
    });

    const handleOpenModal = (post: Partial<BlogPost> | null = null) => {
        setCurrentPost(post || { title: '', content: '', is_published: false });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentPost) {
            mutation.mutate(currentPost);
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentPost(prev => prev ? { ...prev, [name]: value } : null);
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Blog Management</h1>
                <Button onClick={() => handleOpenModal()}>Create New Post</Button>
            </div>
            
            {isLoading && <Loader2 className="mx-auto h-12 w-12 animate-spin" />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts?.map(post => (
                    <Card key={post.id}>
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">Status: {post.is_published ? 'Published' : 'Draft'}</p>
                            <Button variant="outline" onClick={() => handleOpenModal(post)}>Edit</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {isModalOpen && currentPost && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <Card className="w-full max-w-2xl">
                         <CardHeader>
                            <CardTitle>{currentPost.id ? 'Edit' : 'Create'} Blog Post</CardTitle>
                         </CardHeader>
                         <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <Input id="title" name="title" value={currentPost.title} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                                    <Textarea id="content" name="content" value={currentPost.content} onChange={handleChange} rows={10} required />
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="is_published" name="is_published" checked={currentPost.is_published} 
                                        onChange={(e) => setCurrentPost(p => p ? {...p, is_published: e.target.checked} : null)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                    <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">Publish</label>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" disabled={mutation.isPending}>
                                        {mutation.isPending ? 'Saving...' : 'Save Post'}
                                    </Button>
                                </div>
                            </form>
                         </CardContent>
                    </Card>
                 </div>
            )}
        </div>
    );
};

export default BlogDashboard;
