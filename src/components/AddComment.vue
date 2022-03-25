

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { REPLYING, useState } from '../composables/state'

const props = defineProps<{
    buttonText: string
    parentId?: number
}>()

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

const content: Ref<string> = ref('')

const isReplyingComment: ComputedRef<boolean> = computed(
    (): boolean => {
        return activeId.value === props.parentId && actionType.value === REPLYING
    }
)

const post = (): void => {
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
