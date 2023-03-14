import * as React from 'react'
import { NavLink } from 'react-router-dom'
import User from '../../components/User'
import { AccountContext, DispatchAccountContext } from '../../context/AccountProvider'
import { FeedbacksContext } from '../../context/FeedbackProvider'
import { UserContext } from '../../context/UserProvider'
import styles from './header.module.css'

const Header = () => {
  const currentUser = React.useContext(AccountContext)
  const logoutUser = React.useContext(DispatchAccountContext)
  const { feedbacks } = React.useContext(FeedbacksContext)
  const users = React.useContext(UserContext)

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
  }

  const completedFeedbacksNumber = feedbacks.filter(
    (feedback) => feedback.from === currentUser?.id && feedback.isComplete,
  ).length

  const receivedFeedbacksNumber = feedbacks.filter(
    (feedback) => feedback.to === currentUser?.id && feedback.isComplete,
  ).length

  const colleaguesWithoutFeedback = users?.filter(
    (user) => !feedbacks.some((feedback) => feedback.id === `${currentUser?.id}-${user?.id}` && feedback.isComplete),
  ).length

  return (
    <div className={styles.header}>
      <h1>Honesto</h1>
      <NavLink exact to="/share-feedback" activeClassName={styles.active}>
        Share Feedback
        {colleaguesWithoutFeedback && <span className={styles.badge}>{colleaguesWithoutFeedback}</span>}
      </NavLink>
      <NavLink exact to="/my-feedback" activeClassName={styles.active}>
        My Feedback
        {completedFeedbacksNumber > 0 && <span className={styles.badge}>{completedFeedbacksNumber}</span>}
      </NavLink>
      <NavLink exact to="/team-feedback" activeClassName={styles.active}>
        Team Feedback
        {receivedFeedbacksNumber > 0 && <span className={styles.badge}>{receivedFeedbacksNumber}</span>}
      </NavLink>
      <NavLink exact to="/components" activeClassName={styles.active}>
        Components
      </NavLink>
      <span className={styles.spacer} />
      {currentUser && (
        <User name={currentUser.name} avatarUrl={currentUser.avatarUrl} className={styles.userInfo}>
          <NavLink exact to="/" onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </NavLink>
        </User>
      )}
    </div>
  )
}
export default Header
