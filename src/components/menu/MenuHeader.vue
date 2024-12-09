<template>
  <div ref="logo" class="logo">
    <Logo :width="200" />
  </div>

  <div ref="carousel" class="carousel" v-show="!impairedActive">
    <vue-carousel :data="slider" :controls="false" :slideOnSwipe="true"></vue-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Logo from '../icons/Logo.vue'
import VueCarousel from '@chenfengyuan/vue-carousel'
import { storeToRefs } from 'pinia'
import { useApplicationStore } from '@/stores/application'

const applicationStore = useApplicationStore()
const { impairedActive } = storeToRefs(applicationStore)

const logo = ref(null)
const carousel = ref(null)

const slider = ref([
  '<div class="example-slide"><img src="/assets/slider/slider1.jpg" style="height:auto; width:100%;" /></div>',
  '<div class="example-slide"><img src="/assets/slider/slider2.jpg" style="height:auto; width:100%;"  /></div>'
])

defineExpose({ logo, carousel })
</script>

<style scoped>
.logo {
  flex: 1;
  background-color: #000;
  display: flex;
  justify-content: center;
}

.logo svg {
  margin: 1rem 0;
}

.carousel {
  flex: 2;
}
</style>