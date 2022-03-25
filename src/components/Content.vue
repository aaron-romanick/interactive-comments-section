

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { EDITTING, useState } from '../composables/state.ts'

const props = defineProps<{
    id: number
    content: string
}>()

const {
    state,
    setActive,
    updateComment,
} = useState()
const {
    activeId,
    actionType,
} = toRefs(state)

const content: Ref<string> = ref(props.content)

const isEditting: ComputedRef<boolean> = computed(
    (): boolean => {
        return activeId.value === props.id && actionType.value === EDITTING
    }
)

const formattedContent: ComputedRef<string> = computed(
    (): string => {
        const regex: RegExp = /(@[A-Za-z0-9_]+)/g
        const replacement: string = '<span class="mention">$1</span>'
        return content.value.replace(regex, replacement)
    }
)

const update = (): void => {
    updateComment(content.value, props.id)
    setActive(null, null)
}
</script>

<template>
    <div
        v-if="isEditting"
        class="comment-content updating"
    >
        <textarea
            class="input"
            placeholder="Add a comment..." 
            v-model="content"
        ></textarea>
        <button
            class="button button-content"
            @click="update()"
        >Update</button>
    </div>
    <div
        v-else
        class="comment-content"
        v-html="formattedContent"
    ></div>
</template>