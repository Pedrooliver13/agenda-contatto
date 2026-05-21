// Packages
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// i18n
import { signInTranslates } from '@/i18n/pages-translates/sign-in.translates';
import { usersTranslates } from '@/i18n/pages-translates/users.translates';
import { dashboardTranslates } from '@/i18n/pages-translates/dashboard.translates';
import { appSidebarTranslates } from '@/i18n/components-translates/app-sidebar.translates';
import { dataTableTranslates } from '@/i18n/components-translates/data-table.translates';
import { themeToggleTranslates } from '@/i18n/components-translates/theme-toggle.translates';

const resources = {
  pt: {
    translation: {
      languages: {
        portuguese: 'Português Brasil',
        english: 'Inglês',
        spanish: 'Espanhol',
        french: 'Francês',
      },
      actions: 'Ações',
      genericRequestError:
        'Ocorreu um erro ao processar a requisição. Por favor, tente novamente mais tarde.',
      changeTenant: 'Alterar tenant',
      components: {
        themeToggle: themeToggleTranslates.pt,
        dataTable: dataTableTranslates.pt,
        appSidebar: appSidebarTranslates.pt,
      },
      pages: {
        signIn: signInTranslates.pt,
        users: usersTranslates.pt,
        dashboard: dashboardTranslates.pt,
      },
    },
  },
  en: {
    translation: {
      languages: {
        portuguese: 'Portuguese Brazil',
        english: 'English',
        spanish: 'Español',
        french: 'Français',
      },
      genericRequestError:
        'An error occurred while processing the request. Please try again later.',
      changeTenant: 'Change tenant',
      components: {
        themeToggle: themeToggleTranslates.en,
        dataTable: dataTableTranslates.en,
        appSidebar: appSidebarTranslates.en,
      },
      pages: {
        signIn: signInTranslates.en,
        users: usersTranslates.en,
        dashboard: dashboardTranslates.en,
      },
    },
  },
  fr: {
    translation: {
      languages: {
        portuguese: 'Portugais Brésil',
        english: 'Anglais',
        spanish: 'Espagnol',
        french: 'Français',
      },
      genericRequestError:
        'An error occurred while processing the request. Please try again later.',
      changeTenant: 'Changer de locataire',
      components: {
        themeToggle: themeToggleTranslates.fr,
        dataTable: dataTableTranslates.fr,
        appSidebar: appSidebarTranslates.fr,
      },
      pages: {
        signIn: signInTranslates.fr,
        users: usersTranslates.fr,
        dashboard: dashboardTranslates.fr,
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
