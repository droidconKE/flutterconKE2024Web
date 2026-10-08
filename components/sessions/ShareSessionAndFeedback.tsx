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
import { getTwitterUsername, truncateString } from '../../utils/helpers'
import { sessionHasEnded } from '../../utils/calendar'
import { feedbackWindowLabel, feedbackWindowState } from '../../utils/feedback'
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
  // open — the default is on, never off. After the talk ends the banner
  // nudge takes over, so this row does not stack a second door to the form.
  const windowState = feedbackWindowState(event)
  const nudgeHasTakenOver = sessionHasEnded(session.end_date_time)
  const officialFormUrl =
    isCurrentEvent && windowState === 'open'
      ? safeHref(session.feedback_url)
      : null

  const title = `${session.title} by ${session.speakers.map(
    (s) => ` ${s.name}`
  )} \r`
  const twTitle = `${session.title} by ${session.speakers.map(
    (s) =>
      ` ${getTwitterUsername(s.twitter) ? `@${getTwitterUsername(s.twitter)}` : s.name}`
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
        </div>
      )}
      {/* Scheduling and reviewing only apply to the event being run now.
          Before the window opens nothing renders; once it has closed a
          muted chip says why. Share stays. */}
      {isCurrentEvent && (
        <>
          <AddToCalendar session={session} venue={venue} />
          {windowState === 'open' && !nudgeHasTakenOver && (
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
          )}
          {windowState === 'closed' && (
            <span
              aria-disabled
              className="inline-flex items-center rounded-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-white-dark text-sm font-semibold px-4 py-2"
            >
              {feedbackWindowLabel(event)}
            </span>
          )}
        </>
      )}
      {/* The official form is the same page the door QR codes open. It stays
          outside the share menu so it is not hidden behind another click. */}
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
