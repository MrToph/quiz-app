import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { hookConsoleLog } from 'stacklogger'
import navReducer from './navigation/reducer'
import quizReducer from './quiz/reducer'
import settingsReducer from './settings/reducer'
import { isDevelopment, seamlessImmutableTransform } from '../utils'

const middleWares = [thunk]

if (isDevelopment()) {
  hookConsoleLog()
  middleWares.push(logger)
}

const reducers = combineReducers({
  navigation: navReducer,
  quiz: quizReducer,
  settings: settingsReducer,
})

const store = createStore(
  reducers,
  undefined,
  compose(applyMiddleware(...middleWares)),
)

persistStore(
  store,
  {
    whitelist: ['settings'],
    storage: AsyncStorage,
    transforms: [seamlessImmutableTransform],
  },
  () => {
    console.log('rehydration complete')
  },
)

export default store
