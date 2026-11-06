export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M14.4 5.2C10.4 7 6.4 7 2 5.6c2.5 6.6 2.5 14.2 0 20.8 4.4-1.4 8.4-1.4 12.4.4z" fill="#1b1714" />
      <path d="M17.6 5.2c4 1.8 8 1.8 12.4.4-2.5 6.6-2.5 14.2 0 20.8-4.4-1.4-8.4-1.4-12.4.4z" fill="#8f2a22" />
      <rect x="15.1" y="2" width="1.8" height="28" rx=".9" fill="#1b1714" />
    </svg>
  );
}
