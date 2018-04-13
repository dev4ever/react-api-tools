export interface UserState {
    isLoggedIn: boolean
    id: string | null
    name: string | null
}

export interface State {
    user: UserState
}
