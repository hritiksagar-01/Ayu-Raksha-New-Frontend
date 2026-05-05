// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { translations } from '@/constants/translations';
import { useDeviceDetection } from '@/hooks/useDeviceDectection';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function EntryPage() {
  const router = useRouter();
  const { selectedLanguage, isLoading, setLoading, user, setLanguage, clearUser } = useStore();

  useDeviceDetection();

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

  if (isLoading) return <LoadingSpinner isOverlay />;

  return (
    <div className="bg-background text-on-background font-inter antialiased min-h-screen flex flex-col">
      {/* ─── TopNavBar ─── */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#E5E7EB] dark:border-slate-800 shadow-sm dark:shadow-none bg-[#FAFAFA]/90 backdrop-blur-md dark:bg-slate-950/90 font-newsreader text-base font-medium">
        <div className="flex justify-between items-center h-16 px-6 max-w-[1280px] mx-auto">
          {/* Brand */}
          <div
            className="text-2xl font-bold tracking-tight text-[#345C4F] dark:text-white flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <span className="material-symbols-outlined text-primary">local_hospital</span>
            Ayu-Raksha
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a className="text-[#345C4F] dark:text-white border-b-2 border-[#345C4F] pb-1" href="#">Services</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#345C4F] transition-colors duration-200" href="#">Portals</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#345C4F] transition-colors duration-200" href="#">About</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#345C4F] transition-colors duration-200" href="#">Support</a>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <div
              className="hidden sm:flex items-center gap-1 text-[#345C4F] cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors"
              onClick={() => setLanguage(selectedLanguage === 'English' ? 'Hindi' : 'English')}
            >
              <span className="material-symbols-outlined">language</span>
              <span className="font-button text-button">{selectedLanguage === 'English' ? 'EN' : 'HI'}</span>
              <span className="material-symbols-outlined text-[20px]">expand_more</span>
            </div>
            <button className="text-slate-500 hover:bg-slate-50 p-2 rounded-full transition-colors hidden sm:block relative">
              <span className="material-symbols-outlined">notifications</span>
              {user && <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />}
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#345C4F] text-white flex items-center justify-center text-sm font-semibold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <button onClick={() => { clearUser(); router.push('/'); }} className="text-slate-500 hover:bg-slate-50 p-2 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push('/patient/login')}
                className="bg-[#345C4F] text-white px-6 py-2 rounded-lg font-button text-button hover:bg-[#264e42] transition-colors duration-200 active:scale-95 shadow-[0_4px_12px_rgba(52,92,79,0.15)]"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <main className="flex-grow pt-[80px]">
        {/* ─── Hero Section ─── */}
        <section className="relative pt-[64px] pb-[96px] px-6 overflow-hidden">
          {/* Hero gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0f7f4] via-background to-[#fdf6ef] dark:from-[#1a2e28] dark:via-[#1a1c1b] dark:to-[#2a2520]" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4A574]/5 rounded-full blur-[100px]" />

          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-[48px] relative z-10">
            <div className="w-full md:w-1/2 flex flex-col items-start z-10">
              <span className="text-white font-label-bold text-label-bold uppercase tracking-wider mb-[16px] bg-[#345C4F] px-4 py-2 rounded-full shadow-[0_2px_8px_rgba(52,92,79,0.3)] inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Trusted Healthcare Ecosystem
              </span>

              <h1 className="font-newsreader text-[48px] leading-[1.2] font-semibold text-on-background mb-[24px] text-balance">
                Bridging Trust Between{' '}
                <span className="text-primary-container">Patients</span> &amp;{' '}
                <span className="text-[#D4A574]">Healers</span>.
              </h1>

              <p className="font-inter text-[18px] leading-[1.6] text-on-surface-variant mb-[32px] max-w-lg">
                Ayu-Raksha provides a seamless, holistic platform managing your health records,
                connecting you with elite practitioners, and empowering your wellness journey globally.
              </p>

              <div className="flex flex-col sm:flex-row gap-[16px] w-full sm:w-auto">
                <button
                  onClick={() => router.push('/patient/login')}
                  className="bg-primary-container text-on-primary px-8 py-3.5 rounded-xl font-button text-button hover:bg-on-primary-fixed-variant transition-all shadow-[0_4px_16px_rgba(52,92,79,0.3)] active:scale-[0.97] hover:shadow-[0_6px_20px_rgba(52,92,79,0.4)] hover:-translate-y-0.5"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => router.push('/doctor/login')}
                  className="bg-white/80 backdrop-blur-sm text-primary-container border-2 border-primary-container/25 px-8 py-3.5 rounded-xl font-button text-button hover:bg-primary-container hover:text-on-primary hover:border-primary-container transition-all active:scale-[0.97] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  Join as Doctor
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(52,92,79,0.1)] bg-surface-container-highest">
                <Image
                  src="/images/stitch/hero.jpg"
                  alt="Modern healthcare clinic interior with holistic wellness design"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative HIPAA Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-[24px] rounded-2xl shadow-[0_8px_32px_rgba(52,92,79,0.12)] flex items-center gap-[14px] border border-primary-container/15 backdrop-blur-sm">
                <div className="bg-gradient-to-br from-[#D4A574] to-[#c29668] p-[10px] rounded-xl shadow-[0_4px_12px_rgba(212,165,116,0.3)]">
                  <span className="material-symbols-outlined text-white">verified_user</span>
                </div>
                <div>
                  <p className="font-label-bold text-label-bold text-on-surface">Trusted Records</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Verified Providers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Portal Selection (Bento Grid) ─── */}
        <section className="relative py-[96px] px-6 overflow-hidden">
          {/* Portal section gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#eef3f0] via-[#f3f4f1] to-[#f7f5f1] dark:from-[#1e2a26] dark:via-[#222524] dark:to-[#252220]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-container/5 rounded-full blur-[100px]" />

          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="text-center mb-[64px]">
              <span className="inline-block text-primary-container font-label-bold text-label-bold uppercase tracking-wider mb-[12px] bg-primary-container/10 px-4 py-1.5 rounded-full">Our Portals</span>
              <h2 className="font-newsreader text-[36px] leading-[1.3] font-semibold text-on-background mb-[8px]">
                Choose Your Portal
              </h2>
              <p className="font-inter text-[16px] leading-[1.5] text-on-surface-variant max-w-2xl mx-auto">
                Select your specialized dashboard to access personalized tools, records, and
                AI-assisted insights tailored for your role.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
              {/* Patient Portal Card */}
              <div className="bg-surface rounded-xl p-[32px] shadow-[0_4px_12px_rgba(52,92,79,0.05)] hover:-translate-y-1 transition-transform duration-300 border border-outline-variant/20 flex flex-col h-full group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110" />
                <div className="bg-primary-container/10 w-16 h-16 rounded-xl flex items-center justify-center mb-[16px] relative z-10 text-primary-container">
                  <span className="material-symbols-outlined text-[32px]">diversity_1</span>
                </div>
                <h3 className="font-newsreader text-[28px] leading-[1.4] font-medium text-on-background mb-[12px] relative z-10">
                  Patient Portal
                </h3>
                <p className="font-inter text-[14px] leading-[1.5] text-on-surface-variant mb-[24px] flex-grow relative z-10">
                  Access your complete medical history, book appointments, and interact with our AI
                  Health Assistant for preliminary guidance.
                </p>
                <button
                  onClick={() => router.push('/patient/login')}
                  className="w-full bg-[#345C4F] text-white px-4 py-3 rounded-lg font-button text-button hover:bg-[#264e42] transition-colors flex items-center justify-center gap-[8px] relative z-10 shadow-[0_4px_12px_rgba(52,92,79,0.2)] active:scale-[0.98]"
                >
                  Enter Portal
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>

              {/* Doctor Portal Card */}
              <div className="bg-primary-container text-on-primary rounded-xl p-[32px] shadow-[0_8px_24px_rgba(52,92,79,0.15)] hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#D4A574]/10 rounded-full blur-2xl z-0 group-hover:bg-[#D4A574]/20 transition-colors" />
                <div className="bg-[#D4A574]/20 w-16 h-16 rounded-xl flex items-center justify-center mb-[16px] relative z-10 text-[#D4A574]">
                  <span className="material-symbols-outlined text-[32px]">stethoscope</span>
                </div>
                <h3 className="font-newsreader text-[28px] leading-[1.4] font-medium text-on-primary mb-[12px] relative z-10">
                  Doctor Portal
                </h3>
                <p className="font-inter text-[14px] leading-[1.5] text-on-primary/80 mb-[24px] flex-grow relative z-10">
                  Manage patient queues, review medical imaging with AI enhancements, and provide
                  tele-consultations securely.
                </p>
                <button
                  onClick={() => router.push('/doctor/login')}
                  className="w-full bg-[#345C4F] text-white px-4 py-3 rounded-lg font-button text-button hover:bg-[#264e42] transition-colors flex items-center justify-center gap-[8px] relative z-10 shadow-[0_4px_12px_rgba(52,92,79,0.2)] active:scale-[0.98]"
                >
                  Enter Portal
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>

              {/* Uploader Portal Card */}
              <div className="bg-surface rounded-xl p-[32px] shadow-[0_4px_12px_rgba(52,92,79,0.05)] hover:-translate-y-1 transition-transform duration-300 border border-outline-variant/20 flex flex-col h-full group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110" />
                <div className="bg-secondary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-[16px] relative z-10 text-secondary">
                  <span className="material-symbols-outlined text-[32px]">upload_file</span>
                </div>
                <h3 className="font-newsreader text-[28px] leading-[1.4] font-medium text-on-background mb-[12px] relative z-10">
                  Uploader Portal
                </h3>
                <p className="font-inter text-[14px] leading-[1.5] text-on-surface-variant mb-[24px] flex-grow relative z-10">
                  Securely digitize and upload diagnostic reports, X-rays, and medical documents to
                  patient profiles.
                </p>
                <button
                  onClick={() => router.push('/uploader/login')}
                  className="w-full bg-[#345C4F] text-white px-4 py-3 rounded-lg font-button text-button hover:bg-[#264e42] transition-colors flex items-center justify-center gap-[8px] relative z-10 shadow-[0_4px_12px_rgba(52,92,79,0.2)] active:scale-[0.98]"
                >
                  Enter Portal
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Features Section (Asymmetric Layout) ─── */}
        <section className="relative py-[96px] px-6 overflow-hidden">
          {/* Features gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-[#f5f9f7] to-[#faf6f2] dark:from-[#1a1c1b] dark:via-[#1e2824] dark:to-[#242019]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4A574]/5 rounded-full blur-[120px]" />
          <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-primary-container/5 rounded-full blur-[80px]" />

          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] items-center">
              <div className="lg:col-span-5 flex flex-col gap-[24px]">
                <span className="inline-block text-[#D4A574] font-label-bold text-label-bold uppercase tracking-wider mb-0 bg-[#D4A574]/10 px-4 py-1.5 rounded-full w-fit">Why Choose Us</span>
                <h2 className="font-newsreader text-[36px] leading-[1.3] font-semibold text-on-background">
                  Empowering Health with Innovation
                </h2>
                <p className="font-inter text-[16px] leading-[1.5] text-on-surface-variant">
                  We combine traditional care values with cutting-edge technology to provide a
                  comprehensive healthcare experience.
                </p>
                <div className="flex flex-col gap-[16px] mt-[8px]">
                  {/* Feature 1 */}
                  <div className="flex gap-[14px] items-start bg-white/60 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(52,92,79,0.08)] transition-shadow">
                    <div className="bg-gradient-to-br from-primary-container to-primary p-[10px] rounded-xl text-white mt-0.5 shrink-0 shadow-[0_4px_12px_rgba(52,92,79,0.2)]">
                      <span className="material-symbols-outlined">smart_toy</span>
                    </div>
                    <div>
                      <h4 className="font-button text-button text-on-background mb-[4px]">AI Health Assistant</h4>
                      <p className="font-inter text-[14px] leading-[1.5] text-on-surface-variant">24/7 symptom checking and preliminary health routing.</p>
                    </div>
                  </div>
                  {/* Feature 2 */}
                  <div className="flex gap-[14px] items-start bg-white/60 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(212,165,116,0.1)] transition-shadow">
                    <div className="bg-gradient-to-br from-[#D4A574] to-[#b8885c] p-[10px] rounded-xl text-white mt-0.5 shrink-0 shadow-[0_4px_12px_rgba(212,165,116,0.25)]">
                      <span className="material-symbols-outlined">description</span>
                    </div>
                    <div>
                      <h4 className="font-button text-button text-on-background mb-[4px]">Instant Reports</h4>
                      <p className="font-inter text-[14px] leading-[1.5] text-on-surface-variant">Digitized medical records available securely on demand.</p>
                    </div>
                  </div>
                  {/* Feature 3 */}
                  <div className="flex gap-[14px] items-start bg-white/60 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(103,93,78,0.1)] transition-shadow">
                    <div className="bg-gradient-to-br from-secondary to-[#554b3d] p-[10px] rounded-xl text-white mt-0.5 shrink-0 shadow-[0_4px_12px_rgba(103,93,78,0.2)]">
                      <span className="material-symbols-outlined">globe</span>
                    </div>
                    <div>
                      <h4 className="font-button text-button text-on-background mb-[4px]">Global Doctor Network</h4>
                      <p className="font-inter text-[14px] leading-[1.5] text-on-surface-variant">Connect with specialists across borders seamlessly.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Image Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-[12px] h-[500px]">
                <div className="bg-surface-container rounded-xl overflow-hidden relative shadow-[0_4px_12px_rgba(52,92,79,0.05)]">
                  <Image
                    src="/images/stitch/doctor-consulting.jpg"
                    alt="Doctor consulting with patient"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[12px]">
                  <div className="bg-gradient-to-br from-primary-container/10 to-primary-container/5 rounded-xl flex-grow overflow-hidden relative shadow-[0_4px_16px_rgba(52,92,79,0.08)] p-[24px] flex flex-col justify-end border border-primary-container/15">
                    <span className="material-symbols-outlined text-[48px] text-primary-container/25 absolute top-[24px] right-[24px]">
                      bar_chart
                    </span>
                    <h4 className="font-newsreader text-[28px] leading-[1.4] font-medium text-primary-container mb-[4px]">
                      99.9%
                    </h4>
                    <p className="font-inter text-[14px] leading-[1.5] text-on-primary-fixed-variant">
                      System Uptime &amp; Reliability
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[#faf6f2] to-[#f3ede6] rounded-xl flex-grow overflow-hidden relative shadow-[0_4px_16px_rgba(212,165,116,0.08)] border border-[#D4A574]/15 p-[24px]">
                    <Image
                      src="/images/stitch/data-analysis.jpg"
                      alt="Data analysis visualization"
                      fill
                      className="object-cover opacity-15"
                    />
                    <div className="relative z-10 flex flex-col h-full justify-end">
                      <h4 className="font-button text-button text-on-background mb-[4px]">Secure Data</h4>
                      <p className="font-inter text-[14px] leading-[1.5] text-on-surface-variant">
                        End-to-end encryption for all records.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="w-full border-t py-12 mt-auto border-[#E5E7EB] dark:border-slate-800 bg-[#FAFAFA] dark:bg-slate-950 font-inter text-xs tracking-wide text-[#345C4F] dark:text-[#4A8271]">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-newsreader font-bold text-[#345C4F] text-lg flex items-center gap-1">
              <span className="material-symbols-outlined text-base">local_hospital</span>
              Ayu-Raksha
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {(translations.copyright as Record<string, string>)?.[selectedLanguage] || '© 2024 Ayu-Raksha Healthcare. All rights reserved.'}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Contact Us'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-500 dark:text-slate-400 hover:underline hover:text-[#345C4F] dark:hover:text-white transition-colors opacity-80 hover:opacity-100"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}