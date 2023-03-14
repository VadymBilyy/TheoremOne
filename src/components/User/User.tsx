import classNames from 'classnames'
import * as React from 'react'
import styles from './user.module.css'

type Props = {
  name: string
  isOnlyImage?: boolean
  avatarUrl?: string
  children?: React.ReactNode
  className?: string
}

const User: React.FC<Props> = ({ name, isOnlyImage = false, avatarUrl, children, className }) => {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')

  return (
    <div className={classNames(styles.user, isOnlyImage && styles.nogap, className)}>
      {avatarUrl ? (
        <img className={styles.avatar} alt={name} src={avatarUrl} />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
      {(children || name) && (
        <div>
          {!isOnlyImage && name}
          {children}
        </div>
      )}
    </div>
  )
}

export default User
