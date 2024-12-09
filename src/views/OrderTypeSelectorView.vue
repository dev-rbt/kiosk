<template>
  <div class="order-type-selector-view">
    <div class="logo">
      <Logo :width="200" />
    </div>

    <div class="selector-0"></div>

    <div class="selector-1">
      <div class="title-container">
        <span>{{ $t('orderTypeSelector.selectOrderType') }}</span>
        <div class="animated-line"></div>
      </div>
    </div>

    <div class="selector-2">
      <a @click="goTakeOut" class="animate__animated animate__fadeInLeft">
        <TakeOut :width="170" :fill="'#fff'" />
        <span v-html="$t('orderTypeSelector.goTakeOut')"></span>
      </a>

      <a @click="goDelivery" class="animate__animated animate__fadeInRight">
        <Delivery :width="170" :fill="'#fff'" />
        <span v-html="$t('orderTypeSelector.goDelivery')"></span>
      </a>
    </div>

    <div class="selector-3">
      <button class="qr-action">
        <span class="button-content">{{ $t('orderTypeSelector.showQrGetDiscount') }}</span>
        <div class="button-glow"></div>
      </button>
    </div>
  </div>
  <BottomNav />
</template>

<style scoped>
.order-type-selector-view {
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.order-type-selector-view .logo {
  flex: 1;
  background-color: #000;
  display: flex;
  justify-content: center;
}

.order-type-selector-view .logo svg {
  margin: 1rem 0;
}

.order-type-selector-view .selector-0 {
  flex: 2;
}

.order-type-selector-view .selector-1 {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 165, 0, 0.1);
  padding: 1.5rem 3rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(255, 165, 0, 0.1);
  backdrop-filter: blur(5px);
}

.order-type-selector-view .selector-1 span {
  font-weight: 900;
  font-size: 2.5rem;
  color: orange;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.animated-line {
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, orange, transparent);
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}

.animated-line::after {
  content: '';
  position: absolute;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  animation: line-animation 2s infinite;
}

@keyframes line-animation {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(200%);
  }
}

.order-type-selector-view .selector-2 {
  flex: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid orange;
  gap: 2rem;
  padding: 2rem;
}

.order-type-selector-view .selector-2 a {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 2rem;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(145deg, #ff8c00, #ffa500);
  border-radius: 1.5rem;
  color: #413d3d;
  border: none;
  margin: 0 1rem;
  text-decoration: none;
  color: #fff;
  text-align: center;
  width: 300px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(255, 165, 0, 0.2),
    inset 0 -5px 15px rgba(0, 0, 0, 0.1),
    inset 0 5px 15px rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.order-type-selector-view .selector-2 a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent);
  transition: 0.5s;
}

.order-type-selector-view .selector-2 a:hover::before {
  left: 100%;
}

.order-type-selector-view .selector-2 a:active {
  transform: scale(0.98);
  background: linear-gradient(145deg, #ffa500, #ff8c00);
  box-shadow: 0 5px 15px rgba(255, 165, 0, 0.1);
}

.order-type-selector-view .selector-2 a span {
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.order-type-selector-view .selector-3 {
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: start;
}

.qr-action {
  padding: 2rem 3rem;
  font-size: 2rem;
  font-weight: 700;
  background: white;
  border: 2px solid orange;
  border-radius: 1.5rem;
  color: orange;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 165, 0, 0.1);
}

.button-content {
  position: relative;
  z-index: 1;
}

.button-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle,
      rgba(255, 165, 0, 0.2) 0%,
      transparent 70%);
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

.qr-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 165, 0, 0.2);
}

.qr-action:active {
  transform: translateY(0);
  background-color: orange;
  color: white;
}
</style>

<script setup>
import BottomNav from '../components/BottomNav.vue'
import Logo from '../components/icons/Logo.vue'
import TakeOut from '../components/icons/TakeOut.vue'
import Delivery from '../components/icons/Delivery.vue'
import { useRouter } from 'vue-router'
import { useApplicationStore } from '@/stores/application'

const router = useRouter()

const applicationStore = useApplicationStore();

const goTakeOut = () => {
  go('TakeOut')
};

const goDelivery = () => {
  go('Delivery')
};

const go = (orderType) => {
  applicationStore.updateBasketOrderType(orderType);
  router.push({ name: 'menu', query: { orderType } });
};

</script>