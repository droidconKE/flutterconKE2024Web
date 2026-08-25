import type { NextPage } from 'next'
import { Organizer } from '../types/types'
import OrganizingTeam from '../components/about/Team'
import axios from '../utils/axios'
import Organizers from '../components/home/Organizers'

interface AboutProps {
  organizers: Organizer[]
}

const About: NextPage<AboutProps> = ({ organizers }) => {
  const team = organizers.filter((o) => o.type === 'individual')
  const company = organizers.filter((o) => o.type === 'company')
  return (
    <div className="min-h-screen">
      <section className="s-container pt-6 md:pt-12 sm:pb-0">
        <div className="w-full rounded-4xl md:rounded-5xl bg-gradient-to-b from-primary from-85% to-accent px-6 py-8 md:px-10 md:py-12">
          <div>
            <div className="flex flex-wrap md:flex-nowrap items-start gap-8">
              <div className="w-full md:flex-1 md:min-w-0">
                <h1 className="sr-only">about flutterconke</h1>
                <h2 className="font-display text-white dark:text-white text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-[0.92] tracking-tight">
                  Africa&apos;s
                  <br />
                  Largest Mobile
                  <br />
                  Developer
                  <br />
                  Conference.
                </h2>
              </div>
              <div className="w-full md:w-auto flex justify-center md:justify-end shrink-0">
                <img
                  className="w-32 md:w-56 lg:w-72 xl:w-[22rem] h-auto object-contain"
                  src="/images/new-design/fcke-icon.png"
                  alt=""
                />
              </div>
            </div>
            <div className="mt-6 md:mt-8 lg:columns-2 lg:gap-10">
              <p className="text-white dark:text-white text-sm md:text-base leading-relaxed">
                Fluttercon is a global conference focused on the engineering of
                mobile applications, part of next.app devCon. It provides a
                forum for developers to network, share techniques, announce apps
                and products, and learn and teach.
                <br />
                <br />
                Fluttercon Kenya brought Fluttercon to the African continent for
                the first time in 2024. Now in its 3rd edition, it takes place
                November 5th and 6th, 2026, at PrideInn Azure Hotel in Nairobi.
                <br />
                <br />
                Fluttercon Kenya is part of next.app devCon, the global home of
                Fluttercon, Droidcon and the wider mobile developer community.
                <br /> <br />
                Our 2026 theme is Beyond Stacks. Cross-platform work no longer
                stops at one codebase, and the interesting problems sit at the
                edges, in tooling, in AI-assisted workflows, in what runs
                natively underneath. Fluttercon Kenya is where the Flutter side
                of that conversation happens.
                <br />
                <br />
                The 2025 edition proved the demand: Fluttercon grew to 34.2% of
                total attendance, and Flutter submissions (92) outnumbered
                Android submissions (89) for the first time. Co-located with
                Droidcon Kenya, the two events form Africa&apos;s largest
                gathering of mobile developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="s-container mt-4 md:mt-6 sm:pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <img
            className="w-full h-auto object-contain"
            src="/images/new-design/revised/happy-smiley.png"
            alt="Fluttercon Kenya attendees posing together"
          />
          <img
            className="w-full h-auto object-contain"
            src="/images/new-design/revised/sponsor-booth.png"
            alt="Attendees at a sponsor booth during Fluttercon Kenya"
          />
        </div>
      </section>

      <section className="s-container mt-4 md:mt-6">
        <div className="w-full rounded-4xl md:rounded-5xl bg-primary px-6 py-8 md:px-10 md:py-12">
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            <div className="w-full md:flex-1">
              <h3 className="font-display text-2xl md:text-4xl leading-tight md:leading-none text-white dark:text-white">
                HOW IT STARTED
              </h3>
              <p className="mt-4 text-white dark:text-white text-sm md:text-base leading-relaxed">
                The signal came from our own stage. During the 3rd and 4th
                editions of Droidcon Kenya, Flutter sessions and Flutter
                attendees grew sharply. In 2023, Droidcon Kenya received 67
                Flutter submissions and selected 17 of them: 12 sessions, 3
                workshops and 2 lightning talks.
                <br /> <br /> The community had outgrown a few slots on someone
                else&apos;s agenda, so in 2024 we gave it a conference.
                Africa&apos;s first Fluttercon.
              </p>
            </div>
            <div className="w-full md:w-[28%] flex justify-center shrink-0">
              <img
                className="w-36 md:w-full max-w-[220px] h-auto object-contain"
                src="/images/new-design/revised/legacy-dcke-logo.png"
                alt="The original droidcon Kenya logo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hidden for now — confirmed out, may return. Do not delete. */}
      {/*
      <section className="s-container mt-4 md:mt-6">
        <div className="w-full rounded-4xl md:rounded-5xl bg-primary px-6 py-8 md:px-10 md:py-12">
          <h3 className="font-display text-2xl md:text-4xl leading-tight md:leading-none text-white dark:text-white">
            Tickets
          </h3>
          <p className="mt-4 text-white dark:text-white text-sm md:text-base leading-relaxed max-w-3xl">
            One ticket, two conferences. A ticket to Fluttercon Kenya
            automatically registers you for the co-located Droidcon Kenya.
          </p>
          <p className="font-display text-white dark:text-white text-xl md:text-2xl mt-6 md:mt-8">
            In 2026, Expect:
          </p>
          <ul className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 list-disc pl-5 marker:text-white/70">
            <li className="text-white dark:text-white text-sm md:text-base">
              2 days of Flutter and Dart content
            </li>
            <li className="text-white dark:text-white text-sm md:text-base">
              Developer Keynotes
            </li>
            <li className="text-white dark:text-white text-sm md:text-base">
              A dedicated Fluttercon Kenya track
            </li>
            <li className="text-white dark:text-white text-sm md:text-base">
              An unconference track, shared across both conferences
            </li>
            <li className="text-white dark:text-white text-sm md:text-base">
              Panel discussions with Flutter engineering leaders
            </li>
            <li className="text-white dark:text-white text-sm md:text-base">
              Interactive morning engagement sessions
            </li>
            <li className="text-white dark:text-white text-sm md:text-base">
              Networking with Flutter and Dart developers from across the region
            </li>
            <li className="text-white dark:text-white text-sm md:text-base">
              Advanced, practical skill development
            </li>
          </ul>
        </div>
      </section>

      <section className="s-container mt-4 md:mt-6">
        <div className="w-full rounded-4xl md:rounded-5xl bg-primary px-6 py-8 md:px-10 md:py-12">
          <h3 className="font-display text-2xl md:text-4xl leading-tight md:leading-none text-white dark:text-white">
            <span>Event</span> <span>Highlights</span>
          </h3>
          <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h4 className="font-display text-white dark:text-white text-xl md:text-2xl">
                <span>1. Beyond the Sessions</span>
              </h4>
              <p className="mt-3 text-white dark:text-white text-sm md:text-base leading-relaxed">
                The unconference track, shared with Droidcon Kenya, opens the
                floor to attendee-driven discussions and lightning talks, with
                agentic engineering as the anchor theme. Panels bring Flutter
                engineering leaders together on the evolving cross-platform
                landscape. Morning engagement sessions open each day with speed
                interviewing, resume and LinkedIn reviews, multiplatform deep
                dives, AI-powered development workflows, and more.
              </p>
            </div>
            <div>
              <h4 className="font-display text-white dark:text-white text-xl md:text-2xl">
                <span>2. Developer Days</span>
              </h4>
              <p className="mt-3 text-white dark:text-white text-sm md:text-base leading-relaxed">
                Two days of Flutter and Dart sessions in a dedicated track,
                curated for professional developers building cross-platform
                applications for African markets.
              </p>
            </div>
          </div>
          <div className="w-full mt-10 flex justify-center">
            <img
              className="w-20 md:w-36"
              src="/images/element_left.png"
              alt=""
            />
          </div>
        </div>
      </section>
      */}

      <OrganizingTeam organizers={team} />
      <Organizers organizers={company} compact />
    </div>
  )
}

export async function getServerSideProps() {
  const organizers: Organizer[] = await axios
    .get(`/organizers/${process.env.NEXT_PUBLIC_ORG_SLUG}/team`)
    .then((response) => {
      return response.data.data
    })

  // Pass data to the page via props
  return { props: { organizers } }
}

export default About
