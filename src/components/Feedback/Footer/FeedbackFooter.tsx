import { FC } from 'react'
import { Lazy } from '../../../context/types'
import Button from '../../Button'
import ProgressBar from '../../ProgressBar'
import styles from './feedbackFooter.module.css'

interface FeedbackFooterProps {
  onPrevious: Lazy<void>
  onNext: Lazy<void>
  isRequired: boolean
  isPrevButtonDisabled: boolean
  isNextButtonDisabled: boolean
  progressLabel: string
  progressValue: number
  progressLength: number
}

export const FeedbackFooter: FC<FeedbackFooterProps> = ({
  isRequired,
  isPrevButtonDisabled,
  isNextButtonDisabled,
  progressLabel,
  progressValue,
  progressLength,
  onPrevious,
  onNext,
}) => (
  <div>
    <div className={styles.feedbackControlsContainer}>
      <Button secondary disabled={isPrevButtonDisabled} onClick={onPrevious}>
        Previous
      </Button>
      {!isRequired && (
        <Button secondary onClick={onNext}>
          Skip
        </Button>
      )}
      <Button disabled={isNextButtonDisabled} onClick={onNext}>
        {progressValue === progressLength ? 'Complete' : 'Next'}
      </Button>
    </div>
    <div>
      <ProgressBar total={progressLength} value={progressValue} />
      <strong className={styles.feedbackProgressTitle}>QUESTIONS COMPLETED</strong>
      <span>{progressLabel}</span>
    </div>
  </div>
)
