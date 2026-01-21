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
  Eye,
  EyeOff,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from '@/lib/auth-client';
import Loader from '@/components/shared/Loader';

const formSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormSchemaType = z.infer<typeof formSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {isPending} = useSession()

  const form = useForm<FormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

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
            form.reset();
            router.push('/dashboard/demos');
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
    {/* Heading */}
          <h1 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">
            Login
          </h1>

      {/* Login Form */}
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
    </>
  );
};

export default LoginForm;
