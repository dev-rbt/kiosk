<template>
  <svg :width="width" :height="height" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" :stroke="fill" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 5L19 12L12 19" :stroke="fill" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script setup>
const props = defineProps({
  width: Number,
  height: Number,
  fill: String
})
</script>