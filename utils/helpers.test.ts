import { describe, expect, it } from 'vitest'
import { getTwitterUsername } from './helpers'

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
