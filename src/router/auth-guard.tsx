// Packages
import { Navigate } from 'react-router-dom';

// Contexts
import { useGlobalContext } from '@/contexts/globalContext';

interface AuthGuardProps {
  isPrivate?: boolean;
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isUserLoggedIn } = useGlobalContext();

  if (!isUserLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
