<script setup lang="ts">
import { toRefs } from 'vue'
import AddComment from './components/AddComment.vue'
import Modal from './components/Modal.vue'
import CommentList from './components/CommentList.vue'
import { useState } from './composables/state'

const {
    isDataLoaded,
    loadData,
} = useState()
loadData()
</script>

<template>
    <header class="visually-hidden">
        <h1>Interactive Comments Section</h1>
    </header>
    <main>
        <CommentList />
        <AddComment
            v-if="isDataLoaded"
            buttonText="Send"
        />
        <Modal />
    </main>
</template>

<style>
:root {
    --hsl-moderate-blue: 238, 40%, 52%;
    --hsl-soft-red: 358, 79%, 66%;
    --hsl-light-grayish-blue: 239, 57%, 85%;
    --hsl-pale-red: 357, 100%, 86%;
    --hsl-dark-blue: 212, 24%, 26%;
    --hsl-grayish-blue: 211, 10%, 45%;
    --hsl-light-gray: 223, 19%, 93%;
    --hsl-very-light-gray: 228, 33%, 97%;
    --hsl-white: 0, 0%, 100%;

    --color-moderate-blue: hsl(var(--hsl-moderate-blue));
    --color-soft-red: hsl(var(--hsl-soft-red));
    --color-light-grayish-blue: hsl(var(--hsl-light-grayish-blue));
    --color-pale-red: hsl(var(--hsl-pale-red));
    --color-dark-blue: hsl(var(--hsl-dark-blue));
    --color-opacity-dark-blue: hsla(var(--hsl-dark-blue), 0.175);
    --color-grayish-blue: hsl(var(--hsl-grayish-blue));
    --color-light-gray: hsl(var(--hsl-light-gray));
    --color-very-light-gray: hsl(var(--hsl-very-light-gray));
    --color-white: hsl(var(--hsl-white));

    --font-family-rubik: 'Rubik', sans-serif;
    --font-weight-light: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;
    --font-size-big: 20px;
    --font-size-normal: 16px;
    --font-size-small: 13px;

    --border-radius-normal: 0.5rem;

    --max-width-normal: 75ch;
    --min-width-normal: 375px;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

html, body {
    background: var(--color-very-light-gray);
    color: var(--color-grayish-blue);
    font-family: var(--font-family-rubik);
    font-weight: var(--font-weight-light);
    margin: 0;
    padding: 0;
}

body {
    line-height: 1.5;
}

button {
    border: none;
    cursor: pointer;
    display: inline-block;
    font-family: var(--font-family-rubik);
    font-size: var(--font-size-normal);
    margin: 0;
    text-align: center;
    text-decoration: none;
}

#app {
    margin: 2rem auto;
    max-width: var(--max-width-normal);
    min-width: var(--min-width-normal);
    padding: 0 1rem;
}

.comment-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.comment-list .comment-list {
    background: linear-gradient(var(--color-light-gray), var(--color-light-gray)) no-repeat 0 / 2px 100%;
    margin: 1.5rem auto 0;
    padding-left: 1rem;
}

@media screen and (min-width: 770px) {
    .comment-list .comment-list {
        background-position: 2.5rem;
        padding-left: 5.25rem;
    }
}

.comment-container {
    background: var(--color-white);
    border-radius: var(--border-radius-normal);
    display: grid;
    gap: 1.5rem;
    padding: 1.75em 1.5em;
}

@media screen and (min-width: 770px) {
    .comment-container {
        grid-template-columns: auto auto minmax(0, 1fr);
    }
}

.score {
    display: flex;
    flex-direction: row;
    grid-column: 1;
    grid-row: 3;
}

@media screen and (min-width: 770px) {
    .score {
        flex-direction: column;
        grid-column: 1;
        grid-row: 1 / span 2;
    }
}

[class^="score-"] {
    background: var(--color-very-light-gray);
    border: none;
    font-size: var(--font-size-normal);
    font-weight: var(--font-weight-medium);
    padding: 0.35em 0.5rem;
}

.score-add,
.score-remove {
    color: var(--color-light-grayish-blue);
    min-width: 2rem;
}

.score-add:hover,
.score-remove:hover,
.score-add:active,
.score-remove:active,
.score-number {
    color: var(--color-moderate-blue);
}

.score-add {
    border-radius: 0.5rem 0 0 0.5rem;
}

@media screen and (min-width: 770px) {
    .score-add {
        border-radius: 0.5rem 0.5rem 0 0;
    }
}

.score-remove {
    border-radius: 0 0.5rem 0.5rem 0;
}

@media screen and (min-width: 770px) {
    .score-remove {
        border-radius: 0 0 0.5rem 0.5rem;
    }
}

.score-number {
    min-width: 2.5rem;
    text-align: center;
}

@media screen and (min-width: 770px) {
    .score > * {
        min-width: 2.5rem;
    }
}

.comment-details {
    align-items: center;
    display: flex;
    gap: 1rem;
    grid-column: 1 / span 2;
    grid-row: 1;
}

@media screen and (min-width: 770px) {
    .comment-details {
        grid-column: 2;
        grid-row: 1;
    }
}

.avatar > * {
    display: inline-block;
    height: auto;
    max-width: 2rem;
    vertical-align: middle;
}

@media screen and (min-width: 770px) {
    .avatar > * {
        max-width: 2.75rem;
    }
}

.avatar-small > * {
    max-width: 2rem;
}

.username {
    color: var(--color-dark-blue);
    font-size: inherit;
    font-weight: var(--font-weight-bold);
    margin: 0;
    padding: 0;
    white-space: nowrap;
}

.self {
    background: var(--color-moderate-blue);
    color: var(--color-white);
    display: inline-block;
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-light);
    margin-left: 0.5em;
    padding: 0.15em 0.4em;
}

