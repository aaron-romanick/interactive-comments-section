

<script setup lang="ts">
import Comment from './Comment.vue'
import { useState } from '../composables/state'

interface Props {
    parentId?: number | null
}

const props = withDefaults(defineProps<Props>(), {
    parentId: null,
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
