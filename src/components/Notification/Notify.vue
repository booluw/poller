<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import IconsClose from '@/components/icons/IconsClose.vue'

export interface Notification {
  title: string
  type: 'success' | 'error' | 'warning'
  message?: string
  action?: () => void
  actionText?: string
}

const { title, message, type, action, actionText } = defineProps<Notification>()

const show = ref(true)
let timeout = null

const close = function () {
  show.value = false
  clearTimeout(timeout!)
}

const callAction = function () {
  if (action) action()
  close()
}

onMounted(() => {
  timeout = setTimeout(close, 10000)
})
</script>
<template>
  <Transition :duration="300" name="nested">
    <div
      v-if="show"
      class="outer notify"
    >
      <div
        class="inner notify__body"
        :class="
          type === 'success'
            ? 'border-green-500'
            : type === 'error'
              ? 'border-red-500'
              : 'border-orange-400'
        "
      >
        <div class="flex flex-col text-[10px]">
          <h2
            class="notify__heading font-bold text-[12px] capitalize"
          >
            {{ title }}
          </h2>
          <p class="">{{ message }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

/* delay enter of nested element */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateY(-30px);
  opacity: 0.001;
}
</style>
