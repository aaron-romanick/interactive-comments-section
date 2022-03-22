

<script setup>
import { computed, ref, toRefs } from 'vue'
import { DELETING, EDITTING, REPLYING, useState } from '../composables/state.js'

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
})

const {
    state,

    isDataLoaded,
    setActive,
    toggleModal,
} = useState()
const { currentUser } = toRefs(state)

const isCurrentUser = computed(() => {
    return isDataLoaded
        ? props.user.username === currentUser.value.username
        : false
})

const showModal = function() {
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