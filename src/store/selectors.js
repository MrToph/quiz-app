/**
 * Accumulates all the different selectors
 */
import * as navigationSelectors from './navigation/selectors'
import * as quizSelectors from './quiz/selectors'
import * as settingsSelectors from './settings/selectors'

const selectors = {}
Object.keys(navigationSelectors).forEach((funcName) => {
  selectors[funcName] = (state, ...args) =>
    navigationSelectors[funcName](state.navigation, ...args)
})

Object.keys(quizSelectors).forEach((funcName) => {
  selectors[funcName] = (state, ...args) =>
    quizSelectors[funcName](state.quiz, ...args)
})

Object.keys(settingsSelectors).forEach((funcName) => {
  selectors[funcName] = (state, ...args) =>
    settingsSelectors[funcName](state.settings, ...args)
})

// We want to be able to import like this "import { name1, name2 } from 'selectors'"
// Below code behaves like "export {...selectors}" because of this relationship:
// var module = {}
// var exports = module.exports = {}
module.exports = selectors
