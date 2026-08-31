interface IconProps {
  className?: string;
}

// Each glyph is a self-contained colored badge (fixed brand color, not
// currentColor) so social icons stay recognizable and colorful regardless of
// theme or hover state.

export function GithubGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#181717" />
      <path
        fill="#ffffff"
        d="M12 4.3c-4.4 0-8 3.58-8 8 0 3.54 2.29 6.53 5.47 7.59.4.08.55-.17.55-.38 0-.19-.01-.7-.01-1.36-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.01 8.01 0 0 0 20 12.3c0-4.42-3.6-8-8-8Z"
      />
    </svg>
  );
}

export function LinkedinGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#0A66C2" />
      <path
        fill="#ffffff"
        d="M7.75 9.5h2.4v8.3h-2.4V9.5Zm1.2-3.85a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Zm3.4 3.85h2.3v1.13h.03c.32-.6 1.1-1.24 2.27-1.24 2.43 0 2.88 1.6 2.88 3.68v4.73h-2.4v-4.2c0-1-.02-2.28-1.39-2.28-1.4 0-1.61 1.09-1.61 2.21v4.27h-2.4V9.5Z"
      />
    </svg>
  );
}

export function TwitterXGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#000000" />
      <path
        fill="#ffffff"
        d="M6.2 6.2 11 12.7 6.1 17.8h1.5l4.3-4.6 3.5 4.6h3.5l-5.1-6.9 4.6-4.7h-1.5l-3.9 4.3-3.3-4.3H6.2Zm2.2 1.1h1.6l6.4 8.6h-1.6L8.4 7.3Z"
      />
    </svg>
  );
}

export function InstagramGlyph({ className }: IconProps) {
  const gradientId = "instagram-gradient";
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="24" x2="24" y2="0">
          <stop offset="0%" stopColor="#FEE440" />
          <stop offset="35%" stopColor="#F0356B" />
          <stop offset="70%" stopColor="#C1247E" />
          <stop offset="100%" stopColor="#5B51D8" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill={`url(#${gradientId})`} />
      <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#ffffff" strokeWidth="1.6" />
      <circle cx="16" cy="8" r="0.9" fill="#ffffff" />
    </svg>
  );
}

export function YoutubeGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path fill="#ffffff" d="M10 8.3v7.4l6.4-3.7-6.4-3.7Z" />
    </svg>
  );
}

export function LeetcodeGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#1A1A1A" />
      <path
        fill="none"
        stroke="#FFA116"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.5 6.5 9 12l5.5 5.5"
      />
      <path fill="none" stroke="#FFA116" strokeWidth="1.8" strokeLinecap="round" d="M9 12h6" />
    </svg>
  );
}

export function BookGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#D97706" />
      <path
        fill="#ffffff"
        d="M12 8.2c-.9-.7-2.2-1.1-3.6-1.1-.9 0-1.7.1-2.4.4v8.6c.7-.3 1.5-.4 2.4-.4 1.4 0 2.7.4 3.6 1.1V8.2Zm0 0c.9-.7 2.2-1.1 3.6-1.1.9 0 1.7.1 2.4.4v8.6c-.7-.3-1.5-.4-2.4-.4-1.4 0-2.7.4-3.6 1.1"
        stroke="#ffffff"
        strokeWidth="0.4"
      />
    </svg>
  );
}

export function JournalGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#059669" />
      <rect x="6" y="5.5" width="12" height="13" rx="1.2" fill="#ffffff" fillOpacity="0.15" stroke="#ffffff" strokeWidth="1.4" />
      <path d="M8.5 9h7M8.5 12h7M8.5 15h4.5" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
