import React from 'react';
import { Card } from '../ui/Card';

interface Testimonial {
    content: string;
    user: {
        username: string;
        // In a real app, you'd have profile details here
        // business_name?: string;
        // business_website?: string;
        // profile_image_url?: string;
    };
}

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    // Mock data until ApiClient profile is implemented
    const businessName = "InnovateCo";
    const businessWebsite = "https://example.com";
    const profileImageUrl = `https://i.pravatar.cc/150?u=${testimonial.user.username}`;


    return (
        <Card className="p-8 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300 h-full">
             <p className="text-lg text-gray-700 mb-6">"{testimonial.content}"</p>
            <div className="flex items-center">
                <img src={profileImageUrl} alt={testimonial.user.username} className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <p className="font-bold text-black">{testimonial.user.username}</p>
                    <a href={businessWebsite} target="_blank" rel="noopener noreferrer" className="text-ion-blue hover:underline">
                        {businessName}
                    </a>
                </div>
            </div>
        </Card>
    );
};

export default TestimonialCard;
