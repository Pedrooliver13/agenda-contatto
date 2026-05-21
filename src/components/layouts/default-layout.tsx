// Packages
import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import { Header } from '@/components/core/header';
import { AppSidebar } from '@/components/core/app-sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const DefaultLayout = (): ReactElement => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-inherit">
        <Header />

        <div className="max-w-full px-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
