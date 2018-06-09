import { createStore } from 'redux'
import reducers from './reducers'

export { default as APIClient } from './APIClient'
export { default as GlobalStore } from './GlobalStore'

export const ReduxStore = createStore(reducers)