<template>
  <teleport to="body">
    <Transition leave-active-class="animate__animated animate__fadeOut animate__faster">
      <div class="sub-modal-overlay" v-if="modelValue" @click="$emit('update:modelValue', false)">
        <div class="sub-modal-content animate__animated animate__fadeIn animate__faster" @click.stop>
          <div class="sub-modal-header">
            <div class="header-content">
              <div class="header-icon">
                <Chef :width="32" :height="32" :fill="'#ff8500'" />
              </div>
              <div class="header-text">
                <h2>{{ title }}</h2>
                <p>Lütfen seçiminizi yapın</p>
              </div>
            </div>
            <button class="close-btn" @click="$emit('update:modelValue', false)">
              <Close :width="24" :height="24" :fill="'#ff4757'" />
            </button>
          </div>

          <div class="sub-modal-body custom-scrollbar">
            <div class="sub-items-grid">
              <div 
                v-for="item in items" 
                :key="item.MenuItemKey" 
                class="sub-item animate__animated animate__fadeIn"
                :style="{ animationDelay: `${item.index * 0.1}s` }"
                @click="selectItem(item)"
              >
                <div class="item-image">
                  <img 
                    :src="`assets/products/${item.MenuItemKey}.jpg`" 
                    :alt="item.MenuItemText"
                    @error="$event.target.src = 'assets/products/default.png'"
                  />
                  <div class="image-overlay">
                    <div class="select-button">
                      <Check :width="24" :height="24" :fill="'#fff'" />
                      <span>Seç</span>
                    </div>
                  </div>
                </div>
                <div class="item-details">
                  <div class="item-info">
                    <span class="item-name">{{ item.MenuItemText }}</span>
                    <p class="item-description" v-if="item.Description">{{ item.Description }}</p>
                  </div>
                  <div class="item-footer">
                    <div class="item-price-tag" v-if="item.ExtraPriceTakeOut_TL > 0">
                      <span class="price-amount">+{{ item.ExtraPriceTakeOut_TL }}</span>
                      <span class="price-currency">TL</span>
                    </div>
                    <div class="select-text">Seçmek için tıklayın</div>
                  </div>
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
import Chef from '../icons/Chef.vue';
import Check from '../icons/Check.vue';

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
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.sub-modal-header {
  padding: 2rem;
  border-bottom: 2px solid rgba(255, 133, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon {
  background: rgba(255, 133, 0, 0.1);
  padding: 1.2rem;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(255, 133, 0, 0.2);
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header-text h2 {
  background: linear-gradient(45deg, #ff8500, #ff6f00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.header-text p {
  color: #636e72;
  font-size: 1.1rem;
  margin: 0;
}

.close-btn {
  background: white;
  border: 2px solid #ff4757;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.2);
}

.close-btn:hover {
  background: #ff4757;
}

.close-btn:hover svg path {
  stroke: white;
}

.sub-modal-body {
  padding: 2rem;
  overflow-y: auto;
  max-height: calc(90vh - 120px);
}

.sub-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.sub-item {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

.sub-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 30px rgba(255, 133, 0, 0.2);
}

.item-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.sub-item:hover .item-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 133, 0, 0.9), rgba(255, 111, 0, 0.9));
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.select-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.select-button span {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
}

.sub-item:hover .image-overlay {
  opacity: 1;
}

.sub-item:hover .select-button {
  transform: translateY(0);
}

.item-details {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-name {
  color: #2d3436;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.4;
}

.item-description {
  color: #636e72;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.6;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price-tag {
  background: linear-gradient(135deg, #ff8500, #ff6f00);
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(255, 133, 0, 0.2);
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.sub-item:hover .item-price-tag {
  transform: translateY(-2px);
}

.price-amount {
  font-size: 1.2rem;
}

.price-currency {
  font-size: 1rem;
  margin-left: 0.3rem;
}

.select-text {
  color: #636e72;
  font-size: 0.9rem;
  font-style: italic;
  opacity: 0.8;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 133, 0, 0.1);
  border-radius: 5px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff8500, #ff6f00);
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #ff6f00, #ff5f00);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .sub-modal-content {
    width: 95%;
    height: 95vh;
    max-height: 95vh;
  }

  .sub-modal-header {
    padding: 1.5rem;
  }

  .header-text h2 {
    font-size: 1.5rem;
  }

  .sub-items-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .item-image {
    height: 180px;
  }

  .item-details {
    padding: 1rem;
  }

  .item-name {
    font-size: 1.1rem;
  }

  .sub-modal-body {
    padding: 1rem;
  }
}
</style>