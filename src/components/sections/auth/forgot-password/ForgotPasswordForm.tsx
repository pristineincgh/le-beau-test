'use client';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  email: z.email('Invalid email address'),
});

type FormSchemaType = z.infer<typeof formSchema>;

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {!isSubmitted ? (
        <>
          {/* Back Link */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-200 hover:text-gray-300 text-sm mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-white mb-3">
            Reset your password
          </h1>
          <p className="text-gray-300 text-sm mb-8">
            Enter your email address and we will send you a link to reset your
            password.
          </p>

          {/* Reset Password Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            </FieldGroup>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#07c6e8] text-white py-3.5 rounded-lg font-semibold hover:bg-[#06b0cf] transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        </>
      ) : (
        <>
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-white mb-3">
            Check your email
          </h2>
          <p className="text-gray-300 text-sm mb-6">
            We sent a password reset link to{' '}
            <strong>{form.getValues('email')}</strong>
          </p>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-primary mb-2">
              Didn&apos;t receive the email?
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Check your spam folder</li>
              <li>Make sure you entered the correct email</li>
              <li>The link expires in 24 hours</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full px-4 py-3.5 bg-[#07c6e8] text-white rounded-lg font-semibold hover:bg-[#06b0cf] transition text-center"
            >
              Back to Login
            </Link>

            <button
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
              className="block w-full px-4 py-3.5 text-gray-200 hover:text-gray-400 text-sm transition text-center font-medium"
            >
              Try a different email
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default ForgotPasswordForm;
