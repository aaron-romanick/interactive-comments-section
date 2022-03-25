

<script setup lang="ts">
import { useState } from '../composables/state.ts'

const props = defineProps<{
    id: number
    score: number,
}>()

const { changeScore } = useState()

const increment = (): void => {
    changeScore(props.id, 1)
}

const decrement = (): void => {
    changeScore(props.id, -1)
}
</script>

<template>
    <div class="score">
        <button
            class="score-add"
            @click="increment"
        >+</button>
        <div class="score-number">{{ props.score }}</div>
        <button
            class="score-remove"
            @click="decrement"
        >&minus;</button>
    </div>
</template>