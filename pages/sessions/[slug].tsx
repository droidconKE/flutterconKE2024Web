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
} from '../../utils/helpers'

interface SessionPageProp {
  session: SessionProp
  event: Event | null
  fullUrl: string
  isCurrentEvent: boolean
}

const Session: NextPage<SessionPageProp> = ({
  session,
  event,
  fullUrl,
  isCurrentEvent,
}) => {
  const router = useRouter()

  const navBackLink = router.query?.from ? router.query?.from : '/sessions'

  const image =
    session.session_image ??
    'https://fluttercondev.ke/images/new-design/revised/fcke-cover.png'

  return (
    <>
      <Head>
        <meta name="twitter:image" content={image} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={fullUrl} />
        <meta name="twitter:url" content={fullUrl} />
      </Head>
      <div className="s-container mt-4 md:mt-6 mb-10 md:mb-16 space-y-5 md:space-y-6">
        <Link
          href={String(navBackLink)}
          className="inline-flex items-center text-primary dark:text-accent-dark hover:opacity-80 text-sm md:text-base font-medium transition-opacity"
        >
          <i className="fa fa-arrow-left mr-2" /> back
        </Link>
        <SpeakersDetails session={session} />
        <SessionDetails session={session} />
        <ShareSessionAndFeedback
          session={session}
          venue={eventVenue(event)}
          isCurrentEvent={isCurrentEvent}
        />
      </div>
    </>
  )
}

export async function getServerSideProps({
  query,
  req,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: any
}) {
  const { slug, event: eventParam } = query
  // A past-event card carries ?event=; a current-event link does not and
  // falls back to the live event, so those URLs keep working unchanged.
  const eventPath = `/events/${resolveEventSlug(eventParam)}`

  // Get protocol
  const protocol = req.headers['x-forwarded-proto'] || 'https'
  // Get host (includes domain and port)
  const { host } = req.headers
  // Get path
  const urlPath = req.url
  // Full URL
  const fullUrl = `${protocol}://${host}${urlPath}`

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
    },
  }
}
export default Session
