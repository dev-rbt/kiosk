<template>
  <div class="payment-waiting">
    <div class="logo">
      <Logo :width="200" />
    </div>

    <div class="waiting-content">
      <div class="status-card animate__animated animate__fadeIn">
        <div class="card-header">
          <div class="status-icon">
            <CreditCard :width="40" :height="40" :fill="'#ff8500'" />
          </div>
          <h1>{{ $t("paymentWaiting.title") }}</h1>
          <div class="animated-line"></div>
        </div>

        <div class="waiting-animation">
          <img src="/assets/img/pay-animation.gif" alt="Payment Processing" />
        </div>

        <div class="status-message animate__animated animate__fadeInUp">
          <div class="message-primary">{{ $t("paymentWaiting.status") }} <br />{{ basket.paymentType.replace("_", " ")   }}</div>
          <div class="message-secondary">
            {{ $t("paymentWaiting.description") }}
          </div>
        </div>

        <div class="processing-steps">
          <div class="step completed">
            <div class="step-icon">✓</div>
            <div class="step-label">{{ $t("paymentWaiting.paymentSteps.payment") }}</div>
          </div>
          <div class="step-connector active"></div>
          <div class="step active">
            <div class="step-icon">
              <span class="pulse"></span>
            </div>
            <div class="step-label">{{ $t("paymentWaiting.paymentSteps.processing") }}</div>
          </div>
          <div class="step-connector"></div>
          <div class="step">
            <div class="step-icon">
              <Check :width="24" :height="24" :fill="'#636e72'" />
            </div>
            <div class="step-label">{{ $t("paymentWaiting.paymentSteps.success") }}</div>
          </div>
        </div>

        <div class="amount-display animate__animated animate__fadeIn">
          <div class="amount-label">
            {{ $t("paymentWaiting.paymentTotal") }}
          </div>
          <div class="amount">
            {{ basket.total.toFixed(2) }} <span>TL</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from "../components/icons/Logo.vue";
import CreditCard from "../components/icons/CreditCard.vue";
import Check from "../components/icons/Check.vue";
import Lock from "../components/icons/Lock.vue";
import { onMounted } from "vue";
import { useApplicationStore } from "@/stores/application";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import "animate.css";

const router = useRouter();
const applicationStore = useApplicationStore();
const { basket } = storeToRefs(applicationStore);

onMounted(() => {
  setTimeout(() => {
   router.push({ name: 'payment-success' })
  }, 3000)
});
</script>

<style scoped>
.payment-waiting {
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

.waiting-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.status-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.card-header {
  text-align: center;
  margin-bottom: 2rem;
}

.status-icon {
  background: rgba(255, 133, 0, 0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem;
}

.card-header h1 {
  font-size: 2rem;
  color: #2d3436;
  margin: 1rem 0;
}

.animated-line {
  height: 3px;
  background: linear-gradient(90deg, transparent, #ff8500, transparent);
  margin: 1rem auto;
  width: 50%;
  position: relative;
  overflow: hidden;
}

.animated-line::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
  animation: shine 2s infinite;
}

@keyframes shine {
  to {
    left: 100%;
  }
}

.waiting-animation {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.waiting-animation img {
  width: 200px;
  height: 200px;
  border-radius: 20px;
}

.status-message {
  text-align: center;
  margin: 2rem 0;
}

.message-primary {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ff8500;
  margin-bottom: 0.5rem;
}

.message-secondary {
  font-size: 1.1rem;
  color: #636e72;
}

.processing-steps {
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
}

.step-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #636e72;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  position: relative;
}

.step.completed .step-icon {
  background: #49b35a;
}

.step.active .step-icon {
  background: #ff8500;
}

.pulse {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  50% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(0.8);
    opacity: 1;
  }
}

.step-connector {
  flex: 1;
  height: 3px;
  background: #636e72;
  margin: 0 10px;
  position: relative;
  top: -20px;
}

.step-connector.active {
  background: #ff8500;
}

.step-label {
  font-size: 0.9rem;
  color: #636e72;
  text-align: center;
}

.amount-display {
  text-align: center;
  margin: 2rem 0;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(255, 133, 0, 0.1),
    rgba(255, 111, 0, 0.1)
  );
  border-radius: 15px;
}

.amount-label {
  font-size: 1rem;
  color: #636e72;
  margin-bottom: 0.5rem;
}

.amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ff8500;
}

.amount span {
  font-size: 1.5rem;
  font-weight: 600;
  margin-left: 0.3rem;
}
</style>
