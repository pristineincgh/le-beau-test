import darkLogo from '@/assets/logo/dark-logo.svg';
import lightLogo from '@/assets/logo/light-logo.svg';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width?: number;
  height?: number;
  responsiveSize?: string;
  clickable?: boolean;
  href?: string;
  isScrolled?: boolean;
}

const Logo = ({
  width = 200,
  height = 120,
  responsiveSize = '(max-width: 640px) 140px, 200px',
  clickable = true,
  href = '/',
  isScrolled = false,
}: LogoProps) => {
  const content = (
    <div
      className="relative transition-opacity duration-300"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src={lightLogo}
        alt="Le Beau"
        fill
        loading="eager"
        sizes={responsiveSize}
        className={`object-contain ${isScrolled ? 'hidden' : 'block dark:hidden'}`}
      />
      <Image
        src={darkLogo}
        alt="Le Beau"
        fill
        priority
        sizes={responsiveSize}
        className={`object-contain ${isScrolled ? 'block' : 'hidden dark:block'}`}
      />
    </div>
  );

  // ✅ If clickable, wrap in Link
  if (clickable) {
    return (
      <Link href={href} className="flex items-center space-x-2">
        {content}
      </Link>
    );
  }

  // ✅ Otherwise, return plain content
  return <div className="flex items-center space-x-2">{content}</div>;
};

export default Logo;
