import { useEffect, useState } from 'react'
import { SessionFeedback } from '../../sessions/SessionFeedback'
import { Event } from '../../../types/types'
import axios from '../../../utils/axios'
import { feedbackWindowLabel } from '../../../utils/feedback'
import { resolveEventSlug } from '../../../utils/helpers'

// The floating feedback button. It is the one event-level entry point, so it
// reads the organizer's window itself: when feedback_open is false it shows
// which closed-state applies and posts nothing. A missing field or a failed
// request stays open — the default is on, never off.
export const EventFeedback = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    let alive = true
    axios
      .get(`/events/${resolveEventSlug()}`, { timeout: 5000 })
      .then((response) => {
        if (alive) setEvent(response.data.data)
      })
      .catch(() => {
        // An unreadable window must never be the reason somebody cannot
        // leave feedback — the button stays.
      })
    return () => {
      alive = false
    }
  }, [])

  const open = event ? event.feedback_open !== false : true

  return (
    <div className=" fixed bottom-0 right-0">
      {open ? (
        <button
          type="button"
          className="rounded-t-lg bg-primary px-6 p-1 text-white"
          onClick={() => setShowFeedbackModal(true)}
        >
          Feedback <i className="fa fa-share" />
        </button>
      ) : (
        <span
          aria-disabled
          className="rounded-t-lg bg-primary/50 dark:bg-primary/40 px-6 p-1 text-white text-sm"
        >
          {feedbackWindowLabel(event)}
        </span>
      )}

      {showFeedbackModal && open && (
        <SessionFeedback closeDialog={() => setShowFeedbackModal(false)} />
      )}
    </div>
  )
}
