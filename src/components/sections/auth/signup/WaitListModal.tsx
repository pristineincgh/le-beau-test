'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebook, FaTiktok, FaXTwitter } from 'react-icons/fa6';

interface WaitListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: 'consumer' | 'provider';
  email: string;
}

const WaitListModal = ({
  open,
  onOpenChange,
  role,
  email,
}: WaitListModalProps) => {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#07c6e8]/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-[#07c6e8]" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl text-center text-gray-900 mb-3">
          {role === 'provider' ? 'Welcome to Le Beau' : "You're All Set"}
        </h2>

        {/* Message */}
        <p className="text-center text-gray-600 max-w-md mx-auto leading-relaxed">
          {role === 'provider'
            ? "You've been added to our business waitlist. We're reviewing your application and will send you a confirmation email."
            : "You've been added to our waitlist. We've sent a confirmation email with next steps. You'll receive access soon."}
        </p>

        {/* Email Display */}
        {email && (
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Confirmation sent to</p>
            <p className="text-gray-900 font-medium">{email}</p>
          </div>
        )}

        <Separator />

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
              <BsInstagram className="size-5 fill-gray-700" />
            </a>

            <a
              href="https://facebook.com/lebeau"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#07c6e8] hover:bg-[#07c6e8]/5 transition-all"
            >
              <FaFacebook className="size-5 text-gray-700" />
            </a>

            <a
              href="https://twitter.com/lebeau"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#07c6e8] hover:bg-[#07c6e8]/5 transition-all"
            >
              <FaXTwitter className="size-5 text-gray-700" />
            </a>

            <a
              href="https://tiktok.com/@lebeau"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#07c6e8] hover:bg-[#07c6e8]/5 transition-all"
            >
              <FaTiktok className="size-5 text-gray-700" />
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              onOpenChange(false);
              router.push('/');
            }}
            className="w-full px-6 py-3 bg-[#07c6e8] text-white rounded-lg font-medium hover:bg-[#06b0cf] transition-colors"
          >
            Continue
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500">
          {role === 'provider'
            ? 'Questions? Contact us at business@lebeau.com'
            : 'Need help? Email support@lebeau.com'}
        </p>
      </DialogContent>
    </Dialog>
  );
};
export default WaitListModal;
