// Packages
import { useMemo, useState } from 'react';

// Components
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface CalendarEventListProps {
  events?: Array<{
    title: string;
    description?: string;
    time?: string;
    date: string;
  }>;
}

export const CalendarEventList = (props: CalendarEventListProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const eventsForSelectedDate = useMemo(() => {
    return props.events?.filter((event) => {
      const ptBRFormatterDate = new Intl.DateTimeFormat('pt-BR');
      const selectedDate = date || new Date();

      const eventDate = event?.date;
      const selectedDateFormatted = ptBRFormatterDate.format(selectedDate);

      return eventDate === selectedDateFormatted;
    });
  }, [date, props?.events]);

  return (
    <Card className="w-2xs flex flex-col py-4 md:flex-row">
      <CardHeader className="flex flex-1 flex-col items-start gap-3 p-2 px-4">
        <div className="flex w-full items-center justify-between px-1">
          <div className="text-sm font-medium">
            {date?.toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          {Array.isArray(eventsForSelectedDate) &&
          eventsForSelectedDate?.length > 0 ? (
            eventsForSelectedDate.map((event) => (
              <div
                key={event?.title}
                className="relative rounded-md bg-muted p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full after:bg-primary/70"
              >
                <div className="font-medium">{event?.title}</div>

                {event?.description && (
                  <div className="py-1 font-light">{event?.description}</div>
                )}

                <div className="text-xs text-muted-foreground">
                  {event?.date} - {event?.time}
                </div>
              </div>
            ))
          ) : (
            <div className="text-md text-muted-foreground">
              Nenhum evento neste dia.
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full bg-transparent p-0"
          events={props?.events}
          required
        />
      </CardContent>
    </Card>
  );
};
