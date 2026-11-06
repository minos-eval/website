import type { ReactNode } from 'react';
import { RootDocument } from '@/components/RootDocument';
import { metadataFor } from '@/lib/metadata';

export const metadata = metadataFor('en');

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
