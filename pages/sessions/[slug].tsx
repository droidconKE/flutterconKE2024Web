import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SessionDetails } from '../../components/sessions/SessionDetails'
import { ShareSessionAndFeedback } from '../../components/sessions/ShareSessionAndFeedback'
import { SpeakersDetails } from '../../components/sessions/SpeakersDetails'
import { Event, Session as SessionProp } from '../../types/types'
import axios from '../../utils/axios'

interface SessionPageProp {
  session: SessionProp
  event: Event | null
  fullUrl: string
}

const Session: NextPage<SessionPageProp> = ({ session, event, fullUrl }) => {
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
          venue={
            event
              ? [event.venue_name, event.venue_address]
                  .filter(Boolean)
                  .join(', ')
              : undefined
          }
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
  const { slug } = query

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
      .get(`/events/${process.env.NEXT_PUBLIC_EVENT_SLUG}/schedule/${slug}`)
      .then((response) => {
        return response.data.data
      })
      .catch(() => {
        return null
      }),
    axios
      .get(`/events/${process.env.NEXT_PUBLIC_EVENT_SLUG}`)
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
  return { props: { session, event, fullUrl } }
}
export default Session
