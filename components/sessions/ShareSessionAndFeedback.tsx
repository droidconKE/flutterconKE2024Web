import { useState } from 'react'
import {
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
} from 'react-share'
import { SessionFeedback } from './SessionFeedback'
import { AddToCalendar } from './AddToCalendar'
import { Session, Event } from '../../types/types'
import { truncateString } from '../../utils/helpers'
import {
  feedbackWindowLabel,
  sessionAcceptsFeedback,
} from '../../utils/feedback'
import { StarIcon } from '../shared/StarIcon'

// Speakers and organizers supply these URLs and they end up in an href, so
// only a plain web link is kept — same rule the materials section applies.
const safeHref = (url?: string | null) => {
  const trimmed = url?.trim()
  return trimmed && /^https?:\/\//i.test(trimmed) ? trimmed : null
}

export const ShareSessionAndFeedback = ({
  session,
  venue,
  isCurrentEvent = true,
  eventSlug,
  event,
}: {
  session: Session
  // eslint-disable-next-line react/require-default-props
  venue?: string
  // eslint-disable-next-line react/require-default-props
  isCurrentEvent?: boolean
  // eslint-disable-next-line react/require-default-props
  eventSlug?: string
  // eslint-disable-next-line react/require-default-props
  event?: Event | null
}) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [showShare, setShowShare] = useState(false)

  // The window the page's own event carries. Missing or unreadable stays
  // open — the default is on, never off.
  const feedbackOpen = event ? event.feedback_open !== false : true
  // Only one session-level entry point at a time: while the talk is on the
  // timetable the button is it; once it is over the nudge takes over (the
  // banner renders it), so the page never stacks two doors to the same form.
  const nudgeApplies = sessionAcceptsFeedback(session, feedbackOpen)
  const officialFormUrl = feedbackOpen ? safeHref(session.feedback_url) : null

  const title = `${session.title} by ${session.speakers.map(
    (s) => ` ${s.name}`
  )} \r`
  const twTitle = `${session.title} by ${session.speakers.map(
    (s) => ` ${s.twitter ? `@${s.twitter.split('twitter.com/')[1]}` : s.name}`
  )} \r`

  return (
    <div className="w-full flex flex-wrap items-center gap-4 py-2">
      {/* Saving only applies to the event being run now: My Sessions filters
          the current event's schedule by the ids saved here, so saving a past
          session would toggle a control that can never show anything. */}
      {isCurrentEvent && <StarIcon isStar={false} session={session} />}
      <button
        type="button"
        className="btn-accent uppercase"
        onClick={() => setShowShare(!showShare)}
      >
        share <i className="fa fa-share" />
      </button>
      {showShare && (
        <div className="flex items-center space-x-4">
          <LinkedinShareButton
            url={window.location.href}
            source={window.location.href}
            title={title}
            summary={truncateString(session.description)}
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <TelegramShareButton url={window.location.href} title={title}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <TwitterShareButton
            url={window.location.href}
            title={twTitle}
            hashtags={['droidcon', 'droidconKe24', 'dcke24']}
            related={['droidconke']}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={window.location.href} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          {/* The official form is the same page the door QR codes open — a
              way in for whoever prefers the event's own surface. */}
          {officialFormUrl && (
            <a
              href={officialFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-semibold text-primary dark:text-accent-dark hover:underline"
            >
              <i className="fa fa-external-link mr-2" aria-hidden="true" />
              Official feedback form
            </a>
          )}
        </div>
      )}
      {/* Scheduling only applies to the event being run now: feedback posts
          under the event the page shows (eventSlug), but a past session's
          entry point is the nudge, so the button yields there too. Share
          stays. */}
      {isCurrentEvent && !nudgeApplies && (
        <>
          <AddToCalendar session={session} venue={venue} />
          {feedbackOpen ? (
            <button
              type="button"
              className="btn-primary"
              onClick={() => setShowFeedbackModal(true)}
            >
              Session Feedback{' '}
              <i
                className="fa fa-send"
                style={{ transform: 'rotate(55deg)' }}
              />
            </button>
          ) : (
            <span
              aria-disabled
              className="inline-flex items-center rounded-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-white-dark text-sm font-semibold px-4 py-2"
            >
              {feedbackWindowLabel(event)}
            </span>
          )}
        </>
      )}
      {showFeedbackModal && (
        <SessionFeedback
          closeDialog={() => setShowFeedbackModal(false)}
          sessionSlug={session.slug}
          eventSlug={eventSlug}
        />
      )}
    </div>
  )
}
