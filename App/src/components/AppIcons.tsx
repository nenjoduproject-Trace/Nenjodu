type IconProps = {
  className?: string;
};

export function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M12 29.5 32 12l20 17.5v20.5A4 4 0 0 1 48 54H38v-16H26v16H16a4 4 0 0 1-4-4V29.5Z" fill="currentColor" opacity="0.92"/>
      <path d="M8 30 32 9l24 21" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ExploreIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M15 16c0-2.2 1.8-4 4-4h26c2.2 0 4 1.8 4 4v22c0 2.2-1.8 4-4 4H35l-7 10-7-10H19c-2.2 0-4-1.8-4-4V16Z" fill="currentColor" opacity="0.15"/>
      <path d="M18 16h28a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4h-8l-6 8-6-8h-8a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4Z" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M24 25h16M24 32h16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  );
}

export function AskIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M18 19.5c0-5.2 4.3-9.5 9.5-9.5h9c5.2 0 9.5 4.3 9.5 9.5v12c0 5.2-4.3 9.5-9.5 9.5H28l-10 10v-10c-5.3 0-9.5-4.3-9.5-9.5v-12Z" fill="currentColor" opacity="0.14"/>
      <path d="M18 19.5A9.5 9.5 0 0 1 27.5 10h9A9.5 9.5 0 0 1 46 19.5v12A9.5 9.5 0 0 1 36.5 41H27l-9 9v-9a9.5 9.5 0 0 1-9-9.5v-12Z" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round"/>
      <circle cx="24" cy="25" r="2.3" fill="currentColor"/>
      <circle cx="32" cy="25" r="2.3" fill="currentColor"/>
      <circle cx="40" cy="25" r="2.3" fill="currentColor"/>
    </svg>
  );
}

export function PracticeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M12 48h40v6H12zM17 48V28c0-8 6-14 15-14s15 6 15 14v20" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 26h20M18 35h28" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round"/>
      <path d="M32 14V6M25 18l-5-5M39 18l5-5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round"/>
    </svg>
  );
}

export function QuranIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M18 14h22a6 6 0 0 1 6 6v26a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6Z" fill="currentColor" opacity="0.12"/>
      <path d="M18 14h22a6 6 0 0 1 6 6v26a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6Z" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round"/>
      <path d="M22 24h18M22 32h12M22 40h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M35 14v38" stroke="currentColor" strokeWidth="3" opacity="0.6"/>
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="28" cy="28" r="16" fill="none" stroke="currentColor" strokeWidth="4"/>
      <path d="m40 40 12 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      <path d="M22 28h12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.35"/>
    </svg>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="7" fill="currentColor"/>
      <path d="M32 9v8M32 47v8M9 32h8M47 32h8M16.6 16.6l5.7 5.7M41.7 41.7l5.7 5.7M47.4 16.6l-5.7 5.7M22.3 41.7l-5.7 5.7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IslamicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 46c10.5 0 19-8.5 19-19S42.5 8 32 8 13 16.5 13 27s8.5 19 19 19Z" fill="currentColor" opacity="0.1"/>
      <path d="M32 12c9.4 0 17 7.6 17 17s-7.6 17-17 17S15 38.4 15 29s7.6-17 17-17Z" fill="none" stroke="currentColor" strokeWidth="3"/>
      <path d="M32 20v18M23 29h18M26 18c2.7 2.7 6 4 9 4 3.3 0 6.6-1.4 9-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}
