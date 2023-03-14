import { FC } from 'react'
import { Nullable } from '../../../context/types'
import styles from './text.module.css'

type TextProps = {
  value: Nullable<string>
  onChange(value: string): void
}

const TextQuestion: FC<TextProps> = ({ value, onChange }) => (
  <textarea
    value={value || ''}
    onChange={(e) => onChange(e.currentTarget.value)}
    placeholder={'Say something'}
    className={styles.textarea}
  />
)

export default TextQuestion
