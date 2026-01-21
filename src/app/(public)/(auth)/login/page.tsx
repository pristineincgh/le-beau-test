import LoginForm from '@/components/sections/auth/login/LoginForm';
import LoginHero from '@/components/sections/auth/login/LoginHero';

const LoginPage = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left Column - Login Form */}
      <div className="max-w-md mx-auto lg:mx-0 w-full">
        <LoginForm />
      </div>

      {/* Right Column - Hero Text */}
      <div className="hidden lg:block">
        <div className="max-w-xl">
          <h2 className="text-6xl font-bold text-white leading-tight">
            Changing the way{' '}
            <span className="relative inline-block">
              <span className="relative z-10">the beauty world</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-linear-to-r from-pink-400 to-orange-400 opacity-50 -rotate-1"></span>
            </span>{' '}
            <span className="relative inline-block">
              <span className="relative z-10">books</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-linear-to-r from-pink-400 to-orange-400 opacity-50 rotate-1"></span>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
