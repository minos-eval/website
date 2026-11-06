import type { ReactNode } from 'react';
import { RootDocument } from '@/components/RootDocument';

export default function TurkishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="tr">{children}</RootDocument>;
}
