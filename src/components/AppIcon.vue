<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: [String, null],
    required: true
  },
  prefix: {
    type: String,
    default: 'icon'
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" width="134" height="20" :style="{ color }">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<style></style>
