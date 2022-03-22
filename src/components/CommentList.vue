

<script setup>
import Comment from './Comment.vue'
import { useState } from '../composables/state.js'

const props = defineProps({
    parentId: {
        type: Number,
        default: null,
        validator(value) {
            const regex = /^[1-9][0-9]*$/
            return value === null || regex.test(value)
        },
    },
})

const { replies } = useState()
</script>

<template>
    <div class="comment-list">
        <Comment
            v-for="comment in replies(props.parentId)"
            :key="comment.id"
            :id="comment.id"
            :user="comment.user"
            :createdAt="comment.createdAt"
            :score="comment.score"
            :content="comment.content"
        />
    </div>
</template>
