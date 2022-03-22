

<script setup>
import { computed, ref, toRefs } from 'vue'
import { EDITTING, useState } from '../composables/state.js'

const props = defineProps({
    id: {
        type: Number,
        required: true,
        validator(value) {
            const regex = /^[1-9][0-9]*$/
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
    setActive,
    updateComment,
} = useState()
const {
    activeId,
    actionType,
} = toRefs(state)

const content = ref(props.content)

const isEditting = computed(() => {
    return activeId.value === props.id && actionType.value === EDITTING
})

const formattedContent = computed(() => {
    const regex = /(@[A-Za-z0-9_]+)/g
    const replacement = '<span class="mention">$1</span>'
    return content.value.replace(regex, replacement)
})

const update = function() {
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