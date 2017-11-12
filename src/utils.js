import Immutable from 'seamless-immutable'
import { createTransform } from 'redux-persist'

export function isProduction() {
  return (
    process.env.Node_ENV &&
    process.env.NODE_ENV !== 'development' &&
    process.env.NODE_ENV !== 'test'
  )
}

// dev only (returns false for test env)
export function isDevelopment() {
  return process.env.NODE_ENV === 'development'
}

export const delayPromise = duration => result =>
  new Promise(resolve => setTimeout(() => resolve(result), duration))

export const rejectAfterDuration = duration =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Network Timeout')), duration),
  )

export const seamlessImmutableTransform = createTransform(
  inboundState =>
    inboundState.asMutable
      ? inboundState.asMutable({ deep: true })
      : inboundState,
  outboundState => Immutable(outboundState),
)
