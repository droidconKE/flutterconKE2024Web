import type { NextPage } from 'next'
import { Organizer } from '../types/types'
import OrganizingTeam from '../components/about/Team'
import axios from '../utils/axios'
import Organizers from '../components/home/Organizers'
import Divider from '../components/shared/Divider'

interface AboutProps {
  organizers: Organizer[]
}

const About: NextPage<AboutProps> = ({ organizers }) => {
  const team = organizers.filter((o) => o.type === 'individual')
  const company = organizers.filter((o) => o.type === 'company')
  return (
    <div
      className="min-h-screen bg-[length:0%] md:bg-[length:88%] bg-[top_360px_left_115%] md:bg-[top_155px_left_148%] bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/svg/fluttercon-about-bg.svg)',
      }}
    >
      <section className="s-container pt-6 md:pt-12 pb-12 md:pb-20">
        <div className="w-full flex flex-wrap md:px-0">
          <div className="w-full lg:w-9/12 flex items-center">
            <div className="w-full">
              <div className="w-full flex flex-wrap text-left">
                <p className="w-full text-primary dark:text-primary font-bold uppercase tracking-wide text-sm md:text-base mb-3">
                  ( About )
                </p>
                <h1 className="w-full font-display capitalize text-black dark:text-white-dark text-5xl md:text-7xl leading-none">
                  <span>about</span>{' '}
                  <span className="text-primary dark:text-accent-dark">
                    fluterconke
                  </span>
                </h1>
                <Divider className="my-4 md:my-6" />
                <p className="text-black dark:text-white-dark pt-2 text-base md:text-xl leading-relaxed pr-0 md:pr-10">
                  Fluttercon is a global conference focused on the engineering
                  of mobile applications, part of next.app devCon. It provides a
                  forum for developers to network, share techniques, announce
                  apps and products, and learn and teach.
                  <br />
                  <br />
                  Fluttercon Kenya brought Fluttercon to the African continent
                  for the first time in 2024. Now in its 3rd edition, it takes
                  place November 5th and 6th, 2026, at PrideInn Azure Hotel in
                  Nairobi.
                  <br />
                  <br />
                  Fluttercon Kenya is part of next.app devCon, the global home
                  of Fluttercon, Droidcon and the wider mobile developer
                  community.
                  <br /> <br />
                  Our 2026 theme is Beyond Stacks. Cross-platform work no longer
                  stops at one codebase, and the interesting problems sit at the
                  edges, in tooling, in AI-assisted workflows, in what runs
                  natively underneath. Fluttercon Kenya is where the Flutter
                  side of that conversation happens.
                  <br />
                  <br />
                  The 2025 edition proved the demand: Fluttercon grew to 34.2%
                  of total attendance, and Flutter submissions (92) outnumbered
                  Android submissions (89) for the first time. Co-located with
                  Droidcon Kenya, Sub-Saharan Africa&apos;s premier Android
                  developer conference, the two events form one of the largest
                  gatherings of mobile developers on the continent.
                </p>
              </div>
            </div>
          </div>
          {/* <div className="w-full lg:w-6/12 lg:h-auto flex items-center justify-end bg-no-repeat bg-cover mt-6 md:mt-0">
            <img
              alt="sponsors img"
              className="w-full sponsor-img"
              src="/images/groupphoto.png"
            />
          </div> */}
        </div>
      </section>
      <section className="s-container mb-12 md:mb-16">
        <div className="relative isolate overflow-hidden w-full rounded-4xl md:rounded-5xl bg-accent px-6 py-10 md:px-12 md:py-16">
          <span className="pointer-events-none absolute top-0 left-0 right-0 h-28 z-0 [background-image:radial-gradient(rgba(255,255,255,0.5)_1.4px,transparent_1.6px)] [background-size:10px_10px] [mask-image:linear-gradient(to_bottom,#000,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,#000,transparent)]" />
          <div className="relative z-10 flex flex-wrap">
            <div className="w-full py-2 pb-12">
              <h4 className="font-display capitalize text-3xl text-primary dark:text-primary md:text-6xl pt-6 md:pt-0">
                Largest Mobile{' '}
                <small className="font-medium">
                  Focused <br />
                  Developer Conference in Africa.
                </small>
              </h4>
            </div>
            <div className="w-full md:w-12/12 ml-auto pr-0 md:pr-20">
              <h3 className="font-display capitalize text-2xl md:text-4xl text-black dark:text-black border-b-8 border-b-primary pb-2">
                HOW IT STARTED
              </h3>
              <p className="mt-2 md:mt-4 mb-4 md:mb-0 text-lg md:text-xl leading-relaxed text-black dark:text-black">
                The signal came from our own stage. During the 3rd and 4th
                editions of Droidcon Kenya, Flutter sessions and Flutter
                attendees grew sharply. In 2023, Droidcon Kenya received 67
                Flutter submissions and selected 17 of them: 12 sessions, 3
                workshops and 2 lightning talks.
                <br /> <br /> The community had outgrown a few slots on someone
                else&apos;s agenda, so in 2024 we gave it a conference.
                Africa&apos;s first Fluttercon.
                {/* The three-day gathering will be held in Nairobi, Kenya, from 6th
                to 8th November 2024 and will be the largest in Africa.
                <br />
                <br />
                The conference will include workshops, codelabs and talks geared
                towards Android development to help developers stay ahead of the
                curve. It will be an excellent chance for participants to
                network and connect with their fellow Android enthusiasts from
                the African and continental communities. */}
              </p>
            </div>

            <div className="w-full md:w-12/12 ml-auto pr-0 md:pr-20 md:mt-10">
              <h3 className="font-display capitalize text-2xl md:text-4xl text-black dark:text-black border-b-8 border-b-primary mt-4 md:mt-0 pb-2">
                Tickets
              </h3>
              <p className="mt-2 md:mt-4 mb-4 md:mb-0 text-lg md:text-xl leading-relaxed text-black dark:text-black">
                One ticket, two conferences. A ticket to Fluttercon Kenya
                automatically registers you for the co-located Droidcon Kenya.
                <br /> <br />
                <span className=" font-medium text-primary md:text-3xl dark:text-primary mt-6 md:mt-10">
                  In 2026, Expect:
                </span>
              </p>
              <ul className="list-disc pl-5 marker:text-primary mt-3 space-y-1">
                <li className="text-black dark:text-black text-xl mb-2">
                  2 days of Flutter and Dart content
                </li>
                <li className="text-black dark:text-black text-xl mb-2">
                  Developer Keynotes
                </li>
                <li className="text-black dark:text-black text-xl mb-2">
                  A dedicated Fluttercon Kenya track
                </li>
                <li className="text-black dark:text-black text-xl mb-2">
                  An unconference track, shared across both conferences
                </li>
                <li className="text-black dark:text-black text-xl mb-2">
                  Panel discussions with Flutter engineering leaders
                </li>
                <li className="text-black dark:text-black text-xl mb-2">
                  Interactive morning engagement sessions
                </li>
                <li className="text-black dark:text-black text-xl mb-2">
                  Networking with Flutter and Dart developers from across the
                  region
                </li>
                <li className="text-black dark:text-black text-xl mb-2">
                  Advanced, practical skill development
                </li>
              </ul>
            </div>
            <div className="w-full md:w-12/12 ml-auto pr-0 md:pr-20 md:mt-10">
              <h3 className="font-display capitalize text-2xl md:text-4xl text-black dark:text-black border-b-8 border-b-primary mt-4 md:mt-4 pb-2">
                <span>Event</span> <span>Highlights</span>
              </h3>
              <h4 className="font-display text-primary dark:text-primary text-2xl md:text-3xl mt-6 md:mt-10 capitalize">
                <span>1. Beyond the Sessions</span>
              </h4>
              <p className="mt-2 md:mt-4 mb-4 md:mb-0 text-lg md:text-xl leading-relaxed text-black dark:text-black">
                The unconference track, shared with Droidcon Kenya, opens the
                floor to attendee-driven discussions and lightning talks, with
                agentic engineering as the anchor theme. Panels bring Flutter
                engineering leaders together on the evolving cross-platform
                landscape. Morning engagement sessions open each day with speed
                interviewing, resume and LinkedIn reviews, multiplatform deep
                dives, AI-powered development workflows, and more.
              </p>
              <h4 className="font-display text-primary dark:text-primary text-2xl md:text-3xl mt-6 md:mt-10 capitalize">
                <span>2. Developer Days</span>
              </h4>
              <p className="mt-2 md:mt-4 mb-4 md:mb-0 text-lg md:text-xl leading-relaxed text-black dark:text-black">
                Two days of Flutter and Dart sessions in a dedicated track,
                curated for professional developers building cross-platform
                applications for African markets.
              </p>
            </div>
            <div className="w-full mt-8 flex justify-center">
              <img
                className="w-20 md:w-36"
                src="/images/element_left.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <OrganizingTeam organizers={team} />
      <Organizers organizers={company} />
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
