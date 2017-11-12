import { selectHasMoreQuestions } from '../selectors'
import {
  navigateToResult,
  questionAnimationStart,
} from '../navigation/actions'

const ActionTypes = {
  answerQuestion: 'ANSWER_QUESTION',
}

export default ActionTypes

export const answerQuestion = answerIndex => ({
  type: ActionTypes.answerQuestion,
  payload: {
    answerIndex,
  },
})

export const answerQuestionPress = answerIndex => (dispatch, getState) => {
  const hasMoreQuestions = selectHasMoreQuestions(getState())
  // increases current question index and sets answer
  dispatch(answerQuestion(answerIndex))

  if (!hasMoreQuestions) {
    dispatch(navigateToResult())
  } else {
    // retrigger animation in Question
    dispatch(questionAnimationStart('ENTER'))
  }
}
