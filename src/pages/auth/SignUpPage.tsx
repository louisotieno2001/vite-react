import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { apiClient } from '@/services/api';
import { useState } from 'react';
import { Eye, EyeOff, Star } from 'lucide-react';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    first_name: z.string().min(2, { message: 'First name must be at least 2 characters long.' }),
    last_name: z.string().min(2, { message: 'Last name must be at least 2 characters long.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ['password2'],
  });

type FormData = z.infer<typeof formSchema>;

const SignUpPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      password2: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await apiClient.post('/auth/register/', {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        password2: data.password2,
      });
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error: any) {
      console.error('Registration failed:', error);
      const errorMessage =
        error.response?.data?.email?.[0] ||
        error.response?.data?.password?.[0] ||
        'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left section: Phone preview */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-white relative">
        <div className="relative w-[500px] h-[450px] flex items-end justify-center">
          {/* Purple semi-circle background */}
          <div className="absolute bottom-0 w-[600px] h-[300px] bg-purple-700 rounded-t-full"></div>

          {/* Center phone */}
          <div className="relative z-10 w-48 h-96 bg-gradient-to-br from-blue-200 to-blue-400 rounded-3xl border-4 border-black flex flex-col items-center justify-center text-white font-bold text-2xl shadow-xl">
            {/* Camera notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-lg"></div>

            <Star className="w-16 h-16 text-purple-700 mb-2" strokeWidth={3} />
            <div className="text-white">Is</div>
          </div>

          {/* Left phone */}
          <div className="absolute left-6 bottom-0 z-20 w-40 h-80 bg-gradient-to-br from-blue-200 to-blue-400 rounded-2xl border-4 border-black flex flex-col items-center justify-center text-purple-700 font-bold text-xl shadow-lg">
            {/* Camera notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-b-lg"></div>

            <div className="text-center leading-tight">The<br />future</div>
          </div>

          {/* Right phone */}
          <div className="absolute right-6 bottom-0 w-32 h-72 bg-gradient-to-br from-blue-200 to-blue-400 rounded-2xl border-4 border-black flex flex-col items-center justify-center text-pink-500 font-bold text-xl shadow-lg">
            {/* Camera notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-b-lg"></div>

            <div>Here</div>
          </div>
        </div>
      </div>

      {/* Right section: Signup form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <h2 className="text-3xl font-bold text-center text-purple-700">Create an Account</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="First name"
                        {...field}
                        className="w-full rounded-full border border-purple-700 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Last name"
                        {...field}
                        className="w-full rounded-full border border-purple-700 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="email"
                        {...field}
                        className="w-full rounded-full border border-purple-700 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Password with toggler */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          {...field}
                          className="w-full rounded-full border border-purple-700 px-4 py-2 pr-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-purple-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              {/* Confirm password with toggler */}
              <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm password"
                          {...field}
                          className="w-full rounded-full border border-purple-700 px-4 py-2 pr-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-purple-700"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full rounded-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 transition"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;