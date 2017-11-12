const ActionTypes = {
  languageSelected: 'LANGUAGE_SELECTED',
  noAdsPurchased: 'NO_ADS_PURCHASED',
}

export default ActionTypes

export const languageSelected = language => ({
  type: ActionTypes.languageSelected,
  payload: {
    language,
  },
})

export const noAdsPurchased = () => ({
  type: ActionTypes.noAdsPurchased,
})
