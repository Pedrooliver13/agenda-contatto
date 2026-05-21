// Packages
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Models
import { PostTimeline } from '@/models/timelines.model';

// Hooks
import { useToast } from '@/hooks/use-toast';

// Services
import { postTimeline } from '@/services/timelines/postTimelines';

export const usePostTimeline = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PostTimeline) => postTimeline(data),

    onSuccess: () => {
      toast({
        title: 'Sucesso ao cadastrar uma agenda!',
        duration: 3000,
      });

      queryClient.invalidateQueries({ queryKey: ['timelines'] });
    },

    onError: () => {
      toast({
        title: 'Erro ao cadastrar uma agenda!',
        variant: 'destructive',
        duration: 3000,
      });
    },
  });

  return mutation;
};
