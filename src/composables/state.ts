import { computed, reactive, readonly } from 'vue'
import type { ComputedRef } from 'vue'
import { ACTION_TYPE } from '../constants/ACTION_TYPE'
import type { IComment } from '../interfaces/IComment'
import type { IData } from '../interfaces/IData'
import type { IUser } from '../interfaces/IUser'

const STORAGE_KEY = 'interactive-comments-section-main' as const

const state = reactive({
    actionType: null as string | null,
    activeId: null as number | null,
    comments: [] as IComment[],
    currentUser: {} as IUser,
    isModalActive: false,
})

function fabricateCreatedAts(comments: IComment[]): IComment[] {
    const now: number = Date.now()
    return comments.map(
        (comment: IComment): IComment => {
            comment.createdAt = now - comment.createdAt
            return comment
        }
    )
}

async function fetchData() {
    const data = await import('../assets/data.json')
    const alteredData = {
        currentUser: data.currentUser,
        comments: [...fabricateCreatedAts(data.comments)],
    }
    return alteredData
}

function findReplies(id: number) {
    const parentIds: number[] = []
    const filteredComments: IComment[] = state.comments.filter(
        (comment: IComment) => {
            return comment.parentId === id
        }
    )
    if(filteredComments.length) {
        parentIds.push(id)
        filteredComments.forEach(
            (comment: IComment): void => {
                parentIds.concat(findReplies(comment.id))
            }
        )
    }
    return parentIds
}

export const DELETING = ACTION_TYPE.DELETING
export const EDITTING = ACTION_TYPE.EDITTING
export const REPLYING = ACTION_TYPE.REPLYING
export function useState() {

    const commentsByTimestamp: ComputedRef<IComment[]> = computed(
        (): IComment[] => {
            return [...state.comments].sort(
                (x: IComment, y: IComment): number => x.createdAt - y.createdAt
            )
        }
    )

    const isDataLoaded: ComputedRef<boolean> = computed(
        (): boolean =>  {
            return Object.keys(state.currentUser).length > 0
        }
    )

    function addComment(content: string, parentId: number | null = null): void {
        const id: number = nextId()
        const comment: IComment = {
            id,
            parentId,
            content,
            createdAt: Date.now(),
            score: 0,
            user: {...state.currentUser}
        }
        state.comments.push(comment)
        saveData()
    }

    function changeScore(id: number, amount: number): void {
        const comment: IComment = state.comments.find(
            (comment: IComment): boolean => comment.id === id
        )!
        const newScore: number = comment.score + amount
        comment.score = newScore >= 0
            ? newScore
            : 0
        saveData()
    }

    function deleteComment(id: number): void {
        const parentIds: Set<number> = new Set(findReplies(id))
        state.comments = state.comments.filter(
            (comment: IComment): boolean => {
                return comment.id !== id && !parentIds.has(comment.parentId as number)
            }
        )
        saveData()
    }

    async function loadData(): Promise<void> {
        const dataJson: string | null = localStorage.getItem(STORAGE_KEY)
        let data: IData | undefined = dataJson !== null
            ? JSON.parse(dataJson)
            : dataJson
        if(!data) data = await fetchData()
        state.currentUser = data.currentUser
        state.comments = data.comments
    }

    function hasReplies(id: number): boolean {
        return state.comments.some(
            (comment: IComment): boolean => comment.parentId === id
        )
    }

    function nextId(): number {
        const maxId: number = state.comments.reduce(
            (maxId: number, comment: IComment): number => {
                return maxId > comment.id
                    ? maxId
                    : comment.id
            },
            0
        )
        return maxId + 1
    }

    function replies(id: number): IComment[] {
        return commentsByTimestamp.value.filter(
            (comment: IComment): boolean => comment.parentId === id
        )
    }

    function saveData() {
        const data: IData = {
            currentUser: state.currentUser,
            comments: state.comments,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

    }

    function setActive(id: number | null, activityType: string | null) {
        state.activeId = id
        state.actionType = activityType
    }

    function toggleModal(isActive: boolean) {
        state.isModalActive = isActive
    }

    function updateComment(content: string, id: number) {
        state.comments = state.comments.map(
            (comment: IComment): IComment => {
                if(comment.id === id) {
                    comment.content = content
                }
                return comment
            }
        )
        saveData()
    }

    return {
        state: readonly(state),
        commentsByTimestamp,
        isDataLoaded,

        addComment,
        changeScore,
        deleteComment,
        loadData,
        hasReplies,
        nextId,
        replies,
        saveData,
        setActive,
        toggleModal,
        updateComment,
    }
}