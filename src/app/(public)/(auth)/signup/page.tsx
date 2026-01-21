import SignUpForm from '@/components/sections/auth/signup/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mt-20 sm:mt-0">
      {/* Left Column - Sign Up Form */}
      <div className="max-w-xl mx-auto lg:mx-0 w-full">
        <SignUpForm />
      </div>

      {/* Right Column - Hero Text */}
      <div className="hidden lg:block">
        <div className="max-w-xl">
          <h2 className="text-6xl font-bold text-white leading-tight">
            Start{' '}
            <span className="relative inline-block">
              <span className="relative z-10">booking</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-linear-to-r from-pink-400 to-orange-400 opacity-50 -rotate-1"></span>
            </span>{' '}
            <span className="relative inline-block">
              <span className="relative z-10">beauty</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-linear-to-r from-pink-400 to-orange-400 opacity-50 rotate-1"></span>
            </span>{' '}
            services
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
