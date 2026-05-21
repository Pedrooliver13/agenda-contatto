import { useToast } from '../use-toast';

// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Services
import { deletePriceById } from '@/services/timelines/delete-timelines-by-id';

export const useDeleteTimelineById = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deletePriceById(id),

    onSuccess: () => {
      toast({
        title: 'Agenda deletado com sucesso!',
      });

      queryClient.invalidateQueries({ queryKey: ['timelines'] });
    },

    onError: () => {
      toast({
        title: 'Não foi possível deletar a agenda. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    },
  });

  return mutation;
};
