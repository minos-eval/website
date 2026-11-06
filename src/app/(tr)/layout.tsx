import type { ReactNode } from 'react';
import { RootDocument } from '@/components/RootDocument';
import { metadataFor } from '@/lib/metadata';

export const metadata = metadataFor('tr');

export default function TurkishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="tr">{children}</RootDocument>;
}
