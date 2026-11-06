import type { ReactNode } from 'react';
import { commissioner } from '@/lib/font';
import '@/app/globals.css';

export function RootDocument({ locale, children }: { locale: 'tr' | 'en'; children: ReactNode }) {
  return (
    <html lang={locale} className={commissioner.variable}>
      <body>{children}</body>
    </html>
  );
}
