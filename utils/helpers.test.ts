import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  agendaTabForDate,
  getTwitterUsername,
  isCurrentEventSlug,
  sessionCountLabel,
  sessionShareUrl,
  hour,
  time,
  timeAm,
  timeDay,
} from './helpers'

describe('getTwitterUsername', () => {
  it('takes the handle from twitter.com and x.com profile URLs', () => {
    expect(getTwitterUsername('https://twitter.com/AhmedNMahran')).toBe(
      'AhmedNMahran'
    )
    expect(getTwitterUsername('https://x.com/JustJessZA')).toBe('JustJessZA')
  })

  it('does not keep an @ that was pasted into the URL', () => {
    expect(getTwitterUsername('https://twitter.com/@_kibetheophilus')).toBe(
      '_kibetheophilus'
    )
  })

  it('ignores scheme, www, a trailing slash, a query and a fragment', () => {
    expect(getTwitterUsername('http://www.twitter.com/ndiritu_michael')).toBe(
      'ndiritu_michael'
    )
    expect(getTwitterUsername('https://x.com/JustJessZA/')).toBe('JustJessZA')
    expect(getTwitterUsername('https://twitter.com/name?ref=x')).toBe('name')
    expect(getTwitterUsername('https://twitter.com/name#top')).toBe('name')
  })

  it('returns null when there is no handle to find', () => {
    expect(getTwitterUsername(null)).toBeNull()
    expect(getTwitterUsername(undefined)).toBeNull()
    expect(getTwitterUsername('')).toBeNull()
    expect(getTwitterUsername('https://www.linkedin.com/in/someone')).toBeNull()
  })
})

describe('sessionShareUrl', () => {
  const share = (over: Partial<Parameters<typeof sessionShareUrl>[0]> = {}) =>
    sessionShareUrl({
      forwardedProto: 'https',
      host: 'fluttercondev.ke',
      resolvedUrl: '/sessions/opening-keynote',
      eventSlug: 'flutterconke-24',
      ...over,
    })

  it('takes the first forwarded protocol when a proxy sends two', () => {
    expect(share({ forwardedProto: 'https,http' })).toBe(
      'https://fluttercondev.ke/sessions/opening-keynote'
    )
  })

  it('is empty when the host is missing', () => {
    expect(share({ host: undefined })).toBe('')
    expect(share({ host: '' })).toBe('')
  })

  it('keeps event and drops a campaign tag', () => {
    expect(
      share({
        resolvedUrl:
          '/sessions/opening-keynote?utm_source=twitter&event=flutterconke-24',
        eventParam: 'flutterconke-24',
      })
    ).toBe(
      'https://fluttercondev.ke/sessions/opening-keynote?event=flutterconke-24'
    )
  })

  it('publishes the resolved slug, not a repeated raw parameter', () => {
    expect(
      share({
        resolvedUrl: '/sessions/opening-keynote?event=nope&event=also',
        eventParam: ['nope', 'also'],
        eventSlug: 'flutterconke-24',
      })
    ).toBe(
      'https://fluttercondev.ke/sessions/opening-keynote?event=flutterconke-24'
    )
  })
})

describe('sessionCountLabel', () => {
  it('spells the count out with the singular for exactly one session', () => {
    expect(sessionCountLabel(1)).toBe('1 session')
  })

  it('uses the plural for zero and any other count', () => {
    expect(sessionCountLabel(0)).toBe('0 sessions')
    expect(sessionCountLabel(3)).toBe('3 sessions')
    expect(sessionCountLabel(28)).toBe('28 sessions')
  })
})

describe('isCurrentEventSlug', () => {
  it('counts the conference as being run now', () => {
    expect(isCurrentEventSlug()).toBe(true)
  })

  it('does not count Beyond Stacks 2026, which ran beside the last one', () => {
    expect(isCurrentEventSlug('unconference-2026')).toBe(false)
  })

  it('does not count a past event', () => {
    expect(isCurrentEventSlug('fluttercon-ke-2025')).toBe(false)
  })
})

describe('agendaTabForDate', () => {
  const days = ['2026-11-05', '2026-11-06']

  it('opens the day being lived', () => {
    expect(agendaTabForDate(days, '2026-11-06')).toBe(1)
  })

  it('stays on the first day when that date is not in the schedule', () => {
    expect(agendaTabForDate(days, '2026-10-07')).toBe(0)
    expect(agendaTabForDate(days, '2026-11-07')).toBe(0)
    // The 6th and 7th of a month with no event: neither picks a day by itself.
    expect(agendaTabForDate(days, '2026-12-06')).toBe(0)
    expect(agendaTabForDate(days, '2026-12-07')).toBe(0)
  })

  it('reads a key that also carries a time', () => {
    expect(
      agendaTabForDate(
        ['2026-11-05 00:00:00', '2026-11-06 00:00:00'],
        '2026-11-06'
      )
    ).toBe(1)
  })
})

// The server renders in UTC and a visitor can be anywhere, so the same
// timestamp has to print the same Nairobi time in every one of these.
describe.each(['UTC', 'Africa/Nairobi', 'America/Los_Angeles', 'Asia/Tokyo'])(
  'session times with the clock in %s',
  (zone) => {
    beforeEach(() => {
      vi.stubEnv('TZ', zone)
    })
    afterEach(() => {
      vi.unstubAllEnvs()
    })

    it('prints the Nairobi time the API sends', () => {
      expect(hour('2026-11-05T09:30:00+03:00')).toBe('9:30 am')
      expect(time('2026-11-05T18:00:00+03:00')).toBe('6:00')
      expect(timeAm('2026-11-05T18:00:00+03:00')).toBe('pm')
    })

    it('reads a timestamp without an offset as Nairobi time', () => {
      expect(hour('2024-11-07 09:30:00')).toBe('9:30 am')
    })

    it("labels a day pill with the schedule key's own date", () => {
      expect(timeDay('2026-11-05')).toBe('05')
    })
  }
)
