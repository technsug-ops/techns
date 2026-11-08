import type { ReactNode, SVGProps } from "react";

const big = (children: ReactNode) => ({ viewBox: "0 0 48 48", strokeWidth: 2, children });
const small = (children: ReactNode, strokeWidth = 1.8) => ({ viewBox: "0 0 24 24", strokeWidth, children });

const icons = {
  arrow: small(<path d="M7 17 17 7M9 7h8v8" />, 2.2),
  next: small(<path d="M5 12h14M13 6l6 6-6 6" />, 2),
  check: small(<path d="m5 12.5 4.5 4.5L19 7.5" />, 2.4),
  phone: small(<><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></>),
  mail: small(<><path d="M3 11 21 3l-7 18-3-8-8-2Z" /><path d="m11 13 4-4" /></>),
  calendar: small(<><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4M8 15h3" /></>),
  pin: small(<><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></>),
  flow: big(<><rect x="4" y="6" width="14" height="10" rx="3" /><rect x="30" y="6" width="14" height="10" rx="3" /><rect x="17" y="32" width="14" height="10" rx="3" /><path d="M11 16v6h26v-6M24 22v10" /></>),
  code: big(<><rect x="4" y="8" width="40" height="30" rx="4" /><path d="M4 15h40M18 22l-5 5 5 5M30 22l5 5-5 5M26 21l-4 12" /></>),
  sync: big(<><path d="M8 20a16 16 0 0 1 29-7l3 4M40 28a16 16 0 0 1-29 7l-3-4" /><path d="M40 9v8h-8M8 39v-8h8" /><rect x="19" y="19" width="10" height="10" rx="2" /></>),
  data: big(<><ellipse cx="20" cy="10" rx="14" ry="5" /><path d="M6 10v24c0 3 6 5 14 5M34 10v9M6 22c0 3 6 5 14 5" /><circle cx="35" cy="34" r="7" /><path d="m40 39 5 5" /></>),
  measure: big(<><path d="M6 40h36M10 40V28M19 40V18M28 40V24M37 40V10" /><path d="m10 22 9-8 9 6 9-12" /></>),
  decide: big(<><path d="M24 44V26M24 26 12 14M24 26l12-12" /><path d="M6 14h12V4M30 4v10h12" /><circle cx="24" cy="26" r="3" /></>),
  anchor: big(<><path d="M24 4 8 10v12c0 10 7 18 16 22 9-4 16-12 16-22V10L24 4Z" /><path d="m16 24 6 6 11-12" /></>),
  api: big(<><circle cx="24" cy="24" r="6" /><circle cx="8" cy="10" r="4" /><circle cx="40" cy="10" r="4" /><circle cx="8" cy="38" r="4" /><circle cx="40" cy="38" r="4" /><path d="m11 13 8 7M37 13l-8 7M11 35l8-7M37 35l-8-7" /></>),
  lock: big(<><rect x="9" y="21" width="30" height="22" rx="4" /><path d="M15 21v-6a9 9 0 0 1 18 0v6M24 30v5" /></>),
  globe: big(<><circle cx="24" cy="24" r="19" /><path d="M5 24h38M24 5c5 5 8 12 8 19s-3 14-8 19c-5-5-8-12-8-19s3-14 8-19Z" /></>),
  mobile: big(<><rect x="13" y="4" width="22" height="40" rx="5" /><path d="M13 11h22M13 36h22M22 40h4" /><path d="m19 23 4 4 7-8" /></>),
  ai: big(<><rect x="12" y="12" width="24" height="24" rx="4" /><path d="M18 4v8M30 4v8M18 36v8M30 36v8M4 18h8M4 30h8M36 18h8M36 30h8" /><path d="m19 30 3.5-12h3L29 30M20.5 26h7" /></>),
  rocket: big(<><path d="M28 6c8 0 14 6 14 14L26 36l-14-14L28 6Z" /><circle cx="31" cy="17" r="4" /><path d="m12 22-7 2 6 6M26 36l-2 7-6-6M14 34l-6 6" /></>),
} as const;

export type IconName = keyof typeof icons;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

/** Linien-Icon. Dekorativ (aria-hidden), sofern kein aria-label übergeben wird. */
export function Icon({ name, ...rest }: Props) {
  const { viewBox, strokeWidth, children } = icons[name];
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={rest["aria-label"] ? undefined : true}
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}
