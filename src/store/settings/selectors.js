export const selectSettingsData = state => state

export const selectLanguage = state => state.language

export const selectDisplayInterstitial = state => state.freeVersion && (Math.random() < 1 / 2)
