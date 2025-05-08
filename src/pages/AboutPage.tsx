import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card, { CardBody } from '../components/ui/Card';
import { Users, Clock, Map, Calendar, Award, Shield } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section 
        className="text-center max-w-3xl mx-auto py-20 px-4 rounded-xl relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/3992870/pexels-photo-3992870.jpeg")'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-6 text-white">About COSMEK.BEAUTY</h1>
          <p className="text-xl mb-8 text-gray-100">
            Premium salon services for everyone. Our mission is to provide exceptional styling 
            experiences that help you look and feel your best.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2025, COSMEK.BEAUTY was born from a passion for exceptional hair care and 
            a vision to create a salon experience that celebrates individuality.
          </p>
          <p className="mb-4">
            Our founder, Meagan, saw an opportunity to create a space where everyone could 
            feel welcome and leave feeling confident and beautiful.
          </p>
          <p>
            Today, we have grown into a premium salon with expert stylists dedicated to 
            helping you look your best with personalized service and attention to detail.
          </p>
        </div>
        <div 
          className="rounded-lg overflow-hidden h-80 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg")'
          }}
        >
          <div className="h-full flex items-center justify-center text-center p-8 bg-black bg-opacity-50">
            <p className="text-xl italic text-white">
              "Our goal is to redefine beauty by providing premium services in a 
              welcoming, inclusive environment."
            </p>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Award className="w-12 h-12 text-purple-500" />,
              title: "Expert Stylists",
              description: "Our team is highly trained and experienced in creating the perfect look for you.",
              image: "https://images.pexels.com/photos/3993466/pexels-photo-3993466.jpeg"
            },
            {
              icon: <Shield className="w-12 h-12 text-purple-500" />,
              title: "Premium Products",
              description: "We use only the highest quality products for all our services.",
              image: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg"
            },
            {
              icon: <Calendar className="w-12 h-12 text-purple-500" />,
              title: "Flexible Booking",
              description: "Easy online booking system with the ability to reschedule when needed.",
              image: "https://images.pexels.com/photos/3993458/pexels-photo-3993458.jpeg"
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${feature.image})` }}
              ></div>
              <CardBody>
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4 dark:bg-purple-900">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Business Hours & Location */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardBody>
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-purple-500 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Saturday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <div className="flex items-start">
              <Map className="w-6 h-6 text-purple-500 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-4">Location</h3>
                <address className="not-italic">
                  <p className="mb-2">671 Cosmek Street</p>
                  <p className="mb-2">Barrigada, GU 96913</p>
                  <p className="mb-2">Phone: (671) 671-0671</p>
                  <p>Email: info@cosmekbeauty.com</p>
                </address>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
};

export default AboutPage;