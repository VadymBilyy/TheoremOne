import { FC, useState } from 'react'
import Multichoice from '../Questions/Multichoice'
import Rating from '../Questions/Rating'
import TextQuestion from '../Questions/Text'
import { FeedbackT, QuestionWithResponse } from '../../common/feedback.model'
import { Effect } from '../../context/types'
import { FeedbackFooter } from './Footer/FeedbackFooter'
import { FeedbackHeader } from './Header/FeedbackHeader'
import styles from './feedback.module.css'
import User from '../User'

type FeedbackProps = {
  colleagueName: string
  colleagueAvatarUrl: string
  feedback: FeedbackT
  onLeaveFeedback: Effect<FeedbackT>
  onComplete: Effect<FeedbackT>
}

const Feedback: FC<FeedbackProps> = ({ colleagueName, colleagueAvatarUrl, feedback, onLeaveFeedback, onComplete }) => {
  const [currentFeedback, updateCurrentFeedback] = useState<FeedbackT>(feedback)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const currentQuestion = currentFeedback.questions[currentQuestionIndex]

  const feedbackLabel = `share your feedback for ${colleagueName}`

  const setNextQuestion = () => {
    if (currentQuestionIndex === currentFeedback.questions.length - 1) {
      onComplete({ ...currentFeedback, lastUpdate: new Date() })
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }
  const setPrevQuestion = () => setCurrentQuestionIndex(currentQuestionIndex - 1)

  const isPrevButtonDisabled = currentQuestionIndex === 0
  const isNextButtonAvailable = !currentQuestion.required || currentQuestion.response !== null

  const handleSelect = (value: number | string) => {
    const questionsToUpdate = currentFeedback.questions.slice()
    questionsToUpdate[currentQuestionIndex].response = value.toString()
    const updatedFeedback = { ...currentFeedback, questions: questionsToUpdate }
    updateCurrentFeedback(updatedFeedback)
  }

  const renderQuestionByType = (question: QuestionWithResponse) => {
    switch (question.type) {
      case 'multipleChoice':
        return <Multichoice answers={question.options} onSelect={handleSelect} selectedValue={question.response} />
      case 'scale':
        return <Rating value={question.response} onChange={handleSelect} customClassName={styles.ratingContainer} />
      case 'text':
        return <TextQuestion value={question.response} onChange={handleSelect} />
    }
  }
  const isCurrentQuestionRespondedValue =
    currentFeedback.questions[currentQuestionIndex].response !== null ||
    !currentFeedback.questions[currentQuestionIndex].required
      ? 1
      : 0
  const progressValue = currentQuestionIndex + isCurrentQuestionRespondedValue
  const progressLabel = `${progressValue} / ${currentFeedback.questions.length}`
  const colleagueAvatar = colleagueAvatarUrl ? (
    <img src={colleagueAvatarUrl} alt="colleague avatar" />
  ) : (
    <User name={colleagueName} isOnlyImage />
  )
  return (
    <div className={styles.feedbackQuestionContainer}>
      <FeedbackHeader
        feedbackLabel={feedbackLabel}
        questionLabel={currentQuestion.label}
        avatar={colleagueAvatar}
        onBack={() => onLeaveFeedback({ ...currentFeedback, lastUpdate: new Date() })}
      />
      <div className={styles.feedbackQuestionContent}>
        {renderQuestionByType(currentQuestion)}
        <FeedbackFooter
          onPrevious={setPrevQuestion}
          onNext={setNextQuestion}
          isRequired={currentQuestion.required}
          isPrevButtonDisabled={isPrevButtonDisabled}
          isNextButtonDisabled={!isNextButtonAvailable}
          progressLabel={progressLabel}
          progressValue={progressValue}
          progressLength={currentFeedback.questions.length}
        />
      </div>
    </div>
  )
}

export default Feedback
