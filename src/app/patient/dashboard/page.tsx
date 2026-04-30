// src/app/patient/dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { translations } from '@/constants/translations';
import { getTranslation } from '@/lib/translations';
import { uploadApi, patientApi, authApi } from '@/lib/api';
import { mockAlerts, mockRecords } from '@/lib/mockData';
import { getPatientDisplayId } from '@/lib/utils';
import DashboardLayout from '@/components/common/DashboardLayout';

export default function PatientDashboardPage() {
  const router = useRouter();
  const { selectedLanguage, user, setUser } = useStore();
  const [reportsCount, setReportsCount] = useState<number>(0);
  const [alertsCount, setAlertsCount] = useState<number>(0);
  const [appointmentsCount, setAppointmentsCount] = useState<number>(0);
  const [latestRecordTitle, setLatestRecordTitle] = useState<string>('Blood Test Results Available');
  const [latestRecordSummary, setLatestRecordSummary] = useState<string>(
    getTranslation(translations, 'latestUpdateContent', selectedLanguage, 'Your recent blood test results are available. All parameters are within normal range.')
  );
  const [displayName, setDisplayName] = useState<string>(user?.name || 'Patient');
  const [displayPatientId, setDisplayPatientId] = useState<string>(
    user?.patientCode ? user.patientCode.padStart(12, '0').slice(-12) : getPatientDisplayId(user?.id)
  );

  const t = (key: string, fallback?: string) => getTranslation(translations, key, selectedLanguage, fallback);

  useEffect(() => {
    if (user) {
      setDisplayName(user.name || 'Patient');
      if (user.patientCode) setDisplayPatientId(user.patientCode.padStart(12, '0').slice(-12));
      else setDisplayPatientId(getPatientDisplayId(user.id));
    }
  }, [user]);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        if (!user?.patientCode) return;
        const res = await patientApi.getDashboard(user.patientCode);
        if (res.success && res.data?.counts) {
          setAppointmentsCount(res.data.counts.appointmentsUpcoming ?? 0);
          setAlertsCount(res.data.counts.alertsActive ?? 0);
          setReportsCount(res.data.counts.reportsRecent ?? 0);
          if (res.data.latestRecord) {
            setLatestRecordTitle(`${res.data.latestRecord.type} Update`);
            if ((res.data.latestRecord.findings?.length ?? 0) > 0) setLatestRecordSummary(res.data.latestRecord.findings!.substring(0, 160) + '...');
          }
        }
      } catch { /* fallback */ }
    }
    fetchDashboard();
    async function ensureUser() {
      try {
        if (!user) {
          const me = await authApi.me();
          if (me.success && me.data?.user) {
            setUser(me.data.user);
            setDisplayName(me.data.user.name || 'Patient');
            const code = (me.data.user as any).patientCode as string | undefined;
            if (code) setDisplayPatientId(code.padStart(12, '0').slice(-12));
            else setDisplayPatientId(getPatientDisplayId(me.data.user.id));
          }
        }
      } catch { /* ignore */ }
    }
    ensureUser();
    setAlertsCount(mockAlerts.length);
    if (mockRecords.length > 0) {
      setLatestRecordTitle(`${mockRecords[0].type} Results Available`);
      setLatestRecordSummary(mockRecords[0].findings.substring(0, 160) + '...');
    }
    async function fetchReports() {
      try {
        const code = user?.patientCode;
        if (code) { const res = await uploadApi.listFiles(code); if (res.success && Array.isArray(res.data)) setReportsCount(res.data.length); else setReportsCount(mockRecords.length); }
        else setReportsCount(mockRecords.length);
      } catch { setReportsCount(mockRecords.length); }
    }
    setAppointmentsCount(0);
    fetchReports();
    async function fetchProfile() {
      try {
        if (!user?.patientCode) return;
        const res = await patientApi.verifyPatient(user.patientCode);
        if (res.success && res.data) {
          const n = (res.data as any).name as string | undefined;
          const c = (res.data as any).patientCode as string | undefined;
          if (n) setDisplayName(n);
          if (c && c.length >= 6) setDisplayPatientId(c.padStart(12, '0').slice(-12));
        }
      } catch { /* fallback */ }
    }
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.patientCode]);

  const stats = [
    { title: 'Appointments', value: String(appointmentsCount), icon: 'calendar_today', color: 'text-primary-container', bgColor: 'bg-primary-container/10', link: '/patient/dashboard/timeline' },
    { title: 'Prescriptions', value: String(reportsCount), icon: 'medication', color: 'text-warm-gold', bgColor: 'bg-warm-gold/10', link: '/patient/dashboard/reports' },
    { title: 'Health Score', value: '92', icon: 'favorite', color: 'text-error', bgColor: 'bg-error/10', link: '/patient/dashboard/timeline' },
  ];

  const quickActions = [
    { title: 'Book Appointment', desc: 'Schedule with a specialist', icon: 'calendar_month', link: '/patient/dashboard/doctors' },
    { title: 'View Reports', desc: 'Access medical records', icon: 'lab_profile', link: '/patient/dashboard/reports' },
    { title: 'AI Assistant', desc: 'Get instant health answers', icon: 'smart_toy', link: '/patient/dashboard/chatbot' },
  ];

  const timeline = [
    { date: 'Today', title: 'Prescription Updated', desc: 'Dr. Sharma updated your prescription for seasonal allergies.', icon: 'medication', color: 'bg-primary-container' },
    { date: 'Yesterday', title: 'Lab Results Available', desc: 'Complete blood count results are now available.', icon: 'science', color: 'bg-warm-gold' },
    { date: '3 days ago', title: 'Appointment Completed', desc: 'Follow-up consultation with Dr. Patel completed.', icon: 'event_available', color: 'bg-secondary' },
  ];

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-2xl p-8 border border-outline-variant/20 dark:border-white/10 shadow-[0_4px_12px_rgba(52,92,79,0.05)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-newsreader text-h2 text-on-background dark:text-surface-container-lowest">
              Welcome back, {displayName}! 👋
            </h1>
            <p className="font-inter text-body-md text-on-surface-variant dark:text-outline-variant mt-1">{t('dashboardSubtitle', "Here's your health overview for today")}</p>
            <p className="font-inter text-body-sm text-outline dark:text-outline-variant mt-1">Patient ID: <span className="font-mono font-semibold">{displayPatientId}</span></p>
          </div>
          <div className="flex items-center gap-2 bg-primary-container/10 dark:bg-primary-fixed/10 px-4 py-2 rounded-full">
            <span className="material-symbols-outlined icon-fill text-primary-container dark:text-primary-fixed-dim text-[18px]">check_circle</span>
            <span className="font-label-bold text-label-bold text-primary-container dark:text-primary-fixed-dim">All vitals normal</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <button key={stat.title} onClick={() => router.push(stat.link)} className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-6 border border-outline-variant/20 dark:border-white/10 shadow-[0_4px_12px_rgba(52,92,79,0.05)] hover:-translate-y-1 transition-transform text-left group">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <span className={`material-symbols-outlined icon-fill ${stat.color}`}>{stat.icon}</span>
              </div>
              <span className="material-symbols-outlined text-outline/30 group-hover:text-primary-container transition-colors">arrow_forward</span>
            </div>
            <p className="font-newsreader text-[32px] font-semibold text-on-background dark:text-surface-container-lowest">{stat.value}</p>
            <p className="font-inter text-body-sm text-on-surface-variant dark:text-outline-variant">{stat.title}</p>
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button key={action.title} onClick={() => router.push(action.link)} className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-6 border border-outline-variant/20 dark:border-white/10 shadow-[0_4px_12px_rgba(52,92,79,0.05)] hover:-translate-y-1 transition-transform text-left group">
              <div className="bg-primary-container/10 dark:bg-primary-fixed/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-container dark:text-primary-fixed-dim">{action.icon}</span>
              </div>
              <h3 className="font-button text-button text-on-background dark:text-surface-container-lowest mb-1">{action.title}</h3>
              <p className="font-inter text-body-sm text-on-surface-variant dark:text-outline-variant">{action.desc}</p>
            </button>
          ))}
        </div>

        {/* Medication Reminders */}
        <div className="bg-secondary-container/30 dark:bg-secondary/10 rounded-xl p-6 border border-secondary/20 dark:border-secondary/15">
          <h3 className="font-newsreader text-xl font-semibold text-on-background dark:text-surface-container-lowest mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined icon-fill text-warm-gold">medication</span>
            Medication Reminders
          </h3>
          <div className="space-y-3">
            {[{ name: 'Vitamin D3', time: '8:00 AM', done: true }, { name: 'Antihistamine', time: '2:00 PM', done: false }, { name: 'Omega-3', time: '8:00 PM', done: false }].map((med) => (
              <div key={med.name} className={`flex items-center justify-between p-3 rounded-lg ${med.done ? 'bg-primary-container/10 dark:bg-primary-fixed/10' : 'bg-surface-container-lowest dark:bg-inverse-surface'} border border-outline-variant/10 dark:border-white/5`}>
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[18px] ${med.done ? 'icon-fill text-primary-container dark:text-primary-fixed-dim' : 'text-outline dark:text-outline-variant'}`}>{med.done ? 'check_circle' : 'radio_button_unchecked'}</span>
                  <span className={`font-inter text-body-sm ${med.done ? 'line-through text-outline dark:text-outline-variant' : 'text-on-background dark:text-surface-container-lowest'}`}>{med.name}</span>
                </div>
                <span className="font-inter text-body-sm text-outline dark:text-outline-variant">{med.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-6 border border-outline-variant/20 dark:border-white/10 shadow-[0_4px_12px_rgba(52,92,79,0.05)]">
        <h3 className="font-newsreader text-xl font-semibold text-on-background dark:text-surface-container-lowest mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container dark:text-primary-fixed-dim">timeline</span>
          Recent Activity
        </h3>
        <div className="space-y-6">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`${item.color} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}>
                  <span className="material-symbols-outlined icon-fill text-on-primary text-[18px]">{item.icon}</span>
                </div>
                {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-outline-variant/30 dark:bg-white/10 mt-2" />}
              </div>
              <div className="pb-6">
                <p className="font-label-bold text-label-bold text-outline dark:text-outline-variant mb-1">{item.date}</p>
                <h4 className="font-button text-button text-on-background dark:text-surface-container-lowest mb-1">{item.title}</h4>
                <p className="font-inter text-body-sm text-on-surface-variant dark:text-outline-variant">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}