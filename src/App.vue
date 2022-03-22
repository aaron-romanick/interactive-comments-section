

<script setup>
import { toRefs } from 'vue'
import AddComment from './components/AddComment.vue'
import Modal from './components/Modal.vue'
import CommentList from './components/CommentList.vue'
import { useState } from './composables/state.js'

const { isDataLoaded, loadData } = useState()
loadData()
</script>

<template>
    <main>
        <CommentList />
        <AddComment
            v-if="isDataLoaded"
            buttonText="Send"
        />
        <Modal />
    </main>
</template>
