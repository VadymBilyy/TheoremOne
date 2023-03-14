import { Question2T, QuestionT } from '../context/QuestionProvider'
import { Nullable } from '../context/types'

export type Question = QuestionT | Question2T

export type QuestionWithResponse = Question & {
  response: Nullable<string>
}
export type Question2TWithResponse = Question2T & {
  response: Nullable<string>
}
export interface FeedbackT {
  id: string
  from: string
  to: string
  questions: QuestionWithResponse[]
  isComplete: boolean
  lastUpdate: Date
}
