import type { ReactNode } from 'react'
import { TicketLink, type TicketLinkVariant } from './TicketLink'

type SectionTitleProps = {
  id: string
  children: ReactNode
  // eslint-disable-next-line react/require-default-props
  colorClassName?: string
}

export const SectionTitle = ({
  id,
  children,
  colorClassName = 'text-primary dark:text-accent',
}: SectionTitleProps) => (
  <h2
    id={id}
    className={`font-display text-4xl md:text-6xl leading-none ${colorClassName}`}
  >
    {children}
  </h2>
)

type SectionHeaderProps = Omit<SectionTitleProps, 'children'> & {
  title: string
  ctaVariant: TicketLinkVariant
}

export const SectionHeader = ({
  title,
  ctaVariant,
  ...titleProps
}: SectionHeaderProps) => (
  <div className="flex flex-wrap items-center justify-between gap-4 mb-12 sm:mb-20">
    <SectionTitle {...titleProps}>{title}</SectionTitle>
    <TicketLink
      variant={ctaVariant}
      className="text-xs md:text-sm px-6 py-2.5 md:py-4"
    >
      Get Unconference Ticket
    </TicketLink>
  </div>
)
