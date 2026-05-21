// Packages
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Hooks
import { useToast } from '@/hooks/use-toast';

// Services
import { passwordReset } from '@/services/auth-services';

interface PasswordResetProps {
  notNavigate?: boolean;
}

export const usePasswordReset = (props?: PasswordResetProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: { email: string }) => passwordReset(data?.email),

    onSuccess: () => {
      toast({
        title: t('pages.signIn.signInSuccess'),
        duration: 3000,
      });

      if (!props?.notNavigate) {
        navigate('/login');
      }
    },

    onError: () => {
      toast({
        title:
          'Não foi possível enviar o e-mail de recuperação. Tente novamente mais tarde.',
        variant: 'destructive',
        duration: 3000,
      });
    },
  });

  return mutation;
};
