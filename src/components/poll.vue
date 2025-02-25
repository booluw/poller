<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { usePollStore, type Answer } from '@/stores/poll'
import { notify } from './Notification'

const store = usePollStore()

const currentPoll = ref(1)
const hasAnswered = ref(false)

const poll = ref()

const percentages = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const frequency: any = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {}

  if (poll.value) {
    poll.value.options.forEach((option) => {
      result[option] = 0
    })

    if (poll.value.answers.length !== 0) {
      poll.value.answers.forEach((answer) => {
        frequency[answer.option] = (frequency[answer.option] || 0) + 1
      })

      Object.keys(frequency).forEach((option) => {
        result[option] = (frequency[option] / poll.value.answers.length) * 100
      })
    }
  }

  return result
})

const selectOption = function (answer: { id: number; answer: Answer }) {
  store.answerPoll(answer)

  // Mark as answer and revert back, so user can continue to answer poll
  hasAnswered.value = true

  setTimeout(() => {
    hasAnswered.value = false
  }, 3000)
}

const nextQuestion = () => {
  if (currentPoll.value !== store.polls.length) {
    currentPoll.value++
    return
  }

  notify({ title: 'No next question', type: 'error' })
  return
}

const prevQuestion = () => {
  if (currentPoll.value === store.polls.length) {
    currentPoll.value--
    return
  }

  notify({ title: 'No Prev question', type: 'error' })
}

const getQuestion = function () {
  poll.value = store.polls.filter((poll) => poll.id === currentPoll.value)[0]
}

watch(() => currentPoll.value, () => getQuestion())
onMounted(() => getQuestion())
</script>
<template>
  <div class="container">
    <div class="container__item">
      <section class="poll">
        <h1 class="poll__question">{{ poll?.question }}</h1>
        <div class="poll__options" :class="{ 'poll__deactivate-select': hasAnswered }">
          <button
            class="poll__option"
            :class="{
              poll__selected:
                poll?.answers[poll?.answers?.length - 1]?.option === option && hasAnswered,
            }"
            v-for="(option, key) in poll?.options"
            :key
            @click="
              selectOption({
                id: poll.id,
                answer: { timestamp: new Date().toString(), option },
              })
            "
          >
            {{ option }}
            <span v-if="!Object.values(percentages).every((value) => value === 0)"
              >({{ Math.ceil(percentages[option]) }}%)</span
            >
          </button>
        </div>
      </section>

      <div class="result">
        <div class="result__header">
          <h2 class="result__heading">
            Poll Result
            <span>[{{ poll?.answers?.length }} vote{{ poll?.answers?.length > 1 ? 's' : '' }}]</span>
          </h2>
          <button class="result__btn" @click="store.resetPoll(currentPoll)">Reset Votes</button>
        </div>
        <div class="result__bars">
          <div
            class="result__bar"
            :class="{
              'result__bar--default': Object.values(percentages).every((value) => value === 0),
            }"
            :title="`${option}: ${percentages[option]}`"
            :style="`width: ${percentages[option]}%`"
            v-for="(option, key) in Object.keys(percentages)"
            :key
          >
            {{ option }} : {{ Math.ceil(percentages[option]) }}%
          </div>
        </div>
      </div>

      <div class="container mt-3" style="gap: 1rem" v-if="store.polls.length !== 1">
        <button class="btn" style="width: 10rem;" @click="prevQuestion()">Prev</button>
        <button class="btn" style="width: 10rem;" @click="nextQuestion()">Next</button>
      </div>
    </div>
  </div>
</template>
