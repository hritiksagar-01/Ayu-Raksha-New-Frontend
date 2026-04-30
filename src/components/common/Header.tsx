// src/components/common/Header.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import type { Translations } from '@/types';

interface HeaderProps {
  translations: Translations;
}

export default function Header({ translations }: HeaderProps) {
  const router = useRouter();
  const { user, selectedLanguage, setLanguage, clearUser } = useStore();

  const handleLogout = () => {
    clearUser();
    router.push('/');
  };

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-outline-variant/30 dark:border-white/10 shadow-sm dark:shadow-none bg-surface-container-lowest/90 backdrop-blur-md dark:bg-[#1a1c1b]/90">
      <div className="flex justify-between items-center h-16 px-6 max-w-[1280px] mx-auto">
        {/* Brand */}
        <div
          className="text-2xl font-bold tracking-tight text-primary-container dark:text-on-primary-container flex items-center gap-2 cursor-pointer font-newsreader"
          onClick={() => router.push('/')}
        >
          <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">
            local_hospital
          </span>
          Ayu-Raksha
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="font-newsreader text-base font-medium text-primary-container dark:text-on-primary-container border-b-2 border-primary-container dark:border-primary-fixed-dim pb-1"
          >
            Services
          </a>
          <a
            href="#"
            className="font-newsreader text-base font-medium text-outline dark:text-outline-variant hover:text-primary-container dark:hover:text-on-primary-container transition-colors duration-200"
          >
            Portals
          </a>
          <a
            href="#"
            className="font-newsreader text-base font-medium text-outline dark:text-outline-variant hover:text-primary-container dark:hover:text-on-primary-container transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#"
            className="font-newsreader text-base font-medium text-outline dark:text-outline-variant hover:text-primary-container dark:hover:text-on-primary-container transition-colors duration-200"
          >
            Support
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <button
            onClick={() =>
              handleLanguageChange(
                selectedLanguage === 'English' ? 'Hindi' : 'English'
              )
            }
            className="hidden sm:flex items-center gap-1 text-primary-container dark:text-on-primary-container cursor-pointer hover:bg-surface-container-low dark:hover:bg-white/5 p-2 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined">language</span>
            <span className="font-button text-button">
              {selectedLanguage === 'English' ? 'EN' : 'HI'}
            </span>
            <span className="material-symbols-outlined text-[20px]">
              expand_more
            </span>
          </button>

          {/* Notifications */}
          <button className="text-outline dark:text-outline-variant hover:bg-surface-container-low dark:hover:bg-white/5 p-2 rounded-full transition-colors hidden sm:block relative">
            <span className="material-symbols-outlined">notifications</span>
            {user && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            )}
          </button>

          {/* User Avatar / Login */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-sm font-semibold">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <button
                onClick={handleLogout}
                className="text-outline dark:text-outline-variant hover:bg-surface-container-low dark:hover:bg-white/5 p-2 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  logout
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push('/patient/login')}
              className="bg-primary-container dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed px-6 py-2 rounded-lg font-button text-button hover:bg-on-primary-fixed-variant dark:hover:bg-primary-fixed transition-colors duration-200 active:scale-95 shadow-[0_4px_12px_rgba(52,92,79,0.15)]"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}