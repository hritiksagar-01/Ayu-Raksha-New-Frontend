// src/app/patient/dashboard/layout.tsx
'use client';

// The new Stitch-styled dashboard pages use DashboardLayout directly
// This Next.js layout is now a thin pass-through to avoid double-wrapping
export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}