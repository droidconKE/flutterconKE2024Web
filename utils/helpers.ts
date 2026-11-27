import moment from 'moment'
import { Event } from '../types/types'
import { EAT_UTC_OFFSET_HOURS, parseEat } from './calendar'

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

// Session times are Nairobi times, whatever zone this runs in: the server
// renders in UTC and a visitor can be anywhere.
const formatEat = (value: string, format: string) =>
  moment(parseEat(value))
    .utcOffset(EAT_UTC_OFFSET_HOURS * 60)
    .format(format)

export const timeAm = (value: string) => formatEat(value, 'a')

// A schedule key is a bare date, which moment reads as that date in any zone.
export const timeDay = (value: string) => moment(value).format('DD')

export const time = (value: string) => formatEat(value, 'h:mm')

export const hour = (value: string) => formatEat(value, 'h:mm a')

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

// What a session filter offers: the values the sessions have, each once, in
// the order the organizer listed them where they did and in programme order
// otherwise. An option no session has would match nothing, so none is made up.
export const filterOptions = (values: string[], order: string[] = []) => {
  const found = values.filter(
    (value, i) => value && values.indexOf(value) === i
  )
  // Each value is ranked before the sort, so the comparator reads only ranks
  // and nothing the sort is moving.
  return found
    .map((value, i) => {
      const listed = order.indexOf(value)
      return { value, rank: listed < 0 ? order.length + i : listed }
    })
    .sort((a, b) => a.rank - b.rank)
    .map(({ value }) => value)
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

// Whether a URL is pointing at the event being run now. Both sides come out
// of the same resolver, so the comparison cannot be made two different ways.
// Beyond Stacks 2026 ran beside the conference; it is a past event now.
export const isCurrentEventSlug = (param?: string | string[]) =>
  resolveEventSlug(param) === resolveEventSlug()

// A session detail link, always with the event the slug belongs to: the event
// being run now unless another is given. `from` is the page to return to. A
// link that is copied or shared keeps opening the session after the site
// moves on to the next edition.
export const sessionHref = (
  slug: string,
  { from, eventSlug }: { from?: string; eventSlug?: string } = {}
): string => {
  const params = new URLSearchParams()
  if (from) params.set('from', from)
  const event = resolveEventSlug(eventSlug)
  if (event) params.set('event', event)
  const query = params.toString()
  return `/sessions/${slug}${query ? `?${query}` : ''}`
}

// Each past-events route and the event it is about, in the order they ran.
// Next inlines NEXT_PUBLIC_* only when written out in full, so these stay
// literal. An edition joins this list when the site moves on from it.
export const PAST_EVENT_SLUGS: Record<string, string | undefined> = {
  '/past-events/2024': process.env.NEXT_PUBLIC_EVENT_SLUG_2024,
  '/past-events/2025': process.env.NEXT_PUBLIC_EVENT_SLUG_2025,
  '/past-events/2026': process.env.NEXT_PUBLIC_EVENT_SLUG_2026,
  '/past-events/beyond-stacks-2026':
    process.env.NEXT_PUBLIC_BEYOND_STACKS_EVENT_SLUG_2026,
}

// Where to look for a session whose link does not say which event it is
// from: the event being run now, then the past ones, newest first.
export const sessionEditions = (): string[] => {
  const slugs = [
    resolveEventSlug(),
    ...Object.values(PAST_EVENT_SLUGS).reverse(),
  ]
    .filter((slug): slug is string => !!slug)
    .map((slug) => slug.toLowerCase())
  return slugs.filter((slug, i) => slugs.indexOf(slug) === i)
}

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

// Which agenda pill is today in Nairobi. Schedule keys start with YYYY-MM-DD.
// A date that is not one of those days stays on the first day, rather than
// selecting a tab that does not exist.
export const agendaTabForDate = (keys: string[], date: string): number => {
  const index = keys.findIndex(
    (key) => key.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] === date
  )
  return index < 0 ? 0 : index
}
