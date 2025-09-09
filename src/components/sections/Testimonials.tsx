import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import tsionImage from '@/assets/images/tsion_tamirat.jpg';
import mugambiImage from '@/assets/images/mugambi_john_ndeke.jpg';

const testimonials = [
  {
    quote: "Applaude transformed how we demonstrate our app to stakeholders. The interactive previews are a game-changer.",
    name: "Tsion Tamirat",
    title: "Product Manager, Tech Innovators",
    image: tsionImage
  },
  {
    quote: "The speed from repo to a live, shareable demo is just unbelievable. It has streamlined our feedback loop immensely.",
    name: "Mugambi John Ndeke",
    title: "Lead Developer, Cloud Solutions",
    image: mugambiImage
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-[#ff3d7f] rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#4d2b8c] rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2d0b59]">Loved by Developers Worldwide</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover why thousands of developers and product teams choose Applaude for their app showcase needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-to-br from-[#4d2b8c] to-[#2d0b59] border-0 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] flex flex-col items-center text-center p-8 shadow-xl">
              
              {/* Profile Image - Centered at the top */}
              <div className="relative mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#ff3d7f] mx-auto shadow-lg" 
                />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#ff3d7f] rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Name */}
              <CardHeader className="p-0 mb-2">
                <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
              </CardHeader>
              
              {/* Role/Title */}
              <CardContent className="p-0 mb-6">
                <p className="text-[#c2b4d8] text-sm">{testimonial.title}</p>
              </CardContent>
              
              {/* Testimonial Quote */}
              <CardFooter className="p-0 flex flex-col items-center">
                <div className="text-4xl font-serif text-[#ff3d7f] mb-4">"</div>
                <p className="text-white italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                
                {/* Star Ratings */}
                <div className="flex items-center mt-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 mx-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 bg-gradient-to-br from-[#4d2b8c] to-[#2d0b59] rounded-2xl border-0 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
            <div className="text-[#c2b4d8]">Active Users</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-[#4d2b8c] to-[#2d0b59] rounded-2xl border-0 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
            <div className="text-[#c2b4d8]">Satisfaction Rate</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-[#4d2b8c] to-[#2d0b59] rounded-2xl border-0 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-[#c2b4d8]">Support</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-[#4d2b8c] to-[#2d0b59] rounded-2xl border-0 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">1.2M</div>
            <div className="text-[#c2b4d8]">Apps Created</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;