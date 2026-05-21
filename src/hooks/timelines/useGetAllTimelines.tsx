// Packages
import { useQuery } from '@tanstack/react-query';

// Services
import { getAllTimelines } from '@/services/timelines/get-all-timelines';

// Models
import { GetAllTimelinesResponse } from '@/models/timelines.model';

export const useGetAllTimelines = () => {
  return useQuery<Array<GetAllTimelinesResponse>>({
    queryKey: ['timelines'],
    queryFn: async () =>
      (await getAllTimelines()) as unknown as Promise<
        Array<GetAllTimelinesResponse>
      >,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
  });
};
