// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { translations } from '@/constants/translations';
import { PORTALS } from '@/constants/portals';
import { FEATURES } from '@/constants/features';
import { useDeviceDetection } from '@/hooks/useDeviceDectection';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import HeroSection from '@/components/features/HeroSection';
import PortalCard from '@/components/features/PortalCard';
import FeatureCard from '@/components/features/FeatureCard';

export default function EntryPage() {
  const router = useRouter();
  const { selectedLanguage, isLoading, setLoading } = useStore();

  // Device detection hook
  useDeviceDetection();

  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [setLoading]);

  // If Supabase redirected back with tokens in the URL, forward to the auth callback handler
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash || '';
    const params = new URLSearchParams(window.location.search);
    const lastPortal = localStorage.getItem('lastPortal');
    if (hash.includes('access_token=')) {
      const qp = lastPortal ? `?portal=${encodeURIComponent(lastPortal)}` : '';
      router.replace(`/auth/callback${qp}${hash}`);
    } else if (params.has('code')) {
      const qs = params.toString();
      const prefix = lastPortal ? `portal=${encodeURIComponent(lastPortal)}&` : '';
      router.replace(`/auth/callback?${prefix}${qs}`);
    }
  }, [router]);

  // Navigation handlers
  const handlePortalLogin = (portalId: string) => {
    router.push(`/${portalId}/login`);
  };

  const handlePortalSignup = (portalId: string) => {
    router.push(`/${portalId}/signup`);
  };

  // Loading state
  if (isLoading) {
    return <LoadingSpinner isOverlay />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-[#1a1c1b]">
      <Header translations={translations} />

      <main className="flex-grow pt-[80px]">
        {/* Hero Section */}
        <div className="max-w-[1280px] mx-auto px-6">
          <HeroSection translations={translations} selectedLanguage={selectedLanguage} />
        </div>

        {/* Portal Selection — Bento Grid */}
        <section className="py-16 md:py-24 px-6 bg-surface-container-low dark:bg-[#2f312f]/30">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-newsreader text-h2 text-on-background dark:text-surface-container-lowest mb-2">
                Choose Your Portal
              </h2>
              <p className="font-inter text-body-md text-on-surface-variant dark:text-outline-variant max-w-2xl mx-auto">
                Select your specialized dashboard to access personalized tools, records, and
                AI-assisted insights tailored for your role.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PORTALS.map((portal) => (
                <PortalCard
                  key={portal.id}
                  portal={portal}
                  translations={translations}
                  selectedLanguage={selectedLanguage}
                  onLoginClick={() => handlePortalLogin(portal.id)}
                  onSignupClick={() => handlePortalSignup(portal.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section — Asymmetric Layout */}
        <section className="py-16 md:py-24 px-6 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left — Text & Features */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <h2 className="font-newsreader text-h2 text-on-background dark:text-surface-container-lowest">
                Empowering Health with Innovation
              </h2>
              <p className="font-inter text-body-md text-on-surface-variant dark:text-outline-variant">
                We combine traditional care values with cutting-edge technology to provide a
                comprehensive healthcare experience.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                {FEATURES.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    feature={feature}
                    translations={translations}
                    selectedLanguage={selectedLanguage}
                  />
                ))}
              </div>
            </div>

            {/* Right — Image Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-3 h-[500px]">
              <div className="bg-surface-container dark:bg-inverse-surface rounded-xl overflow-hidden relative shadow-[0_4px_12px_rgba(52,92,79,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                <Image
                  src="/images/stitch/doctor-consulting.jpg"
                  alt="Doctor consulting with patient"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-primary-container/5 dark:bg-primary-fixed/5 rounded-xl flex-grow overflow-hidden relative shadow-[0_4px_12px_rgba(52,92,79,0.05)] p-6 flex flex-col justify-end border border-primary-container/10 dark:border-primary-fixed/10">
                  <span className="material-symbols-outlined text-[48px] text-primary-container/20 dark:text-primary-fixed/20 absolute top-6 right-6">
                    bar_chart
                  </span>
                  <h4 className="font-newsreader text-h3 text-primary-container dark:text-primary-fixed-dim mb-1">
                    99.9%
                  </h4>
                  <p className="font-inter text-body-sm text-on-primary-fixed-variant dark:text-outline-variant">
                    System Uptime & Reliability
                  </p>
                </div>
                <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl flex-grow overflow-hidden relative shadow-[0_4px_12px_rgba(52,92,79,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] border border-outline-variant/20 dark:border-white/10 p-6">
                  <Image
                    src="/images/stitch/data-analysis.jpg"
                    alt="Secure data analysis"
                    fill
                    className="object-cover opacity-20"
                  />
                  <div className="relative z-10 flex flex-col h-full justify-end">
                    <h4 className="font-button text-button text-on-background dark:text-surface-container-lowest mb-1">
                      Secure Data
                    </h4>
                    <p className="font-inter text-body-sm text-on-surface-variant dark:text-outline-variant">
                      End-to-end encryption for all records.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer translations={translations} selectedLanguage={selectedLanguage} />
    </div>
  );
}