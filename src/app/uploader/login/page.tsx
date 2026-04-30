// src/app/uploader/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/lib/store';
import { authApi } from '@/lib/api';
import { translations } from '@/constants/translations';
import { getTranslation } from '@/lib/translations';
import { loginSchema, type LoginFormData } from '@/lib/validations/login';
import { PORTAL_CONFIGS } from '@/config/portals.config';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const portalConfig = PORTAL_CONFIGS.uploader;

export default function UploaderLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { selectedLanguage, setUser, setProcessing, isProcessing } = useStore();
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const t = (key: string, fallback?: string) => getTranslation(translations, key, selectedLanguage, fallback);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), mode: 'onSubmit', reValidateMode: 'onSubmit',
    criteriaMode: 'all', shouldFocusError: false,
    defaultValues: { email: '', password: '', rememberMe: false },
  });
  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;

  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    const savedEmail = localStorage.getItem('email');
    if (remembered === 'true' && savedEmail) { setValue('email', savedEmail); setValue('rememberMe', true); }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    setError(''); setProcessing(true);
    try {
      if (typeof window !== 'undefined') localStorage.setItem('lastPortal', portalConfig.id);
      const response = await authApi.supabaseLogin({ email: data.email, password: data.password }, portalConfig.id);
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        toast({ title: t('loginSuccess', 'Login successful!'), description: `Welcome back, ${response.data.user.name}!` });
        if (data.rememberMe) { localStorage.setItem('rememberMe', 'true'); localStorage.setItem('email', data.email); }
        else { localStorage.removeItem('rememberMe'); localStorage.removeItem('email'); }
        setTimeout(() => router.push(portalConfig.dashboardRoute), 1500);
      } else {
        const msg = response.error || t('loginError', 'Invalid email or password');
        setError(msg); toast({ variant: 'destructive', title: 'Error', description: msg });
      }
    } catch (err: unknown) {
      const errorMsg = (err as any)?.response?.data?.error || 'An error occurred.';
      setError(errorMsg); toast({ variant: 'destructive', title: 'Error', description: errorMsg });
    } finally { setProcessing(false); }
  };

  const handleGoogleLogin = async () => {
    setProcessing(true);
    try {
      setTimeout(() => {
        authApi.googleSignup({ name: 'Records Admin', email: 'uploader@hospital.com', avatar: '', googleId: 'google_' + Date.now() }, portalConfig.id)
          .then((r) => { if (r.success && r.data?.user) { setUser(r.data.user); toast({ title: 'Login successful!' }); setTimeout(() => router.push(portalConfig.dashboardRoute), 1500); } else { toast({ variant: 'destructive', title: 'Error', description: r.error || 'Failed' }); } })
          .finally(() => setProcessing(false));
      }, 1500);
    } catch { toast({ variant: 'destructive', title: 'Error', description: 'Failed' }); setProcessing(false); }
  };

  if (isProcessing) return <LoadingSpinner isOverlay text={t('processingText', 'Processing...')} />;

  const inputCls = "w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant dark:border-white/15 bg-surface-container-lowest dark:bg-inverse-surface text-on-background dark:text-surface-container-lowest font-inter text-body-md placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-[#1a1c1b] p-4 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md bg-surface-container-lowest dark:bg-inverse-surface rounded-2xl shadow-[0_8px_32px_rgba(52,92,79,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-outline-variant/20 dark:border-white/10 p-8 lg:p-10 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-secondary dark:bg-secondary-fixed-dim rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined icon-fill text-on-secondary dark:text-on-secondary-fixed text-[32px]">cloud_upload</span>
          </div>
          <h1 className="font-newsreader text-h3 text-on-background dark:text-surface-container-lowest mb-2">Uploader Portal Login</h1>
          <p className="font-inter text-body-sm text-outline dark:text-outline-variant">Securely upload and manage medical records.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-label-bold text-label-bold text-on-surface-variant uppercase">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">mail</span>
              <input id="email" type="email" placeholder="uploader@hospital.com" {...register('email')} disabled={isProcessing} autoComplete="email" className={inputCls} />
            </div>
            {errors.email && <p className="text-error text-body-sm">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="font-label-bold text-label-bold text-on-surface-variant uppercase">Password</label>
              <button type="button" onClick={() => router.push('/forgot-password')} className="text-primary-container font-inter text-body-sm hover:underline">Forgot?</button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">lock</span>
              <input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...register('password')} disabled={isProcessing} autoComplete="current-password" className={inputCls + ' pr-12'} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
            {errors.password && <p className="text-error text-body-sm">{errors.password.message}</p>}
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="rememberMe" checked={watch('rememberMe')} onChange={(e) => setValue('rememberMe', e.target.checked)} className="w-4 h-4 rounded accent-primary-container" />
            <label htmlFor="rememberMe" className="font-inter text-body-sm text-on-surface-variant cursor-pointer">Remember me</label>
          </div>
          {error && <div className="bg-error-container text-on-error-container p-3 rounded-lg text-body-sm">{error}</div>}
          <button type="submit" disabled={isProcessing} className="w-full bg-secondary dark:bg-secondary-fixed-dim text-on-secondary dark:text-on-secondary-fixed py-3 rounded-lg font-button text-button hover:bg-on-secondary-fixed-variant transition-colors shadow-[0_4px_12px_rgba(103,93,78,0.15)] active:scale-[0.98] disabled:opacity-50">Sign In</button>
        </form>

        <div className="relative my-6"><div className="absolute inset-0 flex items-center"><span className="w-full border-t border-outline-variant/30" /></div><div className="relative flex justify-center"><span className="bg-surface-container-lowest dark:bg-inverse-surface px-3 font-inter text-body-sm text-outline">or continue with</span></div></div>
        <button type="button" onClick={handleGoogleLogin} disabled={isProcessing} className="w-full flex items-center justify-center gap-3 border border-outline-variant bg-surface-container-lowest py-3 rounded-lg font-button text-button text-on-background hover:bg-surface-container transition-colors active:scale-[0.98]">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Sign in with Google
        </button>

        <div className="mt-6 bg-primary-container/5 border border-primary-container/10 p-4 rounded-lg flex items-start gap-3">
          <span className="material-symbols-outlined text-primary-container text-[20px] mt-0.5">verified_user</span>
          <div>
            <p className="font-label-bold text-label-bold text-on-surface mb-1">HIPAA COMPLIANT</p>
            <p className="font-inter text-body-sm text-on-surface-variant">All data transfers are encrypted and comply with healthcare regulations.</p>
          </div>
        </div>

        <div className="mt-6 text-center space-y-3">
          <p className="text-body-sm text-outline">Don&apos;t have an account? <button onClick={() => router.push(portalConfig.signupRoute)} className="text-primary-container font-medium hover:underline">Register</button></p>
          <button onClick={() => router.push('/')} className="flex items-center justify-center gap-1 mx-auto text-outline hover:text-primary-container text-body-sm transition-colors"><span className="material-symbols-outlined text-[18px]">arrow_back</span>Back to Home</button>
        </div>
      </div>
    </div>
  );
}
