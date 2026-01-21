'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import WaitListModal from './WaitListModal';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Invalid email address'),
  role: z.enum(['consumer', 'provider'], 'Role is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const form = useForm<FormSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: 'consumer',
      password: '',
      terms: false,
    },
  });

  const { watch } = form;
  const watchedValues = watch();

  const onSubmit = async (data: FormSchemaType) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Sign up successful!');
    // router.push('/login');
    setIsLoading(false);
    setShowWaitlistModal(true);
  };

  return (
    <>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">
        Create your account
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup className="gap-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="firstName" className="sr-only">
                    First Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="firstName"
                    aria-invalid={fieldState.invalid}
                    placeholder="First Name"
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
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="lastName" className="sr-only">
                    Last Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="lastName"
                    aria-invalid={fieldState.invalid}
                    placeholder="Last Name"
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
          </div>

          {/* Email Field */}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-3">
            {/* Password Field */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="lg:col-span-2"
                >
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

            {/* Role Field */}
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  // orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="lg:col-span-1"
                >
                  <FieldContent>
                    <FieldLabel htmlFor="role" className="sr-only">
                      Role
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        className="data-[size=default]:h-14 w-full bg-white px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-black text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07c6e8] focus-visible:border-transparent"
                      >
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consumer">Consumer</SelectItem>
                        <SelectItem value="provider">
                          Service Provider
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>
              )}
            />
          </div>

          {/* Terms and Conditions */}
          <Controller
            name="terms"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={(val) => field.onChange(!!val)}
                  />
                  <FieldLabel
                    htmlFor="terms"
                    className="text-white select-none flex flex-wrap sm:block"
                  >
                    I agree to the{' '}
                    <Link
                      href="#"
                      className="text-[#07c6e8] hover:text-[#06b0cf] underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Service
                    </Link>
                    {' and '}
                    <Link
                      href="#"
                      className="text-[#07c6e8] hover:text-[#06b0cf] underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </Link>
                  </FieldLabel>
                </Field>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-14 mt-2 bg-[#07c6e8] hover:bg-[#06b0cf] text-lg font-medium"
            disabled={isLoading || form.formState.isSubmitting}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </FieldGroup>
      </form>
      <p className="mt-8 text-center text-sm text-white">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-[#07c6e8] hover:text-[#06b0cf] hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <WaitListModal
          open={showWaitlistModal}
          onOpenChange={setShowWaitlistModal}
          role={watchedValues.role}
          email={watchedValues.email}
        />
      )}
    </>
  );
};
export default SignUpForm;
