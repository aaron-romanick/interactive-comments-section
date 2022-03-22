

<script setup>
const props = defineProps({
    activator: {
        type: [Boolean, Function],
        required: true,
    },
})
</script>

<template>
    <div
        class="transitioner"
        :class="{ 'active': props.activator }"
    >
        <slot></slot>
    </div>
</template>
