// src/lib/className.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Build card classes based on variant — Stitch Material Design 3
 */
export function buildCardClasses(variant: 'patient' | 'doctor' | 'uploader') {
  const baseClasses =
    'rounded-xl shadow-[0_4px_12px_rgba(52,92,79,0.05)] hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full relative overflow-hidden';

  const variantClasses = {
    patient:
      'bg-surface border border-outline-variant/20 group',
    doctor:
      'bg-primary-container text-on-primary shadow-[0_8px_24px_rgba(52,92,79,0.15)] group',
    uploader:
      'bg-surface border border-outline-variant/20 group',
  };

  return cn(baseClasses, variantClasses[variant]);
}

/**
 * Build icon container classes — Material Design 3 style
 */
export function buildIconContainerClasses(variant: 'patient' | 'doctor' | 'uploader') {
  const baseClasses = 'w-16 h-16 rounded-xl flex items-center justify-center mb-lg relative z-10';

  const variantClasses = {
    patient: 'bg-primary-container/10 text-primary-container',
    doctor: 'bg-[#D4A574]/20 text-[#D4A574]',
    uploader: 'bg-secondary/10 text-secondary',
  };

  return cn(baseClasses, variantClasses[variant]);
}

/**
 * Build icon classes
 */
export function buildIconClasses(variant: 'patient' | 'doctor' | 'uploader') {
  const baseClasses = 'w-8 h-8';

  const variantClasses = {
    patient: 'text-primary-container',
    doctor: 'text-[#D4A574]',
    uploader: 'text-secondary',
  };

  return cn(baseClasses, variantClasses[variant]);
}

/**
 * Build button classes — Stitch style
 */
export function buildButtonClasses(variant: 'patient' | 'doctor' | 'uploader') {
  const baseClasses =
    'w-full px-4 py-3 rounded-lg font-button text-button transition-colors flex items-center justify-center gap-sm relative z-10';

  const variantClasses = {
    patient:
      'bg-surface text-primary-container border border-primary-container/30 hover:bg-primary-container hover:text-on-primary',
    doctor:
      'bg-[#D4A574] text-on-primary-fixed hover:bg-[#c29668]',
    uploader:
      'bg-surface text-secondary border border-secondary/30 hover:bg-secondary hover:text-on-secondary',
  };

  return cn(baseClasses, variantClasses[variant]);
}