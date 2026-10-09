import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SessionFeedback } from '../../sessions/SessionFeedback'
import { Event } from '../../../types/types'
import axios from '../../../utils/axios'
import {
  feedbackWindowLabel,
  feedbackWindowState,
} from '../../../utils/feedback'
import { isCurrentEventSlug, resolveEventSlug } from '../../../utils/helpers'

// The floating feedback button. It is the one event-level entry point, so it
// reads the organizer's window itself. Before the window opens it renders
// nothing. Once the window has closed it shows which shut-state applies and
// posts nothing. A missing field or a failed request stays open — the
// default is on, never off.
//
// It only ever serves the event the current page is about. The page's event
// is the year slug on the past-events routes, the ?event= param on session
// pages, and the live event everywhere else. On anything that is not the
// live event the button renders nothing — the per-session nudge is the
// documented entry point on past events — so feedback can never be written
// into another event's bucket.
export const EventFeedback = () => {
  const router = useRouter()
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [event, setEvent] = useState<Event | null>(null)

  // One resolution, shared by the window fetch below and the modal it opens.
  const eventSlug = resolveEventSlug(
    router.pathname === '/past-events/2024'
      ? process.env.NEXT_PUBLIC_EVENT_SLUG_2024
      : router.pathname === '/past-events/2025'
        ? process.env.NEXT_PUBLIC_EVENT_SLUG_2025
        : router.query.event
  )
  const isCurrentEvent = isCurrentEventSlug(eventSlug)

  useEffect(() => {
    // The modal posts under the same resolved slug, so fetching a window for
    // an event this button will never render for is wasted traffic.
    if (!isCurrentEvent) return undefined
    let alive = true
    axios
      .get(`/events/${eventSlug}`, { timeout: 5000 })
      .then((response) => {
        if (alive) setEvent(response.data?.data ?? null)
      })
      .catch(() => {
        // An unreadable window must never be the reason somebody cannot
        // leave feedback — the button stays.
      })
    return () => {
      alive = false
    }
    // Re-resolve when the page's event changes — navigating between pages
    // about different events must re-read the window, not keep the old one.
  }, [eventSlug, isCurrentEvent])

  // Scheduling and reviewing only apply to the event being run now.
  if (!isCurrentEvent) return null

  // Before the window opens, render nothing — a permanent grey chip pinned
  // to every page for the weeks before the conference reads as a broken
  // site. Once it has closed, keep a muted chip saying so.
  const windowState = feedbackWindowState(event)
  if (windowState === 'not-open-yet') return null

  return (
    <div className=" fixed bottom-0 right-0">
      {windowState === 'open' ? (
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
          className="rounded-t-lg bg-black/40 text-white/60 px-6 p-1 text-sm cursor-not-allowed"
        >
          {feedbackWindowLabel(event)}
        </span>
      )}

      {showFeedbackModal && windowState === 'open' && (
        <SessionFeedback
          closeDialog={() => setShowFeedbackModal(false)}
          eventSlug={eventSlug}
        />
      )}
    </div>
  )
}
