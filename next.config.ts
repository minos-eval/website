import type { NextConfig } from 'next';

/** Set only while the site lives at a sub-path such as github.io/website. Leave empty on a custom domain. */
const basePath = process.env.BASE_PATH ?? '';

const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default config;
