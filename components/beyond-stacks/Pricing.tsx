import { TICKETS_LINK } from '../../constant/constants'
import { CtaLink } from './CtaLink'
import { SectionHeading } from './SectionHeading'

const passes = [
  {
    name: 'Beyond Stacks Side Event Pass Only',
    price: 'KES 7,500',
    access: 'Full 2-day access to The Unconference Track only',
    cta: 'Get Unconference Pass only',
    bestValue: false,
  },
  {
    name: 'Full Access Pass',
    price: 'KES 10,000',
    access:
      'Full 2-day access to Unconference + Droidcon Kenya + Fluttercon Kenya',
    cta: 'Get Full Pass',
    bestValue: true,
  },
]

export const Pricing = () => (
  <section className="s-container mt-16 md:mt-24" aria-labelledby="pricing">
    <SectionHeading id="pricing" title="Pricing & Passes">
      <CtaLink href={TICKETS_LINK} compact>
        Get Unconference Ticket
      </CtaLink>
    </SectionHeading>

    {/* A ticket: the rows share one blue stub, the foot fades into the accent,
        and the perforation between them is cut by two page-coloured discs. */}
    <ul className="relative overflow-hidden w-full rounded-4xl bg-gradient-to-b from-primary from-80% to-accent">
      {passes.map((pass, index) => (
        <li
          key={pass.name}
          className={`relative grid grid-cols-1 lg:grid-cols-[1.4fr_0.7fr_1.2fr] gap-5 lg:gap-8 items-center px-6 py-8 md:px-10 md:py-10 ${
            index > 0 ? 'border-t border-white/60' : ''
          }`}
        >
          {index > 0 && (
            <>
              <span
                aria-hidden="true"
                className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-white dark:bg-black-dark"
              />
              <span
                aria-hidden="true"
                className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-white dark:bg-black-dark"
              />
            </>
          )}
          <div>
            <h3 className="text-white dark:text-white text-xl md:text-2xl leading-snug">
              {pass.name}
            </h3>
            {pass.bestValue && (
              <span className="mt-3 inline-flex items-center rounded-full bg-accent text-black text-xs font-semibold px-3 py-1">
                <i className="fa fa-star mr-1.5" aria-hidden="true" />
                Best Value
              </span>
            )}
          </div>
          <p className="text-white dark:text-white text-xl md:text-2xl">
            {pass.price}
          </p>
          <div>
            <p className="text-white dark:text-white text-base md:text-lg leading-snug">
              {pass.access}
            </p>
            <div className="mt-4">
              <CtaLink href={TICKETS_LINK} variant="accent" compact>
                {pass.cta}
              </CtaLink>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </section>
)
