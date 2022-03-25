import type { IUser } from './IUser.ts'

export interface IComment {
    id: number
    parentId: number | null
    content: string
    createdAt: number
    score: number
    user: IUser
}