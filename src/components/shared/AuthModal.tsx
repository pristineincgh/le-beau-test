'use client';

import { ArrowLeft, CheckCircle, Eye, EyeOff, X } from 'lucide-react';
import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
  initialAccountType?: 'consumer' | 'provider';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialView = 'login',
  initialAccountType = 'consumer',
}) => {
  const [view, setView] = useState<
    'initial' | 'quicksignup' | 'signup' | 'waitlist'
  >('quicksignup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+33');
  const [accountType, setAccountType] = useState<'consumer' | 'provider'>(
    initialAccountType
  );
  const [loading, setLoading] = useState(false);

  // // Safe navigation - only use if router context is available
  // let navigate: ReturnType<typeof useNavigate> | null = null;
  // try {
  //   navigate = useNavigate();
  // } catch (e) {
  //   // Router context not available, navigation will be disabled
  // }

  if (!isOpen) return null;

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinueWithEmail = () => {
    // In a real app, this would check if the email exists and route to login or signup
    console.log('Continue with email:', email);
  };

  const handleQuickSignup = async () => {
    setLoading(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setView('waitlist');
  };

  const handleSignup = async () => {
    setLoading(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setView('waitlist');
  };

  const handleSocialLogin = (provider: string) => {
    console.log('Login with:', provider);
    // In a real app, this would initiate OAuth flow
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setFullName('');
    setPhoneNumber('');
    setShowPassword(false);
    setView('quicksignup');
  };

  const handleBack = () => {
    setView('quicksignup');
    resetForm();
  };

  const handleCloseAndReset = () => {
    resetForm();
    onClose();
    // if (navigate) navigate('/');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Back Button (for signup view only) */}
        {view === 'signup' && (
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition z-10"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {view === 'waitlist' ? (
          // Waitlist Success View - Simple & Classic Design
          <div className="p-6 sm:p-12">
            {/* Close Button for waitlist view */}
            <button
              onClick={handleCloseAndReset}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#07c6e8]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-[#07c6e8]" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl text-center text-gray-900 mb-3">
              You&apos;re All Set
            </h2>

            {/* Message */}
            <p className="text-center text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              You&apos;ve been added to our waitlist. We&apos;ve sent a
              confirmation email with next steps. You&apos;ll receive access
              soon.
            </p>

            {/* Email Display */}
            {email && (
              <div className="bg-gray-50 rounded-lg p-4 mb-8 text-center">
                <p className="text-sm text-gray-500 mb-1">
                  Confirmation sent to
                </p>
                <p className="text-gray-900 font-medium">{email}</p>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Social Media Section */}
            <div className="mb-8">
              <p className="text-center text-gray-700 mb-4">
                Stay connected with Le Beau
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://instagram.com/lebeau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#07c6e8] hover:bg-[#07c6e8]/5 transition-all"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="https://facebook.com/lebeau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#07c6e8] hover:bg-[#07c6e8]/5 transition-all"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="https://twitter.com/lebeau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#07c6e8] hover:bg-[#07c6e8]/5 transition-all"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <a
                  href="https://tiktok.com/@lebeau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#07c6e8] hover:bg-[#07c6e8]/5 transition-all"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCloseAndReset}
                className="w-full px-6 py-3 bg-[#07c6e8] text-white rounded-lg font-medium hover:bg-[#06b0cf] transition-colors"
              >
                Continue to Site
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-center text-sm text-gray-500 mt-8">
              Need help? Email support@lebeau.com
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-10 pt-12 sm:pt-14">
            {view === 'quicksignup' ? (
              <>
                {/* Quick Signup View - Just First Name, Last Name, Email */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Get started
                  </h2>
                  <p className="text-gray-600">
                    Create your free account in seconds
                  </p>
                </div>

                <div className="space-y-4">
                  {/* First Name Input */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent"
                    />
                  </div>

                  {/* Last Name Input */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent"
                      />
                      {email && (
                        <button
                          onClick={() => setEmail('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleQuickSignup}
                    disabled={
                      loading ||
                      !firstName ||
                      !lastName ||
                      !email ||
                      !isValidEmail(email)
                    }
                    className={`w-full bg-[#07c6e8] text-white py-3 rounded-lg font-semibold hover:bg-[#06b0cf] transition mt-6 ${
                      loading ||
                      !firstName ||
                      !lastName ||
                      !email ||
                      !isValidEmail(email)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {loading ? 'Processing...' : 'Continue'}
                  </button>

                  {/* Terms note */}
                  <p className="text-xs text-center text-gray-500 mt-4">
                    By continuing, you agree to Le Beau&apos;s Terms of Service
                    and Privacy Policy
                  </p>
                </div>
              </>
            ) : view === 'initial' ? (
              <>
                {/* Initial Login/Signup View */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Get started
                  </h2>
                  <p className="text-gray-600">
                    Create an account or log in to book and manage your
                    appointments.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="calebeghanproject@gmail.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent"
                      />
                      {email && (
                        <button
                          onClick={() => setEmail('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent pr-10"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <button className="text-sm text-[#07c6e8] hover:text-[#06b0cf] font-medium">
                      Forgot password?
                    </button>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleContinueWithEmail}
                    className="w-full bg-[#07c6e8] text-white py-3 rounded-lg font-semibold hover:bg-[#06b0cf] transition"
                  >
                    Continue
                  </button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">OR</span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleSocialLogin('facebook')}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="#1877F2"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Continue with Facebook
                    </button>

                    <button
                      onClick={() => handleSocialLogin('apple')}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="#000000"
                      >
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                      Continue with Apple
                    </button>

                    <button
                      onClick={() => handleSocialLogin('google')}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Don&apos;t have an account?{' '}
                      <button
                        onClick={() => setView('signup')}
                        className="text-[#07c6e8] hover:text-[#06b0cf] font-semibold"
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Signup View */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Create an account
                  </h2>
                  <p className="text-gray-600">
                    Fill in your details to get started with Le Beau
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Account Type Selection */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-3">
                      Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAccountType('consumer')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          accountType === 'consumer'
                            ? 'border-[#07c6e8] bg-[#07c6e8]/5'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              accountType === 'consumer'
                                ? 'bg-[#07c6e8]/10'
                                : 'bg-gray-100'
                            }`}
                          >
                            <svg
                              className={`w-6 h-6 ${accountType === 'consumer' ? 'text-[#07c6e8]' : 'text-gray-600'}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <div className="text-center">
                            <div
                              className={`font-semibold ${accountType === 'consumer' ? 'text-[#07c6e8]' : 'text-gray-900'}`}
                            >
                              I&apos;m a Customer
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Book appointments
                            </div>
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAccountType('provider')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          accountType === 'provider'
                            ? 'border-[#07c6e8] bg-[#07c6e8]/5'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              accountType === 'provider'
                                ? 'bg-[#07c6e8]/10'
                                : 'bg-gray-100'
                            }`}
                          >
                            <svg
                              className={`w-6 h-6 ${accountType === 'provider' ? 'text-[#07c6e8]' : 'text-gray-600'}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                          </div>
                          <div className="text-center">
                            <div
                              className={`font-semibold ${accountType === 'provider' ? 'text-[#07c6e8]' : 'text-gray-900'}`}
                            >
                              I&apos;m a Provider
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Manage my business
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="calebeghanproject@gmail.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent"
                      />
                      {email && (
                        <button
                          onClick={() => setEmail('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Full Name Input */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      First and Last Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="First and Last Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent"
                    />
                  </div>

                  {/* Phone Number Input */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div className="relative">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="px-3 py-3 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent bg-white appearance-none cursor-pointer"
                          style={{ minWidth: '110px' }}
                        >
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+234">🇳🇬 +234</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      We will send a confirmation code to your phone number.
                    </p>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Set Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Set Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent pr-10"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters long and must
                      contain at least one number and one letter.
                    </p>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleSignup}
                    disabled={loading}
                    className={`w-full bg-[#07c6e8] text-white py-3 rounded-lg font-semibold hover:bg-[#06b0cf] transition mt-6 ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Processing...' : 'Continue'}
                  </button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">OR</span>
                    </div>
                  </div>

                  {/* Social Signup Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleSocialLogin('facebook')}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="#1877F2"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Sign up with Facebook
                    </button>

                    <button
                      onClick={() => handleSocialLogin('apple')}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="#000000"
                      >
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                      Sign up with Apple
                    </button>

                    <button
                      onClick={() => handleSocialLogin('google')}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Sign up with Google
                    </button>
                  </div>

                  {/* Login Link */}
                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <button
                        onClick={() => setView('initial')}
                        className="text-[#07c6e8] hover:text-[#06b0cf] font-semibold"
                      >
                        Log in
                      </button>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
