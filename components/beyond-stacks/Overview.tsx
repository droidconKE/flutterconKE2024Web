import { SectionHeading } from './SectionHeading'

const facts = [
  {
    label: 'Format:',
    body: 'Discussion-first over slide decks.',
  },
  {
    label: 'Access:',
    body: 'Included with the All-Access Pass or available as a standalone track ticket.',
  },
  {
    label: 'Level',
    body: 'Sessions tagged Intro, Intermediate, or Advanced.',
  },
]

export const Overview = () => (
  <section className="s-container mt-12 md:mt-20" aria-labelledby="overview">
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6 lg:gap-16 items-start">
      <SectionHeading id="overview" title="Overview" />
      <div className="space-y-5 text-base md:text-lg leading-relaxed lg:pt-2">
        <p>
          The Beyond Stacks Track is a single, dedicated room running alongside
          Droidcon and Fluttercon. While Android and Flutter remain our core,
          modern engineering teams build across multiple technologies.
        </p>
        <p>
          This track brings together web, backend, iOS, React Native, DevOps,
          data, product, and AI engineers into one continuous, high-signal
          conversation.
        </p>
      </div>
    </div>

    {/* Fixed brand surface in both themes, so the text is pinned against the
        global `p` rule. The design's accent-on-blue labels would measure
        1.09:1 here, so the labels are white like the body. */}
    <dl className="mt-10 md:mt-12 w-full rounded-4xl bg-primary px-6 py-8 md:px-10 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-white/40">
      {facts.map((fact) => (
        <div key={fact.label} className="md:px-8 first:md:pl-0 last:md:pr-0">
          <dt className="flex items-center justify-between gap-4 text-white dark:text-white text-xl font-semibold">
            {fact.label}
            <i className="fa fa-long-arrow-right text-2xl" aria-hidden="true" />
          </dt>
          <dd className="mt-2 text-white dark:text-white text-base md:text-lg leading-snug">
            {fact.body}
          </dd>
        </div>
      ))}
    </dl>
  </section>
)
