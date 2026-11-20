import { describe, expect, it } from 'vitest'
import { Event, FeedbackQuestion } from '../types/types'
import {
  answersToSend,
  feedbackWindowLabel,
  feedbackWindowState,
  untickedRequired,
} from './feedback'

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

describe('answersToSend', () => {
  const q = (id: string, type: FeedbackQuestion['type'], required = false) =>
    ({ id, label: id, type, options: null, required }) as FeedbackQuestion

  it('leaves out unanswered, emptied and unticked questions', () => {
    const questions = [
      q('a', 'text'),
      q('b', 'text'),
      q('c', 'multi'),
      q('d', 'choice'),
    ]
    expect(answersToSend(questions, { b: '', c: [] })).toEqual({})
  })

  it('keeps answered ones, including a scale of 0 and ticked lists', () => {
    const questions = [q('a', 'scale'), q('b', 'multi'), q('c', 'text')]
    expect(answersToSend(questions, { a: 0, b: ['x'], c: 'hi' })).toEqual({
      a: 0,
      b: ['x'],
      c: 'hi',
    })
  })

  it('ignores answers to questions that are no longer asked', () => {
    expect(answersToSend([q('a', 'text')], { gone: 'x' })).toEqual({})
  })
})

describe('untickedRequired', () => {
  const q = (id: string, type: FeedbackQuestion['type'], required: boolean) =>
    ({ id, label: id, type, options: ['x'], required }) as FeedbackQuestion

  it('flags a required list with nothing ticked', () => {
    const questions = [q('a', 'multi', true), q('b', 'multi', false)]
    expect(untickedRequired(questions, {}).map((x) => x.id)).toEqual(['a'])
  })

  it('passes once one is ticked', () => {
    expect(untickedRequired([q('a', 'multi', true)], { a: ['x'] })).toEqual([])
  })

  it('leaves other required types to the server', () => {
    expect(untickedRequired([q('a', 'choice', true)], {})).toEqual([])
  })
})
