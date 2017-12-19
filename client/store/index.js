import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import campaigns from './campaigns'
import allUsers from './allUsers'
import characters from './characters'

const reducer = combineReducers({
  user,
  campaigns,
  allUsers,
  characters
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './campaigns'
export * from './allUsers'
export * from './characters'
