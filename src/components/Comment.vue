

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import Actions from './Actions.vue'
import Content from './Content.vue'
import AddComment from './AddComment.vue'
import Score from './Score.vue'
import CommentList from './CommentList.vue'
import Transitioner from './Transitioner.vue'
import type { IUser } from '../interfaces/IUser'
import { EDITTING, REPLYING, useState } from '../composables/state'
import { useTimeAgo } from '../composables/time-ago'

const props = defineProps<{
    id: number
    user: IUser
    createdAt: number
    score: number
    content: string
}>()

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

const content: Ref<string> = ref(props.content)

const { humanReadableTime } = useTimeAgo()

const isCurrentUser: ComputedRef<boolean> = computed(
    (): boolean => {
        return isDataLoaded
            ? props.user.username === currentUser.value.username
            : false
    }
)

const isReplying: ComputedRef<boolean> = computed(
    (): boolean => {
        return activeId.value === props.id && actionType.value === REPLYING
    }
)
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