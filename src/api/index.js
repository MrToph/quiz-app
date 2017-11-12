import { keyBy } from 'lodash'
import { apiEndpoint } from '../constants'
// import { delayPromise } from '../utils'

// export function getNewGameData() {
//   let lines = require('./mockData.json').lines
//   lines = keyBy(
//     lines
//       .map(line => ({
//         ...line,
//         id: line._id,
//         possibleArtists: ['KIZ', 'Artist 1', 'Artist 2'],
//         correctArtistIndex: 0,
//       }))
//       .slice(0, 3),
//     line => line.id,
//   )
//   return Promise.resolve(lines).then(delayPromise(500))
// }

export function getNewGameData() {
  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(response => keyBy(response, line => line.id))
}
