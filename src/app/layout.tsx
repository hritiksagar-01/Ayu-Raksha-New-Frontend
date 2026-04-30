// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Ayu-Raksha — Healthcare Management Portal',
  description:
    'A seamless, holistic healthcare management platform connecting patients with elite practitioners. Manage health records, book appointments, and access AI-assisted wellness insights.',
  keywords: ['healthcare', 'medical records', 'patient portal', 'doctor portal', 'AI health assistant', 'telemedicine'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Material Symbols Outlined */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${newsreader.variable} font-inter bg-background text-on-background min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}