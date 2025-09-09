import React from 'react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

const CTA: React.FC = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-gradient-to-b text-black">
            <div className="container mx-auto text-center py-20">
                <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Showcase?</h2>
                <p className="mb-8 max-w-xl mx-auto">
                    Join thousands of developers and product managers who use Applaude to bring their applications to life.
                </p>
                <Button size="lg" variant="secondary" onClick={() => navigate('/signup')}>
                    Create Your First Showcase
                </Button>
            </div>
        </section>
    );
};

export default CTA;
