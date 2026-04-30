// src/components/common/DashboardLayout.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import SideNav from './SideNav';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { user, selectedLanguage, setLanguage } = useStore();

  return (
    <div className="min-h-screen flex bg-background dark:bg-[#1a1c1b]">
      {/* Sidebar */}
      <SideNav />

      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 border-b bg-surface-container-lowest/90 dark:bg-[#1a1c1b]/90 backdrop-blur-md border-outline-variant/30 dark:border-white/10 shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center h-16 px-6 ml-64 w-[calc(100%-16rem)]">
          <div className="flex items-center gap-6">
            <div
              className="text-2xl font-bold tracking-tight text-primary-container dark:text-on-primary-container font-newsreader cursor-pointer"
              onClick={() => router.push('/')}
            >
              Ayu-Raksha
            </div>
            <nav className="hidden md:flex gap-4">
              {['Services', 'Portals', 'About', 'Support'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-newsreader text-base font-medium text-outline dark:text-outline-variant hover:text-primary-container dark:hover:text-on-primary-container hover:bg-surface-container-low dark:hover:bg-white/5 transition-colors duration-200 px-3 py-1.5 rounded active:scale-95"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setLanguage(selectedLanguage === 'English' ? 'Hindi' : 'English')
              }
              className="w-10 h-10 flex items-center justify-center rounded-full text-primary-container dark:text-on-primary-container hover:bg-surface-container-low dark:hover:bg-white/5 transition-colors duration-200 active:scale-95"
            >
              <span className="material-symbols-outlined">language</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-primary-container dark:text-on-primary-container hover:bg-surface-container-low dark:hover:bg-white/5 transition-colors duration-200 active:scale-95 relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            {user && (
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-sm font-semibold ml-2">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 ml-64 pt-16 min-h-screen flex flex-col relative bg-surface-container-low dark:bg-[#1a1c1b]">
        <div className="flex-1 w-full max-w-[1280px] mx-auto p-6 lg:p-8 flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
}
