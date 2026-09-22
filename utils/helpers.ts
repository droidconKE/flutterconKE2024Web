import moment from 'moment'

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
