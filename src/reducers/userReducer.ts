import { ActionObject } from '../types'
import { UserState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'
import { Connection } from '../auth/Connection'

const unauthenticatedState: UserState = {
    isLoggedIn: false,
    id: null,
    name: null
};

const initialState = { ...unauthenticatedState }

const session = Connection.restoreSession()
if (session) {
    initialState.isLoggedIn = true
    initialState.id = ''
    initialState.name = ''
}

const userReducer: Reducer<UserState> = (state = initialState, action: ActionObject): UserState => {
    switch (action.type) {
        case AT.USER_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                name: action.name
            }
        case AT.USER_LOGOUT:
            Connection.invalidateSession()
            return { ...unauthenticatedState };
        default:
            return state;
    }
}

export default userReducer;