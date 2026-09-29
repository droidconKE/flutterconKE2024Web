import { Event, Session } from '../types/types'
import { parseEat, sessionHasEnded } from './calendar'

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
  // getRandomValues shaped into a real v4 id: 8-4-4-4-12 hex chars, the
  // version nibble set to 4 and the variant nibble to one of 8/9/a/b, all
  // in place on the hex string itself (the repo's eslint rules refuse
  // bitwise operators).
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  ) {
    const hex = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
      byte.toString(16).padStart(2, '0')
    ).join('')
    const chars = hex.split('')
    chars[12] = '4'
    chars[16] = '89ab'[parseInt(hex[16], 16) % 4]
    const id = chars.join('')
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`
  }
  return `fb-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

// Stable within the page's life even when localStorage is refused: private
// browsing throws on every access, and a fresh id per call would make the
// mine lookup and the POST disagree — edit and remove would silently never
// work, and each submit would write a new answer instead of a correction.
let pageDeviceId: string | null = null

export const feedbackDeviceId = (): string => {
  if (typeof window === 'undefined') return ''
  if (pageDeviceId) return pageDeviceId
  try {
    const existing = window.localStorage.getItem(DEVICE_KEY)
    if (existing) {
      pageDeviceId = existing
      return existing
    }
    pageDeviceId = makeId()
    window.localStorage.setItem(DEVICE_KEY, pageDeviceId)
  } catch {
    // Private browsing can refuse localStorage; the answer still goes out,
    // it just cannot be recognised as this browser's afterwards.
    pageDeviceId = makeId()
  }
  return pageDeviceId
}

export const feedbackHeaders = (): Record<string, string> => ({
  'X-Feedback-Device': feedbackDeviceId(),
})

// Which "closed" wording applies. Only called once the window is known to be
// shut: before the event starts the form opens later, after that it has shut.
export const feedbackWindowLabel = (event?: Event | null): string => {
  // The API sends "YYYY-MM-DD HH:MM:SS" — a space, no zone — which parseEat
  // reads. Building a date string by hand here produced an Invalid Date, so
  // the branch below could never be reached and a future event was told its
  // feedback had already closed.
  const start = event?.start_date
    ? parseEat(event.start_date, { allowDateOnly: true })
    : null
  return start && start.getTime() > Date.now()
    ? 'Not open yet'
    : 'Feedback has closed'
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
