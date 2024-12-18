<template>
  <div ref="el" class="menu-header">
    <div class="title-container">
      <span class="title">{{ title }}</span>
      <div class="animated-line"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: String
})

const el = ref(null)

defineExpose({ el })
</script>

<style scoped>
.menu-header {
  padding: 2rem 2rem 1rem 2rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title-container {
  position: relative;
}

.title {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, #ff8500, #ff6f00);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.animated-line {
  height: 4px;
  background: linear-gradient(90deg, #ff8500, #ff6f00);
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

.animated-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  to {
    left: 100%;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu-header {
    padding: 1.5rem 1rem;
  }

  .title {
    font-size: 2rem;
  }
}
</style>