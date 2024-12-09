<template>
  <div class="menu-details">
    <div ref="menuCaption" class="menu-caption">
      <div class="title-container">
        <span>{{ selectedGroup?.MenuGroupText }}</span>
        <div class="animated-line"></div>
      </div>
    </div>

    <div ref="menuContent" class="menu-content custom-scrollbar">
      <a v-for="menuItem in selectedGroup.Items" 
         :key="menuItem.MenuItemKey" 
         class="product-card animate__animated animate__fadeIn"
         @click="$emit('select-product', menuItem)">
        <div class="card-inner">
          <div class="img-container">
            <div class="img" :style="{ 'background-image': 'url(\'assets/products/' + menuItem.MenuItemKey + '.jpg\'), url(\'assets/products/default.png\')' }"></div>
            <div class="overlay">
              <span>Sipariş Ver</span>
            </div>
          </div>
          
          <div class="product-info">
            <div class="menu-title">
              <span>{{ menuItem.MenuItemText }}</span>
              <div class="title-glow"></div>
            </div>
            
            <div class="menu-action">
              <div class="menu-price">
                <span class="amount">{{ ( orderType =='TakeOut' ? menuItem.TakeOutPrice_TL : menuItem.DeliveryPrice_TL) }}</span>
                <span class="currency">TL</span>
              </div>
              <button class="btnaddToBasket">
                <span v-html="$t('menu.addToBasket')"></span>
                <div class="button-shine"></div>
              </button>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import 'animate.css'

const props = defineProps({
  selectedGroup: {
    type: Object,
    required: true
  },
  orderType: {
    type: String,
    required: true
  }
})

const menuCaption = ref(null)
const menuContent = ref(null)

watch(() => props.selectedGroup, () => {
  if (menuContent.value) {
    menuContent.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
})

defineEmits(['select-product'])
defineExpose({ menuCaption, menuContent })
</script>

<style scoped>
.menu-details {
  flex: 10;
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
}

.title-container {
  position: relative;
  margin-bottom: 2rem;
}

.menu-caption div span {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(45deg, #ff8500, #ff6f00);
  background-clip: text;
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

.menu-content {
  display: grid;
  justify-content: start;
  align-content:normal;
  align-items: start;
  justify-items: center;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  overflow-y: auto;
  padding: 1rem;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 133, 0, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff8500, #ff6f00);
  border-radius: 4px;
}

.product-card {
  width: 100%;
  max-width: 320px;
  text-decoration: none;
  perspective: 1000px;
}

.card-inner {
  position: relative;
  border-radius: 20px;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
}

.product-card:hover .card-inner {
  transform: translateY(-10px);
}

.img-container {
  position: relative;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
}

.img {
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.product-card:hover .img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 133, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.overlay span {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.product-card:hover .overlay {
  opacity: 1;
}

.product-card:hover .overlay span {
  transform: translateY(0);
}

.product-info {
  padding: 1rem;
}

.menu-title {
  position: relative;
  background: linear-gradient(135deg, #ff8500, #ff6f00);
  padding: 1rem;
  border-radius: 10px;
  overflow: hidden;
}

.menu-title span {
  position: relative;
  z-index: 1;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  display: block;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.title-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.menu-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}

.menu-price {
  background: linear-gradient(135deg, #2d3436, #636e72);
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  color: white;
  flex: 1;
  text-align: center;
}

.menu-price .amount {
  font-size: 1.4rem;
  font-weight: 700;
}

.menu-price .currency {
  font-size: 1rem;
  margin-left: 0.2rem;
}

.btnaddToBasket {
  position: relative;
  border: none;
  background: linear-gradient(135deg, #ff8500, #ff6f00);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  flex: 1.5;
  transition: transform 0.3s ease;
}

.btnaddToBasket:hover {
  transform: translateY(-2px);
}

.btnaddToBasket:active {
  transform: scale(0.98);
}

.button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: button-shine 2s infinite;
}

@keyframes button-shine {
  to {
    left: 100%;
  }
}

/* Impaired mode adjustments */
body.impaired .menu-content {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

body.impaired .img {
  height: 200px;
}

body.impaired .menu-title span {
  font-size: 1.4rem;
}
</style>
