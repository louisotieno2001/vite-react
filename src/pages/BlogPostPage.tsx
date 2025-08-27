import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { BlogPost } from '@/types';
import { Loader2, AlertCircle } from 'lucide-react';

const getBlogPost = async (id: string): Promise<BlogPost> => {
    const { data } = await apiClient.get(`/blog/posts/${id}/`);
    return data;
};

const BlogPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data: post, isLoading, isError, error } = useQuery<BlogPost, Error>({
        queryKey: ['blogPost', id],
        queryFn: () => getBlogPost(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-16 w-16 animate-spin text-ion-blue" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto p-4 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
                <h2 className="mt-4 text-xl font-semibold text-red-600">Error loading post</h2>
                <p className="text-red-500">{error?.message || 'The post could not be found or an error occurred.'}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl p-4 md:p-8">
            <article className="prose lg:prose-xl">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post?.title}</h1>
                <p className="text-lg text-gray-500">
                    By {post?.author?.username || 'Applaude Team'} on {new Date(post?.created_at || Date.now()).toLocaleDateString()}
                </p>
                {post?.main_image_url && (
                    <img src={post.main_image_url} alt={post.title} className="w-full rounded-lg my-8" />
                )}
                <div dangerouslySetInnerHTML={{ __html: post?.content || '' }} />
            </article>
        </div>
    );
};

export default BlogPostPage;
