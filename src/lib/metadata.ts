import type { Metadata } from 'next';
import { withBase } from './base-path';
import { content, localePath, type Locale } from '@/content/site';

export function metadataFor(locale: Locale): Metadata {
  const { title, description } = content[locale].meta;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.invalid'),
    title,
    description,
    alternates: {
      canonical: withBase(localePath[locale]),
      languages: { en: withBase(localePath.en), tr: withBase(localePath.tr), 'x-default': withBase(localePath.en) },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      images: [{ url: withBase('/art/og.jpg'), width: 1200, height: 630 }],
    },
  };
}
