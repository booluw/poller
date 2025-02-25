<script setup lang="ts">
import { ref } from 'vue'
import AddNewPoll from './components/addNewPoll.vue'

const addNewPollModal = ref(false)
</script>

<template>
  <section class="page">
    <header class="header">
      <section class="header__container">
        <div class="header__logo">Poll<span>.vue</span></div>
        <button class="btn header__btn" @click="addNewPollModal = true">Add New Question</button>
      </section>
    </header>

    <RouterView />
    <AddNewPoll v-if="addNewPollModal" @close="addNewPollModal = false" />
  </section>
</template>
