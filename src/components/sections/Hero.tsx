import React from 'react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="container mx-auto text-center py-20 md:py-32">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                    Showcase Your App, Instantly.
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Applaude generates stunning, interactive showcases for your mobile and web applications directly from your source code.
                </p>
                <Button size="lg" onClick={() => navigate('/signup')} className="bg-white text-blue-600 hover:bg-gray-200 transition duration-300">
                    Get Started for Free
                </Button>
            </div>
        </section>
    );
};

export default Hero;
