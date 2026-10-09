import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SessionDetails } from '../../components/sessions/SessionDetails'
import { ShareSessionAndFeedback } from '../../components/sessions/ShareSessionAndFeedback'
import { SpeakersDetails } from '../../components/sessions/SpeakersDetails'
import { Event, Session as SessionProp } from '../../types/types'
import axios from '../../utils/axios'
import {
  eventVenue,
  isCurrentEventSlug,
  resolveEventSlug,
  sessionShareUrl,
} from '../../utils/helpers'

interface SessionPageProp {
  session: SessionProp
  event: Event | null
  fullUrl: string
  isCurrentEvent: boolean
  eventSlug: string
}

const Session: NextPage<SessionPageProp> = ({
  session,
  event,
  fullUrl,
  isCurrentEvent,
  eventSlug,
}) => {
  const router = useRouter()

  const navBackLink = router.query?.from ? router.query?.from : '/sessions'

  // "" is the API's absent value here — ?? would ship an empty og:image.
  const image =
    session.session_image ||
    'https://fluttercondev.ke/images/new-design/revised/fcke-cover.png'

  return (
    <>
      <Head>
        <meta name="twitter:image" content={image} />
        <meta property="og:image" content={image} />
        {fullUrl && (
          <>
            <meta property="og:url" content={fullUrl} />
            <meta name="twitter:url" content={fullUrl} />
          </>
        )}
      </Head>
      <div className="s-container mt-4 md:mt-6 mb-10 md:mb-16 space-y-5 md:space-y-6">
        <Link
          href={String(navBackLink)}
          className="inline-flex items-center text-primary dark:text-accent-dark hover:opacity-80 text-sm md:text-base font-medium transition-opacity"
        >
          <i className="fa fa-arrow-left mr-2" /> back
        </Link>
        <SpeakersDetails session={session} />
        <SessionDetails session={session} event={event} eventSlug={eventSlug} />
        <ShareSessionAndFeedback
          session={session}
          venue={eventVenue(event)}
          isCurrentEvent={isCurrentEvent}
          eventSlug={eventSlug}
          event={event}
        />
      </div>
    </>
  )
}

export async function getServerSideProps({
  query,
  req,
  resolvedUrl,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: any
  resolvedUrl: string
}) {
  const { slug, event: eventParam } = query
  // A past-event card carries ?event=; a current-event link does not and
  // falls back to the live event, so those URLs keep working unchanged.
  // The resolved slug is what feedback posts under, too — the same single
  // decision, made once.
  const eventSlug = resolveEventSlug(eventParam)
  const eventPath = `/events/${eventSlug}`

  const fullUrl = sessionShareUrl({
    forwardedProto: req.headers['x-forwarded-proto'],
    host: req.headers.host,
    resolvedUrl,
    eventParam,
    eventSlug,
  })

  const [session, event] = await Promise.all([
    axios
      .get(`${eventPath}/schedule/${slug}`)
      .then((response) => {
        return response.data.data
      })
      .catch(() => {
        return null
      }),
    axios
      .get(eventPath)
      .then((response) => {
        return response.data.data
      })
      .catch(() => {
        return null
      }),
  ])

  // Pass data to the page via props

  if (!session) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      session,
      event,
      fullUrl,
      // Scheduling and reviewing only apply to the event being run now.
      isCurrentEvent: isCurrentEventSlug(eventParam),
      eventSlug,
    },
  }
}
export default Session
