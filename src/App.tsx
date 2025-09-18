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

// Render the app with proper root management
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

// Check if root already exists to prevent multiple root creation
let root = (container as any)._reactRootContainer;
if (!root) {
  root = ReactDOM.createRoot(container);
  (container as any)._reactRootContainer = root;
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);