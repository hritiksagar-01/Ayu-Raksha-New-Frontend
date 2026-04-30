// src/components/features/HeroSection.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Translations } from '@/types';

interface HeroSectionProps {
  translations: Translations;
  selectedLanguage: string;
}

export default function HeroSection({ translations, selectedLanguage }: HeroSectionProps) {
  const router = useRouter();

  return (
    <section className="relative pt-8 pb-16 md:pb-24 flex flex-col md:flex-row items-center gap-12">
      {/* Left Side — Text Content */}
      <div className="w-full md:w-1/2 flex flex-col items-start z-10">
        <span className="text-primary-container dark:text-primary-fixed-dim font-label-bold text-label-bold uppercase tracking-wider mb-4 bg-primary-container/10 dark:bg-primary-fixed/10 px-3 py-1 rounded-full">
          Trusted Healthcare Ecosystem
        </span>

        <h1 className="font-newsreader text-h1 text-on-background dark:text-surface-container-lowest mb-6 text-balance leading-tight">
          Bridging Trust Between{' '}
          <span className="text-primary-container dark:text-primary-fixed-dim">Patients</span> &{' '}
          <span className="text-warm-gold">Healers</span>.
        </h1>

        <p className="font-inter text-body-lg text-on-surface-variant dark:text-outline-variant mb-8 max-w-lg">
          Ayu-Raksha provides a seamless, holistic platform managing your health records,
          connecting you with elite practitioners, and empowering your wellness journey globally.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => router.push('/patient/login')}
            className="bg-primary-container dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed px-8 py-3 rounded-lg font-button text-button hover:bg-on-primary-fixed-variant dark:hover:bg-primary-fixed transition-colors shadow-[0_4px_12px_rgba(52,92,79,0.2)] active:scale-[0.98]"
          >
            Book Appointment
          </button>
          <button
            onClick={() => router.push('/doctor/login')}
            className="bg-surface dark:bg-transparent text-primary-container dark:text-primary-fixed-dim border border-primary-container/20 dark:border-primary-fixed-dim/30 px-8 py-3 rounded-lg font-button text-button hover:bg-surface-container dark:hover:bg-white/5 transition-colors active:scale-[0.98]"
          >
            Join as Doctor
          </button>
        </div>
      </div>

      {/* Right Side — Hero Image */}
      <div className="w-full md:w-1/2 relative">
        <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(52,92,79,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] bg-surface-container-highest dark:bg-inverse-surface">
          <Image
            src="/images/stitch/hero.jpg"
            alt="Modern healthcare clinic with holistic wellness design"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Decorative Badge */}
        <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest dark:bg-inverse-surface p-6 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] flex items-center gap-3 border border-outline-variant/30 dark:border-white/10">
          <div className="bg-warm-gold/20 p-2 rounded-full">
            <span className="material-symbols-outlined text-warm-gold">verified_user</span>
          </div>
          <div>
            <p className="font-label-bold text-label-bold text-on-surface dark:text-surface-container-lowest">
              HIPAA Compliant
            </p>
            <p className="font-inter text-body-sm text-on-surface-variant dark:text-outline-variant">
              Secure Records
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}