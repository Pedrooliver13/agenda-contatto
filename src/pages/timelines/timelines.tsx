// Packages
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parseISO } from 'date-fns';
import { z } from 'zod';

// Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/core/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Hooks
import { usePostTimeline } from '@/hooks/timelines/usePostTimelines';

// Libs
import { cn } from '@/libs/utils';

// Utils
import { getHoursOptions } from '@/utils/common';

const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Informe o título do evento' })
    .max(120, { message: 'Máximo de 120 caracteres' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Informe a descrição' })
    .max(1000, { message: 'Máximo de 1000 caracteres' }),
  date: z.date({ required_error: 'Selecione a data' }),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'Hora inválida (HH:MM)' }),
});

type EventFormValues = z.infer<typeof eventSchema>;

export const Timelines = (): ReactElement => {
  const { t } = useTranslation();
  const { mutateAsync: postTimeline, isPending: isPendingPostTimeline } =
    usePostTimeline();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: { title: '', description: '', time: '08:00' },
  });

  async function onSubmit(values: EventFormValues) {
    const datetime = format(parseISO(values.date.toISOString()), 'dd/MM/yyyy');

    await postTimeline({
      title: values.title,
      description: values.description,
      time: values.time,
      date: datetime,
    });

    form.reset();
    form.setFocus('title');
  }

  return (
    <>
      <Helmet title={t('components.appSidebar.user')} />

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-lg rounded-lg border p-6 shadow-lg">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              Nova Agenda
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha os campos abaixo para criar uma agenda.
            </p>
          </header>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Título do evento"
                placeholder="Ex: Reunião de equipe"
                error={form?.formState?.errors?.title?.message}
                autoFocus
                removeHeight
                {...form.register('title')}
              />
              <Input
                label="Descrição do evento"
                placeholder="Descreva o evento..."
                error={form?.formState?.errors?.description?.message}
                removeHeight
                {...form.register('description')}
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value
                                ? format(field.value, 'dd/MM/yyyy')
                                : 'Escolha a data'}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            className={cn('pointer-events-auto p-3')}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Select
                  name="time"
                  label="Hora"
                  className="w-full"
                  control={form.control}
                  options={getHoursOptions()}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                isLoading={isPendingPostTimeline}
              >
                Criar evento
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
