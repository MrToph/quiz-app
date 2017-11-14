import CodePush from 'react-native-code-push'
import { activeConfig } from '../../codepush'
import { getNewGameData } from '../../api'
import { selectIsGameLoading, selectIsUpdating } from '../selectors'
import { rejectAfterDuration } from '../../utils'

const ActionTypes = {
  navigateBack: 'NAVIGATE_BACK',
  navigateToResult: 'NAVIGATE_TO_RESULT',
  transitionEnd: 'TRANSITION_END',
  loadNewGame: 'LOAD_NEW_GAME',
  loadNewGameTimedOut: 'LOAD_NEW_GAME_TIMED_OUT',
  startNewGame: 'START_NEW_GAME',
  settingsPressed: 'SETTINGS_PRESSED',
  questionAnimationStart: 'QUESTION_ANIMATION_START',
  questionAnimationFinished: 'QUESTION_ANIMATION_FINISHED',
  checkForUpdate: 'CODEPUSH_CHECK_UPDATE',
  codePushSyncChanged: 'CODEPUSH_STATUS_CHANGED',
  updateProgress: 'CODEPUSH_PROGRESS',
  updateError: 'CODEPUSH_ERROR',
}

export default ActionTypes

export const navigateBack = () => ({
  type: ActionTypes.navigateBack,
})

export const navigateToResult = () => ({
  type: ActionTypes.navigateToResult,
})

export const createTransitionEnd = (transitionProps, prevTransitionProps) => ({
  type: ActionTypes.transitionEnd,
  payload: {
    from: prevTransitionProps.scene.route.routeName,
    to: transitionProps.scene.route.routeName,
  },
})

export const startNewGame = payload => ({
  type: ActionTypes.startNewGame,
  payload,
})

export const loadNewGame = () => ({
  type: ActionTypes.loadNewGame,
})

export const loadNewGameTimedOut = err => ({
  type: ActionTypes.loadNewGameTimedOut,
  payload: err,
})

export const questionAnimationStart = animationType => ({
  type: ActionTypes.questionAnimationStart,
  payload: {
    animationType,
  },
})

export const questionAnimationFinished = () => ({
  type: ActionTypes.questionAnimationFinished,
})

export const playGamePressed = () => (dispatch, getState) => {
  const isLoading = selectIsGameLoading(getState())
  if (isLoading) return null
  dispatch(loadNewGame())
  return Promise.race([getNewGameData(), rejectAfterDuration(10000)])
    .then((questionsById) => {
      const questions = Object.keys(questionsById)
      dispatch(
        startNewGame({
          questions,
          questionsById,
        }),
      )
    })
    .catch((err) => {
      dispatch(loadNewGameTimedOut(err))
    })
}

export const checkForUpdate = () => ({
  type: ActionTypes.checkForUpdate,
})

const onSyncStatusChange = SyncStatus => ({
  type: ActionTypes.codePushSyncChanged,
  payload: SyncStatus,
})

const onError = error => ({
  type: ActionTypes.updateError,
  payload: error,
})

const onDownloadProgress = downloadProgress => ({
  type: ActionTypes.updateProgress,
  payload: downloadProgress,
})

export const checkUpdatesPressed = () => (dispatch, getState) => {
  const isUpdating = selectIsUpdating(getState())
  if (isUpdating) return null
  dispatch(checkForUpdate())
  return CodePush.sync(
    activeConfig,
    (...args) => dispatch(onSyncStatusChange(...args)),
    (...args) => dispatch(onDownloadProgress(...args)),
    (...args) => dispatch(onError(...args)),
  )
}

export const settingsPressed = () => ({
  type: ActionTypes.settingsPressed,
})
