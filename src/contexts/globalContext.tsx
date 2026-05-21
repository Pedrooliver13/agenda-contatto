import { onAuthStateChanged } from 'firebase/auth';

// Packages
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

// Configs
import { auth } from '@/config/firebase';

interface GlobalProviderProps {
  children: React.ReactNode;
}

type currentUser = {
  email: string;
  uid: string;
};

interface GlobalContextProps {
  currentUser: currentUser | null;

  isUserLoggedIn: boolean;
  isLoading: boolean;
}

const GlobalContext = createContext({
  currentUser: null,
  isUserLoggedIn: false,
  isLoading: true,
} as GlobalContextProps);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<currentUser | null>(null);

  const initializeUser = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (userParam: any) => {
      if (userParam) {
        setCurrentUser(userParam);
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }

      setIsLoading(false);
    },
    [],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, [initializeUser]);

  return (
    <GlobalContext.Provider
      value={{
        currentUser,

        isUserLoggedIn,
        isLoading,
      }}
    >
      {!isLoading && children}
    </GlobalContext.Provider>
  );
};
