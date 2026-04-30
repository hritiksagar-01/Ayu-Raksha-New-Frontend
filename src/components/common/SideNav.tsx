// src/components/common/SideNav.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import Image from 'next/image';

interface NavItem {
  label: string;
  icon: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', href: '/patient/dashboard' },
  { label: 'Appointments', icon: 'calendar_today', href: '/patient/dashboard/doctors' },
  { label: 'Medical Reports', icon: 'description', href: '/patient/dashboard/reports' },
  { label: 'Health Timeline', icon: 'timeline', href: '/patient/dashboard/timeline' },
  { label: 'AI Assistant', icon: 'smart_toy', href: '/patient/dashboard/chatbot' },
];

export default function SideNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, clearUser } = useStore();

  const isActive = (href: string) => {
    if (href === '/patient/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    clearUser();
    router.push('/');
  };

  return (
    <aside className="h-screen w-64 border-r fixed left-0 top-0 z-40 bg-surface-container-lowest dark:bg-[#2f312f] border-outline-variant/30 dark:border-white/10 shadow-none flex flex-col pt-16">
      <div className="flex flex-col h-full py-8 gap-4 px-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-lg font-semibold overflow-hidden">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div>
            <h2 className="font-inter text-sm font-medium text-primary-container dark:text-on-primary-container">
              Ayu-Raksha Portal
            </h2>
            <p className="font-inter text-xs text-outline dark:text-outline-variant flex items-center gap-1">
              <span className="material-symbols-outlined icon-fill text-[12px]">verified</span>
              Verified Session
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded font-inter text-sm font-medium transition-all duration-200 active:scale-[0.98] w-full text-left ${
                  active
                    ? 'bg-primary-container/10 dark:bg-primary-fixed/10 text-primary-container dark:text-on-primary-container border-r-4 border-primary-container dark:border-primary-fixed-dim'
                    : 'text-outline dark:text-outline-variant hover:bg-surface-container-low dark:hover:bg-white/5 hover:translate-x-1'
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto flex flex-col gap-2">
          <button className="w-full flex justify-center items-center gap-2 px-3 py-2.5 rounded font-inter text-sm font-medium bg-error-container dark:bg-error/20 text-on-error-container dark:text-error hover:bg-error hover:text-on-error transition-colors active:scale-[0.98]">
            <span className="material-symbols-outlined text-[18px]">emergency</span>
            Emergency Support
          </button>

          <div className="h-px bg-outline-variant/30 dark:bg-white/10 my-1"></div>

          <button
            onClick={() => router.push('/patient/dashboard/settings')}
            className="flex items-center gap-3 px-3 py-2.5 rounded font-inter text-sm font-medium text-outline dark:text-outline-variant hover:bg-surface-container-low dark:hover:bg-white/5 hover:translate-x-1 transition-all duration-200 active:scale-[0.98] w-full text-left"
          >
            <span className="material-symbols-outlined">settings</span>
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded font-inter text-sm font-medium text-outline dark:text-outline-variant hover:bg-surface-container-low dark:hover:bg-white/5 hover:translate-x-1 transition-all duration-200 active:scale-[0.98] w-full text-left"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
