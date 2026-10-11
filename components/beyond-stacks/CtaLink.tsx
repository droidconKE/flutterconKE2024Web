import { ReactNode } from 'react'

// Every call to action on the page opens the ticket shop in a new tab and
// carries the same outward arrow, so the link and its icon live together.
export const CtaLink = ({
  href,
  variant = 'primary',
  compact = false,
  children,
}: {
  href: string
  // eslint-disable-next-line react/require-default-props
  variant?: 'primary' | 'accent'
  // eslint-disable-next-line react/require-default-props
  compact?: boolean
  children: ReactNode
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${variant === 'accent' ? 'btn-accent' : 'btn-primary'} whitespace-nowrap ${
      compact ? 'text-xs md:text-sm px-5 py-2.5' : ''
    }`}
  >
    {children}
    <svg
      className="w-4 h-4 ml-2 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H16V12M16 6L6 16"
      />
    </svg>
  </a>
)
