import type { Metadata } from 'next';
import { content, type Locale } from '@/content/site';

export function metadataFor(locale: Locale): Metadata {
  const { title, description } = content[locale].meta;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.invalid'),
    title,
    description,
    alternates: {
      canonical: locale === 'tr' ? '/' : '/en',
      languages: { tr: '/', en: '/en' },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      images: [{ url: '/art/og.jpg', width: 1200, height: 630 }],
    },
  };
}
