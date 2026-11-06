import type { SiteContent } from '@/content/site';
import { Access, Close, Data, Hero, How, Modes, Myth, Problem, Rule } from './sections';

export function MinosPage({ content }: { content: SiteContent }) {
  return (
    <>
      <main id="top">
        <Hero c={content} />
        <Problem c={content} />
        <How c={content} />
        <Rule c={content} />
        <Myth c={content} />
        <Modes c={content} />
        <Access c={content} />
        <Data c={content} />
      </main>
      <Close c={content} />
    </>
  );
}
