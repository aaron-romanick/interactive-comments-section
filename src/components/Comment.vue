

<script setup>
import { computed, ref, toRefs } from 'vue'
import Actions from './Actions.vue'
import Content from './Content.vue'
import AddComment from './AddComment.vue'
import Score from './Score.vue'
import CommentList from './CommentList.vue'
import Transitioner from './Transitioner.vue'
import { EDITTING, REPLYING, useState } from '../composables/state.js'
import { useTimeAgo } from '../composables/time-ago.js'

const props = defineProps({
    id: {
        type: Number,
        required: true,
        validator(value) {
            const regex = /^[1-9][0-9]*$/
            return regex.test(value)
        },
    },
    user: {
        type: Object,
        required: true,
        validator(value) {
            return value.hasOwnProperty('image') &&
                value.hasOwnProperty('username')
        },
    },
    createdAt: {
        type: Number,
        required: true,
        validator(value) {
            const regex = /^[1-9][0-9]{12}$/
            return regex.test(value)
        },
    },
    score: {
        type: Number,
        required: true,
        validator(value) {
            const regex = /^[0-9]+$/
            return regex.test(value)
        },
    },
    content: {
        type: String,
        required: true,
    },
})

const {
    state,
    isDataLoaded,
    hasReplies,
} = useState()
const {
    activeId,
    actionType,
    currentUser,
} = toRefs(state)

const content = ref(props.content)

const { humanReadableTime } = useTimeAgo()

const isCurrentUser = computed(() => {
    return isDataLoaded
        ? props.user.username === currentUser.value.username
        : false
})

const isReplying = computed(() => {
    return activeId.value === props.id && actionType.value === REPLYING
})
</script>

<template>
    <article class="comment">
        <div class="comment-container">
            <Score
                :id="props.id"
                :score="props.score"
            />
            <div class="comment-details">
                <picture class="avatar avatar-small"
                    ><source type="image/webp" :srcset="props.user.image.webp"
                    ><source type="image/png" :srcset="props.user.image.png"
                    ><img :src="props.user.image.png" :alt="`${props.user.username}'s avatar`">
                </picture>
                <div class="username">
                    {{ props.user.username }}
                    <span
                        v-if="isCurrentUser"
                        class="self"
                    >you</span>
                </div>
                <div class="created-at">{{ humanReadableTime(createdAt) }}</div>
            </div>
            <Actions
                :id="props.id"
                :user="props.user"
            />
            <Content 
                :id="props.id"
                :content="props.content"
            />
        </div>
        <Transitioner :activator="isReplying">
            <AddComment
                buttonText="Reply"
                :parentId="id"
            />
        </Transitioner>
        <CommentList
            v-if="hasReplies(props.id)"
            :parentId="props.id"
        />
    </article>
</template>