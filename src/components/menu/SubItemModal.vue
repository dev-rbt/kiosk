<template>
  <teleport to="body">
    <Transition leave-active-class="animate__animated animate__fadeOut animate__faster">
      <div class="sub-modal-overlay" v-if="modelValue">
        <div class="sub-modal-content animate__animated animate__fadeIn animate__faster">
          <div class="sub-modal-header">
            <h2>{{ title }}</h2>
            <button class="close-btn" @click="$emit('update:modelValue', false)">
              <Close :width="24" :height="24" :fill="'#fff'" />
            </button>
          </div>
          <div class="sub-modal-body">
            <div class="sub-items-grid">
              <div 
                v-for="item in items" 
                :key="item.MenuItemKey" 
                class="sub-item"
                @click="selectItem(item)"
              >
                <div class="item-image">
                  <img 
                    :src="`assets/products/${item.MenuItemKey}.jpg`" 
                    :alt="item.MenuItemText"
                    @error="$event.target.src = 'assets/products/default.png'"
                  />
                </div>
                <div class="item-details">
                  <span class="item-name">{{ item.MenuItemText }}</span>
                  <span class="item-price" v-if="item.ExtraPriceTakeOut_TL > 0">
                    +{{ item.ExtraPriceTakeOut_TL }} TL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup>
import Close from '../icons/Close.vue';

const props = defineProps({
  modelValue: Boolean,
  title: String,
  items: Array
});

const emit = defineEmits(['update:modelValue', 'select-item']);

const selectItem = (item) => {
  emit('select-item', item);
  emit('update:modelValue', false);
};
</script>

<style scoped>
.sub-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.sub-modal-content {
  background: #1a1a1a;
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.sub-modal-header {
  padding: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
}

.sub-modal-header h2 {
  color: #ff8500;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.sub-modal-body {
  padding: 1.5rem;
}

.sub-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
}

.sub-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.sub-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 133, 0, 0.3);
}

.item-image {
  width: 100%;
  height: 140px;
  overflow: hidden;
  position: relative;
}

.item-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%);
  pointer-events: none;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.sub-item:hover .item-image img {
  transform: scale(1.08);
}

.item-details {
  padding: 1rem;
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.item-name {
  color: #fff;
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.2;
  transition: color 0.3s ease;
}

.sub-item:hover .item-name {
  color: #ff8500;
}

.item-price {
  color: #ff8500;
  font-weight: 600;
  font-size: 0.9rem;
  background: rgba(255, 133, 0, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  display: inline-block;
  align-self: flex-start;
}

/* Custom Scrollbar */
.sub-modal-content::-webkit-scrollbar {
  width: 8px;
}

.sub-modal-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.sub-modal-content::-webkit-scrollbar-thumb {
  background: rgba(255, 133, 0, 0.3);
  border-radius: 4px;
}

.sub-modal-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 133, 0, 0.5);
}
</style>
