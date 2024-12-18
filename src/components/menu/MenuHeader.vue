<template>
  <div ref="logo" class="logo">
    <Logo :width="200" />
  </div>

  <div ref="carousel" class="carousel-area" v-show="!impairedActive">
    <CustomCarousel
      :slides="sliders"
      :slides-to-show="1"
      :loop="true"
      :autoplay-interval="5000"
    >
      <template v-for="(slide, index) in sliders" :key="index" #[`slide-${index}`]>
        <div v-html="slide"></div>
      </template>
    </CustomCarousel>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Logo from "../icons/Logo.vue";
import CustomCarousel from "../common/CustomCarousel.vue";
import { storeToRefs } from "pinia";
import { useApplicationStore } from "@/stores/application";

const applicationStore = useApplicationStore();
const { impairedActive } = storeToRefs(applicationStore);

const logo = ref(null);
const carousel = ref(null);

const sliders = ref([
  '<img src="/assets/slider/slider1.jpg"  />',
  '<img src="/assets/slider/slider2.jpg"  />',
  '<img src="/assets/slider/slider2.jpg"  />',
  '<img src="/assets/slider/slider2.jpg"  />',
]);

defineExpose({ logo, carousel });
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


</style>
