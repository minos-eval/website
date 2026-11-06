import type { ReactNode } from 'react';
import { RootDocument } from '@/components/RootDocument';

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
