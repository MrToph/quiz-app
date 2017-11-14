export const selectAnimationState = state => state.questions.animationState

export const selectRoutingInfo = state => state.routing

export const selectCanGoBack = state => state.routing.routes.length > 1

export const selectIsGameLoading = state => state.menu.isLoading

export const selectIsUpdating = state => state.menu.isUpdating

export const selectUpdateProgress = state => state.menu.updateProgress

