// Packages
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TenantImage } from '@/components/shared/tenant-image';

// Hooks
import { useSignIn } from '@/hooks/login/useSignIn';

export const SignIn = (): ReactElement => {
  const { t } = useTranslation();
  const { mutateAsync: signIn } = useSignIn();

  const signInForm = zod.object({
    email: zod.string().email(t('pages.signIn.error.invalidEmail')),
    password: zod.string().min(1, t('pages.signIn.error.requiredField')),
  });

  type SignInForm = zod.infer<typeof signInForm>;

  const methods = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSignIn = async (data: SignInForm) => {
    await signIn(data);
  };

  return (
    <>
      <Helmet title="Login" />

      <FormProvider {...methods}>
        <div className="container mt-10 flex w-full max-w-[400px] flex-col items-center justify-center md:m-auto md:h-[90vh]">
          <form
            onSubmit={handleSubmit(onSignIn)}
            className="flex flex-col justify-center gap-6"
          >
            <header className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center justify-center gap-2 rounded-md font-medium">
                <TenantImage />
                <span className="sr-only">Acme Inc.</span>
              </div>
              <h1 className="text-center text-xl font-bold">
                {t('pages.signIn.welcome')}{' '}
                <span className="text-nowrap">
                  Agenda Contas a Pagar/Fiscal
                </span>
                .
              </h1>
            </header>

            <div className="flex w-full max-w-full flex-col">
              <Input
                id="email"
                type="email"
                label={t('pages.signIn.email')}
                placeholder="m@example.com"
                autoComplete="email"
                autoFocus
                required
                error={errors.email?.message}
                {...register('email')}
              />
              <Input
                id="password"
                type="password"
                label={t('pages.signIn.password')}
                placeholder="********"
                isPassword
                autoComplete="off"
                required
                error={errors.password?.message}
                {...register('password')}
              />
              <Button
                type="submit"
                className="mt-4 w-full"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {t('pages.signIn.login')}
              </Button>
            </div>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
              {t('pages.signIn.ByClickingContinueYouAgreeToOur')}{' '}
              <span>{t('pages.signIn.termsOfService')}</span>{' '}
              {t('pages.signIn.and')}{' '}
              <span>{t('pages.signIn.privacyPolicy')}</span>.
            </div>
          </form>
        </div>
      </FormProvider>
    </>
  );
};
