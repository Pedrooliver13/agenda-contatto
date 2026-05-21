// Packages
import { ReactElement } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Heart as HeartIcon,
  LayoutDashboard as LayoutDashboardIcon,
  CalendarDays as CalendarDaysIcon,
} from 'lucide-react';

// Components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { AppSidebarNavUser } from '@/components/core/app-sidebar/app-sidebar-nav-user';

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>): ReactElement {
  const { t } = useTranslation();
  const location = useLocation();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link
            className="flex items-center gap-2"
            to={'/'}
            onClick={() => setOpenMobile(false)}
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <HeartIcon fill="currentColor" className="h-5 w-5" />
            </div>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Agenda</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {t('components.appSidebar.screens')}
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location?.pathname === '/'}
                tooltip={t('components.appSidebar.dashboard')}
              >
                <Link to={'/'} onClick={() => setOpenMobile(false)}>
                  <LayoutDashboardIcon />
                  <span>{t('components.appSidebar.dashboard')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location?.pathname === '/agendas'}
                tooltip={t('components.appSidebar.timelines')}
              >
                <NavLink to={'/agendas'} onClick={() => setOpenMobile(false)}>
                  <CalendarDaysIcon />
                  <span>{t('components.appSidebar.timelines')}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <AppSidebarNavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
