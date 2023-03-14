import styles from './button.module.css'
import * as React from 'react'
import classnames from 'classnames'

type Props = {
  onClick: (se: React.SyntheticEvent) => void
  children: React.ReactNode
  secondary?: boolean
  disabled?: boolean
  className?: string
}

const Button = (props: Props) => {
  const { children, secondary, disabled, className, onClick } = props

  return (
    <button
      disabled={disabled}
      className={classnames(
        styles.button,
        {
          [styles.secondaryButton]: secondary,
          [styles.disabledButton]: disabled,
        },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
