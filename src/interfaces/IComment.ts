import type { IUser } from './IUser'

export interface IComment {
    id: number
    parentId: number | null
    content: string
    createdAt: number
    score: number
    user: IUser
}