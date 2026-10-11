import { ReactNode } from 'react'

// The page's section openers: a display heading on the left and, when a
// section has one, a ticket call to action on the right.
export const SectionHeading = ({
  id,
  title,
  tone = 'accent',
  children,
}: {
  id: string
  title: string
  // eslint-disable-next-line react/require-default-props
  tone?: 'accent' | 'neutral'
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode
}) => (
  <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-10">
    <h2
      id={id}
      className={`font-display text-4xl md:text-6xl leading-none ${
        tone === 'accent'
          ? 'text-accent dark:text-accent-dark'
          : 'text-black dark:text-white-dark'
      }`}
    >
      {title}
    </h2>
    {children}
  </div>
)
