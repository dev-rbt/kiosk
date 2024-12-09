<template>
  <div v-if="isLoading" class="full-screen-loading">
    <div class="loading-content">
      <DotLottieVue
        class="loading-animation"
        autoplay
        loop
        :data="LoadingAnimation"
      />
      <div class="loading-text">
        {{ $t("paymentSuccess.orderSaving") }}
      </div>
    </div>
  </div>
  <div v-else class="payment-success">
    <div class="logo">
      <Logo :width="200" />
    </div>

    <div class="success-content">
      <DotLottieVue class="success-animation" autoplay :data="PaymentSuccess" />

      <div class="order-details animate__animated animate__fadeInUp">
        <div class="success-message">
          <h1>{{ $t("paymentSuccess.orderSaved") }}</h1>
          <p>{{ $t("paymentSuccess.orderSavedDetail") }}</p>
        </div>

        <div class="order-number">
          <div class="label">{{ $t("paymentSuccess.orderNumber") }}</div>
          <div class="number">
            <span
              class="digit"
              v-for="(digit, index) in orderId.toString()"
              :key="index"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              {{ digit }}
            </span>
          </div>
        </div>

        <div class="estimated-time">
          <div class="time-icon">
            <Clock :width="32" :height="32" :fill="'#ff8500'" />
          </div>
          <div class="time-details">
            <span class="label">{{ $t("paymentSuccess.estimatedTime") }}</span>
            <span class="time">{{
              $t("paymentSuccess.estimatedTimeDetail")
            }}</span>
          </div>
        </div>

        <div class="order-steps">
          <div class="step completed">
            <div class="step-icon">✓</div>
            <div class="step-label">
              {{ $t("paymentSuccess.orderSteps.completed") }}
            </div>
          </div>
          <div class="step-connector active"></div>
          <div class="step active">
            <div class="step-icon">
              <Chef :width="24" :height="24" :fill="'#fff'" />
            </div>
            <div class="step-label">
              {{ $t("paymentSuccess.orderSteps.active") }}
            </div>
          </div>
          <div class="step-connector"></div>
          <div class="step">
            <div class="step-icon">
              <Bag :width="24" :height="24" :fill="'#636e72'" />
            </div>
            <div class="step-label">
              {{ $t("paymentSuccess.orderSteps.ready") }}
            </div>
          </div>
        </div>
      </div>

      <button
        @click="goIntro"
        class="home-button animate__animated animate__fadeInUp"
      >
        <div class="button-content">
          <Home :width="24" :height="24" :fill="'#ff8500'" />
          <span>{{ $t("paymentSuccess.goHome") }}</span>
        </div>
        <div class="button-shine"></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import PaymentSuccess from "../assets/img/payment-success.json";
import LoadingAnimation from "@/assets/img/loading.json";
import Logo from "../components/icons/Logo.vue";
import Clock from "../components/icons/Clock.vue";
import Chef from "../components/icons/Chef.vue";
import Bag from "../components/icons/Bag.vue";
import Home from "../components/icons/Home.vue";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import { onMounted, toRaw, ref } from "vue";
import { useApplicationStore } from "@/stores/application";
import { storeToRefs } from "pinia";
import { apiService } from "@/services/api.service";
import { useRouter } from "vue-router";
import "animate.css";

const router = useRouter();
const applicationStore = useApplicationStore();
const { orderCancelConfirmOk } = applicationStore;
const { basket } = storeToRefs(applicationStore);
const isLoading = ref(true);
const orderId = ref(0);

onMounted(async () => {
  const basketJsonBody = toRaw(basket.value);
  console.log(basket.value);

  const data = await apiService.saveSaleOrder(basketJsonBody);

  isLoading.value = false;

  if (data.Status == true) {
    orderId.value = data.OrderId;
  } else {
    alert(data.Message);
  }
});

const goIntro = () => {
  orderCancelConfirmOk();
  router.push({ name: "intro" });
};
</script>

<style scoped>
.payment-success {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
}

.logo {
  background-color: #000;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
}

.success-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.success-animation {
  width: 700px;
  height: 700px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.success-animation > * {
  position: absolute;
  z-index: 3;
}

.order-details {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 340px;
}

.success-message {
  text-align: center;
  margin-bottom: 2rem;
}

.success-message h1 {
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #ff8500, #ff6f00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.success-message p {
  color: #636e72;
  font-size: 1.2rem;
}

.order-number {
  text-align: center;
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(255, 133, 0, 0.1),
    rgba(255, 111, 0, 0.1)
  );
  border-radius: 15px;
}

.order-number .label {
  font-size: 1.2rem;
  color: #636e72;
  margin-bottom: 1rem;
}

.order-number .number {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.order-number .digit {
  font-size: 3.5rem;
  font-weight: 800;
  color: #ff8500;
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.estimated-time {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
  margin: 2rem 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.time-icon {
  background: rgba(255, 133, 0, 0.1);
  padding: 1rem;
  border-radius: 50%;
}

.time-details {
  display: flex;
  flex-direction: column;
}

.time-details .label {
  font-size: 1rem;
  color: #636e72;
}

.time-details .time {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3436;
}

.order-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  padding: 0 1rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  position: relative;
}

.step-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #636e72;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  position: relative;
  z-index: 1;
}

.step.completed .step-icon {
  background: #2ecc71;
}

.step.active .step-icon {
  background: #ff8500;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 133, 0, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(255, 133, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 133, 0, 0);
  }
}

.step-connector {
  flex: 1;
  height: 3px;
  background: #636e72;
  margin: 0 10px;
  position: relative;
  top: -24px;
}

.step-connector.active {
  background: #ff8500;
}

.step-label {
  font-size: 1rem;
  color: #636e72;
  text-align: center;
  font-weight: 600;
}

.home-button {
  position: relative;
  padding: 1rem 2rem;
  border: none;
  background: white;
  border-radius: 15px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.button-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button-content span {
  color: #ff8500;
  font-weight: 700;
}

.button-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 133, 0, 0.2) 0%,
    transparent 70%
  );
  transform: rotate(45deg);
  transition: 0.3s;
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 133, 0, 0.2);
}

.home-button:hover .button-shine {
  transform: rotate(45deg) translate(50%, 50%);
}

.full-screen-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.98);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.loading-animation {
  width: 300px;
  height: 300px;
}

.loading-text {
  font-size: 200%;
  font-weight: 600;
  color: #333;
  text-align: center;
  animation: pulse 2s infinite;
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

@media (max-width: 768px) {
  .success-content {
    padding: 1rem;
  }

  .order-details {
    padding: 1.5rem;
  }

  .success-message h1 {
    font-size: 2rem;
  }

  .order-number .digit {
    font-size: 2.5rem;
  }

  .step-icon {
    width: 40px;
    height: 40px;
  }

  .step-label {
    font-size: 0.9rem;
  }
}
</style>
