

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import type { ComputedRef } from 'vue'
import { DELETING, EDITTING, REPLYING, useState } from '../composables/state'
import type { IUser } from '../interfaces/IUser'

const props = defineProps<{
    id: number
    user: IUser
}>()

const {
    state,

    isDataLoaded,
    setActive,
    toggleModal,
} = useState()
const { currentUser } = toRefs(state)

const isCurrentUser: ComputedRef<boolean> = computed(
    (): boolean => {
        return isDataLoaded
            ? props.user.username === currentUser.value.username
            : false
    }
)

const showModal = (): void => {
    setActive(props.id, DELETING)
    toggleModal(true)
}
</script>

<template>
    <div class="comment-actions">
        <template v-if="isCurrentUser">
            <button
                class="comment-action comment-action-delete"
                @click="showModal"
            >Delete</button>
            <button
                class="comment-action comment-action-edit"
                @click="setActive(props.id, EDITTING)"
            >Edit</button>
        </template>
        <button
            v-else
            class="comment-action comment-action-reply"
            @click="setActive(props.id, REPLYING)"
        >Reply</button>
    </div>
</template>