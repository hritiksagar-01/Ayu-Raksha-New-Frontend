// src/app/patient/dashboard/reports/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { translations } from '@/constants/translations';
import { getTranslation } from '@/lib/translations';
import { mockRecords } from '@/lib/mockData';
import { format } from 'date-fns';
import { patientApi } from '@/lib/api';
import type { MedicalRecord } from '@/types';
import DashboardLayout from '@/components/common/DashboardLayout';

const RECORD_ICONS: Record<string, { icon: string; color: string; bg: string }> = {
  'Prescription': { icon: 'description', color: 'text-primary-container', bg: 'bg-primary-container' },
  'Blood Report': { icon: 'science', color: 'text-error', bg: 'bg-error' },
  'Scan': { icon: 'radiology', color: 'text-secondary', bg: 'bg-secondary' },
  'Consultation': { icon: 'stethoscope', color: 'text-warm-gold', bg: 'bg-warm-gold' },
};

const STATUS_STYLES: Record<string, string> = {
  'Normal': 'bg-primary-container/10 text-primary-container dark:bg-primary-fixed/10 dark:text-primary-fixed-dim',
  'Reviewed': 'bg-warm-gold/10 text-warm-gold',
  'Pending': 'bg-secondary/10 text-secondary dark:text-secondary-fixed-dim',
  'Abnormal': 'bg-error/10 text-error',
};

