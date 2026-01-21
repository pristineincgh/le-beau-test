import { AppDownloadSection } from '@/components/sections/home/AppDownloadSection';
import { BookFirstAppointment } from '@/components/sections/home/BookFirstAppointment';
import BusinessShowcase from '@/components/sections/home/BusinessShowcase';
import { Hero } from '@/components/sections/home/Hero';
import Recommendation from '@/components/sections/home/Recommendation';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <Recommendation />

      {/* Book First Appointment Section */}
      <AnimatedSection delay={0.1}>
        <BookFirstAppointment />
      </AnimatedSection>

      {/* Business Showcase Section */}
      <AnimatedSection delay={0.2}>
        <BusinessShowcase />
      </AnimatedSection>

      <AppDownloadSection />
    </div>
  );
}
