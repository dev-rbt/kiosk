<template>
  <svg :width="width" :height="height" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 13.87C6 13.87 6.42 13.47 7.5 13.47C8.58 13.47 9 13.87 9 13.87M15 13.87C15 13.87 15.42 13.47 16.5 13.47C17.58 13.47 18 13.87 18 13.87" :stroke="fill" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 17V19" :stroke="fill" stroke-width="2" stroke-linecap="round"/>
    <path d="M3 11.5C3 14.1234 4.79151 16.2813 7.25 16.874C7.24998 16.9493 7.25 17.0247 7.25 17.1C7.25 19.0711 9.34315 20.75 12 20.75C14.6569 20.75 16.75 19.0711 16.75 17.1C16.75 17.0247 16.75 16.9493 16.75 16.874C19.2085 16.2813 21 14.1234 21 11.5C21 8.18629 18.3137 5.5 15 5.5C14.9664 5.5 14.9329 5.50032 14.8995 5.50097C14.0993 3.4778 12.1882 2 10 2C7.23858 2 5 4.23858 5 7C5 7.03384 5.00032 7.06763 5.00097 7.10136C3.78446 7.54745 3 8.70195 3 10C3 10.5 3.06667 10.9833 3.2 11.45" :stroke="fill" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script setup>
const props = defineProps({
  width: Number,
  height: Number,
  fill: String
})
</script>