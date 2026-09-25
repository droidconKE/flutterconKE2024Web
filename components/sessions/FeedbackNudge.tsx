import { useState } from 'react'
import { Session } from '../../types/types'
import { SessionFeedback } from './SessionFeedback'

// The "How was it?" nudge: shown once a session is over, the organizer is
// taking feedback and the session carries a form link (sessionAcceptsFeedback
// decides). Opens the existing feedback modal for that session. Whether a
// session page shows this or the share-row button is decided in
// ShareSessionAndFeedback — the two never stack.
export const FeedbackNudge = ({
  session,
  eventSlug,
  size = 'sm',
}: {
  session: Session
  // eslint-disable-next-line react/require-default-props
  eventSlug?: string
  // eslint-disable-next-line react/require-default-props
  size?: 'sm' | 'md'
}) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  return (
    <>
      <button
        type="button"
        className={`inline-flex items-center rounded-full bg-primary dark:bg-primary text-white dark:text-white font-semibold hover:opacity-90 transition-opacity ${
          size === 'md' ? 'text-sm px-4 py-2.5' : 'text-xs px-3 py-1.5'
        }`}
        onClick={() => setShowFeedbackModal(true)}
      >
        <i className="fa fa-star-o mr-2" aria-hidden="true" />
        How was it? Rate this session
      </button>
      {showFeedbackModal && (
        <SessionFeedback
          closeDialog={() => setShowFeedbackModal(false)}
          sessionSlug={session.slug}
          eventSlug={eventSlug}
        />
      )}
    </>
  )
}
