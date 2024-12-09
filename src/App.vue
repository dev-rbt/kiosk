<template>

  <RouterView v-slot="{ Component, route }">
    <Transition enter-active-class="animate__animated animate__fadeInLeft animate__faster"
      leave-active-class="animate__animated animate__fadeOutLeft animate__faster" mode="out-in">
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </Transition>
  </RouterView>

</template>

<style scoped></style>

<script setup async>
import 'animate.css';

import { RouterView } from 'vue-router'

import { useApplicationStore } from '@/stores/application'
import { useLanguageStore } from '@/stores/language'

import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const applicationStore = useApplicationStore()
const languageStore = useLanguageStore()

const { impairedActive } = storeToRefs(applicationStore)
const { currentDirection } = storeToRefs(languageStore)

watch(impairedActive, (newValue, oldValue) => {

  document.body.classList.toggle('impaired');

});

watch(currentDirection, (newValue, oldValue) => {

  document.documentElement.dir = newValue;

});

</script>