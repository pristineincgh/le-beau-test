'use client';

import { cn } from '@/lib/utils';
import { Menu, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthModal } from '../shared/AuthModal';
import { Button } from '../ui/button';
import Logo from './Logo';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Detect if on home page
  const isHomePage = pathname === '/';

  // Handle scroll to change header style
  useEffect(() => {
    // if (!isHomePage) {
    //   setIsScrolled(true);
    //   return;
    // }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Determine styles based on scroll state
  const headerBg = isScrolled ? 'bg-white shadow-md' : 'bg-transparent';
  const textColor = isScrolled ? 'text-gray-900' : 'text-white';
  const buttonHover = isScrolled
    ? 'hover:bg-gray-100 hover:text-gray-900'
    : 'hover:bg-white/10 hover:text-white';
  const borderColor = isScrolled ? 'border-gray-900' : 'border-white';
  const listBusinessBg = isScrolled ? 'bg-transparent' : 'bg-transparent';
  const headerPosition = !isScrolled ? 'absolute' : 'sticky';

  return (
    <header
      className={`${headerBg} ${headerPosition} top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo isScrolled={isScrolled} width={73} height={64} />

          {/* Desktop Navigation */}
          <div
            className={`hidden md:flex items-center space-x-2 lg:space-x-4 ${!isScrolled ? 'ml-auto' : ''}`}
          >
            {/* TODO: Add buttons for Authenticated Users (Dashboard, Sign Out) */}

            <Link
              href="/about"
              className={`px-4 py-2 ${
                pathname === '/about' ? 'text-[#07c6e8]' : textColor
              } hover:text-[#07c6e8] transition font-medium text-sm lg:text-base whitespace-nowrap`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Discover
            </Link>

            <Button
              // asChild
              variant="ghost"
              className={cn(
                'flex items-center space-x-2 px-2 lg:px-3 py-2 rounded-lg transition',
                buttonHover,
                textColor
              )}
              onClick={() => setShowAuthModal(true)}
            >
              {/* <Link href="/login"> */}
              <User className="w-5 h-5" />
              <span className="hidden lg:inline">Log In / Sign Up</span>
              <span className="lg:hidden">Login</span>
              {/* </Link> */}
            </Button>

            <Button
              asChild
              variant="outline"
              size={'lg'}
              className={`px-6 lg:px-8 py-2 ${listBusinessBg} border-2 ${
                pathname === '/for-business'
                  ? 'border-[#07c6e8] text-[#07c6e8]'
                  : `${borderColor} ${textColor}`
              } rounded-lg ${buttonHover} transition font-medium text-sm lg:text-base whitespace-nowrap`}
            >
              <Link href="/for-business">List your business</Link>
            </Button>

            <Link
              href="/help"
              className={`px-4 py-2 ${
                pathname === '/help' ? 'text-[#07c6e8]' : textColor
              } hover:text-[#07c6e8] transition font-medium text-sm lg:text-base whitespace-nowrap`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Help Center
            </Link>

            <Link
              href="/login"
              className={`px-4 py-2 ${
                pathname === '/login' ? 'text-[#07c6e8]' : textColor
              } hover:text-[#07c6e8] transition font-medium text-sm lg:text-base whitespace-nowrap`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Go to Dashboard
            </Link>
          </div>

          <div className="md:hidden">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon-lg"
              className={cn(buttonHover, textColor)}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 size-12" />
              ) : (
                <Menu className="w-6 h-6 size-12" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t px-4 ${isScrolled ? 'border-gray-200' : 'border-white/10'} py-4 space-y-3 ${isScrolled ? 'bg-white' : 'bg-black/50 backdrop-blur-md'}`}
          >
            {/* TODO: Add buttons for Authenticated Users (Dashboard, Sign Out) */}

            <Link
              href="/about"
              className={`block px-4 py-2 rounded-lg transition font-medium ${
                pathname === '/about'
                  ? 'text-[#07c6e8]'
                  : `${textColor} ${buttonHover}`
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Discover
            </Link>

            <Button
              // asChild
              variant="ghost"
              className={cn(
                'flex justify-start items-center space-x-2 px-2 lg:px-3 py-2 rounded-lg transition w-full',
                buttonHover,
                textColor
              )}
              onClick={() => setShowAuthModal(true)}
            >
              {/* <Link href="/login"> */}
              <User className="w-5 h-5" />
              <span>Log In / Sign Up</span>
              {/* </Link> */}
            </Button>

            <Button
              asChild
              variant="outline"
              size={'lg'}
              className={`w-full px-4 py-2 ${
                pathname === '/for-business'
                  ? 'bg-[#07c6e8] text-white'
                  : 'bg-[#07c6e8] text-white'
              } hover:bg-[#06b0cf] hover:text-white transition font-medium`}
            >
              <Link href="/for-business">List your business</Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size={'lg'}
              className={cn(
                'flex items-center space-x-2 px-2 lg:px-3 py-2 rounded-lg transition w-full',
                buttonHover,
                textColor
              )}
            >
              <Link href="/help">
                <span>Help Center</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size={'lg'}
              className={cn(
                'flex items-center space-x-2 px-2 lg:px-3 py-2 rounded-lg transition w-full',
                buttonHover,
                textColor
              )}
            >
              <Link href="/login">
                <span>Go to Dashboard</span>
              </Link>
            </Button>
          </div>
        )}
      </nav>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </header>
  );
};

export default Header;
