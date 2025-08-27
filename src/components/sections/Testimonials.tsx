import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import tsionImage from '@/assets/images/tsion_tamirat.jpg.jpg';
import mugambiImage from '@/assets/images/mugambi_john_ndeke.jpg.jpg';

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
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Loved by Developers Worldwide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </CardHeader>
              <CardContent className="flex-grow">{null}</CardContent>
              <CardFooter className="flex items-center">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;