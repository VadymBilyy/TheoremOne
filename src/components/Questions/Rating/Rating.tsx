import classNames from 'classnames'
import { FC, useState } from 'react'
import { Effect, Nullable } from '../../../context/types'
import styles from './rating.module.css'

type RatingProps = {
  value: Nullable<string>
  onChange: Effect<string>
  isStatic?: boolean
  customClassName?: string
}

const Rating: FC<RatingProps> = ({ value, isStatic = false, customClassName, onChange }) => {
  const [tempValue, setTempValue] = useState<Nullable<string>>(value)
  const [isHovered, setIsHovered] = useState(false)

  const handleContainerMouseLeave = () => {
    if (isHovered && !isStatic) {
      setIsHovered(false)
      setTempValue(currentValue)
    }
  }

  const currentValue = isHovered ? tempValue : value

  const ratingElements = Array.from(Array(10).keys()).map((index) => (
    <button
      key={index}
      onClick={() => onChange(`${index + 1}`)}
      onMouseEnter={() => setTempValue(`${index + 1}`)}
      className={classNames(
        styles.ratingItem,
        currentValue && index + 1 < +currentValue + 1 && styles.filled,
        isStatic && styles.smallRatingItem,
      )}
    />
  ))

  const ratingLabel = <span>{isHovered ? tempValue : value || 0}/10</span>

  return (
    <div className={classNames(styles.ratingContainer, customClassName)}>
      <div onMouseEnter={() => !isStatic && setIsHovered(true)} onMouseLeave={handleContainerMouseLeave}>
        {ratingElements}
      </div>
      {!isStatic && ratingLabel}
    </div>
  )
}

export default Rating
