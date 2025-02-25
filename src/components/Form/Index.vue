
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { ref, computed, provide } from 'vue';

type FormRules = (value: string) => boolean | string
export type Rules = { message?: string, valid: FormRules }

export interface Form {
  model: any
  required?: boolean
  rules?: Record<string, Rules>
}

const { model, rules, required } = defineProps<Form>();
const emit = defineEmits(["submit"])
const form = ref(null)

provide("model", model);
provide("rules", rules);
provide('required', required);

const validation = computed(() => {
  if (rules === undefined) return [];
  const validator: string[] = []

  if (required) {
    Object.keys(model).forEach((item) => {
      const valid = model[item] === null || model[item] === undefined || model[item] === ''

      if (valid) {
        if ((form.value as any).querySelectorAll(`[data-prop=${item}]`).length !== 0) {
          validator.push(item)
        }
      }
    })
    return validator
  }

  Object.keys(model).forEach((item) => {
    const valid = rules[item] !== undefined ? !rules[item].valid(model[item]) : false

    if (valid) {
      if ((form.value as any).querySelectorAll(`[data-prop=${item}]`).length !== 0) {
        validator.push(item)
      }

      return
    }
  })

  return validator;
})

const showErrors = function () {
  const errorInputs = Array.from((form.value as any).querySelectorAll('[data-prop]')).filter(el => validation.value.includes(el.dataset.prop))
  const inputs = Array.from((form.value as any).querySelectorAll('[data-prop]'))

  inputs.forEach((input: HTMLElement) => {
    (input.querySelector('.form__input') as any).classList.remove('error')
  })

  if (validation.value.length === 0) {
    errorInputs.forEach((element: HTMLElement) => {
      (element.querySelector(".form__input") as any).classList.remove("error")
      (element.querySelector(".warning-text") as any).classList.add("opacity-0")
    })
  } else {
    errorInputs.forEach((element: HTMLELement) => {
      element.querySelector(".form__input").classList.add("error")
      element.querySelector(".warning-text").classList.remove("opacity-0")
    })
  }
}

const handleFormSubmit = function () {
  showErrors();
  emit("submit", validation.value.length === 0)
}
</script>
<template>
  <form @submit.prevent="handleFormSubmit" ref="form">
    <slot />
  </form>
</template>
