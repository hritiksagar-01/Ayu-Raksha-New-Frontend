// src/components/features/FeatureCard.tsx
'use client';

import Image from 'next/image';
import type { FeatureConfig } from '@/constants/features';
import type { Translations } from '@/types';

interface FeatureCardProps {
  feature: FeatureConfig;
  translations: Translations;
  selectedLanguage: string;
}

const FEATURE_ICONS: Record<string, { icon: string; color: string; bgColor: string }> = {
  secureFeatureTitle: {
    icon: 'smart_toy',
    color: 'text-primary-container dark:text-primary-fixed-dim',
    bgColor: 'bg-primary-container/10 dark:bg-primary-fixed/10',
  },
  fastFeatureTitle: {
    icon: 'description',
    color: 'text-warm-gold',
    bgColor: 'bg-warm-gold/10',
  },
  comprehensiveFeatureTitle: {
    icon: 'globe',
    color: 'text-secondary dark:text-secondary-fixed-dim',
    bgColor: 'bg-secondary/10 dark:bg-secondary-fixed/10',
  },
};

export default function FeatureCard({
  feature,
  translations,
  selectedLanguage,
}: FeatureCardProps) {
  const title = translations[feature.titleKey]?.[selectedLanguage];
  const description = translations[feature.descriptionKey]?.[selectedLanguage];
  const iconConfig = FEATURE_ICONS[feature.titleKey] || {
    icon: 'star',
    color: 'text-primary-container',
    bgColor: 'bg-primary-container/10',
  };

  return (
    <div className="flex gap-3 items-start">
      <div className={`${iconConfig.bgColor} p-2 rounded-lg ${iconConfig.color} mt-1 shrink-0`}>
        <span className="material-symbols-outlined">{iconConfig.icon}</span>
      </div>
      <div>
        <h4 className="font-button text-button text-on-background dark:text-surface-container-lowest mb-1">
          {title || 'Feature'}
        </h4>
        <p className="font-inter text-body-sm text-on-surface-variant dark:text-outline-variant">
          {description || 'Description'}
        </p>
      </div>
    </div>
  );
}