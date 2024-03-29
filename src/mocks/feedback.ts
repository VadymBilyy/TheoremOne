import { FeedbackT } from '../common/feedback.model'

export const MOCK_INITIAL_FEEDBACK: FeedbackT = {
  id: 'test_id',
  from: 'p1',
  to: 'p2',
  isComplete: false,
  lastUpdate: new Date(),
  questions: [
    {
      id: 'q1',
      type: 'scale',
      required: true,
      label: 'How much do you trust this person to deliver high quality work?',
      response: null,
    },
    {
      id: 'q2',
      type: 'multipleChoice',
      required: true,
      label: 'Is this person up to date with the latest accounting regulations?',
      options: [
        {
          value: 1,
          label: 'Not fully. You should work on trying to stay more up to date with regulations',
        },
        {
          value: 2,
          label: 'Yes, you are reasonably up to date with new regulations.',
        },
        {
          value: 3,
          label: 'Yes, you are the one I look up to when I need information about new regulations',
        },
      ],
      response: null,
    },
    {
      id: 'q3',
      type: 'scale',
      required: true,
      label: 'How well does this person understand the technical domain of our product?',
      response: null,
    },
    {
      id: 'q4',
      type: 'text',
      required: false,
      label:
        'Have there been any situations where this person could have managed their emotions better? What happened?',
      response: null,
    },
    {
      id: 'q5',
      type: 'multipleChoice',
      required: true,
      label: 'Does this person care about our users and treats customer support as a high priority?',
      options: [
        {
          value: 1,
          label: 'Not always - you should work on this aspect',
        },
        {
          value: 2,
          label: 'Yes, you go out of our way to help our users and improve their experience',
        },
        {
          value: 3,
          label: 'Yes, your understanding of our users and the empathy you demonstrate is second to none',
        },
      ],
      response: null,
    },
    {
      id: 'q6',
      type: 'text',
      required: true,
      label:
        'What would you like this person to work on the most during the next month, to enable their continued growth?',
      response: null,
    },
    {
      id: 'q7',
      type: 'multipleChoice',
      required: true,
      label: "How transparent and clear are this person's plans and work tasks?",
      options: [
        {
          value: 1,
          label: 'I frequently not know what you are working on, please work with me to raise visibility',
        },
        {
          value: 2,
          label:
            'I almost always know what you are working on, but not always the details or next steps, only the outcomes you are after.',
        },
        {
          value: 3,
          label:
            'Your plans are clear and readily available to those around you, and I always know what the next step is.',
        },
      ],
      response: null,
    },
    {
      id: 'q8',
      type: 'scale',
      required: true,
      label: 'How well does this person understand our business goals and roadmap?',
      response: null,
    },
    {
      id: 'q9',
      type: 'text',
      required: false,
      label: "Is there anything else you'd like to share with this person?",
      response: null,
    },
  ],
}
