import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { toast } from 'sonner';
import { useState } from 'react';
import { Eye, EyeOff, Star } from 'lucide-react'; // 👁️ + ⭐ icons

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

type FormData = z.infer<typeof formSchema>;

const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await apiClient.post('/auth/login/', data);
      await login(response.data.access, response.data.refresh);
      console.log('🔑 Auth Token for WebSocket testing:', response.data.access);
      console.log('🌐 WebSocket URL:', `ws://localhost:8000/ws/chat/room1/?token=${response.data.access}`);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
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

            {/* Content */}
            <Star className="w-16 h-16 text-purple-700 mb-2" strokeWidth={3} />
            <div className="text-white">Is</div>
          </div>

          {/* Left phone (slightly overlaying middle) */}
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

      {/* Right section: Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <h2 className="text-3xl font-bold text-center text-purple-700">Log In</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

              {/* Password with visibility toggle */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="password"
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

              <Button
                type="submit"
                className="w-full rounded-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 transition"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Logging in...' : 'Log In'}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;