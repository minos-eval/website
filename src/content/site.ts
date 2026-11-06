export type Locale = 'tr' | 'en';
export type SectionId = 'how' | 'rule' | 'minos' | 'access' | 'data';

/** Stays null until a publishable address exists. The closing link is not rendered without it. */
export const CONTACT_EMAIL: string | null = null;

export interface SiteContent {
  locale: Locale;
  meta: { title: string; description: string };
  nav: { id: SectionId; label: string }[];
  menu: { open: string; close: string; language: string; sections: string };
  hero: { title: string; lead: string };
  problem: {
    label: string;
    title: string;
    intro: string;
    items: { title: string; body: string }[];
    today: string;
    approach: string;
  };
  how: { title: string; steps: { title: string; body: string; human?: true }[] };
  rule: {
    title: string;
    statements: string[];
    example: {
      tag: string;
      rows: { label: string; value: string }[];
      verdict: { label: string; value: string };
    };
  };
  myth: { title: string; body: string };
  modes: { title: string; items: { name: string; body: string }[] };
  access: { title: string; steps: string[]; note: string };
  data: { title: string; body: string };
  close: { title: string; contactPlaceholder: string };
  credit: { photoLabel: string; edits: string; mural: string };
}

const tr: SiteContent = {
  locale: 'tr',
  meta: {
    title: 'MINOS',
    description: 'Kurumsal yapay zekâ asistanınızı kaynak koduna dokunmadan test eden değerlendirme ve izleme katmanı.',
  },
  nav: [
    { id: 'how', label: 'Nasıl çalışır' },
    { id: 'rule', label: 'Karar kuralı' },
    { id: 'minos', label: 'Neden Minos' },
    { id: 'access', label: 'Erişim' },
    { id: 'data', label: 'Veri güvenliği' },
  ],
  menu: { open: 'Menüyü aç', close: 'Menüyü kapat', language: 'Dil', sections: 'Sayfa bölümleri' },
  hero: {
    title: 'İki yargıç kararsız kalırsa, son söz sizin.',
    lead: 'MINOS, kurumsal yapay zekâ asistanınızı kaynak koduna dokunmadan test eder. Kurallar ve LLM judge puanlar, yalnızca belirsiz kalan cevaplar size gelir.',
  },
  problem: {
    label: 'Sorun',
    title: 'Klasik testler sabit bir doğru cevap varsayar. LLM uygulamalarında bu nadiren vardır.',
    intro:
      'Sohbet botları, kod inceleme botları ve test üreticileri artık günlük yazılımın parçası. Bunları değerlendirmek, sıradan yazılım testinin dayandığı varsayımları bozuyor.',
    items: [
      {
        title: 'Birden çok geçerli cevap',
        body: 'Çıktılar açık uçludur. İki farklı cevap da doğru olabilir, bu yüzden birebir eşleştirme gerçek hataları kaçırır ya da iyi cevapları yanlış işaretler.',
      },
      {
        title: 'Sonuçlar koşudan koşuya değişir',
        body: 'Aynı girdi her çalıştığında farklı bir cevap ve değerlendiriciden farklı bir karar üretebilir. Tek koşu kanıt değildir.',
      },
      {
        title: 'Judge her zaman haklı değildir',
        body: 'LLM-as-a-judge incelemeyi ölçekler, ama kararları insan uzmanlarla her zaman örtüşmez. Hiç denetlenmeyen bir judge gizli bir risktir.',
      },
    ],
    today: 'Bugün test ekipleri soruları hâlâ elle soruyor, cevapları elle notluyor.',
    approach:
      'MINOS bu sorunu olabildiğince deterministik hâle getirmeye çalışır. Vakalar değişmez revizyonlardır, kod kontrolleri her seferinde aynı çalışır, nihai kararı bir modelin izlenimi değil deterministik bir kural verir.',
  },
  how: {
    title: 'Nasıl çalışır',
    steps: [
      { title: 'Vakayı yazın', body: 'Soru, referans ve kriterler. Her değişiklik yeni bir revizyondur, eskisi değişmez.' },
      { title: 'Koşuyu başlatın', body: 'Hedefi, modeli ve judge’ı seçersiniz. Tek seferlik ya da zamanlanmış.' },
      { title: 'Cevaplar toplanır', body: 'Cevap, süre ve araç çağrıları asistanın API’sinden gelir.' },
      { title: 'Puanlanır', body: 'Kod kontrolleri ve LLM judge her metriği ayrı ayrı değerlendirir.' },
      {
        title: 'Yalnızca belirsizi siz etiketlersiniz',
        body: 'Makinenin emin olamadığı cevaplar size gelir, gerisi gelmez.',
        human: true,
      },
      { title: 'Etiket sonraki koşulara taşınır', body: 'Aynı cevap yeniden geldiğinde verdiğiniz etiket hatırlanır.' },
      { title: 'Baseline ile karşılaştırın', body: 'Her koşu, referans aldığınız koşuyla yan yana görünür.' },
    ],
  },
  rule: {
    title: 'Kararı bir izlenim değil, kural verir.',
    statements: [
      'Judge her metrik için geçti, kaldı ya da bilinmiyor yazar ve kanıtını ekler.',
      'Nihai karar bu sonuçlardan deterministik bir kuralla çıkar.',
      'Kritik kanıt yoksa sonuç “geçti” olmaz, needs_review olur.',
      'Ölçülemeyen metrik başarısız sayılmaz, hesaba katılmaz.',
    ],
    example: {
      tag: 'Örnek',
      rows: [
        { label: 'Soru', value: 'Tedarikçi sözleşmesinde fesih bildirimi kaç gün önce yapılır?' },
        { label: 'Cevap', value: '30 gün önce.' },
        { label: 'Doğruluk', value: 'Geçti. Referansla uyumlu.' },
        { label: 'Dayanak', value: 'Bilinmiyor. Cevap kaynak göstermedi.' },
      ],
      verdict: { label: 'Karar', value: 'needs_review. Kritik kanıt yok.' },
    },
  },
  myth: {
    title: 'Neden Minos?',
    body: 'Platon’un Gorgias diyaloğunda ölüleri üç yargıç yargılar. Diğer ikisi kararsız kalırsa son sözü Minos söyler. Burada da önce kurallar ve judge konuşur. Belirsiz kalan cevapta son söz sizindir.',
  },
  modes: {
    title: 'Judge’ın ne kadar söz sahibi olacağını siz seçersiniz.',
    items: [
      { name: 'Kapalı', body: 'Judge çalışmaz.' },
      { name: 'Öneri', body: 'Judge önerir, insan karar verir.' },
      { name: 'Otomatik', body: 'Judge’ın sonuçları karara doğrudan girer.' },
    ],
  },
  access: {
    title: 'Erişim adım adım genişler',
    steps: ['Elle toplanan cevapları içe aktarın.', 'Servis API’sine bağlanın.', 'Daha derin kayıtlara geçin.'],
    note: 'Başlamak için kaynak kod gerekmez. Her yeni hedef sistem için entegrasyon gerekir.',
  },
  data: {
    title: 'Cevaplar yalnızca sizin modellerinize gider.',
    body: 'Bu bir politika metni değil. Koşu başlarken ve her judge çağrısında kodla zorlanır.',
  },
  close: {
    title: 'Asistanınız için böyle bir değerlendirme kurmak isterseniz yazın.',
    contactPlaceholder: 'E-posta adresi yakında',
  },
  credit: {
    photoLabel: 'Fotoğraf:',
    edits: 'kırpıldı ve rötuşlandı.',
    mural: 'Duvar resmi: Carl Rahl ve Eduard Lebiedzki, Atina Üniversitesi.',
  },
};

