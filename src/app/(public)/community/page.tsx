import communityHero from '@/assets/images/community-hero.png';
import NotifySection from '@/components/sections/community/NotifySection';
import { BookOpen, Calendar, MessageSquare, Users } from 'lucide-react';
import Image from 'next/image';

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#084f5c] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
                Community
              </h1>
              <p className="text-xl text-white/80 mb-12">
                A network for beauty and wellness professionals
              </p>

              <div className="inline-block bg-white px-6 py-3 rounded-lg">
                <p className="text-2xl font-bold text-[#084f5c]">Coming Soon</p>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <Image
                src={communityHero}
                alt="Beauty professionals community"
                className="w-full max-w-2xl mx-auto opacity-30"
                width={520}
                height={520}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
              What to expect
            </h2>
            <p className="text-lg text-gray-600">
              We&apos;re building a space for providers to connect and grow
              their their businesses together.
            </p>
          </div>

          <div className="space-y-12">
            {/* Feature 1 */}
            <div className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-[#084f5c]" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Forums</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ask questions, share advice, and discuss industry topics with
                  other professionals.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#084f5c]" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Provider Directory
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Find and connect with other beauty and wellness professionals
                  in your area.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#084f5c]" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Events</h3>
                <p className="text-gray-600 leading-relaxed">
                  Local meetups, workshops, and industry events to help you
                  learn and network.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#084f5c]" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Resources
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Guides, templates, and tools to help you run and grow your
                  business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NotifySection />
    </div>
  );
};

export default CommunityPage;
