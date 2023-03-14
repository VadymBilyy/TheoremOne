import { FC } from 'react'
import classnames from 'classnames'
import styles from './multichoice.module.css'
import { Nullable } from '../../../context/types'

type Answer = {
  value: number
  label: string
}
type MultichoiceProps = {
  answers: Answer[]
  onSelect(value: string): void
  selectedValue: Nullable<string>
}

const Multichoice: FC<MultichoiceProps> = ({ answers, selectedValue, onSelect }) => (
  <ul className={styles.list}>
    {answers.map((answer) => (
      <li className={styles.listItem} key={answer.value}>
        <button
          className={classnames(styles.choice, selectedValue === answer.value.toString() && styles.selected)}
          onClick={() => onSelect(answer.value.toString())}
        >
          {answer.label}
        </button>
      </li>
    ))}
  </ul>
)

export default Multichoice
