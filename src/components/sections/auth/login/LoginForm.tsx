'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Eye,
  EyeOff,
  Shield,
  User,
  UserCog,
  Users,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession, signOut } from '@/lib/auth-client';
import Loader from '@/components/shared/Loader';

const formSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormSchemaType = z.infer<typeof formSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [errors, setErrors] = useState({ mfa: '' });
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {data, isPending} = useSession()

  const form = useForm<FormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleMFAVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ mfa: '' });

    if (!mfaCode) {
      setErrors((prev) => ({ ...prev, mfa: 'Verification code is required' }));
      return;
    }
    if (mfaCode.length !== 6) {
      setErrors((prev) => ({ ...prev, mfa: 'Code must be 6 digits' }));
      return;
    }

    await signIn.email({
      email: form.getValues('email'), password: form.getValues('password')
    })

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success('Login successful!');

    // For demo, navigate based on demo button click
    // In real app, this would be determined by API response
  };

  const handleDemoLogin = (
    accountType: 'customer' | 'provider' | 'admin' | 'staff'
  ) => {
    const routes = {
      customer: '/dashboard/customer',
      provider: '/dashboard/provider',
      admin: '/dashboard/admin',
      staff: '/dashboard/staff',
    };
    router.push(routes[accountType]);
  };

  const onSubmit = async (data: FormSchemaType) => {
    setIsLoading(true);

    try {
      await signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            toast.success('Login successful!');
            setIsLoading(false);
            setShowDemo(true);
            form.reset();
          },
          onError: (ctx) => {
            toast.error('Login failed', {
              description: ctx.error.message,
            });
            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      throw new Error("Something went wrong during sign-in");
    }

    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    if (keepLoggedIn) {
      // Simulate setting a persistent session
      toast.success(`Setting persistent session for user: ${data.email}`);
    }

    // Show MFA screen
    // setShowMFA(true);
    // setIsLoading(false);
  };

  const handleLogout = async () => {
    toast.loading('Logging out...');

    await signOut();

    toast.dismiss();
    toast.success('Logged out successfully');
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {!showMFA ? (
        <>
          {/* Heading */}
          <h1 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">
            Login
          </h1>

          {/* Demo Access Toggle */}
          {!data?.session ? (
            <>
              {/* Login Form */}
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FieldGroup>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email" className="sr-only">
                          Email
                        </FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="Email"
                          className={cn(
                            'w-full h-14 px-4 py-3.5 bg-gray-50 border-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07c6e8] placeholder:text-gray-400 text-lg! placeholder:text-lg',
                            fieldState.invalid &&
                              'ring-2 ring-destructive/50 focus-visible:ring-destructive/70'
                          )}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Password Field */}
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password" className="sr-only">
                          Password
                        </FieldLabel>
                        <div className="relative group">
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            aria-invalid={fieldState.invalid}
                            placeholder="••••••••"
                            autoComplete="off"
                            className={cn(
                              'w-full h-14 px-4 py-3.5 bg-gray-50 border-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07c6e8] placeholder:text-gray-400 text-lg! placeholder:text-lg',
                              fieldState.invalid &&
                                'ring-2 ring-destructive/50 focus-visible:ring-destructive/70'
                            )}
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="hover:bg-transparent text-muted-foreground absolute right-5 top-1/2 -translate-y-1/2 group-hover:text-muted-foreground group-focus-within:text-muted-foreground transition-all duration-300 ease-in-out [&_svg:not([class*='size-'])]:size-5"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff /> : <Eye />}
                          </Button>
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Keep Logged In & Forgot Password */}
                  <div className="flex items-center justify-between pt-1">
                    <FieldGroup data-slot="checkbox-group">
                      <Field orientation="horizontal" className="group">
                        <Checkbox
                          id="remember-me"
                          name="remember-me"
                          checked={keepLoggedIn}
                          onCheckedChange={(val) => setKeepLoggedIn(!!val)}
                        />
                        <FieldLabel
                          htmlFor="remember-me"
                          className="font-normal text-white group-hover:text-gray-200 cursor-pointer"
                        >
                          Keep me logged in
                        </FieldLabel>
                      </Field>
                    </FieldGroup>

                    <Link
                      href="/forgot-password"
                      className="w-full text-end text-sm text-[#07c6e8] hover:text-[#06b0cf] font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </FieldGroup>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#07c6e8] text-white py-3.5 rounded-lg font-semibold hover:bg-[#06b0cf] transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Login'}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-white">
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => router.push('/signup')}
                    className="text-[#07c6e8] hover:text-[#06b0cf] font-semibold"
                  >
                    Sign up
                  </button>
                </p>
              </div>

              {/* Demo Access Link */}
              <div className="text-center mt-6 pt-6 border-t border-gray-500">
                <button
                  onClick={() => setShowDemo(true)}
                  className="text-sm text-white hover:text-gray-200 font-medium transition"
                >
                  Access demo accounts →
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Demo Accounts Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Demo Access</h2>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-white hover:text-gray-200"
                  >
                    ← Back to login
                  </button>
                </div>

                <p className="text-sm text-white mb-6 text-center lg:text-left">
                  Select an account type to explore the platform
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => handleDemoLogin('customer')}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg hover:shadow-md transition-all group"
                  >
                    <div className="shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-gray-900">
                        Customer Account
                      </div>
                      <div className="text-xs text-gray-600">
                        Browse and book services
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDemoLogin('provider')}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-lg hover:shadow-md transition-all group"
                  >
                    <div className="shrink-0 w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-gray-900">
                        Provider Account
                      </div>
                      <div className="text-xs text-gray-600">
                        Manage your business
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDemoLogin('staff')}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg hover:shadow-md transition-all group"
                  >
                    <div className="shrink-0 w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                      <UserCog className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-gray-900">
                        Staff Account
                      </div>
                      <div className="text-xs text-gray-600">
                        Handle customer support
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDemoLogin('admin')}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-lg hover:shadow-md transition-all group"
                  >
                    <div className="shrink-0 w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-gray-900">
                        Moderator Account
                      </div>
                      <div className="text-xs text-gray-600">
                        Super admin access
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div>
            <h2 className="text-3xl font-bold text-white mb-3 text-center lg:text-left">
              Verify Your Identity
            </h2>
            <p className="text-white text-sm mb-8 text-center lg:text-left">
              Please enter the 6-digit verification code sent to your
              authentication app
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-[#07c6e8]/10 border border-[#07c6e8]/20 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 bg-[#07c6e8] rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-white">
                  Enter the 6-digit verification code from your authenticator
                  app
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleMFAVerify} className="space-y-6">
            {/* 6-Digit Code Input Boxes */}
            <div>
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    id={`mfa-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={mfaCode[index] || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value) {
                        const newCode = mfaCode.split('');
                        newCode[index] = value;
                        setMfaCode(newCode.join(''));

                        // Auto-focus next input
                        if (index < 5) {
                          document.getElementById(`mfa-${index + 1}`)?.focus();
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Backspace' &&
                        !mfaCode[index] &&
                        index > 0
                      ) {
                        document.getElementById(`mfa-${index - 1}`)?.focus();
                      }
                    }}
                    className={`w-12 h-14 text-center text-xl font-semibold bg-white/10 text-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent transition placeholder:text-white/50 ${
                      errors.mfa ? 'border-red-300' : 'border-white/20'
                    }`}
                  />
                ))}
              </div>
              {errors.mfa && (
                <p className="mt-3 text-sm text-red-600 text-center">
                  {errors.mfa}
                </p>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#07c6e8] text-white py-3.5 rounded-lg font-semibold hover:bg-[#06b0cf] transition ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>

            {/* Back to Login Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowMFA(false);
                  setMfaCode('');
                  setErrors({ mfa: '' });
                }}
                className="text-white hover:text-gray-200 text-sm font-medium transition"
              >
                ← Back to Login
              </button>
            </div>

            {/* Resend Code Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  toast.success('Verification code sent!', {
                    description:
                      'A new code has been sent to your authenticator app',
                  });
                }}
                className="text-[#07c6e8] hover:text-[#06b0cf] text-sm font-medium transition"
              >
                Didn&apos;t receive a code? Resend
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default LoginForm;
