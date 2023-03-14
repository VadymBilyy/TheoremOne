import * as React from 'react'

interface BaseQuestion {
  id: string
  required: boolean
  label: string
}

export interface QuestionT extends BaseQuestion {
  type: 'scale' | 'text'
}

export interface Question2T extends BaseQuestion {
  type: 'multipleChoice'
  options: {
    label: string
    value: number
  }[]
}

export type Question = QuestionT | Question2T

type DispatchQuestionContextT = any

export const DispatchQuestionContext = React.createContext<DispatchQuestionContextT | null>(null)
export const QuestionContext = React.createContext<Question[] | null>(null)

type SetQuestions = {
  action: 'set'
  payload: Array<Question>
}

const reducer = (state: Question[] | null, update: SetQuestions): Question[] | null => {
  console.log('reducer: ', update.payload)
  if (update.action === 'set') {
    return update.payload
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])
  console.log('questions', state)

  return (
    <DispatchQuestionContext.Provider value={dispatch}>
      <QuestionContext.Provider value={state}>{children}</QuestionContext.Provider>
    </DispatchQuestionContext.Provider>
  )
}

export default UIProvider
