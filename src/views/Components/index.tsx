import Button from '../../components/Button'
import MainLayout from '../../layouts/MainLayout'
import Spinner from '../../components/Spinner'
import User from '../../components/User'
import { useState } from 'react'
import Multichoice from '../../components/Questions/Multichoice'
import Text from '../../components/Questions/Text'
import { MULTICHOICE_QUESTION_OPTIONS } from '../../mocks/questions'
import Rating from '../../components/Questions/Rating'
import ProgressBar from '../../components/ProgressBar'
import Feedback from '../../components/Feedback/Feedback'
import { MOCK_INITIAL_FEEDBACK } from '../../mocks/feedback'
import { Nullable } from '../../context/types'

const MultichoiceQuestionDemo = () => {
  const [selectedValue, setSelected] = useState<Nullable<string>>(null)
  return (
    <div style={{ width: 400, padding: 20, margin: 20, border: '1px solid grey' }}>
      <Multichoice answers={MULTICHOICE_QUESTION_OPTIONS} onSelect={setSelected} selectedValue={selectedValue} />
    </div>
  )
}

const TextQuestionDemo = () => {
  const [value, onValueChange] = useState('')
  return (
    <div style={{ width: 400, padding: 20, margin: 20, border: '1px solid grey' }}>
      <Text value={value} onChange={onValueChange} />
    </div>
  )
}

const RatingQuestionDemo = () => {
  const [value, onValueChange] = useState<Nullable<string>>(null)
  return (
    <div style={{ width: '100%', padding: 20, margin: 20, border: '1px solid grey' }}>
      <Rating value={value} onChange={onValueChange} />
    </div>
  )
}

const FeedbackComponentDemo = () => {
  const onAction = (text: string) => (): void => {
    console.log(text)
  }
  return (
    <div style={{ width: '100%', padding: 20, margin: 20, border: '1px solid grey' }}>
      <Feedback
        feedback={MOCK_INITIAL_FEEDBACK}
        onLeaveFeedback={onAction('Leave feedback component')}
        onComplete={onAction('Complete feedback')}
        colleagueName={'CHRISTOPHER JONSON'}
        colleagueAvatarUrl={'https://i.pravatar.cc/150?img=48'}
      />
    </div>
  )
}

const Components = () => (
  <MainLayout loggedIn>
    <h1>heading 1</h1>
    <h2>heading 2</h2>
    <h3>heading 3</h3>
    <p>
      {/* eslint-disable-next-line */}
      Lorem ipsum dolor sit <a>amet consectetur adipisicing elit</a>. Excepturi aspernatur, sapiente corrupti obcaecati
      consequuntur corporis tempora deserunt quis labore eos sequi adipisci quas totam ad voluptate molestiae unde.
    </p>

    <Button
      onClick={() => {
        console.log('click')
      }}
    >
      Primary button
    </Button>

    <Button
      secondary
      onClick={() => {
        console.log('click')
      }}
    >
      Secondary button
    </Button>
    <br />
    <Spinner />
    <div />
    <User name="John David" />
    <User name="John David" avatarUrl="https://i.pravatar.cc/150?img=68" />
    <FeedbackComponentDemo />
    <RatingQuestionDemo />
    <MultichoiceQuestionDemo />
    <TextQuestionDemo />
    <ProgressBar total={9} value={2} />
  </MainLayout>
)

export default Components
