<template>
  <transition name="fade">
    <div v-if="visible" :class="['notification', type]">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: '' 
  },
  duration: {
    type: Number,
    default: 2000 
  }
})

const visible = ref(false)
let timer

watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      visible.value = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        visible.value = false
      }, props.duration)
    }
  },
  { immediate: true } 
)

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

