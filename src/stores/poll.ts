import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Answer {
  timestamp: string
  option: string
}

export interface Poll {
  id: number
  question: string
  options: string[]
  answers: Answer[]
}

export const usePollStore = defineStore('polls', () => {
  const polls = ref<Poll[]>([
    {
      id: 1,
      question: 'Who will win the next AFCON trophy?',
      options: ['Nigeria', 'South Africa', 'Morocco', 'Ghana'],
      answers: []
    }
  ])

  function answerPoll({ id, answer } : { id: number, answer: Answer }) {
    polls.value = polls.value.map(poll => {
      if (poll.id === id) {
        poll.answers.push(answer)
      }

      return poll
    });
  }

  function resetPoll(id: number) {
    polls.value = polls.value.map(poll => {
      if (poll.id === id) {
        poll.answers = []
      }

      return poll
    })
  }

  function addToPoll(question: Poll) {
    polls.value.push(question)
  }

  return { polls, answerPoll, resetPoll, addToPoll }
})
