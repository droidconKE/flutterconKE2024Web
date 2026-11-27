import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  parseEat,
  sessionHasEnded,
  eatCalendarDate,
  googleCalendarUrl,
} from './calendar'
import type { Session } from '../types/types'

// Nairobi is UTC+3 all year, so "2026-11-05 09:30" in EAT is 06:30Z.
const iso = (d: Date | null) => d?.toISOString() ?? null

describe('parseEat', () => {
  it('reads the API shape — a space and no zone — as Nairobi time', () => {
    expect(iso(parseEat('2026-11-05 09:30:00'))).toBe(
      '2026-11-05T06:30:00.000Z'
    )
    expect(iso(parseEat('2026-11-05 00:00:00'))).toBe(
      '2026-11-04T21:00:00.000Z'
    )
  })

  it('reads a T separator the same way', () => {
    expect(iso(parseEat('2026-11-05T09:30:00'))).toBe(
      '2026-11-05T06:30:00.000Z'
    )
  })

  it('trusts an explicit zone instead of shifting it again', () => {
    expect(iso(parseEat('2026-11-05T09:30:00+03:00'))).toBe(
      '2026-11-05T06:30:00.000Z'
    )
    expect(iso(parseEat('2026-11-05T06:30:00Z'))).toBe(
      '2026-11-05T06:30:00.000Z'
    )
  })

  it('refuses a bare date unless the caller allows it', () => {
    expect(parseEat('2026-11-05')).toBeNull()
    expect(iso(parseEat('2026-11-05', { allowDateOnly: true }))).toBe(
      '2026-11-04T21:00:00.000Z'
    )
  })

  it('returns null for anything it cannot read', () => {
    expect(parseEat('')).toBeNull()
    expect(parseEat('not-a-date')).toBeNull()
    expect(parseEat('05/11/2026')).toBeNull()
  })
})

describe('sessionHasEnded', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-29T12:00:00Z')) // 15:00 in Nairobi
  })
  afterEach(() => vi.useRealTimers())

  it('is true once the end time has passed', () => {
    expect(sessionHasEnded('2026-09-29 14:00:00')).toBe(true)
  })

  it('is true at the scheduled end, not a moment after', () => {
    expect(sessionHasEnded('2026-09-29 15:00:00')).toBe(true)
  })

  it('is false while the session is still on', () => {
    expect(sessionHasEnded('2026-09-29 16:00:00')).toBe(false)
  })

  it('never ends a session on a bare date — that would fire at 00:00', () => {
    expect(sessionHasEnded('2026-09-28')).toBe(false)
  })

  it('reads an unparseable end time as not ended', () => {
    expect(sessionHasEnded('')).toBe(false)
    expect(sessionHasEnded('soon')).toBe(false)
  })
})

describe('eatCalendarDate', () => {
  it('is the Nairobi date, including across midnight UTC', () => {
    // 21:00 UTC on the 5th is 00:00 on the 6th in Nairobi.
    expect(eatCalendarDate(Date.parse('2026-11-05T21:00:00.000Z'))).toBe(
      '2026-11-06'
    )
    // One second earlier is still the 5th there.
    expect(eatCalendarDate(Date.parse('2026-11-05T20:59:59.000Z'))).toBe(
      '2026-11-05'
    )
  })
})

describe('googleCalendarUrl', () => {
  beforeEach(() => {
    vi.stubGlobal('window', {
      location: { origin: 'https://fluttercondev.ke' },
    })
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('links back to the session with the event it belongs to', () => {
    const session = {
      slug: 'a-talk',
      title: 'A talk',
      description: '',
      speakers: [],
      start_date_time: '2026-11-05T09:30:00+03:00',
      end_date_time: '2026-11-05T10:00:00+03:00',
    } as unknown as Session
    const url = new URL(
      String(googleCalendarUrl(session, 'fluttercon-ke-2026-222'))
    )
    expect(url.searchParams.get('details')).toBe(
      'https://fluttercondev.ke/sessions/a-talk?event=fluttercon-ke-2026-222'
    )
  })
})
