import { describe, expect, it } from 'vitest'
import {
  getTwitterUsername,
  sessionCountLabel,
  sessionShareUrl,
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
