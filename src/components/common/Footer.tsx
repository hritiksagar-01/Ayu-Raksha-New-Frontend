// src/components/common/Footer.tsx
'use client';

import type { Translations } from '@/types';

interface FooterProps {
  translations: Translations;
  selectedLanguage: string;
}

export default function Footer({ translations, selectedLanguage }: FooterProps) {
  return (
    <footer className="w-full border-t py-12 mt-auto border-outline-variant/30 dark:border-white/10 bg-surface-container-lowest dark:bg-[#1a1c1b]">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-newsreader font-bold text-primary-container dark:text-on-primary-container text-lg flex items-center gap-1">
            <span className="material-symbols-outlined text-base">
              local_hospital
            </span>
            Ayu-Raksha
          </div>
          <p className="text-outline dark:text-outline-variant text-xs tracking-wide font-inter">
            {translations.copyright?.[selectedLanguage] ||
              '© 2024 Ayu-Raksha Healthcare. All rights reserved.'}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Contact Us'].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-outline dark:text-outline-variant hover:underline hover:text-primary-container dark:hover:text-on-primary-container transition-colors opacity-80 hover:opacity-100 text-xs tracking-wide font-inter"
              >
                {link}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}