"use client";

import { signOut } from '@/lib/auth-client';
import { Building2, User, UserCog, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const DemoAccounts = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
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

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();

      toast.success("Logged out successfully");
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Demo Access</h2>
        
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
            <div className="font-semibold text-gray-900">Customer Account</div>
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
            <div className="font-semibold text-gray-900">Provider Account</div>
            <div className="text-xs text-gray-600">Manage your business</div>
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
            <div className="font-semibold text-gray-900">Staff Account</div>
            <div className="text-xs text-gray-600">Handle customer support</div>
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
            <div className="font-semibold text-gray-900">Moderator Account</div>
            <div className="text-xs text-gray-600">Super admin access</div>
          </div>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full bg-[#07c6e8] text-white py-3.5 rounded-lg font-semibold hover:bg-[#06b0cf] transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </div>
  );
};

export default DemoAccounts;