.created-at {
    font-size: var(--font-size-small);
    white-space: nowrap;
}

@media screen and (min-width: 770px) {
    .created-at {
        font-size: var(--font-size-normal);
    }
}

.comment-content {
    grid-column: 1 / span 2;
    grid-row: 2;
}

@media screen and (min-width: 770px) {
    .comment-content {
        grid-column: 2;
        grid-row: 2;
    }
}

.comment-content.updating {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media screen and (min-width: 770px) {
    .comment-content.updating {
        grid-column: 2 / span 2;
        grid-row: 2;
    }
}


.comment-actions {
    align-items: center;
    grid-column: 2;
    grid-row: 3;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    white-space: nowrap;
}

@media screen and (min-width: 770px) {
    .comment-actions {
        grid-column: 3;
        grid-row: 1;
    }
}

.comment-action {
    background: none;
    border: none;
    font-size: var(--font-size-normal);
    font-weight: var(--font-weight-bold);
    padding: 0;
}

.comment-action::before {
    content: "";
    display: inline-block;
    height: 1rem;
    margin-right: 0.5em;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    width: 1rem;
}

.comment-action-reply,
.comment-action-edit {
    color: var(--color-moderate-blue);
}

.comment-action-reply::before,
.comment-action-edit::before {
    background: var(--color-moderate-blue);
}

.comment-action-reply::before {
    -webkit-mask-image: url(./images/icons/icon-reply.svg);
    mask-image: url(./images/icons/icon-reply.svg);
}

.comment-action-edit::before {
    -webkit-mask-image: url(./images/icons/icon-edit.svg);
    mask-image: url(./images/icons/icon-edit.svg);
}

.comment-action-reply:hover,
.comment-action-edit:hover {
    color: var(--color-light-grayish-blue);
}

.comment-action-reply:hover::before,
.comment-action-edit:hover::before {
    background: var(--color-light-grayish-blue);
}

.comment-action-delete {
    color: var(--color-soft-red);
}

.comment-action-delete::before {
    background: var(--color-soft-red);
    -webkit-mask-image: url(./images/icons/icon-delete.svg);
    mask-image: url(./images/icons/icon-delete.svg);
}

.comment-action-delete:hover {
    color: var(--color-pale-red);
}

.comment-action-delete:hover::before {
    background: var(--color-pale-red);
}

.add-comment {
    align-items: center;
    background: var(--color-white);
    border-radius: var(--border-radius-normal);
    display: grid;
    gap: 1rem;
    margin-top: 0.5rem;
    padding: 1.75em 1.5em;
}

@media screen and (min-width: 770px) {
    .add-comment {
        align-items: flex-start;
        grid-template-columns: auto minmax(0, 1fr) auto;
    }
}

.add-comment .avatar {
    grid-row: 2;
}

@media screen and (min-width: 770px) {
    .add-comment .avatar {
        grid-row: 1;
    }
}

.transitioner {
    max-height: 0;
    overflow: hidden;
    transition: max-height ease 750ms;
}

.transitioner.active {
    max-height: 100vh;
}

:not(.transitioner) > .add-comment {
    margin-top: 1.5rem;
    width: 100%;
}

.input {
    border: var(--color-light-gray) solid 1px;
    border-radius: var(--border-radius-normal);
    color: var(--color-grayish-blue);
    font-family: var(--font-family-rubik);
    font-size: var(--font-size-normal);
    grid-column: 1 / span 2;
    min-height: 6rem;
    padding: 1em 1.5em;
    resize: vertical;
    width: 100%;
}

@media screen and (min-width: 770px) {
    .input {
        grid-column: 2;
        grid-row: 1;
    }
}

.input:focus {
    border-color: var(--color-grayish-blue);
    outline: none;
}

.input::placeholder {
    border-color: var(--color-light-gray);
}

.updating .input {
    min-height: 7.5rem;
}

.button {
    border-radius: var(--border-radius-normal);
    font-weight: var(--font-weight-medium);
    text-transform: uppercase;
}

.button-content {
    background: var(--color-moderate-blue);
    border: var(--color-dark-blue) solid 1px;
    color: var(--color-white);
    grid-column: 2;
    grid-row: 2;
    justify-self: flex-end;
    padding: 0.75em 1.5em;
}

@media screen and (min-width: 770px) {
    .button-content {
        grid-column: 3;
        grid-row: 1;
        justify-self: auto;
    }
}

.button-content:hover,
.button-content:active {
    background: var(--color-light-grayish-blue);
    border-color: var(--color-opacity-dark-blue);
}

.mention {
    color: var(--color-moderate-blue);
    font-weight: var(--font-weight-bold);
}

.modal {
    border: none;
    border-radius: var(--border-radius-normal);
    color: var(--color-dark-blue);
    font-family: var(--font-family-rubik);
    max-width: 35ch;
    padding: 1.5rem;
}

.modal::backdrop {
    background: black;
    opacity: 0.5;
}

.modal-header {
    font-size: var(--font-size-big);
    font-weight: var(--font-weight-bold);
    line-height: 1;
}

.modal-body {
    margin: 1.25em 0;
}

.modal-confirm {
    display: flex;
    gap: 0.5rem;
}

.button-confirm {
    color: var(--color-very-light-gray);
    flex: 1;
    padding: 0.75em;
}

.button-confirm-cancel {
    background: var(--color-grayish-blue);
}

.button-confirm-cancel:hover {
    background: var(--color-light-gray);
}

.button-confirm-delete {
    background: var(--color-soft-red);
}

.button-confirm-delete:hover {
    background: var(--color-pale-red);
}

.visually-hidden {
  border: 0 !important;
  clip: rect(0,0,0,0) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  white-space: nowrap !important;
  width: 1px !important;
}
</style>