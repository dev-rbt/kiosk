<template>
  <div class="notes-section">
    <div class="notes-header">
      <div class="notes-title">
        <h3>{{ $t('menu.modal.productNote') }}</h3>
        <button @click="$emit('show-keyboard')" class="edit-note-btn">
          <span v-if="!notes">{{ $t('menu.modal.addNote') }}</span>
          <span v-else>{{ $t('menu.modal.editNote') }}</span>
        </button>
      </div>
      <div class="animated-line"></div>
    </div>
    <div class="notes-content" v-if="notes">
      {{ notes }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  notes: String
})

defineEmits(['show-keyboard'])
</script>

<style scoped>
.notes-section {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  margin-top: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.notes-header {
  margin-bottom: 1rem;
}

.notes-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.notes-title h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3436;
  margin: 0;
}

.edit-note-btn {
  background: linear-gradient(135deg, #ff8500, #ff6f00);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 133, 0, 0.2);
}

.edit-note-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(255, 133, 0, 0.3);
}

.animated-line {
  height: 2px;
  background: linear-gradient(90deg, #ff8500, transparent);
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
}

.animated-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 133, 0, 0.5), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  to {
    left: 100%;
  }
}

.notes-content {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  color: #2d3436;
  font-size: 1rem;
  line-height: 1.6;
  min-height: 60px;
}
</style>