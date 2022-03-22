import { computed, reactive, readonly } from 'vue'

const STORAGE_KEY = 'interactive-comments-section-main'

const state = reactive({
    actionType: null,
    activeId: null,
    comments: [],
    currentUser: {},
    isModalActive: false,
})

function fabricateCreatedAts(comments) {
    const now = Date.now()
    return comments.map(comment => {
        comment.createdAt = now - comment.createdAt
        return comment
    })
}

async function fetchData() {
    const data = await import('../assets/data.json')
    const alteredData = {
        currentUser: data.currentUser,
        comments: [...fabricateCreatedAts(data.comments)],
    }
    return alteredData
}

function findReplies(id) {
    const parentIds = []
    const filteredComments = state.comments.filter(comment => {
        return comment.parentId === id
    })
    if(filteredComments.length) {
        parentIds.push(id)
        filteredComments.forEach(comment => {
            parentIds.concat(findReplies(comment.id, parentIds))
        })
    }
    return parentIds
}

export const DELETING = 'deleting'
export const EDITTING = 'editting'
export const REPLYING = 'replying'
export function useState() {

    const commentsByTimestamp = computed(() => {
        return [...state.comments].sort((x, y) => x.createdAt - y.createdAt)
    })

    const isDataLoaded = computed(() =>  {
        return Object.keys(state.currentUser).length > 0
    })

    function addComment(content, parentId = null) {
        const id = nextId()
        state.comments.push({
            id,
            parentId,
            content,
            createdAt: Date.now(),
            score: 0,
            user: {...state.currentUser}
        })
        saveData()
    }

    function changeScore(id, amount) {
        const comment =  state.comments.find(comment => comment.id === id)
        const newScore = comment.score + amount
        comment.score = newScore >= 0
            ? newScore
            : 0
        saveData()
    }

    function deleteComment(id) {
        const parentIds = new Set(findReplies(id.value))
        state.comments = state.comments.filter(comment => {
            return comment.id !== id.value && !parentIds.has(comment.parentId)
        })
        saveData()
    }

    async function loadData() {
        let data = JSON.parse(localStorage.getItem(STORAGE_KEY))
        if(!data) data = await fetchData()
        state.currentUser = data.currentUser
        state.comments = data.comments
    }

    function hasReplies(id) {
        return state.comments.some(comment => comment.parentId === id)
    }

    function nextId() {
        const maxId = state.comments.reduce(
            (maxId, comment) => {
                return maxId > comment.id
                    ? maxId
                    : comment.id
            },
            0
        )
        return maxId + 1
    }

    function replies(id) {
        return commentsByTimestamp.value.filter(comment => comment.parentId === id)
    }

    function saveData() {
        const data = {
            currentUser: state.currentUser,
            comments: state.comments,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

    }

    function setActive(id, activityType) {
        state.activeId = id
        state.actionType = activityType
    }

    function toggleModal(isActive) {
        state.isModalActive = isActive
    }

    function updateComment(content, id) {
        state.comments = state.comments
            .map(comment => {
                if(comment.id === id) {
                    comment.content = content
                }
                return comment
            })
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