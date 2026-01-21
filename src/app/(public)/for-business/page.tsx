import BreakFree from '@/components/sections/for-business/BreakFree';
import CTA from '@/components/sections/for-business/CTA';
import Features from '@/components/sections/for-business/Features';
import ForBusinessHero from '@/components/sections/for-business/ForBusinessHero';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { Check, TrendingUp } from 'lucide-react';

const ForBusinessPage = () => {
  const benefits = [
    'Increase bookings by up to 40%',
    'Save 10+ hours per week on admin tasks',
    'Reduce no-shows with automated reminders',
    'Accept online payments securely',
    'Build your online reputation with reviews',
    'Access detailed business insights and analytics',
    'Manage staff schedules and availability',
    'Grow your client base with marketing tools',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Gradient Background */}
      <ForBusinessHero />
      <Features />
      <BreakFree benefits={benefits} />

      {/* Build a Business Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjgwMDI5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Business analytics and insights"
                className="w-full h-auto rounded-2xl shadow-xl"
                width={1080}
                height={810}
              />
              <div className="absolute -top-6 -left-6 bg-white p-6 rounded-xl shadow-lg hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl font-bold text-gray-900">56</div>
                  <div className="text-green-600 text-sm font-semibold flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12%
                  </div>
                </div>
                <div className="text-sm text-gray-600">New Appointments</div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Grow a thriving beauty empire
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Bring in more money and make more clients&apos; dreams come true
                with Le Beau. Our platform makes you visible to thousands of
                potential clients and gives you the tools to deliver exceptional
                service every time.
              </p>
              <ul className="space-y-4">
                {benefits.slice(4, 8).map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-6 h-6 text-[#07c6e8] mr-3 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default ForBusinessPage;
