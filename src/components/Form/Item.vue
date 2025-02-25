<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, inject, watch } from 'vue'

export interface FormItem {
  prop?: string
}

const { prop } = defineProps<FormItem>()
const input = ref(null)
const model = inject('model')
const rules = inject('rules')
const required = inject('required') as boolean
const showErr = ref(false)

const showErrors = function (inputEl: HTMLElement) {
  showErr.value =
    prop !== undefined ? (rules[prop] ? !rules[prop]?.valid(model[prop]) : false) : false

  if (!showErr.value) {
    inputEl.classList.remove('error')
  } else {
    inputEl.classList.add('error')
  }
}

const validateItem = function () {
  const inputEl = input.value!.querySelector('input') || input.value!.querySelector('textarea') || input.value!.querySelector('select')

  if (inputEl === null) return
  ['focus', 'onblur', 'input'].forEach((event) => {
    inputEl.addEventListener(event, () => {
      if (inputEl !== null) showErrors(inputEl)
    })
  })
}

onMounted(() => {
  validateItem()
})

watch(model, () => {
    validateItem()
})

onBeforeUnmount(() => {
  const inputEl = input.value!.querySelector('input') || input.value!.querySelector('textarea') || input.value!.querySelector('select')

  if (inputEl) {
    ['focus', 'onblur', 'input'].forEach((event) => {
      inputEl.removeEventListener(event, () => { })
    })
    showErr.value =
      prop !== undefined ? (rules[prop] ? !rules[prop]?.valid(model[prop]) : false) : false
  }
})
</script>

<template>
  <div class="mb-2" ref="input" :data-prop="prop">
    <slot />
    <p
      :class="{ 'opacity-0': !showErr }"
      class="mt-1 text-xs text-danger text-red-500 warning-text"
    >
      {{ prop !== undefined ? (rules[prop]?.message || required ? `required` : false) : false }}
    </p>
  </div>
</template>

<style>
.error {
  border-color: #f16588 !important;
}
</style>
