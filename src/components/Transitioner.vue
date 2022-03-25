

<script setup lang="ts">
const props = defineProps<{
    activator: boolean
}>()
</script>

<template>
    <div
        class="transitioner"
        :class="{ 'active': props.activator }"
    >
        <slot></slot>
    </div>
</template>
