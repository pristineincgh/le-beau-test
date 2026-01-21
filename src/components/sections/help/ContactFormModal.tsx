'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

const ContactFormModal = ({
  showContactForm,
  setShowContactForm,
}: {
  showContactForm: boolean;
  setShowContactForm: (show: boolean) => void;
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Contact Support</DialogTitle>
          <DialogDescription>Tell us how we can help</DialogDescription>
        </DialogHeader>

        <div>
          {!formSubmitted ? (
            <>
              <div className="w-16 h-16 bg-[#07c6e8]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-[#07c6e8]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Contact Support
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Tell us how we can help
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </Label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#07c6e8] transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </Label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#07c6e8] transition"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full px-4 py-3 data-[size=default]:h-13 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#07c6e8] transition">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="booking">Booking Issue</SelectItem>
                      <SelectItem value="payment">Payment Question</SelectItem>
                      <SelectItem value="account">Account Help</SelectItem>
                      <SelectItem value="business">Business Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </Label>
                  <Textarea
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#07c6e8] transition resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-[#07c6e8] text-white rounded-xl font-semibold hover:bg-[#06b0cf] transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-600">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
