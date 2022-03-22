

<script setup>
import { computed, ref, toRefs } from 'vue'
import { REPLYING, useState } from '../composables/state.js'

const props = defineProps({
    buttonText: {
        type: String,
        required: true,
    },
    parentId: {
        type: Number,
        default: null,
    }
})

const {
    state,
    addComment,
    setActive,
} = useState()
const {
    activeId,
    actionType,
    currentUser,
} = toRefs(state)

const content = ref('')

const isReplyingComment = computed(() => {
    return activeId.value === props.parentId && actionType.value === REPLYING
})

const post = function() {
    addComment(content.value, props.parentId)
    content.value = ''
    setActive(null, null)
}
</script>

<template>
    <div class="add-comment" >
        <picture class="avatar"
            ><source type="image/webp" :srcset="currentUser.image.webp"
            ><source type="image/png" :srcset="currentUser.image.png"
            ><img :src="currentUser.image.png" :alt="`${currentUser.username}'s avatar`">
        </picture>
        <textarea
            class="input"
            placeholder="Add a comment..."
            v-model="content"
        ></textarea>
        <button
            class="button button-content"
            @click="post"
        >{{ buttonText }}</button>
    </div>
</template>
