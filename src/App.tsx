import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppRoutes } from '@/routes';
import { Toaster } from 'sonner';
import { useAuthStore } from './stores/useAuth';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/main.css';
import './i18n';

// Initialize auth state on application load
useAuthStore.getState().initializeAuth();

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>   {/* ✅ Wrap your routes in AuthProvider */}
        <AppRoutes />
        <Toaster richColors />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);