import AT from './ActionTypes'


export interface UserLoginAction {
    type: AT.USER_LOGIN
    id: string
    name: string
}

export interface UserLogoutAction {
    type: AT.USER_LOGOUT
}

export type ActionObject =
    UserLoginAction |
    UserLogoutAction
     