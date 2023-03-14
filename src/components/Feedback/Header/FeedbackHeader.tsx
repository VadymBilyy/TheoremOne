import { FC } from 'react'
import { Lazy } from '../../../context/types'
import Button from '../../Button'
import styles from './feedbackHeader.module.css'

import { ReactComponent as BackArrow } from '../assets/arrow-forward.svg'

interface FeedbackHeaderProps {
  feedbackLabel: string
  questionLabel: string
  avatar: React.ReactNode
  onBack: Lazy<void>
}

export const FeedbackHeader: FC<FeedbackHeaderProps> = ({ feedbackLabel, questionLabel, avatar, onBack }) => (
  <div>
    <div>
      <Button className={styles.feedbackBackButton} onClick={onBack} secondary>
        <BackArrow /> BACK
      </Button>
    </div>
    <div className={styles.feedbackDescription}>
      <div>
        <h2 className={styles.feedbackQuestion}>{questionLabel}</h2>
        <p className={styles.feedbackLabel}>{feedbackLabel} </p>
      </div>
      {/* <img src={avatarUrl} alt="colleague avatar" /> */}
      {avatar}
    </div>
  </div>
)
