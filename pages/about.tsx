/* eslint-disable react/no-unescaped-entities */

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
    <div
      className="min-h-screen bg-[length:0%] md:bg-[length:88%] bg-[top_360px_left_115%] md:bg-[top_140px_left_148%] bg-no-repeat"
      style={{ backgroundImage: 'url(/images/about-bg.png)' }}
    >
      <section className="s-container pb-32">
        <div className="w-full flex flex-wrap min-h-screen pt-16 lg:pt-28 xl:pt-16 md:px-0 py-8 lg:py-12">
          <div className="w-full lg:w-9/12 flex items-center">
            <div className="w-full bg-no-repeat bg-center">
              <div className="w-full flex flex-wrap text-left">
                <h2 className="title lowercase dark:text-white-dark w-full">
                  <span>about</span>{' '}
                  <span className="font-medium">flutterconke</span>
                </h2>
                <img
                  className="w-[500px] my-4 md:my-4"
                  src="/images/lines.png"
                  alt="line"
                />
                <p className="dark:text-lighter-dark pt-2 text-base md:text-xl pr-0 md:pr-0 md:pb-16">
                  Fluttercon Kenya stands as the pioneering event of its kind in
                  Africa, marking the debut of the Fluttercon conference on the
                  continent. Designed to be a hub of innovation and learning,
                  Fluttercon Kenya will offer a rich program of tech talks,
                  workshops, and panels led by industry experts, Google
                  Developer Experts, and seasoned Flutter specialists, all
                  dedicated to exploring the latest in Flutter and Dart
                  technologies. <br />
                  <br />
                  Spearheaded by the accomplished team behind Droidcon Kenya,
                  renowned for orchestrating four highly successful editions of
                  Droidcon Kenya, Fluttercon Kenya promises to uphold the same
                  standard of excellence. With a track record of hosting over
                  3000 attendees and curating 200 sessions, the team brings
                  unparalleled expertise and organizational prowess to the
                  table. <br />
                  <br />
                  By co-locating with Droidcon Kenya, Africa's premier Android
                  developer conference with a five-year legacy, Fluttercon Kenya
                  maximizes its reach and impact. Set to take place from
                  November 6th to 8th, 2024, this joint event will unite Flutter
                  and Dart experts, Google Developer Experts, and hundreds of
                  Flutter developers with their Android counterparts. Together,
                  they will form one of the largest gatherings of mobile
                  developers on the continent, offering multiple tracks of
                  in-depth tech talks, workshops, panels, and more. Join us in
                  shaping the future of mobile development in Africa at
                  Fluttercon Kenya!
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
      <section className="w-full bg-lighter dark:bg-black-dark">
        <div className="s-container md:py-12">
          <div className="flex flex-wrap mb-10">
            <div className="w-full -mt-28 md:-mt-32 py-2 pb-12">
              <h4 className="title text-3xl text-primary md:text-6xl dark:text-accent-2 pt-6 md:pt-0 lowercase">
                the first fluttercon{' '}
                <small className="font-medium">
                  <br />
                  conference in africa.
                </small>
              </h4>
            </div>
            <div className="w-full md:w-12/12 ml-auto pr-0 md:pr-20">
              <h3 className="title font-medium border-b-8 border-b-secondary lowercase">
                Fluttercon
              </h3>
              <p className="mt-2 md:mt-4 mb-4 md:mb-0 text-xl">
                Fluttercon is a global conference focused on the engineering of
                Mobile applications. Fluttercon provides a forum for developers
                to network with other developers, share techniques, announce
                apps and products, and learn and teach.
                <br />
                <br />
                The three-day gathering will be held in Nairobi, Kenya, from 6th
                to 8th November 2024 and will be the first ever in Africa.
                <br />
                <br />
                The conference will include workshops, codelabs and talks geared
                towards Mobile development to help developers stay ahead of the
                curve. It will be an excellent chance for participants to
                network and connect with their fellow Mobile enthusiasts from
                the African and continental communities.
              </p>
            </div>

            <div className="w-full md:w-12/12 ml-auto pr-0 md:pr-20 md:mt-10">
              <h3 className="title font-medium border-b-8 border-b-secondary mt-4 md:mt-0 lowercase">
                how it started…
              </h3>
              <p className="mt-2 md:mt-4 mb-4 md:mb-0 text-xl">
                Notably, during the 3rd and 4th editions of Droidcon Kenya, we
                observed significant growth in the Flutter community, both
                locally and at the conference. The increasing number of
                Flutter-related sessions and attendees evidences this growth. In
                2023, Droidcon Kenya received 67 Flutter submissions, of which
                17 were selected—comprising 12 sessions, 3 workshops, and 2
                lightning talks. Inspired by this momentum, we decided to
                introduce Fluttercon to Africa, aligning with the trend of other
                Droidcons worldwide.
                <br />
                <br />
                We are thrilled to host Africa's inaugural Fluttercon Kenya,
                bringing together Flutter and Dart developers in the region.
                This initiative is led by a seasoned team with a proven track
                record of organizing four successful events!
              </p>
            </div>
            <div className="w-full mt-2 -mb-32 md:-mb-32 pb-20 md:pb-0 flex justify-center pr-0 md:pr-20">
              <img
                className="w-20 md:w-36"
                src="/images/element_left_2.png"
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
