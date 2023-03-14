import { useState, createContext, ReactNode } from 'react'
import { FeedbackT } from '../common/feedback.model'
import { Effect } from './types'

type FeedbackContextT = {
  feedbacks: FeedbackT[]
  onUpdate: Effect<FeedbackT>
}
const INITIAL_FEEDBACK_CONTEXT: FeedbackContextT = {
  feedbacks: [],
  onUpdate: () => {},
}

export const FeedbacksContext = createContext<FeedbackContextT>(INITIAL_FEEDBACK_CONTEXT)

const UIProvider = ({ children }: { children: ReactNode }): any => {
  const [feedbacks, setFeedbacks] = useState<FeedbackT[]>([])

  const onUpdate = (feedback: FeedbackT): void => {
    const feedbacksForUpdate = feedbacks.slice()
    const feedbackInContextIndex = feedbacksForUpdate.findIndex(
      (feedbackInContext) => feedbackInContext.id === feedback.id,
    )
    feedbackInContextIndex !== -1
      ? (feedbacksForUpdate[feedbackInContextIndex] = feedback)
      : feedbacksForUpdate.push(feedback)

    setFeedbacks(feedbacksForUpdate)
  }

  return <FeedbacksContext.Provider value={{ feedbacks, onUpdate }}>{children}</FeedbacksContext.Provider>
}

export default UIProvider
