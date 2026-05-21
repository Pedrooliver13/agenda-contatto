// Packages
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  CalendarCheck as CalendarCheckIcon,
  AlarmClock as AlarmClockIcon,
  Trash2Icon,
} from 'lucide-react';

// Components
import { Box } from '@/components/core/box';
import { StatusCard } from '@/components/core/status-card';
import { CalendarEventList } from '@/components/core/calendar-event-list';

// Hooks
import { useGetAllTimelines } from '@/hooks/timelines/useGetAllTimelines';
import { useDeleteTimelineById } from '@/hooks/timelines/useDeleteTimelinesById';

export const Dashboard = (): ReactElement => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetAllTimelines();
  const { mutateAsync: deleteTimelineById } = useDeleteTimelineById();

  const handleClickDeleteTimeline = async (id: string) => {
    if (!id) {
      return;
    }

    await deleteTimelineById(id);
  };

  return (
    <>
      <Helmet title={'Dashboard'} />

      <div className="flex flex-col gap-6">
        <StatusCard
          loading={isLoading}
          icon={<CalendarCheckIcon size={24} />}
          subtitle={t('pages.dashboard.schedules')}
          content={data?.length ?? 0}
        />

        <section className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 flex-col gap-2 rounded-2xl border border-border/60 bg-primary/5 p-5 shadow-lg">
            <h1 className="flex items-center gap-2 text-xl font-bold">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <CalendarCheckIcon size={24} />
              </div>
              {t('pages.dashboard.schedule')}{' '}
            </h1>

            <Box
              as="div"
              className="flex min-h-[200px] flex-col"
              loading={isLoading}
            >
              <CalendarEventList events={data} />
            </Box>
          </div>

          <div className="flex h-fit w-full flex-col gap-2 rounded-2xl border border-border/60 bg-primary/5 p-5 shadow-lg md:max-w-[45%]">
            <h1 className="flex items-center gap-2 text-xl font-bold">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <AlarmClockIcon size={24} />
              </div>
              {t('pages.dashboard.schedules')}{' '}
            </h1>

            <Box loading={isLoading} as="div" className="flex flex-col gap-2">
              {data?.length ? (
                data
                  ?.sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime(),
                  )
                  .map((timelineItem) => (
                    <div
                      key={timelineItem?.id}
                      className="relative rounded-md bg-muted p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full after:bg-primary/70"
                    >
                      <div className="flex justify-between">
                        <p className="font-medium">{timelineItem?.title}</p>

                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            handleClickDeleteTimeline(timelineItem?.id)
                          }
                        >
                          <Trash2Icon size={16} />
                        </div>
                      </div>

                      <div className="py-1 font-light">
                        {timelineItem?.description}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {timelineItem?.date} - {timelineItem?.time}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="p-2 font-medium">
                  Nenhuma agenda encontrada.
                </div>
              )}
            </Box>
          </div>
        </section>
      </div>
    </>
  );
};
