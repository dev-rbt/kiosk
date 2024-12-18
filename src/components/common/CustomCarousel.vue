<template>
  <div
    class="custom-carousel"
    @mouseenter="pauseAutoplay"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
    @mousedown="touchStart"
    @mousemove="touchMove"
    @mouseup="touchEnd"
    @mouseleave="touchEnd"
  >
    <div class="carousel-track" :style="trackStyle">
      <div v-for="(_, index) in slides" :key="index" class="carousel-slide">
        <slot :name="`slide-${index}`" />
      </div>
    </div>

    <div class="carousel-indicators">
      <div
        v-for="(_, index) in slides"
        :key="index"
        class="indicator-line"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
  slidesToShow: {
    type: Number,
    default: 1,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  autoplayInterval: {
    type: Number,
    default: 5000,
  },
});

const currentSlide = ref(0);
let autoplayTimer = null;
const isPaused = ref(false);

const trackStyle = computed(() => ({
  transform: `translateX(-${currentSlide.value * 100}%)`,
  //width: `${props.slides.length * 100}%`,
  display: "flex",
  transition: "transform 0.5s ease-in-out",
}));

const nextSlide = () => {
  if (currentSlide.value >= props.slides.length - 1) {
    if (props.loop) {
      currentSlide.value = 0;
    }
  } else {
    currentSlide.value++;
  }
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startAutoplay = () => {
  if (props.autoplayInterval && !isPaused.value) {
    stopAutoplay(); // Clear any existing timer
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, props.autoplayInterval);
  }
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const pauseAutoplay = () => {
  isPaused.value = true;
  stopAutoplay();
};

const resumeAutoplay = () => {
  isPaused.value = false;
  startAutoplay();
};

const touchStartX = ref(null);
const touchMoveX = ref(null);
const minSwipeDistance = 50;

const touchStart = (event) => {
  const touch = event.touches ? event.touches[0] : event;
  touchStartX.value = touch.clientX;
  touchMoveX.value = touch.clientX;
  pauseAutoplay();
};

const touchMove = (event) => {
  if (!touchStartX.value) return;
  event.preventDefault();
  const touch = event.touches ? event.touches[0] : event;
  touchMoveX.value = touch.clientX;
};

const touchEnd = () => {
  if (!touchStartX.value || !touchMoveX.value) {
    touchStartX.value = null;
    touchMoveX.value = null;
    resumeAutoplay();
    return;
  }

  const swipeDistance = touchMoveX.value - touchStartX.value;

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      // Sağa kaydırma - önceki slide
      if (currentSlide.value > 0) {
        currentSlide.value--;
      } else if (props.loop) {
        currentSlide.value = props.slides.length - 1;
      }
    } else {
      // Sola kaydırma - sonraki slide
      if (currentSlide.value < props.slides.length - 1) {
        currentSlide.value++;
      } else if (props.loop) {
        currentSlide.value = 0;
      }
    }
  }

  touchStartX.value = null;
  touchMoveX.value = null;
  resumeAutoplay();
};

watch(
  () => props.slides.length,
  () => {
    if (currentSlide.value >= props.slides.length) {
      currentSlide.value = props.slides.length - 1;
    }
  }
);

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
.custom-carousel {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  width: 100%;
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
}

.carousel-slide :deep(img) {
  width: 100%;
  height: auto;
  display: block;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  position: absolute;
  bottom: 20px;
  width: 100%;
  z-index: 1;
}

.indicator-line {
  width: 20px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator-line.active {
  background-color: white;
}
</style>
