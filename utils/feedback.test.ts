import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Event } from '../types/types'
import { feedbackWindowLabel } from './feedback'

// Only start_date matters to the label; the rest of Event is irrelevant here.
const event = (startDate?: string) =>
  ({ start_date: startDate }) as unknown as Event

describe('feedbackWindowLabel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-29T12:00:00Z'))
  })
  afterEach(() => vi.useRealTimers())

  it('says "Not open yet" for an event that has not started, in the API shape', () => {
    expect(feedbackWindowLabel(event('2026-11-05 00:00:00'))).toBe(
      'Not open yet'
    )
  })

  it('says "Not open yet" for a bare future date', () => {
    expect(feedbackWindowLabel(event('2026-11-05'))).toBe('Not open yet')
  })

  it('says "Not open yet" for an ISO date with an explicit zone', () => {
    expect(feedbackWindowLabel(event('2027-01-01T00:00:00+03:00'))).toBe(
      'Not open yet'
    )
  })

  it('says "Feedback has closed" once the event has started', () => {
    expect(feedbackWindowLabel(event('2024-11-06 00:00:00'))).toBe(
      'Feedback has closed'
    )
    expect(feedbackWindowLabel(event('2024-11-06'))).toBe('Feedback has closed')
  })

  it('falls back to "Feedback has closed" when there is no usable date', () => {
    expect(feedbackWindowLabel(event('not-a-date'))).toBe('Feedback has closed')
    expect(feedbackWindowLabel(event())).toBe('Feedback has closed')
    expect(feedbackWindowLabel(null)).toBe('Feedback has closed')
    expect(feedbackWindowLabel(undefined)).toBe('Feedback has closed')
  })
})
