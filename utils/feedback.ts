import { Event, Session } from '../types/types'
import { sessionHasEnded } from './calendar'

// A per-browser id, made up once and kept in localStorage. It is what lets
// the API tell "this browser again" apart from "someone else" — it is hashed
// with the link server-side, never stored raw, and is not tied to an account.
const DEVICE_KEY = 'feedback-device'

const makeId = (): string => {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }
  // randomUUID needs a secure context; http previews fall back to
  // getRandomValues, shaped into a v4 id on the hex string itself (the
  // repo's eslint rules refuse bitwise operators)
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  ) {
    const hex = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) =>
      b.toString(16).padStart(2, '0')
    )
    return `${hex.slice(0, 4).join('')}-4${hex[5].slice(1)}-${hex
      .slice(6, 8)
      .join('')}-8${hex[9].slice(1)}-${hex.slice(10, 16).join('')}`
  }
  return `fb-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const feedbackDeviceId = (): string => {
  if (typeof window === 'undefined') return ''
  try {
    const existing = window.localStorage.getItem(DEVICE_KEY)
    if (existing) return existing
    const id = makeId()
    window.localStorage.setItem(DEVICE_KEY, id)
    return id
  } catch {
    // Private browsing can refuse localStorage; the answer still goes out,
    // it just cannot be recognised as this browser's afterwards.
    return makeId()
  }
}

export const feedbackHeaders = (): Record<string, string> => ({
  'X-Feedback-Device': feedbackDeviceId(),
})

// Which "closed" wording applies. Only called once the window is known to be
// shut: before the event starts the form opens later, after that it has shut.
export const feedbackWindowLabel = (event?: Event | null): string => {
  const start = event?.start_date
  if (start) {
    const startDate = new Date(`${start}T00:00:00+03:00`)
    if (
      !Number.isNaN(startDate.getTime()) &&
      startDate.getTime() > Date.now()
    ) {
      return 'Not open yet'
    }
  }
  return 'Feedback has closed'
}

// The one decision of whether a session can be rated from here: it is a real
// talk, it is over, the organizer is taking feedback and the session carries
// a form link. Every entry point (card nudge, banner nudge, share-row
// button) reads this, so they can never disagree.
export const sessionAcceptsFeedback = (
  session: Session,
  feedbackOpen?: boolean
): boolean =>
  !session.is_serviceSession &&
  Boolean(session.slug) &&
  feedbackOpen !== false &&
  Boolean(session.feedback_url) &&
  sessionHasEnded(session.end_date_time)
