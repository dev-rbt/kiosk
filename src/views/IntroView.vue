<template>
  <div class="view-intro">
    <RouterLink to="/order-type-selection">
      <img src="/assets/video/intro.jpg" />
    </RouterLink>

    <div v-if="isMenuLoading" class="menu-loading">
      <div class="loader-container">
        <div class="spinner"></div>
        <div class="loading-text">{{ $t('intro.menuLoading') }}<span class="dots">...</span></div>
      </div>
    </div>

    <div v-if="menuError" class="menu-loading error">
      <div class="loader-container">
        <div class="spinner error"></div>
        <div class="loading-text">
          {{ $t('intro.menuError') }}
          <div class="error-detail">{{ menuError }}</div>
          <div class="retry-text">{{ $t('intro.retryCountdownText', { retryCountdown }) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useApplicationStore } from '@/stores/application'
import { useMenuStore } from '@/stores/menu'

const applicationStore = useApplicationStore();
const menuStore = useMenuStore();
const isMenuLoading = ref(false);
const menuError = ref(null);
const retryCountdown = ref(3);
const { orderCancelConfirmOk } = applicationStore;

const fetchMenuWithRetry = async () => {
  try {
    isMenuLoading.value = true;
    menuError.value = null;
    await menuStore.fetchMenu();
    isMenuLoading.value = false;
  } catch (error) {
    isMenuLoading.value = false;
    menuError.value = error.message || 'Menü yüklenirken bir hata oluştu';
    
    // Geri sayım başlat
    retryCountdown.value = 3;
    const countdownInterval = setInterval(() => {
      retryCountdown.value--;
      if (retryCountdown.value <= 0) {
        clearInterval(countdownInterval);
        fetchMenuWithRetry(); // 3 saniye sonra tekrar dene
      }
    }, 1000);
  }
};

onMounted(() => {
  orderCancelConfirmOk();
  fetchMenuWithRetry();
});
</script>

<style scoped>
video {
  height: 100vh;
  width: 100%;
  object-fit: fill;
  position: absolute;
}
img {
  height: 100vh;
  width: 100%;
  object-fit: fill;
  position: absolute;
}
.menu-loading {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
}

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #4CAF50;
  animation: spin 1s ease-in-out infinite;
}

.spinner.error {
  border-top-color: #ff4444;
}

.loading-text {
  color: #fff;
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  animation: pulse 1.5s ease-in-out infinite;
}

.dots {
  display: inline-block;
  animation: dots 1.5s infinite;
}

.error-detail {
  font-size: 18px;
  color: #ff4444;
  margin-top: 10px;
}

.retry-text {
  font-size: 16px;
  color: #ffffff;
  margin-top: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

@keyframes dots {
  0%, 20% {
    content: ".";
  }
  40% {
    content: "..";
  }
  60%, 100% {
    content: "...";
  }
}
</style>
