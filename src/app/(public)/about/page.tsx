import heroImage3 from '@/assets/images/hero-image-3.png';
import professionalImage from '@/assets/images/professional-image.png';
import videoThumbnail from '@/assets/images/video-thumbnail.png';
import { VideoPlayer } from '@/components/shared/VideoPlayer';
import { CheckCircle, Heart, ShieldCheck, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <section className="relative bg-linear-to-br from-[#084f5c] via-[#084f5c] to-[#063945] overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white z-10">
              <div className="inline-block px-4 py-2 bg-[#07c6e8]/20 rounded-full mb-6">
                <span className="text-[#07c6e8] font-medium">
                  Welcome to Le Beau
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl mb-6 leading-tight">
                Beauty and wellness, simplified
              </h1>

              <p className="text-xl text-white/90 leading-relaxed">
                Connecting exceptional professionals with clients who value
                quality. Book appointments, grow your business, and build
                lasting relationships.
              </p>
            </div>

            <div className="hidden lg:block">
              <VideoPlayer
                src="https://booksy-public.s3.amazonaws.com/horizontal_.webm"
                thumbnail={videoThumbnail.src}
              />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#07c6e8]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#07c6e8]/5 rounded-full blur-3xl"></div>
      </section>

      {/* For Clients Section */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1611211235015-e2e3a7d09e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc2ODEwMzkyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Beautiful salon interior"
                className="w-full rounded-2xl shadow-2xl object-cover"
                width={1080}
                height={734}
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl lg:text-5xl text-gray-900 mb-6">
                Your beauty routine, streamlined
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Le Beau is your direct connection to the best beauty and
                wellness professionals. No searching. No waiting. No hassle.
                Just instant access to trusted experts who make you look and
                feel exceptional.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#07c6e8] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Search with confidence
                    </h4>
                    <p className="text-gray-600">
                      Browse verified professionals with real portfolios, honest
                      reviews, and transparent pricing
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#07c6e8] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Book in seconds
                    </h4>
                    <p className="text-gray-600">
                      See real-time availability and reserve your spot
                      instantly, any time of day
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#07c6e8] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Show up and shine
                    </h4>
                    <p className="text-gray-600">
                      Your appointment is confirmed, your payment is handled,
                      and your professional is ready
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Modern Cards */}
      <section className="py-24 lg:py-32">
        {/* Mission Section - Modern Cards comment moved with section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl text-gray-900 mb-6">
              Why Le Beau?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re more than a booking platform. We&apos;re your partner
              in growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
              <div className="w-14 h-14 bg-[#07c6e8] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <ShieldCheck className="w-7 h-7 text-white stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quality First
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every professional is verified to ensure exceptional service
                standards
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
              <div className="w-14 h-14 bg-[#084f5c] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <CheckCircle className="w-7 h-7 text-white stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Simple & Intuitive
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Seamless booking experience from search to payment
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
              <div className="w-14 h-14 bg-[#07c6e8] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Users className="w-7 h-7 text-white stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Driven
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Supporting local businesses and helping them grow together
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
              <div className="w-14 h-14 bg-[#084f5c] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Heart className="w-7 h-7 text-white stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Transparent & Trustworthy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Clear pricing, honest reviews, and reliable service every time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Professionals Section with Map Image */}
      <section className="py-24 lg:py-32 bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white z-10">
              <h2 className="text-5xl lg:text-6xl mb-6 leading-tight">
                Where great service meets lasting success
              </h2>

              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
                Le Beau connects skilled professionals with clients who value
                quality. When you find the right match, everyone wins.
                Professionals build thriving businesses with loyal clients,
                while customers discover trusted experts who truly understand
                their needs. That&apos;s the beauty of doing business better.
              </p>
            </div>

            {/* Right Image with Gradient Overlay */}
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-l from-[#07c6e8]/60 to-transparent z-10 rounded-2xl"></div>
              <Image
                src={professionalImage}
                alt="Professional barbershop service"
                className="w-full rounded-2xl relative z-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Relationships Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4">
                Built for both sides of the chair
              </h2>
              <p className="text-2xl text-gray-600 mb-8">
                Features that make booking seamless and business smarter
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#07c6e8]/10 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#07c6e8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Book anytime, anywhere
                    </h4>
                    <p className="text-gray-600">
                      Customers book 24/7 from any device. Professionals never
                      miss a booking opportunity
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#07c6e8]/10 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#07c6e8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Real-time availability
                    </h4>
                    <p className="text-gray-600">
                      See open slots instantly and book in seconds.
                      Professionals control their calendar with ease
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#07c6e8]/10 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#07c6e8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Smart reminders for everyone
                    </h4>
                    <p className="text-gray-600">
                      Customers never forget appointments. Professionals cut
                      no-shows by up to 60%
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#07c6e8]/10 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#07c6e8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Secure payments, zero hassle
                    </h4>
                    <p className="text-gray-600">
                      Customers pay safely online or in person. Professionals
                      get paid faster with automatic processing
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#07c6e8]/10 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#07c6e8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Reviews that build trust
                    </h4>
                    <p className="text-gray-600">
                      Customers find top-rated professionals with confidence.
                      Professionals showcase their best work and grow their
                      reputation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#07c6e8]/10 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#07c6e8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Personalized experience
                    </h4>
                    <p className="text-gray-600">
                      Customers get service recommendations based on
                      preferences. Professionals remember client history and
                      deliver tailored service
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/for-business">
                <button className="mt-8 bg-[#084f5c] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#063945] transition">
                  Explore All Features
                </button>
              </Link>
            </div>

            <div className="order-first lg:order-last">
              <Image
                src={heroImage3}
                alt="Client engagement tools"
                className="w-full scale-125"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-br from-[#084f5c] to-[#063945]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Join thousands of beauty and wellness professionals growing their
            business with Le Beau
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/for-business">
              <button className="bg-[#07c6e8] text-white px-10 py-4 rounded-lg font-medium hover:bg-[#06b0cf] transition shadow-lg text-lg">
                List Your Business
              </button>
            </Link>

            <Link href="/search">
              <button className="bg-white text-[#084f5c] px-10 py-4 rounded-lg font-medium hover:bg-gray-100 transition shadow-lg text-lg">
                Find Services
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
