import type { SiteContent } from '@/content/site';
import { Painting } from './Painting';
import { Access, Close, Data, Hero, How, Modes, Myth, Problem, Rule } from './sections';
import { SiteHeader } from './SiteHeader';

export function MinosPage({ content }: { content: SiteContent }) {
  return (
    <>
      <Painting />
      <SiteHeader content={content} />
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
