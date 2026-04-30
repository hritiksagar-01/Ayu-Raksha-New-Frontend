// src/app/patient/dashboard/doctors/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { translations } from '@/constants/translations';
import { getTranslation } from '@/lib/translations';
import { mockDoctors } from '@/lib/mockData';
import type { Doctor } from '@/types';
import DashboardLayout from '@/components/common/DashboardLayout';

const DOCTOR_IMAGES: Record<string, string> = {
  'Dr. Sarah Johnson': '/images/stitch/doctor-sarah.jpg',
  'Dr. Michael Chen': '/images/stitch/doctor-michael.jpg',
  'Dr. Emily Rodriguez': '/images/stitch/doctor-emily.jpg',
};

export default function FindDoctorsPage() {
  const router = useRouter();
  const { selectedLanguage } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [location, setLocation] = useState('Near Me');
  const [results, setResults] = useState<Doctor[]>(mockDoctors);
  const t = (key: string, fallback?: string) => getTranslation(translations, key, selectedLanguage, fallback);

  useEffect(() => {
    const filtered = mockDoctors.filter((item) => {
      const termMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const specialtyFilterMatch = specialty === 'All' || item.specialty === specialty;
      const locationFilterMatch = location === 'Near Me' || item.location === location;
      return termMatch && specialtyFilterMatch && locationFilterMatch;
    });
    setResults(filtered);
  }, [searchTerm, specialty, location]);

  const specialties = ['All', 'General Physician', 'Cardiologist', 'Pediatrician', 'Dermatologist'];
  const locations = ['Near Me', 'Mumbai', 'Delhi', 'Kochi'];

  return (
    <DashboardLayout>
      {/* Header */}
      <div>
        <h1 className="font-newsreader text-h2 text-on-background dark:text-surface-container-lowest">{t('findDoctors', 'Find a Doctor')}</h1>
        <p className="font-inter text-body-md text-on-surface-variant dark:text-outline-variant mt-1">{t('findDoctorsDescription', 'Search for specialists and book appointments')}</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-6 border border-outline-variant/20 dark:border-white/10 shadow-[0_4px_12px_rgba(52,92,79,0.05)] space-y-4">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">search</span>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name, specialty, or condition..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-outline-variant dark:border-white/15 bg-surface-container-low dark:bg-[#414845] text-on-background dark:text-surface-container-lowest font-inter text-body-md placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container transition-all" />
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Specialty chips */}
          <div className="flex flex-wrap gap-2">
            {specialties.map((s) => (
              <button key={s} onClick={() => setSpecialty(s)} className={`px-4 py-2 rounded-full font-inter text-body-sm transition-colors ${specialty === s ? 'bg-primary-container dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed' : 'bg-surface-container dark:bg-[#414845] text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-white/10'}`}>{s}</button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="material-symbols-outlined text-outline text-[18px]">location_on</span>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="bg-transparent font-inter text-body-sm text-on-surface-variant dark:text-outline-variant border-none focus:outline-none cursor-pointer">
              {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.length > 0 ? results.map((doctor) => (
          <div key={doctor.id} className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl border border-outline-variant/20 dark:border-white/10 shadow-[0_4px_12px_rgba(52,92,79,0.05)] overflow-hidden hover:-translate-y-1 transition-transform group">
            {/* Doctor Image */}
            <div className="relative h-48 bg-surface-container dark:bg-[#414845] overflow-hidden">
              {DOCTOR_IMAGES[doctor.name] ? (
                <Image src={DOCTOR_IMAGES[doctor.name]} alt={doctor.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[64px] text-outline/20">person</span>
                </div>
              )}
              <div className="absolute top-3 right-3 bg-surface-container-lowest/90 dark:bg-inverse-surface/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined icon-fill text-warm-gold text-[14px]">star</span>
                <span className="font-inter text-body-sm font-medium text-on-background dark:text-surface-container-lowest">{doctor.rating.toFixed(1)}</span>
              </div>
            </div>
            {/* Doctor Info */}
            <div className="p-5">
              <h3 className="font-newsreader text-lg font-semibold text-on-background dark:text-surface-container-lowest mb-1">{doctor.name}</h3>
              <p className="font-inter text-body-sm text-primary-container dark:text-primary-fixed-dim font-medium mb-2">{doctor.specialty}</p>
              <div className="flex items-center gap-1 text-outline dark:text-outline-variant mb-4">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span className="font-inter text-body-sm">{doctor.distance}</span>
              </div>
              <button onClick={() => router.push(`/patient/dashboard/doctors/${doctor.id}`)} className="w-full bg-primary-container/10 dark:bg-primary-fixed/10 text-primary-container dark:text-on-primary-container py-2.5 rounded-lg font-button text-button hover:bg-primary-container hover:text-on-primary dark:hover:bg-primary-fixed-dim dark:hover:text-on-primary-fixed transition-colors active:scale-[0.98]">
                Book Appointment
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-12 text-center border border-outline-variant/20 dark:border-white/10">
            <span className="material-symbols-outlined text-[48px] text-outline/30 mb-4 block">person_search</span>
            <p className="font-inter text-body-md text-on-surface-variant">{t('noDoctorsFound', 'No doctors found matching your criteria')}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}