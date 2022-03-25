import { ACTION_TYPE } from '../constants/ACTION_TYPE.ts'
import type { IUser } from '../interfaces/IUser.ts'

export interface IState {
    actionType: ACTION_TYPE | null
    activeId: number | null
    comments: IUser[]
    currentUser: IUser
    isModalActive: boolean
}