<template>
  <svg :width="width" :height="height" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8H8M16 8C19.3137 8 22 10.6863 22 14V16C22 19.3137 19.3137 22 16 22H8C4.68629 22 2 19.3137 2 16V14C2 10.6863 4.68629 8 8 8M16 8V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6V8" :stroke="fill" stroke-width="2" stroke-linecap="round"/>
  </svg>
</template>

<script setup>
const props = defineProps({
  width: Number,
  height: Number,
  fill: String
})
</script>