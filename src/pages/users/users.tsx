// Packages
import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {
  ExternalLink as ExternalLinkIcon,
  Search as SearchIcon,
} from 'lucide-react';

// Components
import { DataTable } from '@/components/core/data-table/data-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/core/select';

// Hooks
// import { useGetAllUsers } from '../../hooks/users/use-get-all-users';

// Libs
import { cn } from '@/libs/utils';

const usersSearch = zod.object({
  search: zod.string(),
  affiliation: zod.string(),
});

export const Users = (): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    control,
    // watch,
    formState: { isSubmitting },
  } = useForm({
    values: {
      search: '',
      affiliation: 'all',
    },
    resolver: zodResolver(usersSearch),
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleViewUser = (id: string) => {
    if (!id) {
      return;
    }

    navigate(`/users/${id}`);
  };

  return (
    <>
      <Helmet title={t('components.appSidebar.user')} />

      <div className="flex flex-col gap-4">
        <header>
          <h1 className="text-lg">{t('pages.users.allUsers')}</h1>
        </header>

        <form className="flex items-center gap-2">
          <Select
            name="affiliation"
            control={control}
            options={[
              {
                label: t('pages.users.all'),
                value: 'all',
              },
              {
                label: t('pages.users.player'),
                value: 'player',
              },
              {
                label: t('pages.users.affiliate'),
                value: 'affiliate',
              },
              {
                label: t('pages.users.subAffiliate'),
                value: 'sub-affiliate',
              },
              {
                label: t('pages.users.demo'),
                value: 'demo',
              },
            ]}
          />
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <Input
                id="search"
                placeholder={t('pages.users.search')}
                removeHeight
                size={'sm'}
                autoFocus
                suffixItem={<SearchIcon size={14} />}
                {...field}
              />
            )}
          />
          <Button
            id="search-btn"
            type="submit"
            size={'sm'}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {t('pages.users.fetch')}
          </Button>
        </form>

        <DataTable
          id="data-table-users"
          data={[]}
          enableSortingRemoval
          // isLoading={isFetching}
          // pageCount={data?.data.totalPages || 0}
          pageCount={0}
          pagination={pagination}
          onPaginationChange={setPagination}
          columns={[
            {
              header: t('pages.users.userName'),
              accessorKey: 'username',
            },
            {
              header: t('pages.users.email'),
              accessorKey: 'email',
              size: 300,
            },
            {
              header: t('pages.users.document'),
              accessorKey: 'document',
            },
            {
              header: t('pages.users.account'),
              accessorKey: 'role',
            },
            {
              header: t('pages.users.status'),
              accessorKey: 'active',
              cell: (props) => {
                return (
                  <Badge
                    className={cn(
                      'flex w-[80px] gap-2 text-primary-foreground',
                    )}
                  >
                    <div
                      data-status={props.row.getValue('active')}
                      className="h-2 w-2 max-w-[10px] rounded-full data-[status=false]:bg-red-600 data-[status=true]:bg-green-400"
                    />
                    {props.row.getValue('active')
                      ? t('pages.users.active')
                      : t('pages.users.inactive')}
                  </Badge>
                );
              },
            },
            {
              header: t('pages.users.actions'),
              accessorKey: 'id',
              cell: (props) => {
                return (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewUser(props.getValue() as string)}
                  >
                    {t('pages.users.view')}
                    <ExternalLinkIcon />
                  </Button>
                );
              },
            },
          ]}
        />
      </div>
    </>
  );
};
