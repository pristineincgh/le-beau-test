'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Play,
  Search,
  Send,
  Shield,
  Store,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ContactFormModal from './ContactFormModal';

export const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showContactForm, setShowContactForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    {
      id: 'all',
      name: 'All Topics',
      icon: HelpCircle,
      color: 'bg-gray-100',
      textColor: 'text-gray-700',
    },
    {
      id: 'booking',
      name: 'Booking',
      icon: BookOpen,
      color: 'bg-[#07c6e8]/10',
      textColor: 'text-[#07c6e8]',
    },
    {
      id: 'payment',
      name: 'Payments',
      icon: CreditCard,
      color: 'bg-[#084f5c]/10',
      textColor: 'text-[#084f5c]',
    },
    {
      id: 'business',
      name: 'For Businesses',
      icon: Store,
      color: 'bg-[#07c6e8]/10',
      textColor: 'text-[#07c6e8]',
    },
    {
      id: 'account',
      name: 'Account',
      icon: Users,
      color: 'bg-[#084f5c]/10',
      textColor: 'text-[#084f5c]',
    },
  ];

  const faqs = [
    {
      category: 'booking',
      question: 'How do I book an appointment?',
      answer:
        "Simply search for a service using our search bar, select your preferred business, choose a date and time that works for you, and complete the booking. You'll receive instant confirmation via email and SMS.",
    },
    {
      category: 'booking',
      question: 'Can I cancel or reschedule my appointment?',
      answer:
        'Yes! You can cancel or reschedule from your dashboard up to 24 hours before your appointment. Navigate to "My Bookings", select the appointment, and click "Cancel" or "Reschedule". Please note that cancellations within 24 hours may incur a fee.',
    },
    {
      category: 'booking',
      question: 'How do I know if my booking is confirmed?',
      answer:
        "You'll receive a confirmation email immediately after booking, along with an SMS notification. You'll also get a reminder 24 hours before your appointment. All confirmed bookings appear in your dashboard.",
    },
    {
      category: 'booking',
      question: "What if I'm running late?",
      answer:
        'Please contact the business directly as soon as possible. Their contact information is available in your booking confirmation. Most businesses have a grace period, but policies vary.',
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and digital wallets. Some businesses also accept cash payments on-site. Payment options are displayed during checkout.',
    },
    {
      category: 'payment',
      question: 'When am I charged for my booking?',
      answer:
        'Payment is processed at the time of booking for online payments. Some businesses may allow pay-on-arrival - this will be clearly indicated during the booking process.',
    },
    {
      category: 'payment',
      question: 'What is your refund policy?',
      answer:
        "Refunds are issued for cancellations made 24+ hours in advance. The refund will be processed to your original payment method within 5-7 business days. Cancellations within 24 hours may be subject to the business's cancellation policy.",
    },
    {
      category: 'payment',
      question: 'Are there any hidden fees?',
      answer:
        'No hidden fees! The price you see is the price you pay. Any applicable taxes or service fees are clearly displayed before you confirm your booking.',
    },
    {
      category: 'business',
      question: 'How do I list my business on Le Beau?',
      answer:
        'Click "For Businesses" in the navigation menu, then select "List Your Business" to start the registration process. You\'ll need basic business information, services offered, and availability. Our team will review and approve within 24-48 hours.',
    },
    {
      category: 'business',
      question: 'What are the subscription fees?',
      answer:
        'We offer flexible plans starting with a free tier that includes basic features. Premium plans unlock advanced tools like analytics, automated marketing, and priority support. Visit our Pricing page for detailed information.',
    },
    {
      category: 'business',
      question: 'How do I manage my bookings?',
      answer:
        "All bookings are managed through your provider dashboard. You'll receive real-time notifications for new bookings, cancellations, and reschedules. The dashboard includes calendar views, client management, and reporting tools.",
    },
    {
      category: 'business',
      question: 'Can I block out time for breaks or events?',
      answer:
        "Absolutely! In your provider dashboard, you can set custom availability, block specific time slots, and mark holidays or special events. This ensures customers can only book when you're actually available.",
    },
    {
      category: 'account',
      question: 'How do I create an account?',
      answer:
        'Click "Sign Up" in the top right corner. You can register using your email, Google, or Facebook account. Creating an account allows you to save favorite businesses, track bookings, and get personalized recommendations.',
    },
    {
      category: 'account',
      question: 'I forgot my password. What should I do?',
      answer:
        'Click "Sign In", then select "Forgot Password". Enter your email address and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.',
    },
    {
      category: 'account',
      question: 'How do I update my profile information?',
      answer:
        'Log in to your account, click on your profile picture in the top right, and select "Account Settings". From there, you can update your personal information, contact details, and preferences.',
    },
    {
      category: 'account',
      question: 'Can I delete my account?',
      answer:
        'Yes. Go to Account Settings and scroll to the bottom. Click "Delete Account" and follow the prompts. Please note this action is permanent and will remove all your data, including booking history.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const quickLinks = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of using Le Beau',
      icon: Play,
      color: 'bg-[#07c6e8]',
    },
    {
      title: 'Booking Guide',
      description: 'Everything about appointments',
      icon: BookOpen,
      color: 'bg-[#084f5c]',
    },
    {
      title: 'Payment & Refunds',
      description: 'Billing and refund information',
      icon: CreditCard,
      color: 'bg-[#07c6e8]',
    },
    {
      title: 'Safety & Trust',
      description: 'How we keep you safe',
      icon: Shield,
      color: 'bg-[#084f5c]',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#084f5c] to-[#0a6270] text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#07c6e8] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            How can we help you?
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Search our knowledge base or get in touch with our support team
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-[#07c6e8]/30 shadow-xl placeholder:text-white"
            />
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <AnimatedSection>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-left group hover:-translate-y-1"
              >
                <div
                  className={`${link.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{link.title}</h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </button>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Contact Options */}
      <AnimatedSection delay={0.1}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our support team is available 24/7 to assist you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Email Support */}
            <a
              href="mailto:support@lebeau.fr"
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#084f5c] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-16 h-16 bg-[#084f5c]/10 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-[#084f5c]" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Email Us</h3>
              <p className="text-gray-600 text-sm mb-4">
                We&apos;ll respond within 24h
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#084f5c]">
                support@lebeau.fr
              </span>
            </a>

            {/* Phone Support */}
            <a
              href="tel:+33123456789"
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#07c6e8] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-16 h-16 bg-[#07c6e8]/10 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-[#07c6e8]" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Call Us</h3>
              <p className="text-gray-600 text-sm mb-4">Mon-Fri, 9AM-6PM CET</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#07c6e8]">
                +33 1 23 45 67 89
              </span>
            </a>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection delay={0.2}>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find quick answers to common questions
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-[#07c6e8] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-[#07c6e8]/50 transition-all duration-300"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#07c6e8] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      expandedFaq === index
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg">
                  No articles found matching your search
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Try different keywords or browse all topics
                </p>
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* Still Need Help CTA */}
      <AnimatedSection delay={0.3}>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-linear-to-br from-[#084f5c] to-[#0a6270] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#07c6e8] rounded-full blur-3xl" />
            </div>

            <div className="relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Can&apos;t find what you&apos;re looking for? Our dedicated
                support team support team is here to help you 24/7
              </p>
              <button
                onClick={() => setShowContactForm(true)}
                className="px-8 py-4 bg-white text-[#084f5c] rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Support
              </button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Business Hours */}
      <AnimatedSection delay={0.4}>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#07c6e8]/10 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#07c6e8]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  Support Hours
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Live Chat & Phone
                    </p>
                    <p className="text-gray-600">
                      Mon-Fri: 9:00 AM - 6:00 PM CET
                    </p>
                    <p className="text-gray-600">
                      Sat-Sun: 10:00 AM - 4:00 PM CET
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Support</p>
                    <p className="text-gray-600">
                      24/7 - We respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactFormModal
          showContactForm={showContactForm}
          setShowContactForm={setShowContactForm}
        />
      )}
    </div>
  );
};
