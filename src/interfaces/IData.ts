import type { IComment } from './IComment.ts'
import type { IUser } from './IUser.ts'

export interface IData {
    currentUser: IUser
    comments: IComment[]
}