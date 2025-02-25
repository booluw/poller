<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { usePollStore } from '@/stores/poll'

import Form from './Form/Index.vue'
import FormItem from './Form/Item.vue'

const store = usePollStore()

const poll = reactive({ id: store.polls.length + 1, question: '', options: [], answers: [], option1: '', option2: '', option3: '', option4: '' })

const addQuestionToPoll = function (valid: boolean) {
  if (valid) {
    const { option1, option2, option3, option4, ...rest } = poll
    store.addToPoll({ ...rest, options: [option1, option2, option3, option4 ] })

    // Send message

    return
  } else {
    return false
  }
}
</script>
<template>
  <section class="modal">
    <div class="modal__container">
      <div class="modal__header">
        <h2 class="modal__heading">Add New Poll</h2>
        <button class="btn btn--small">Close</button>
      </div>

      <Form :model="poll" :rules="{}" required class="form" @submit="addQuestionToPoll">
        <FormItem class="form__item" prop="question" for="question">
          <span class="form__FormItem">Question</span>
          <textarea
            v-model="poll.question"
            class="form__input"
            id="question"
            placeholder="What question do you want people's suggestion on?"
          />
          <p class="form__error" />
        </FormItem>

        <FormItem class="form__item" prop="option1" for="option1">
          <span class="form__FormItem">Option One</span>
          <input
            v-model="poll.option1"
            id="option1"
            class="form__input"
            type="text"
            placeholder="First option"
          />
          <p class="form__error" />
        </FormItem>

        <FormItem class="form__item" prop="option2" for="option2">
          <span class="form__FormItem">Option Two</span>
          <input
            v-model="poll.option2"
            id="option2"
            class="form__input"
            type="text"
            placeholder="Second option"
          />
          <p class="form__error" />
        </FormItem>

        <FormItem class="form__item" prop="option3" for="option3">
          <span class="form__FormItem">Option Three</span>
          <input
            v-model="poll.option3"
            id="option3"
            class="form__input"
            type="text"
            placeholder="Third option"
          />
          <p class="form__error" />
        </FormItem>

        <FormItem class="form__item" prop="option4" for="option4">
          <span class="form__FormItem">Option Four</span>
          <input
            v-model="poll.option4"
            id="option4"
            class="form__input"
            type="text"
            placeholder="Fourth option"
          />
          <p class="form__error" />
        </FormItem>

        <div style="margin: 2rem 0 0" />
        <button class="btn btn--primary">Add New Poll</button>
      </Form>
    </div>
  </section>
</template>
