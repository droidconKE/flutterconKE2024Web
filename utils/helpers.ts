import moment from 'moment'
import { Event } from '../types/types'

export const isServer = typeof window === 'undefined'

export const isClient = typeof window !== 'undefined'

export const groupBy3 = (arr: string[]) =>
  arr.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: any[], current: string, index: number) =>
      (index % 3 ? acc[acc.length - 1].push(current) : acc.push([current])) &&
      acc,
    []
  )

export const humanReadable = (value: string) =>
  moment(value).format('MMM Do YY')

export const timeAm = (value: string) => moment(value).format('a')

export const timeDay = (value: string) => moment(value).format('DD')

export const time = (value: string) => moment(value).format('h:mm')

export const hour = (value: string) => moment(value).format('h:mm a')

export const truncateString = (str: string, num = 100) => {
  if (!str) return ''
  if (str.length <= num) {
    return str
  }
  return `${str.slice(0, num)}...`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objIsEmpty = (obj: any) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

// Where an event is held, for a calendar entry. Some events repeat the name
// as the address (droidconKE 2024 carries "Nairobi, Kenya" as both), so
// identical parts are only said once.
export const eventVenue = (event?: Event | null): string | undefined => {
  if (!event) return undefined
  const parts = [event.venue_name, event.venue_address].filter(Boolean)
  return (
    parts.filter((part, i) => parts.indexOf(part) === i).join(', ') || undefined
  )
}

// A session detail link. `from` is the page to return to; `eventSlug` names
// the event the slug belongs to. Session slugs are unique per event, not
// globally, so a past event's card has to say which event it came from or
// the detail page looks the slug up under the current event and 404s.
// Omitting `eventSlug` keeps current-event links exactly as they were.
export const sessionHref = (
  slug: string,
  { from, eventSlug }: { from?: string; eventSlug?: string } = {}
): string => {
  const params = new URLSearchParams()
  if (from) params.set('from', from)
  if (eventSlug) params.set('event', eventSlug)
  const query = params.toString()
  return `/sessions/${slug}${query ? `?${query}` : ''}`
}

// `event` comes off the URL and goes into an API path, so it is kept to the
// shape of a slug before use. A repeated parameter arrives as an array and a
// malformed one is refused; both fall back to the event being run now.
const EVENT_SLUG = /^[a-z0-9][a-z0-9-]*$/i

// Always lower-cased, including the fallback: the environment value is typed
// by hand at deploy time, and a stray capital there must not make the event
// being run now look like somebody else's.
export const resolveEventSlug = (param?: string | string[]) =>
  typeof param === 'string' && EVENT_SLUG.test(param)
    ? param.toLowerCase()
    : (process.env.NEXT_PUBLIC_EVENT_SLUG ?? '').toLowerCase()

// Whether a URL is pointing at the event being run now. Both sides come out of
// the same resolver, so the comparison cannot be made two different ways.
export const isCurrentEventSlug = (param?: string | string[]) =>
  resolveEventSlug(param) === resolveEventSlug()

// The URL a session share card points at. A proxy can send "https,http";
// the first value is the visitor's. The path is the page, never a
// /_next/data URL. Only `event` is kept from the query, and only when the
// link carried one — a campaign tag must not become a second canonical URL.
// No host means no tag, rather than one that points at "undefined".
export const sessionShareUrl = ({
  forwardedProto,
  host,
  resolvedUrl,
  eventParam,
  eventSlug,
}: {
  forwardedProto?: string | string[]
  host?: string
  resolvedUrl: string
  eventParam?: string | string[]
  eventSlug: string
}): string => {
  const protocol =
    (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto || '')
      .split(',')[0]
      .trim() || 'https'
  if (!host) return ''
  const path = resolvedUrl.split('?')[0]
  const share = eventParam
    ? `${path}?event=${encodeURIComponent(eventSlug)}`
    : path
  return `${protocol}://${host}${share}`
}

// The @handle from a speaker's profile URL, whatever domain it is on today —
// profiles have been migrating twitter.com -> x.com, and splitting on the
// literal 'twitter.com/' yields `@undefined` for the new ones (#70).
export const getTwitterUsername = (url?: string | null): string | null => {
  if (!url) return null
  const match = url.match(/(?:twitter\.com|x\.com)\/@?([^/?#]+)/i)
  return match?.[1] ?? null
}

// A11y name for the day-pill session-count chip (#102). The chip renders a
// bare digit, which a screen reader glues onto the day name as "Day 1 3";
// as the chip's aria-label the count is announced as part of the pill
// instead, with the singular spelled out.
export const sessionCountLabel = (count: number): string =>
  `${count} ${count === 1 ? 'session' : 'sessions'}`
