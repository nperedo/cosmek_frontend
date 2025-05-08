import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Scissors } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import { useTheme } from '../contexts/ThemeContext';

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 rounded-xl overflow-hidden bg-cover bg-center min-h-[600px]"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/3993132/pexels-photo-3993132.jpeg")'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Premium Cuts & Styling for Your Perfect Look
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-100">
            Experience the best in professional hair care and styling with our expert stylists. 
            Book your appointment today for a look that expresses your unique style.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/book-appointment">
              <Button size="lg">
                <Calendar size={20} className="mr-2" />
                Book Appointment
              </Button>
            </Link>
            <Link to="/stylists">
              <Button variant="outline" size="lg" className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white border-white">
                Meet Our Stylists
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Scissors className="w-12 h-12 text-purple-500" />,
              title: "Premium Cuts",
              description: "Expert cuts tailored to your face shape and personal style. From classic to contemporary.",
              image: "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg"
            },
            {
              icon: <Users className="w-12 h-12 text-purple-500" />,
              title: "Experienced Stylists",
              description: "Our professional stylists have years of experience in creating the perfect look for you.",
              image: "https://images.pexels.com/photos/3993466/pexels-photo-3993466.jpeg"
            },
            {
              icon: <Calendar className="w-12 h-12 text-purple-500" />,
              title: "Easy Booking",
              description: "Book, reschedule, or cancel your appointment with just a few clicks.",
              image: "https://images.pexels.com/photos/3993310/pexels-photo-3993310.jpeg"
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
      
      {/* CTA Section */}
      <section 
        className="rounded-xl p-12 bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/3993442/pexels-photo-3993442.jpeg")'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        <div className="text-center max-w-xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready for a Fresh Look?</h2>
          <p className="mb-6 text-gray-200">
            Book your appointment now and experience premium salon services tailored just for you.
          </p>
          <Link to="/book-appointment">
            <Button size="lg" className="bg-black text-purple-600 hover:bg-black-100">
              Book Your Appointment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;