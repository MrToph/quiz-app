import Immutable from 'seamless-immutable'
import QuizActionTypes from './actions'
import NavActionTypes from '../navigation/actions'

const questionDataExample = {
  id: '_id1',
  songTitle: 'Title 1',
  album: 'Alboom 1',
  language: 'de',
  text:
    'Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it?',
  moreUrl: 'https://genius.com',
  possibleArtists: ['Artist 1', 'Artist 2', 'Artist 3'],
  correctArtistIndex: 0,
}

const questionsByIdExample = {
  _id1: questionDataExample,
  _id2: {
    id: '_id2',
    songTitle: 'Title 2',
    album: 'Alboom 2',
    language: 'de',
    text:
      "Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.",
    moreUrl: 'https://genius.com',
    possibleArtists: ['Artist 1', 'Artist 2', 'Artist 3'],
    correctArtistIndex: 2,
  },
  ...['_id3', '_id4', '_id5', '_id6', '_id7', '_id8', '_id9', '_id10']
    .map(id => ({
      ...questionDataExample,
      id,
    }))
    .reduce(
      (acc, questionObject) => ({
        ...acc,
        [questionObject.id]: questionObject,
      }),
      {},
    ),
}

export const defaultQuestionsState = Immutable({
  currentQuestionIndex: 0,
  questions: [
    '_id1',
    '_id2',
    '_id3',
    '_id4',
    '_id5',
    '_id6',
    '_id7',
    '_id8',
    '_id9',
    '_id10',
  ],
  questionsByIdExample,
  answers: [],
})

function questionsReducer(state = defaultQuestionsState, action) {
  switch (action.type) {
    case QuizActionTypes.answerQuestion: {
      const { answerIndex } = action.payload
      const newState = state.merge({
        answers: [...state.answers, answerIndex],
      })
      let newIndex = newState.currentQuestionIndex
      newIndex +=
        newState.currentQuestionIndex < newState.questions.length - 1 ? 1 : 0
      return newState.merge({
        currentQuestionIndex: newIndex,
      })
    }
    case NavActionTypes.startNewGame: {
      const { questions, questionsById } = action.payload
      const currentQuestionIndex = 0
      const answers = []
      return state.merge({
        questions,
        questionsById,
        currentQuestionIndex,
        answers,
      })
    }
    default: {
      return state
    }
  }
}

export default questionsReducer
