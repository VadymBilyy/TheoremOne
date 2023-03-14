import { FC } from 'react'
import styles from './progressBar.module.css'

type ProgressBarProps = {
  value: number
  total: number
}

const ProgressBar: FC<ProgressBarProps> = ({ value, total }) => {
  const currentProgress = (value * 100) / total
  return (
    <div className={styles.wrapper}>
      <div className={styles.progress} style={{ width: `${currentProgress}%` }} />
    </div>
  )
}

export default ProgressBar
