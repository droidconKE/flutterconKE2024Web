import { TICKETS_LINK } from '../../constant/constants'
import { CtaLink } from './CtaLink'
import { SectionHeading } from './SectionHeading'

const audiences = [
  {
    title: 'Platform & Cross-Platform Developers',
    body: 'Engineers seeking deep architectural sessions.',
  },
  {
    title: 'Backend, Cloud & Data Engineers',
    body: 'Practitioners looking to align systems, APIs, and infrastructure with modern client apps.',
  },
  {
    title: 'AI & Agentic Tooling Leads',
    body: 'Engineers integrating production AI agents, MCPs, and automated workflows into existing stacks.',
  },
  {
    title: 'Seniors & Engineers',
    body: 'Experienced technical leads focused on debate, architecture trade-offs, and real-world war stories.',
  },
]

export const WhoItsFor = () => (
  <section className="s-container mt-16 md:mt-24" aria-labelledby="who-its-for">
    <SectionHeading id="who-its-for" title="Who It’s Built For" tone="neutral">
      <CtaLink href={TICKETS_LINK} variant="accent" compact>
        Get Unconference Ticket
      </CtaLink>
    </SectionHeading>

    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {audiences.map((audience) => (
        <li
          key={audience.title}
          // The cards stay white in both themes and fade into the accent at
          // the foot, so their text is pinned against the global `p` rule.
          className="rounded-4xl bg-gradient-to-b from-white from-60% to-accent px-5 py-6 md:px-6 md:py-8"
        >
          <h3 className="text-primary dark:text-primary text-xl md:text-2xl font-semibold leading-tight">
            {audience.title}
          </h3>
          <p className="mt-5 md:mt-8 text-black dark:text-black text-base md:text-lg leading-snug">
            {audience.body}
          </p>
        </li>
      ))}
    </ul>
  </section>
)
