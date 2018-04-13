import { combineReducers } from 'redux'
import userReducer from './userReducer'
import { State } from '../types'

export default combineReducers<State>({
    user: userReducer
})