

<script setup>
import { onMounted, ref, toRefs, watchEffect } from 'vue'
import { useState } from '../composables/state.js'

const {
    state,
    deleteComment,
    toggleModal,
    setActive,
} = useState()
const {
    activeId,
    isModalActive: isActive
} = toRefs(state)

const modal = ref(null)

onMounted(() => {
    watchEffect(() => {
        isActive.value
            ? modal.value.showModal()
            : modal.value.close()
    })
})

const close = function() {
    setActive(null, null)
    toggleModal(false)
}

const cancel = function() {
    close()
}

const remove = function() {
    deleteComment(activeId)
    close()
}
</script>

<template>
    <dialog
        class="modal"
        id="modal"
        ref="modal"
    >
        <div class="modal-header">Delete comment</div>
        <div class="modal-body">Are you sure your want to delete this comment? This will remove the comment and can't be undone.</div>
        <div class="modal-confirm">
            <button
                class="button button-confirm button-confirm-cancel"
                @click="cancel"
            >No, cancel</button>
            <button
                class="button button-confirm button-confirm-delete"
                @click="remove"
            >Yes, delete</button>
        </div>
    </dialog>
</template>
