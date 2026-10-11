import { TICKETS_LINK } from '../../constant/constants'
import { CtaLink } from './CtaLink'
import { SectionHeading } from './SectionHeading'

const strands = [
  {
    name: 'Agentic Engineering (Flagship Strand)',
    focus:
      'Building, testing, and shipping with AI agents in large, existing codebases.',
    topics: [
      'Output verification and self-running quality gates (linting, typed boundaries, automated testing).',
      'Device & emulator automation via Model Context Protocol (MCP).',
      'Team-wide agent rollout: shared configurations, context engineering, and coding standards.',
      'Eliminating low-quality AI code generation in code reviews.',
      'Real-world post-mortems: What we stopped letting agents do in production.',
    ],
    flagship: true,
  },
  {
    name: 'iOS / Swift',
    focus: 'Native iOS development and modern client architecture.',
    topics: [
      'Key Topics: VIPER, MVVM, MVI, state management, and Swift ecosystem updates (~4 curated sessions).',
    ],
    flagship: false,
  },
  {
    name: 'React Native',
    focus: 'Cross-platform engineering at scale.',
    topics: [
      'Key Topics: Performance optimization, native module bridging, and architecture patterns (~4 curated sessions).',
    ],
    flagship: false,
  },
  {
    name: 'Ecosystem & Infrastructure',
    focus: 'Supporting technologies that power modern applications.',
    topics: [
      'Key Topics: API design, cloud/DevOps pipelines, data infrastructure, and product-engineering collaboration.',
    ],
    flagship: false,
  },
]

export const CommunityStrands = () => (
  <section
    className="s-container mt-16 md:mt-24"
    aria-labelledby="community-strands"
  >
    <SectionHeading id="community-strands" title="Community Strands">
      <CtaLink href={TICKETS_LINK} variant="accent" compact>
        Get Unconference Ticket
      </CtaLink>
    </SectionHeading>

    {/* The flagship strand runs the full height of the right-hand stack. */}
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      {strands.map((strand) => (
        <li
          key={strand.name}
          className={`rounded-4xl px-6 py-8 md:px-8 md:py-10 bg-gradient-to-b from-primary from-70% to-accent ${
            strand.flagship ? 'md:row-span-3' : ''
          }`}
        >
          <h3 className="font-display text-white dark:text-white text-2xl md:text-3xl leading-tight">
            {strand.name}
          </h3>
          <p className="mt-4 text-white dark:text-white text-base md:text-lg leading-snug">
            <span className="font-semibold">Core Focus: </span>
            {strand.focus}
          </p>
          <ul className="mt-5 space-y-4 list-[square] pl-5 marker:text-white text-white dark:text-white text-sm md:text-base leading-relaxed">
            {strand.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </section>
)
