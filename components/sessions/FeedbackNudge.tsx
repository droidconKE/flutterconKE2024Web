import { useEffect, useState } from 'react'
import { Session } from '../../types/types'
import { sessionAcceptsFeedback } from '../../utils/feedback'
import { SessionFeedback } from './SessionFeedback'

// The "How was it?" nudge. Eligibility is decided on the client, never during
// render: it compares Date.now(), so deciding it on the server would produce
// markup hydration then re-decides. Nothing renders before the first effect,
// and the check runs again when the tab comes back, so a visitor who opened
// the schedule before a talk ended sees the nudge when they return.
export const FeedbackNudge = ({
  session,
  eventSlug,
  feedbackOpen = true,
  size = 'sm',
  className = '',
}: {
  session: Session
  // eslint-disable-next-line react/require-default-props
  eventSlug?: string
  // eslint-disable-next-line react/require-default-props
  feedbackOpen?: boolean
  // eslint-disable-next-line react/require-default-props
  size?: 'sm' | 'md'
  // eslint-disable-next-line react/require-default-props
  className?: string
}) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const compute = () => {
      setVisible(sessionAcceptsFeedback(session, feedbackOpen))
    }
    compute()
    document.addEventListener('visibilitychange', compute)
    return () => document.removeEventListener('visibilitychange', compute)
  }, [feedbackOpen, session])

  if (!visible) return null

  return (
    <div className={className}>
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
    </div>
  )
}
