import type { IComment } from './IComment'
import type { IUser } from './IUser'

export interface IData {
    currentUser: IUser
    comments: IComment[]
}