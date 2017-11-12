export const selectHasMoreQuestions = state =>
  state.currentQuestionIndex < state.questions.length - 1

export const selectCurrentQuestionIndex = state => state.currentQuestionIndex

export const selectQuestionIds = state => state.questions

export const selectCurrentQuestionId = state =>
  state.questions[state.currentQuestionIndex]

export const selectCurrentQuestionData = (state) => {
  const currentQuestionId = selectCurrentQuestionId(state)
  return state.questionsById[currentQuestionId]
}

export const selectNumberOfQuestions = state => state.questions.length

export const selectResultData = (state) => {
  const answers = state.answers
  const score = state.questions.reduce(
    (curScore, questionId, index) =>
      curScore +
      (answers[index] === state.questionsById[questionId].correctArtistIndex
        ? 1
        : 0),
    0,
  )

  const questionsData = state.questions.map(
    questionId => state.questionsById[questionId],
  )

  return {
    score,
    questionsData,
    answers,
  }
}