const en: SiteContent = {
  locale: 'en',
  meta: {
    title: 'MINOS',
    description: 'An evaluation and monitoring layer that tests your enterprise AI assistant without touching its source code.',
  },
  nav: [
    { id: 'how', label: 'How it works' },
    { id: 'rule', label: 'Decision rule' },
    { id: 'minos', label: 'Why Minos' },
    { id: 'access', label: 'Access' },
    { id: 'data', label: 'Data security' },
  ],
  menu: { open: 'Open menu', close: 'Close menu', language: 'Language', sections: 'Page sections' },
  hero: {
    title: 'When two judges can’t decide, the last word is yours.',
    lead: 'MINOS tests your enterprise AI assistant without touching its source code. Rules and an LLM judge do the scoring, and only the answers that stay uncertain come to you.',
  },
  problem: {
    label: 'The problem',
    title: 'Conventional tests assume a stable right answer. LLM apps rarely have one.',
    intro:
      'Chatbots, code-review bots and test generators are now part of everyday software. Evaluating them breaks the assumptions that ordinary software testing relies on.',
    items: [
      {
        title: 'Many valid answers',
        body: 'Outputs are open-ended. Two different responses can both be correct, so exact-match checks miss real failures or flag good answers.',
      },
      {
        title: 'Results change between runs',
        body: 'The same input can produce a different answer, and a different verdict from the evaluator, every time it runs. One run is not evidence.',
      },
      {
        title: 'Judges are not always right',
        body: 'LLM-as-a-judge scales review, but its decisions do not always agree with human experts. A judge that is never checked becomes a hidden risk.',
      },
    ],
    today: 'Today, test teams still ask the questions by hand and grade the answers by hand.',
    approach:
      'MINOS works to make this problem as deterministic as it can. Cases are fixed revisions, code checks run the same way every time, and the final verdict comes from a deterministic rule, not a model’s impression.',
  },
  how: {
    title: 'How it works',
    steps: [
      { title: 'Write the case', body: 'Question, reference and criteria. Every change makes a new revision, the old one stays as it was.' },
      { title: 'Start the run', body: 'You choose the target, the model and the judge. One-off or scheduled.' },
      { title: 'Answers are collected', body: 'The answer, latency and tool calls come from the assistant’s API.' },
      { title: 'They are scored', body: 'Code checks and an LLM judge assess each metric separately.' },
      {
        title: 'You label only what stays uncertain',
        body: 'Answers the machine can’t be sure about come to you. The rest do not.',
        human: true,
      },
      { title: 'Labels carry to later runs', body: 'When the same answer comes back, your label is remembered.' },
      { title: 'Compare with the baseline', body: 'Every run appears next to the run you chose as your reference.' },
    ],
  },
  rule: {
    title: 'The verdict comes from a rule, not an impression.',
    statements: [
      'The judge writes pass, fail or unknown for each metric and attaches its evidence.',
      'The final verdict comes from these results through a deterministic rule.',
      'Without critical evidence the result is not “pass”, it becomes needs_review.',
      'A metric that can’t be measured is not a failure. It is left out.',
    ],
    example: {
      tag: 'Sample',
      rows: [
        { label: 'Question', value: 'How many days’ notice does the supplier contract require for termination?' },
        { label: 'Answer', value: '30 days.' },
        { label: 'Correctness', value: 'Pass. Matches the reference.' },
        { label: 'Grounding', value: 'Unknown. The answer cited no source.' },
      ],
      verdict: { label: 'Verdict', value: 'needs_review. No critical evidence.' },
    },
  },
  myth: {
    title: 'Why Minos?',
    body: 'In Plato’s Gorgias, three judges judge the dead. If the other two are in doubt, Minos has the last word. Here too, the rules and the judge speak first. For an answer that stays uncertain, the last word is yours.',
  },
  modes: {
    title: 'You choose how much say the judge has.',
    items: [
      { name: 'Off', body: 'The judge does not run.' },
      { name: 'Suggest', body: 'The judge suggests, a person decides.' },
      { name: 'Auto', body: 'The judge’s results go straight into the verdict.' },
    ],
  },
  access: {
    title: 'Access grows step by step',
    steps: ['Import answers collected by hand.', 'Connect to the service API.', 'Move on to deeper records.'],
    note: 'You don’t need source code to start. Each new target system needs an integration.',
  },
  data: {
    title: 'Answers only go to your own models.',
    body: 'This is not a policy statement. It is enforced in code at the start of a run and on every judge call.',
  },
  close: {
    title: 'If you want this kind of evaluation for your assistant, write to us.',
    contactPlaceholder: 'Email address coming soon',
  },
  credit: {
    photoLabel: 'Photo:',
    edits: 'cropped and retouched.',
    mural: 'Mural: Carl Rahl and Eduard Lebiedzki, University of Athens.',
  },
};

export const content: Record<Locale, SiteContent> = { tr, en };
