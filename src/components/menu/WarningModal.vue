<template>
  <teleport to="body">
    <Transition leave-active-class="animate__animated animate__fadeOut animate__faster">
      <div class="warning-modal-overlay" v-if="modelValue">
        <div class="warning-modal-content animate__animated animate__fadeIn animate__faster">
          <div class="warning-modal-header">
            <h2>Uyarı</h2>
            <button class="close-btn" @click="$emit('update:modelValue', false)">
              <Close :width="24" :height="24" :fill="'#ff4757'" />
            </button>
          </div>
          <div class="warning-modal-body">
            <div class="warning-message">
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup>
import Close from '@/components/icons/Close.vue'

defineProps({
  modelValue: Boolean,
  message: {
    type: String,
    default: 'Lütfen zorunlu seçimleri tamamlayın.'
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.warning-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.warning-modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.warning-modal-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.warning-modal-header h2 {
  color: #ff8500;
  margin: 0;
  font-size: 1.25rem;
}

.warning-modal-body {
  padding: 1.5rem;
}

.warning-message {
  text-align: center;
  color: #333;
  font-size: 1rem;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
</style>
