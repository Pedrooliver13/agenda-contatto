// Packages
import { BrowserRouter } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Components
import { Toaster } from '@/components/ui/toaster';

// Contexts
import { ThemeProvider } from '@/contexts/theme-provider';
import { LanguageProvider } from '@/contexts/language-context';
import { GlobalProvider } from './contexts/globalContext';

// Routes
import { Router } from '@/router/routes';

// Libs
import { queryClient } from '@/libs/react-query';

// Styles
import './global.css';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <ThemeProvider defaultTheme="light" storageKey="agenda-contatto:theme">
        <HelmetProvider>
          <LanguageProvider>
            <Helmet titleTemplate="%s | Agenda-Contatto-Hub.app" />

            <BrowserRouter>
              <GlobalProvider>
                <Router />
              </GlobalProvider>
            </BrowserRouter>

            <Toaster />
          </LanguageProvider>
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
