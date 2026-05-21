// Packages
import { ReactElement, ReactNode } from 'react';

// Components
import { Box } from '@/components/core/box';

interface StatusCardProps {
  icon: ReactNode;
  content: ReactNode;
  loading?: boolean;
  subtitle?: string;
}

export const StatusCard = ({
  icon,
  subtitle,
  content,
  loading = false,
}: StatusCardProps): ReactElement => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-border/60 bg-primary/5 p-5 shadow-lg md:w-[300px]">
      <div id="card-header" className="flex items-center justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          {icon}
        </div>

        <Box loading={loading} className="flex-1 text-lg font-bold">
          {content}
        </Box>

        {subtitle && (
          <span className="text-xs font-medium text-muted-foreground">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
