import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import Button from '../../components/Button'
import styles from './giveFeedback.module.css'
import Feedback from '../../components/Feedback/Feedback'
import { Nullable, UserT } from '../../context/types'
import { FeedbackT, QuestionWithResponse } from '../../common/feedback.model'
import { FeedbacksContext } from '../../context/FeedbackProvider'
import { AccountContext } from '../../context/AccountProvider'
import { Question } from '../../common/question.model'
import { QuestionContext } from '../../context/QuestionProvider'

const isFeedbackExists = (currentUser: Nullable<UserT>, toUser: Nullable<UserT>, feedbacks: FeedbackT[]): boolean =>
  feedbacks.some((feedback) => feedback.id === `${currentUser?.id}-${toUser?.id}`)

const GiveFeedback = () => {
  const users = useContext(UserContext)
  const currentUser = useContext(AccountContext)
  const { feedbacks, onUpdate } = useContext(FeedbacksContext)
  const questions = useContext(QuestionContext)

  const [selectedUser, setSelectedUser] = useState<Nullable<UserT>>(null)

  const handleLeaveFeedback = (feedback: FeedbackT): void => {
    setSelectedUser(null)
    onUpdate(feedback)
  }

  const handleComplete = (feedback: FeedbackT): void => {
    setSelectedUser(null)
    const feedbackToUpdate = { ...feedback, isComplete: true }
    onUpdate(feedbackToUpdate)
  }

  const renderList = () => {
    const usersWithoutCurrentUser = users
      ?.filter((user) => user.id !== currentUser?.id)
      .filter((user) => {
        const existingFeedback = feedbacks.find((feedback) => feedback.id === `${currentUser?.id}-${user?.id}`)
        return existingFeedback ? !existingFeedback.isComplete : true
      })

    return (
      <>
        <h1>Share Feedback</h1>
        {usersWithoutCurrentUser && usersWithoutCurrentUser.length ? (
          <ul className={styles.users}>
            {usersWithoutCurrentUser.map((user) => {
              const isIncompleteFeedbackForColleagueExists = isFeedbackExists(currentUser, user, feedbacks)
              const buttonLabel = isIncompleteFeedbackForColleagueExists ? 'View Submissions' : 'Fill out'
              return (
                <li key={user.id} className={styles.user}>
                  <User name={user.name} avatarUrl={user.avatarUrl} />
                  <span style={{ flex: 1 }} />
                  <Button
                    className={styles.giveFeedbackButton}
                    secondary={isIncompleteFeedbackForColleagueExists}
                    onClick={() => setSelectedUser(user)}
                  >
                    {buttonLabel}
                  </Button>
                </li>
              )
            })}
          </ul>
        ) : (
          <div>No feedback to share</div>
        )}
      </>
    )
  }

  const createNewFeedback = (toUserId: string, fromUserId: string, questions: Question[]): FeedbackT => {
    const questionsWithTheValue: QuestionWithResponse[] = questions.map((question) => ({ ...question, response: null }))
    const newFeedback: FeedbackT = {
      from: fromUserId,
      to: toUserId,
      id: `${fromUserId}-${toUserId}`,
      questions: questionsWithTheValue,
      isComplete: false,
      lastUpdate: new Date(),
    }
    return newFeedback
  }

  const renderFeedback = (currentUser: UserT, userToGiveFeedbackTo: UserT, questions: Question[]) => {
    const existingFeedback = feedbacks.find(
      (feedback) => feedback.from === currentUser.id && feedback.to === userToGiveFeedbackTo.id,
    )
    const feedbackToEdit = existingFeedback || createNewFeedback(userToGiveFeedbackTo.id, currentUser.id, questions)

    return (
      <Feedback
        feedback={feedbackToEdit}
        onLeaveFeedback={handleLeaveFeedback}
        onComplete={handleComplete}
        colleagueName={userToGiveFeedbackTo.name}
        colleagueAvatarUrl={userToGiveFeedbackTo.avatarUrl}
      />
    )
  }

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        {selectedUser && currentUser && questions ? renderFeedback(currentUser, selectedUser, questions) : renderList()}
      </div>
    </MainLayout>
  )
}

export default GiveFeedback
