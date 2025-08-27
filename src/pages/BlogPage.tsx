import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { BlogPost } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';

const getPublishedBlogPosts = async (): Promise<BlogPost[]> => {
    const { data } = await apiClient.get('/blog/posts/?published=true');
    return data;
};

const BlogPage: React.FC = () => {
    const { data: posts, isLoading, isError } = useQuery<BlogPost[], Error>({
        queryKey: ['publishedBlogPosts'],
        queryFn: getPublishedBlogPosts,
    });

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
            
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i}>
                            <Skeleton className="h-48 w-full" />
                            <CardHeader>
                                <Skeleton className="h-8 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            )}

            {isError && (
                <p className="text-center text-red-500">Failed to load blog posts. Please try again later.</p>
            )}

            {!isLoading && !isError && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts?.map(post => (
                        <Link to={`/blog/${post.id}`} key={post.id} className="block hover:shadow-lg transition-shadow rounded-lg">
                            <Card className="h-full">
                                {post.main_image_url && <img src={post.main_image_url} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />}
                                <CardHeader>
                                    <CardTitle>{post.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-500">By {post.author?.username || 'Applaude Team'} on {new Date(post.created_at).toLocaleDateString()}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogPage;
