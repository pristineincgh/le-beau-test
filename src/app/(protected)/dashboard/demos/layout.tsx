import Header from '@/components/layout/Header';
import LoginHero from '@/components/sections/auth/login/LoginHero';

const DemosLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center relative lg:overflow-hidden bg-gray-900 px-4 sm:px-0">
        <LoginHero />

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 sm:py-12">
          {children}
        </div>
      </div>
    </>
  );
}

export default DemosLayout