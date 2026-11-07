export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="12" fill="#0F2E2B" />
      <path d="M11 14h18M20 14v14" stroke="#4DC3B5" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="29" cy="27" r="3" fill="#F8A11C" />
    </svg>
  );
}
