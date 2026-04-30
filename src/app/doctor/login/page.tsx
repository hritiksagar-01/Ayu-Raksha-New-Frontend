// src/app/doctor/login/page.tsx
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

const portalConfig = PORTAL_CONFIGS.doctor;

export default function DoctorLoginPage() {
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
        setTimeout(() => router.push(portalConfig.dashboardRoute), 1200);
      } else {
        const msg = response.error || t('loginError', 'Invalid email or password');
        setError(msg); toast({ variant: 'destructive', title: 'Error', description: msg });
      }
    } catch (err: any) {
      const msg = err?.response?.data?.error || 'An error occurred.';
      setError(msg); toast({ variant: 'destructive', title: 'Error', description: msg });
    } finally { setProcessing(false); }
  };

  if (isProcessing) return <LoadingSpinner isOverlay text={t('processingText', 'Processing...')} />;

  const inputCls = "w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant dark:border-white/15 bg-surface-container-lowest dark:bg-inverse-surface text-on-background dark:text-surface-container-lowest font-inter text-body-md placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-[#1a1c1b] p-4 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary-container/5 dark:bg-primary-fixed/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-warm-gold/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md bg-surface-container-lowest dark:bg-inverse-surface rounded-2xl shadow-[0_8px_32px_rgba(52,92,79,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-outline-variant/20 dark:border-white/10 p-8 lg:p-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-primary-container dark:bg-primary-fixed-dim rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined icon-fill text-on-primary dark:text-on-primary-fixed text-[32px]">medical_services</span>
          </div>
          <h1 className="font-newsreader text-h3 text-on-background dark:text-surface-container-lowest mb-2">Healthcare Professional Login</h1>
          <p className="font-inter text-body-sm text-outline dark:text-outline-variant">Access your practice dashboard securely.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-label-bold text-label-bold text-on-surface-variant dark:text-outline-variant uppercase">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">mail</span>
              <input id="email" type="email" placeholder="doctor@hospital.com" {...register('email')} autoComplete="email" className={inputCls} />
            </div>
            {errors.email && <p className="text-error text-body-sm">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="font-label-bold text-label-bold text-on-surface-variant dark:text-outline-variant uppercase">Password</label>
              <button type="button" onClick={() => router.push('/forgot-password')} className="text-primary-container dark:text-primary-fixed-dim font-inter text-body-sm hover:underline">Forgot?</button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">lock</span>
              <input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...register('password')} autoComplete="current-password" className={inputCls + ' pr-12'} />
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
          <button type="submit" className="w-full bg-primary-container dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed py-3 rounded-lg font-button text-button hover:bg-on-primary-fixed-variant transition-colors shadow-[0_4px_12px_rgba(52,92,79,0.15)] active:scale-[0.98]">Sign In</button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-body-sm text-outline">Don&apos;t have an account? <button onClick={() => router.push(portalConfig.signupRoute)} className="text-primary-container font-medium hover:underline">Register</button></p>
          <a href="#" className="text-body-sm text-primary-container hover:underline block">Provider Support</a>
          <button onClick={() => router.push('/')} className="flex items-center justify-center gap-1 mx-auto text-outline hover:text-primary-container text-body-sm transition-colors"><span className="material-symbols-outlined text-[18px]">arrow_back</span>Back to Home</button>
        </div>
      </div>
    </div>
  );
}
