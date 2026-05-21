import { useToast } from '../use-toast';

// Packages
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Services
import { singOut } from '@/services/auth-services';

export const useSignOut = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => singOut(),

    onSuccess: () => {
      toast({
        title: 'Sessão encerrada com sucesso!',
      });

      navigate('/sign-in');
    },

    onError: () => {
      toast({
        title: 'Erro ao tentar encerrar a sessão!',
        variant: 'destructive',
      });
    },
  });

  return mutation;
};
