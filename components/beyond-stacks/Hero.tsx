import { TICKETS_LINK } from '../../constant/constants'
import { CtaLink } from './CtaLink'

export const Hero = () => (
  <section className="s-container pt-6 md:pt-12">
    <div
      className="relative isolate overflow-hidden w-full rounded-4xl md:rounded-5xl bg-cover bg-center min-h-[26rem] md:min-h-[32rem] flex items-center"
      style={{
        backgroundImage: "url('/images/new-design/revised/happy-smiley.png')",
      }}
    >
      {/* The brand wash sits over the photo, solid at the text end and open
          over the faces, the way the design fades its gradient into the crowd. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-accent from-15% via-accent/70 via-55% to-primary/30"
      />
      <div className="px-6 py-10 md:px-16 md:py-16 max-w-4xl">
        <h1 className="font-display text-white dark:text-white text-4xl md:text-5xl lg:text-6xl leading-none">
          Beyond Stacks Track
        </h1>
        <p className="mt-4 md:mt-6 text-white dark:text-white text-xl md:text-2xl font-semibold leading-snug max-w-xl">
          A shared 3rd track across both conference days for the entire
          engineering ecosystem.
        </p>
        <div className="mt-8 md:mt-12">
          <CtaLink href={TICKETS_LINK} variant="accent">
            Get Unconference Ticket
          </CtaLink>
        </div>
      </div>
    </div>
  </section>
)
