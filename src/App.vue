<script setup lang="ts">
import AddNewPoll from './components/addNewPoll.vue';

</script>

<template>
  <section class="page">
    <header class="header">
      <section class="header__container">
        <div class="header__logo">Poll<span>.vue</span></div>
        <router-link to="" class="header__link">
          <button class="btn header__btn">Add New Question</button>
        </router-link>
      </section>
    </header>

    <RouterView />
    <AddNewPoll />
  </section>
</template>
