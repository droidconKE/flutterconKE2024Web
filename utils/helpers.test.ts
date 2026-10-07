import { describe, expect, it } from 'vitest'
import { getTwitterUsername, sessionCountLabel } from './helpers'

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
