import { Commissioner } from 'next/font/google';

export const commissioner = Commissioner({
  subsets: ['latin', 'latin-ext', 'greek'],
  axes: ['FLAR', 'VOLM'],
  display: 'swap',
  variable: '--font-commissioner',
});
