// src/components/features/PortalCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import {
  buildCardClasses,
  buildIconContainerClasses,
  buildButtonClasses,
} from '@/lib/className';
import type { PortalConfig, PortalVariant } from '@/constants/portals';
import type { Translations } from '@/types';

const MATERIAL_ICONS: Record<PortalVariant, string> = {
  patient: 'diversity_1',
  doctor: 'stethoscope',
  uploader: 'upload_file',
};

interface PortalCardProps {
  portal: PortalConfig;
  translations: Translations;
  selectedLanguage: string;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export default function PortalCard({
  portal,
  translations,
  selectedLanguage,
  onLoginClick,
}: PortalCardProps) {
  const variant: PortalVariant = portal.id;
  const isDoctor = variant === 'doctor';

  return (
    <div className={buildCardClasses(variant) + ' p-8'}>
      {/* Decorative background shape */}
      {!isDoctor && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 dark:bg-primary-fixed/5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>
      )}
      {isDoctor && (
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-warm-gold/10 rounded-full blur-2xl z-0 group-hover:bg-warm-gold/20 transition-colors"></div>
      )}

      {/* Icon */}
      <div className={buildIconContainerClasses(variant)}>
        <span className="material-symbols-outlined text-[32px]">
          {MATERIAL_ICONS[variant]}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`font-newsreader text-h3 mb-3 relative z-10 ${
          isDoctor
            ? 'text-on-primary dark:text-surface-container-lowest'
            : 'text-on-background dark:text-surface-container-lowest'
        }`}
      >
        {translations[portal.titleKey]?.[selectedLanguage]}
      </h3>

      {/* Description */}
      <p
        className={`font-inter text-body-sm mb-6 flex-grow relative z-10 ${
          isDoctor
            ? 'text-on-primary/80 dark:text-surface-container-lowest/80'
            : 'text-on-surface-variant dark:text-outline-variant'
        }`}
      >
        {translations[portal.descriptionKey]?.[selectedLanguage]}
      </p>

      {/* CTA Button */}
      <button onClick={onLoginClick} className={buildButtonClasses(variant)}>
        Enter Portal
        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>
    </div>
  );
}