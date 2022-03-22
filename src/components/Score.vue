

<script setup>
import { useState } from '../composables/state.js'

const props = defineProps({
    id: {
        type: Number,
        required: true,
        validator(value) {
            const regex = /^[1-9][0-9]*$/
            return regex.test(value)
        },
    },
    score: {
        type: Number,
        required: true,
        validator(value) {
            const regex = /^[0-9]+$/
            return regex.test(value)
        },
    },
})
const { changeScore } = useState()

const increment = function() {
    changeScore(props.id, 1)
}

const decrement = function() {
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