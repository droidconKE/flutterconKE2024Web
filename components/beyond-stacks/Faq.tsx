import Link from 'next/link'

const questions = [
  {
    question: 'Can my company sponsor or send a whole team?',
    answer: (
      <>
        Yes, team discounts are available for groups of 5+. Request Team Invoice
        at{' '}
        <Link
          href="mailto:hello@droidcon.co.ke"
          className="text-primary dark:text-primary underline underline-offset-2"
        >
          hello@droidcon.co.ke
        </Link>
      </>
    ),
  },
  {
    question: 'Is the schedule fixed or on-the-day?',
    answer:
      'Unconference sessions are pre-curated by community leads to maintain high technical signal, unlike open-mic unconferences.',
  },
  {
    question: 'Will session recordings be available?',
    answer:
      'Panel debates and talks will be recorded, but live workshops and open discussions are strictly in-room experiences.',
  },
]

export const Faq = () => (
  <section
    className="s-container mt-16 md:mt-24 mb-12 md:mb-16"
    aria-labelledby="faq"
  >
    <h2
      id="faq"
      className="font-display text-accent dark:text-accent-dark text-4xl md:text-6xl leading-none pb-5 md:pb-6 border-b border-primary dark:border-accent-dark"
    >
      FAQ
    </h2>
    <dl className="mt-6 md:mt-8 space-y-4 md:space-y-5">
      {questions.map((item) => (
        // The cards stay white in both themes, so the text is pinned against
        // the global `p` rule.
        <div
          key={item.question}
          className="rounded-3xl bg-white border border-gray-200 dark:border-transparent px-6 py-6 md:px-8 md:py-7"
        >
          <dt className="text-primary dark:text-primary text-lg md:text-xl font-semibold leading-snug">
            {item.question}
          </dt>
          <dd className="mt-3 text-black dark:text-black text-sm md:text-base leading-relaxed">
            {item.answer}
          </dd>
        </div>
      ))}
    </dl>
  </section>
)
