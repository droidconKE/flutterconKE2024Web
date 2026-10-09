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

// Speaker and organizer input ends up in hrefs. Only a plain web link is
// kept. Pasted values often carry surrounding whitespace.
const isSafeHref = (url?: string | null): url is string => {
  const trimmed = url?.trim()
  return !!trimmed && /^https?:\/\//i.test(trimmed)
}

// The organizer's master switch. Missing stays open — the default is on,
// never off: a window we cannot read must never be the reason somebody
// cannot leave feedback.
const eventFeedbackOpen = (event?: Event | null): boolean =>
  event?.feedback_open !== false

// Where in the organizer's feedback window we are. The window lives on the
// payload as feedback_opens_at / feedback_closes_at, so nothing is guessed
// from the event's own start_date: an organizer who opens feedback on day
// two must not show "Feedback has closed" to everybody on day one. A payload
// carrying neither field predates them — fall back to the master switch, and
// when it says closed, let end_date tell "not open yet" from "has closed".
export type FeedbackWindowState = 'open' | 'not-open-yet' | 'closed'

export const feedbackWindowState = (
  event?: Event | null
): FeedbackWindowState => {
  const opens = event?.feedback_opens_at
    ? parseEat(event.feedback_opens_at)
    : null
  const closes = event?.feedback_closes_at
    ? parseEat(event.feedback_closes_at)
    : null

  if (opens === null && closes === null) {
    if (eventFeedbackOpen(event)) return 'open'
    // end_date is a date, with no time on it — it needs allowDateOnly or it
    // parses as null and this branch can only ever say 'not-open-yet'.
    const end = event?.end_date
      ? parseEat(event.end_date, { allowDateOnly: true })
      : null
    return end !== null && end.getTime() <= Date.now()
      ? 'closed'
      : 'not-open-yet'
  }

  const now = Date.now()
  if (opens !== null && opens.getTime() > now) return 'not-open-yet'
  if (!eventFeedbackOpen(event)) return 'closed'
  if (closes !== null && closes.getTime() <= now) return 'closed'
  return 'open'
}

// The user-facing label for a shut window. Only call it once the window is
// known to be shut.
export const feedbackWindowLabel = (event?: Event | null): string =>
  feedbackWindowState(event) === 'not-open-yet'
    ? 'Not open yet'
    : 'Feedback has closed'

// Whether a session can be rated from here: a real talk, already over, the
// organizer is taking feedback, and the form link is a plain web URL.
export const sessionAcceptsFeedback = (
  session: Session,
  feedbackOpen?: boolean
): boolean =>
  !session.is_serviceSession &&
  Boolean(session.slug) &&
  feedbackOpen !== false &&
  isSafeHref(session.feedback_url) &&
  sessionHasEnded(session.end_date_time)
