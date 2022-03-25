import { ACTION_TYPE } from '../constants/ACTION_TYPE'
import type { IUser } from '../interfaces/IUser'

export interface IState {
    actionType: ACTION_TYPE | null
    activeId: number | null
    comments: IUser[]
    currentUser: IUser
    isModalActive: boolean
}