export default function PatientReportsPage() {
  const router = useRouter();
  const { selectedLanguage, user } = useStore();
  const [records, setRecords] = React.useState<MedicalRecord[]>(mockRecords);
  const [loading, setLoading] = React.useState(false);
  const [syncing, setSyncing] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('All');
  const t = (key: string, fallback?: string) => getTranslation(translations, key, selectedLanguage, fallback);

  React.useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);
        if (!user?.patientCode) { setRecords(mockRecords); return; }
        const res = await patientApi.listRecords(user.patientCode, { limit: 50 });
        if (res.success && Array.isArray(res.data)) {
          const mapped: MedicalRecord[] = res.data.map((r: any) => ({
            id: String(r.id ?? r.key ?? Math.random()), type: r.type || 'Prescription',
            date: r.date || r.createdAt || new Date().toISOString(), doctor: r.doctor || r.doctorName || '—',
            clinic: r.clinic || r.facility || '', findings: r.findings || r.summary || '',
            status: r.status || 'Reviewed', fileUrl: r.fileUrl || r.url, filename: r.filename, size: r.size, fileKey: r.fileKey || r.key,
          }));
          setRecords(mapped);
        } else { setRecords(mockRecords); }
      } catch { setRecords(mockRecords); } finally { setLoading(false); }
    }
    fetchReports();
  }, [user?.patientCode]);

  async function handleSync() {
    if (!user?.patientCode) return;
    try {
      setSyncing(true);
      await patientApi.syncRecords(user.patientCode);
      const res = await patientApi.listRecords(user.patientCode, { limit: 50 });
      if (res.success && Array.isArray(res.data)) {
        const mapped: MedicalRecord[] = res.data.map((r: any) => ({
          id: String(r.id ?? r.key ?? Math.random()), type: r.type || 'Prescription',
          date: r.date || r.createdAt || new Date().toISOString(), doctor: r.doctor || r.doctorName || '—',
          clinic: r.clinic || r.facility || '', findings: r.findings || r.summary || '',
          status: r.status || 'Reviewed', fileUrl: r.fileUrl || r.url, filename: r.filename, size: r.size, fileKey: r.fileKey || r.key,
        }));
        setRecords(mapped);
      }
    } finally { setSyncing(false); }
  }

  const filteredRecords = records.filter((r) => {
    const termMatch = !searchTerm || r.type.toLowerCase().includes(searchTerm.toLowerCase()) || r.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = typeFilter === 'All' || r.type === typeFilter;
    return termMatch && typeMatch;
  });
  const types = ['All', ...Array.from(new Set(records.map((r) => r.type)))];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-newsreader text-h2 text-on-background dark:text-surface-container-lowest">{t('myReports', 'Medical Reports')}</h1>
          <p className="font-inter text-body-md text-on-surface-variant dark:text-outline-variant mt-1">{t('reportsDescription', 'View and manage your medical records')}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSync} disabled={!user?.patientCode || syncing} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant/30 dark:border-white/10 text-on-surface-variant dark:text-outline-variant hover:bg-surface-container dark:hover:bg-white/5 font-button text-button transition-colors disabled:opacity-40">
            <span className={`material-symbols-outlined text-[18px] ${syncing ? 'animate-spin' : ''}`}>sync</span>
            {syncing ? 'Syncing...' : 'Sync Records'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed font-button text-button hover:bg-on-primary-fixed-variant transition-colors active:scale-[0.98]">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-5 border border-outline-variant/20 dark:border-white/10 shadow-[0_4px_12px_rgba(52,92,79,0.05)] flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">search</span>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search reports..." className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-outline-variant dark:border-white/15 bg-surface-container-low dark:bg-[#414845] text-on-background dark:text-surface-container-lowest font-inter text-body-md placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {types.map((tp) => (
            <button key={tp} onClick={() => setTypeFilter(tp)} className={`px-3 py-2 rounded-lg font-inter text-body-sm transition-colors ${typeFilter === tp ? 'bg-primary-container dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed' : 'bg-surface-container dark:bg-[#414845] text-on-surface-variant hover:bg-surface-container-high'}`}>{tp}</button>
          ))}
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl border border-outline-variant/20 dark:border-white/10 shadow-[0_4px_12px_rgba(52,92,79,0.05)] overflow-hidden">
        {loading ? (
          <div className="py-16 text-center"><span className="material-symbols-outlined text-[48px] text-outline/30 animate-spin block mb-4">progress_activity</span><p className="text-outline">Loading reports...</p></div>
        ) : filteredRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/20 dark:border-white/10">
                  <th className="text-left px-6 py-4 font-label-bold text-label-bold text-on-surface-variant dark:text-outline-variant uppercase">Report</th>
                  <th className="text-left px-6 py-4 font-label-bold text-label-bold text-on-surface-variant uppercase hidden md:table-cell">Date</th>
                  <th className="text-left px-6 py-4 font-label-bold text-label-bold text-on-surface-variant uppercase hidden lg:table-cell">Doctor</th>
                  <th className="text-left px-6 py-4 font-label-bold text-label-bold text-on-surface-variant uppercase">Status</th>
                  <th className="text-right px-6 py-4 font-label-bold text-label-bold text-on-surface-variant uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => {
                  const iconCfg = RECORD_ICONS[record.type] || RECORD_ICONS['Prescription'];
                  const statusCls = STATUS_STYLES[record.status] || STATUS_STYLES['Reviewed'];
                  return (
                    <tr key={record.id} className="border-b border-outline-variant/10 dark:border-white/5 hover:bg-surface-container-low dark:hover:bg-white/3 transition-colors cursor-pointer" onClick={() => router.push(`/patient/dashboard/reports/${record.id}`)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`${iconCfg.bg} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                            <span className="material-symbols-outlined text-on-primary text-[18px]">{iconCfg.icon}</span>
                          </div>
                          <div>
                            <p className="font-inter text-body-sm font-medium text-on-background dark:text-surface-container-lowest">{record.type}</p>
                            <p className="font-inter text-[12px] text-outline dark:text-outline-variant">{record.clinic}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-inter text-body-sm text-on-surface-variant hidden md:table-cell">{format(new Date(record.date), 'MMM d, yyyy')}</td>
                      <td className="px-6 py-4 font-inter text-body-sm text-on-surface-variant hidden lg:table-cell">{record.doctor}</td>
                      <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full font-label-bold text-[11px] ${statusCls}`}>{record.status}</span></td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary-container dark:text-primary-fixed-dim hover:underline font-inter text-body-sm" onClick={(e) => { e.stopPropagation(); router.push(`/patient/dashboard/reports/${record.id}`); }}>View</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <span className="material-symbols-outlined text-[48px] text-outline/30 block mb-4">folder_off</span>
            <p className="font-inter text-body-md text-on-surface-variant">{t('noReports', 'No reports available')}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}