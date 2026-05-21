// Packages
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useToast } from '@/hooks/use-toast';

// Services
import { singInWithEmailAndPassword } from '@/services/auth-services';

export const useSignIn = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      singInWithEmailAndPassword(data?.email, data?.password),

    onSuccess: () => {
      toast({
        title: t('pages.signIn.signInSuccess'),
        duration: 3000,
      });

      navigate('/');
    },

    onError: () => {
      toast({
        title: t('pages.signIn.error.credentialsError'),
        variant: 'destructive',
        duration: 3000,
      });
    },
  });

  return mutation;
};
