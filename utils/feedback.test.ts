import { describe, expect, it } from 'vitest'
import { Event } from '../types/types'
import { feedbackWindowLabel, feedbackWindowState } from './feedback'

const event = (fields: Partial<Event>) => fields as Event

describe('feedbackWindowState', () => {
  it('is open when the organizer set no window and the switch is on', () => {
    expect(feedbackWindowState(event({ feedback_open: true }))).toBe('open')
  })

  it('stays open when the payload has no window and no switch', () => {
    expect(feedbackWindowState(null)).toBe('open')
    expect(feedbackWindowState(undefined)).toBe('open')
    expect(feedbackWindowState(event({}))).toBe('open')
  })

  it('is not-open-yet while the window has not opened', () => {
    expect(
      feedbackWindowState(event({ feedback_opens_at: '2099-01-01 09:00:00' }))
    ).toBe('not-open-yet')
  })

  it('is closed once the window has passed', () => {
    expect(
      feedbackWindowState(
        event({
          feedback_opens_at: '2020-01-01 09:00:00',
          feedback_closes_at: '2020-01-02 09:00:00',
        })
      )
    ).toBe('closed')
  })

  // end_date carries no time, and parseEat refuses a bare date unless asked.
  // A long-finished event with feedback switched off must say closed, not
  // "not open yet".
  it('says closed, not not-open-yet, for a finished event with no window', () => {
    expect(
      feedbackWindowState(
        event({ feedback_open: false, end_date: '2020-01-02' })
      )
    ).toBe('closed')
  })

  it('still says not-open-yet for an event that has not happened', () => {
    expect(
      feedbackWindowState(
        event({ feedback_open: false, end_date: '2099-01-02' })
      )
    ).toBe('not-open-yet')
  })

  it('says not-open-yet when there is no window and no end date', () => {
    expect(feedbackWindowState(event({ feedback_open: false }))).toBe(
      'not-open-yet'
    )
  })
})

describe('feedbackWindowLabel', () => {
  it('matches the state it is labelling', () => {
    expect(
      feedbackWindowLabel(
        event({ feedback_open: false, end_date: '2020-01-02' })
      )
    ).toBe('Feedback has closed')
    expect(
      feedbackWindowLabel(
        event({ feedback_open: false, end_date: '2099-01-02' })
      )
    ).toBe('Not open yet')
  })
})
