import Immutable from 'seamless-immutable'
import { REHYDRATE } from 'redux-persist/constants'
import I18n from '../../i18n'
import SettingsActionTypes from './actions'

export const initialSettings = Immutable({
  language: 'de',
  freeVersion: true,
})

I18n.defaultLocale = initialSettings.language
I18n.locale = initialSettings.language


function settingsReducer(state = initialSettings, action) {
  switch (action.type) {
    case REHYDRATE: {
      const incoming = action.payload.settings
      if (incoming && incoming.language) {
        I18n.locale = incoming.language
        const merged = state.merge(incoming)
        return merged
      }
      return state
    }
    case SettingsActionTypes.languageSelected: {
      const { language } = action.payload
      I18n.locale = language
      return state.set('language', language)
    }
    case SettingsActionTypes.noAdsPurchased: {
      return state.set('freeVersion', false)
    }
    default:
      return state
  }
}

export default settingsReducer
