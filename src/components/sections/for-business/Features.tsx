import { AnimatedSection } from '@/components/shared/AnimatedSection';
import {
  BarChart,
  Calendar,
  CreditCard,
  MessageSquare,
  Star,
  Users,
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Online Booking',
      description: 'Let customers book 24/7 with real-time availability',
    },
    {
      icon: Users,
      title: 'Client Management',
      description: 'Track customer history, preferences, and loyalty',
    },
    {
      icon: CreditCard,
      title: 'Payment Processing',
      description: 'Secure payments with automatic invoicing',
    },
    {
      icon: BarChart,
      title: 'Analytics & Reports',
      description: 'Insights into bookings, revenue, and peak times',
    },
    {
      icon: Star,
      title: 'Reviews & Ratings',
      description: 'Build trust with verified customer reviews',
    },
    {
      icon: MessageSquare,
      title: 'Automated Reminders',
      description: 'Reduce no-shows with SMS and email notifications',
    },
  ];

  return (
    <AnimatedSection>
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All the tools to manage your beauty business in one powerful
              platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="w-16 h-16 bg-[#07c6e8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-[#07c6e8]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default Features;
