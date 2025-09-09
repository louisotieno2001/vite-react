import React from 'react';
import Hero from '@/components/sections/Hero';
// import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';

const LandingPage: React.FC = () => {
    return (
        <div>
            <Hero />
            {/* <Testimonials /> */}
            <CTA />
        </div>
    );
};

export default LandingPage;
