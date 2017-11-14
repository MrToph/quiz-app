import { ToastAndroid } from 'react-native'
import { NavigationActions as ReactNavigationActions } from 'react-navigation'
import { combineReducers } from 'redux'
import Immutable from 'seamless-immutable'
import CodePush from 'react-native-code-push'
import I18n from '../../i18n'
import AppNavigator from '../../components/AppNavigator'
import NavActionTypes from './actions'
import QuizActionTypes from '../quiz/actions'

const firstAction = AppNavigator.router.getActionForPathAndParams('Menu')
const initialNavState = AppNavigator.router.getStateForAction(firstAction)

function navReducer(state = initialNavState, action) {
  switch (action.type) {
    case ReactNavigationActions.SET_PARAMS: {
      return {
        ...state,
        params: action.params,
      }
    }
    case NavActionTypes.navigateBack:
    case ReactNavigationActions.BACK: {
      // Clicking on back always resets to single Menu screen
      return AppNavigator.router.getStateForAction(
        ReactNavigationActions.reset({
          index: 0,
          actions: [ReactNavigationActions.navigate({ routeName: 'Menu' })],
        }),
        state,
      )
    }
    case NavActionTypes.navigateToResult: {
      // Do not go back to the Questions
      return AppNavigator.router.getStateForAction(
        ReactNavigationActions.reset({
          index: 1,
          actions: [
            ReactNavigationActions.navigate({ routeName: 'Menu' }),
            ReactNavigationActions.navigate({ routeName: 'Result' }),
          ],
        }),
        state,
      )
    }
    case NavActionTypes.startNewGame: {
      return AppNavigator.router.getStateForAction(
        ReactNavigationActions.navigate({ routeName: 'Question' }),
        state,
      )
    }
    case NavActionTypes.settingsPressed: {
      return AppNavigator.router.getStateForAction(
        ReactNavigationActions.navigate({ routeName: 'Settings' }),
        state,
      )
    }
    default:
      return state
  }
}

export const initialQuestionState = Immutable({
  animationState: 'ENTER_START',
})

function navQuestionsReducer(state = initialQuestionState, action) {
  switch (action.type) {
    case NavActionTypes.questionAnimationFinished: {
      // flip from START to END
      const animationType = state.animationState.split('_').shift()
      const newAnimationState = `${animationType}_END`
      return state.set('animationState', newAnimationState)
    }
    case NavActionTypes.questionAnimationStart: {
      const { animationType } = action.payload
      return state.set('animationState', `${animationType}_START`)
    }
    case NavActionTypes.loadNewGame: {
      // reset all state for question here
      return state.set('animationState', 'ENTER_START')
    }
    default:
      return state
  }
}

export const initialMenuState = Immutable({
  isLoading: false,
  isUpdating: false,
  updateProgress: 0, // in %
})

function navMenuReducer(state = initialMenuState, action) {
  switch (action.type) {
    case NavActionTypes.loadNewGame: {
      return state.set('isLoading', true)
    }
    case NavActionTypes.loadNewGameTimedOut: {
      ToastAndroid.showWithGravity(
        I18n.t('error.startGame'),
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      )
      return state.set('isLoading', false)
    }
    case NavActionTypes.transitionEnd: {
      const { to } = action.payload
      if (to === 'Question') return state.set('isLoading', false)
      return state
    }
    case NavActionTypes.checkForUpdate: {
      return state.merge({ isUpdating: true, updateProgress: 0 })
    }
    case NavActionTypes.codePushSyncChanged: {
      const SyncStatus = action.payload
      let isUpdating = state.isUpdating
      switch (SyncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          ToastAndroid.show(
            I18n.t('codePush.CHECKING_FOR_UPDATE'),
            ToastAndroid.SHORT,
          )
          break
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          break
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          ToastAndroid.show(
            I18n.t('codePush.DOWNLOADING_PACKAGE'),
            ToastAndroid.SHORT,
          )
          break
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          ToastAndroid.show(
            I18n.t('codePush.INSTALLING_UPDATE'),
            ToastAndroid.SHORT,
          )
          break
        case CodePush.SyncStatus.UP_TO_DATE:
          ToastAndroid.show(I18n.t('codePush.UP_TO_DATE'), ToastAndroid.SHORT)
          isUpdating = false
          break
        case CodePush.SyncStatus.UPDATE_IGNORED:
          isUpdating = false
          break
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          ToastAndroid.show(
            I18n.t('codePush.UPDATE_INSTALLED'),
            ToastAndroid.SHORT,
          )
          isUpdating = false
          break
        case CodePush.SyncStatus.SYNC_IN_PROGRESS:
          isUpdating = false
          break
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          isUpdating = false
          break
        default:
          isUpdating = false
          break
      }
      return state.set('isUpdating', isUpdating)
    }
    case NavActionTypes.updateProgress: {
      const downloadProgress = action.payload
      if (downloadProgress) {
        const updateProgress =
          downloadProgress.receivedBytes / downloadProgress.totalBytes
        return state.set('updateProgress', updateProgress)
      }
      return state
    }
    case NavActionTypes.updateError: {
      ToastAndroid.show(action.payload)
      return state.set('isUpdating', false)
    }
    default:
      return state
  }
}

const reducer = combineReducers({
  routing: navReducer,
  questions: navQuestionsReducer,
  menu: navMenuReducer,
})
export default reducer
