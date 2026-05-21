// Packages
import { Route, Routes } from 'react-router-dom';
import { ReactElement } from 'react';

// Pages
import { SignIn } from '@/pages/sing-in/sign-in';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { Timelines } from '@/pages/timelines/timelines';

// Components
import { AuthLayout } from '@/components/layouts/auth-layout';
import { DefaultLayout } from '@/components/layouts/default-layout';

// Routes
import { AuthGuard } from '@/router/auth-guard';

export const Router = (): ReactElement => (
  <Routes>
    <Route
      element={
        <AuthGuard isPrivate>
          <DefaultLayout />
        </AuthGuard>
      }
    >
      <Route path="/" element={<Dashboard />} />
      <Route path="/agendas" element={<Timelines />} />
    </Route>

    <Route element={<AuthLayout />}>
      <Route path="/sign-in" element={<SignIn />} />
    </Route>
  </Routes>
);
