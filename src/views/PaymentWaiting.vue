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
          <div class="message-primary">
            {{ $t("paymentWaiting.status") }} <br />{{
              basket.paymentType.replace("_", " ")
            }}
          </div>
          <div class="message-secondary">
            {{ $t("paymentWaiting.description") }}
          </div>
        </div>

        <div class="processing-steps">
          <div
            class="step active"
            v-if="saveStatus == 'SAVING' || saveStatus == 'SAVING_RETRY'"
          >
            <div class="step-icon">
              <span class="pulse"></span>
            </div>
            <div class="step-label">
              {{
                saveStatus == "SAVING"
                  ? t("paymentWaiting.paymentSteps.orderSaving")
                  : t("paymentWaiting.paymentSteps.orderSavingRetry")
              }}
            </div>
          </div>

          <div class="step completed" v-if="saveStatus == 'SAVED'">
            <div class="step-icon">✓</div>
            <div class="step-label">
              {{ t("paymentWaiting.paymentSteps.orderSaved") }}<br />({{
                orderId
              }})
            </div>
          </div>

          <div class="step error" v-if="saveStatus == 'SAVE_ERROR'">
            <div class="step-icon">✗</div>
            <div class="step-label">
              {{ t("paymentWaiting.paymentSteps.orderSaveError") }}
            </div>
          </div>

          <div
            class="step-connector"
            :class="{ active: saveStatus == 'SAVED' }"
          ></div>

          <div
            class="step active"
            v-if="saveStatus == 'SAVED' && payStatus == 'PAYMENT_PENDING'"
          >
            <div class="step-icon">
              <span class="pulse"></span>
            </div>
            <div class="step-label">
              {{ t("paymentWaiting.paymentSteps.paymentPending") }}
            </div>
          </div>

          <div
            class="step"
            v-if="saveStatus != 'SAVED' && payStatus == 'PAYMENT_PENDING'"
          >
            <div class="step-icon"></div>
            <div class="step-label">
              {{ t("paymentWaiting.paymentSteps.paymentPending") }}
            </div>
          </div>

          <div
            class="step completed"
            v-if="saveStatus == 'SAVED' && payStatus == 'PAYMENT_SUCCESS'"
          >
            <div class="step-icon">✓</div>
            <div class="step-label">
              {{ t("paymentWaiting.paymentSteps.paymentSuccess") }}
            </div>
          </div>

          <div
            class="step error"
            v-if="saveStatus == 'SAVED' && payStatus == 'PAYMENT_ERROR'"
          >
            <div class="step-icon">✗</div>
            <div class="step-label">
              {{ t("paymentWaiting.paymentSteps.paymentError") }}
            </div>
          </div>

          <div
            class="step warning"
            v-if="saveStatus == 'SAVED' && payStatus == 'ORDER_NOT_FOUND'"
          >
            <div class="step-icon">!</div>
            <div class="step-label">
              {{ t("paymentWaiting.paymentSteps.orderNotFound") }}
            </div>
          </div>

          <div
            class="step-connector"
            :class="{
              active: saveStatus == 'SAVED' && payStatus == 'PAYMENT_SUCCESS',
            }"
          ></div>

          <div
            class="step completed"
            v-if="saveStatus == 'SAVED' && payStatus == 'PAYMENT_SUCCESS'"
          >
            <div class="step-icon">✓</div>
            <div class="step-label">
              {{ t("paymentWaiting.paymentSteps.processCompleted") }}
            </div>
          </div>
          <div class="step" v-else>
            <div class="step-icon"></div>
            <div class="step-label">
              {{ t("paymentWaiting.paymentSteps.processCompleted") }}
            </div>
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

      <div
        v-if="errorMessage"
        class="error-message-box animate__animated animate__fadeIn"
      >
        <div class="error-text">
          <template v-if="retryCountdown > 0 && retryCount <= 3">{{
            t("paymentWaiting.paymentSteps.orderSavingRetryMessage", {
              retryCountdown,
            })
          }}</template>
          <template v-if="retryCountdown == 0 && retryCount == 3">{{
            t(
              "paymentWaiting.paymentSteps.orderSaveMaximumNumberOfAttemptsReached"
            )
          }}</template>
          <br />
          << {{ errorMessage }} >>
        </div>
      </div>

      <div
        v-if="ecrErrorMessage"
        class="error-message-box animate__animated animate__fadeIn"
      >
        <div class="error-text"><< {{ ecrErrorMessage }} >></div>
      </div>
    </div>

    <div
      v-if="
        ((retryCountdown == 0 && retryCount == 3) || isRetrying) &&
        saveStatus != 'SAVED'
      "
      class="page-footer animate__animated animate__fadeInUp"
    >
      <button class="back-btn" @click="goIntro" :disabled="isRetrying">
        <div class="btn-content">
          <ArrowLeft :width="36" :height="36" :fill="'#ff8500'" />
          <span>{{ $t("paymentWaiting.footer.orderCancel") }}</span>
        </div>
        <div class="btn-shine"></div>
      </button>

      <button class="checkout-btn" @click="manualRetry" :disabled="isRetrying">
        <div class="btn-content">
          <span v-if="!isRetrying">{{
            $t("paymentWaiting.footer.retry")
          }}</span>
          <span v-else>{{ $t("paymentWaiting.footer.retrying") }}</span>
          <ArrowRight :width="36" :height="36" :fill="'#fff'" />
        </div>
        <div class="btn-shine"></div>
        <div class="btn-glow"></div>
      </button>
    </div>

    <div
      v-if="payStatus == 'PAYMENT_ERROR' && saveStatus == 'SAVED'"
      class="page-footer animate__animated animate__fadeInUp"
    >
      <button class="back-btn" @click="goIntro" :disabled="isEcrRetrying">
        <div class="btn-content">
          <ArrowLeft :width="36" :height="36" :fill="'#ff8500'" />
          <span>{{ $t("paymentWaiting.footer.orderCancel") }}</span>
        </div>
        <div class="btn-shine"></div>
      </button>

      <button
        class="checkout-btn"
        @click="manualEcrRetry"
        :disabled="isEcrRetrying"
      >
        <div class="btn-content">
          <span v-if="!isEcrRetrying">{{
            $t("paymentWaiting.footer.retry")
          }}</span>
          <span v-else>{{ $t("paymentWaiting.footer.retrying") }}</span>
          <ArrowRight :width="36" :height="36" :fill="'#fff'" />
        </div>
        <div class="btn-shine"></div>
        <div class="btn-glow"></div>
      </button>
    </div>
  </div>

  <WarningModal v-model="showWarningModal" :message="warningModalMessage" />

</template>

<script setup>
import Logo from "../components/icons/Logo.vue";
import CreditCard from "../components/icons/CreditCard.vue";
import { onMounted,onUnmounted, toRaw, ref } from "vue";
import { useApplicationStore } from "@/stores/application";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { apiService } from "@/services/api.service";
import { apiIngenicoService } from "@/services/api.ingenico";
import WarningModal from "../components/common/WarningModal.vue";

import { useI18n } from "vue-i18n";
import "animate.css";

const { t } = useI18n();
const router = useRouter();
const applicationStore = useApplicationStore();
const { basket } = storeToRefs(applicationStore);
const { orderCancelConfirmOk } = applicationStore;

const showWarningModal = ref(false);
const warningModalMessage = ref("");

const orderId = ref(0);
const saveStatus = ref(""); // SAVING, SAVING_RETRY, SAVED, SAVE_ERROR
const payStatus = ref(""); // PAYMENT_PENDING, PAYMENT_ERROR, PAYMENT_SUCCESS, ORDER_NOT_FOUND
const errorMessage = ref("");
const retryCount = ref(0);
const retryCountdown = ref(0);
const isRetrying = ref(false);
const orderCanceling = ref(false);

const ecrIngenicoData = ref({});
const ecrErrorMessage = ref("");
const isEcrRetrying = ref(false);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let orderStatusInterval;

const orderStatusIntervalRun = () => {
  orderStatusInterval = setInterval(async () => {
    if (payStatus.value != "PAYMENT_SUCCESS") await getOrderStatus();
    else {
      clearInterval(orderStatusInterval);
      router.push({
        name: "payment-success",
        query: { orderId: orderId.value },
      });
    }
  }, 1000);
};

const saveOrder = async () => {
  const basketJsonBody = toRaw(basket.value);

  try {
    errorMessage.value = "";
    saveStatus.value = retryCount.value > 0 ? "SAVING_RETRY" : "SAVING";
    const data = await apiService.saveSaleOrder(basketJsonBody);

    if (data.Status == true) {
      orderId.value = data.OrderId;
      saveStatus.value = "SAVED";

      // Eğer EcrMode = INGENICO ise
      if (data.EcrMode == "INGENICO") {
        ecrIngenicoData.value = data.EcrIngenicoData;
        await processEcrIngenico();
      } else if (data.EcrMode == "HUGIN") {
        // Sipariş ödemesini sorgula
        orderStatusIntervalRun();
      }
    } else {
      errorMessage.value = data.Message;
    }
  } catch (error) {
    saveStatus.value = "SAVE_ERROR";
    errorMessage.value = error.message;

    if (retryCount.value < 3) {
      retryCount.value++;
      retryCountdown.value = 5;

      const countdownInterval = setInterval(() => {
        retryCountdown.value--;
      }, 1000);

      await sleep(5000);
      clearInterval(countdownInterval);

      await saveOrder();
    }
  } finally {
    isRetrying.value = false;
  }
};

const processEcrIngenico = async () => {
  let ingenicoData = {
    CommandType: 3,
    JsonData: JSON.stringify(ecrIngenicoData.value),
  };

  let printResult = {};

  try {
    payStatus.value = "PAYMENT_PENDING";
    ecrErrorMessage.value = "";

    printResult = await apiIngenicoService.printReceipt(ingenicoData);

    if (printResult.status) {
      payStatus.value = "PAYMENT_SUCCESS";
      // Sipariş ödemesini sorgula
      orderStatusIntervalRun();
    } else {
      payStatus.value = "PAYMENT_ERROR";
      ecrErrorMessage.value =
        printResult.statusCode + ": " + printResult.message;
    }
  } catch (error) {
    payStatus.value = "PAYMENT_ERROR";
    ecrErrorMessage.value = error.message;
  } finally {
    isEcrRetrying.value = false;
  }
};

const getOrderStatus = async () => {
  try {
    if (payStatus.value != "ORDER_NOT_FOUND")
      payStatus.value = "PAYMENT_PENDING";

    const data = await apiService.getOrderStatus(orderId.value);

    payStatus.value = data.Status;
  } catch (error) {
    payStatus.value = "PAYMENT_ERROR";
    console.error("Failed to get order status:", error);
  }
};

const manualRetry = async () => {
  try {
    isRetrying.value = true;
    retryCount.value = 0; // Sayacı sıfırla
    await saveOrder();
  } catch (error) {
    console.error("Manual retry failed:", error);
  }
};

const manualEcrRetry = async () => {
  try {
    isEcrRetrying.value = true;
    ecrIngenicoData.IsTryOrder = true;
    await processEcrIngenico();
  } catch (error) {
    console.error("Manual ecr retry failed:", error);
  }
};

const goIntro = async () => {

  let isCancelled = false;

  try {
    showWarningModal.value = false;
    orderCanceling.value = true;

    await apiService.cancelOrder(orderId.value);
    isCancelled = true;
  } catch (error) {

    showWarningModal.value = true;
    warningModalMessage.value = error;

    isCancelled = false;
  } finally {
    orderCanceling.value = false;
  }

  if (isCancelled) {
    orderCancelConfirmOk();
    router.push({ name: "intro" });
  }
};

onMounted(async () => {
  saveStatus.value = "SAVING";
  payStatus.value = "PAYMENT_PENDING";
  errorMessage.value = "";

  retryCount.value = 0;
  retryCountdown.value = 0;
  isRetrying.value = false;

  ecrErrorMessage.value = "";
  isEcrRetrying.value = false;

  await saveOrder();
});

onUnmounted(() => {
  if (orderStatusInterval) {
    clearInterval(orderStatusInterval);
  }
});
</script>

<style scoped>
.payment-waiting {
  width: 100vw;
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
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.status-card {
  background: #fdfdfd;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 750px;
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

.step.error .step-icon {
  background: #e02525;
}
.step.active .step-icon {
  background: #ff8500;
}
.step.warning .step-icon {
  background: #ff8500;
  font-size: 150%;
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

.page-footer {
  display: flex;
  gap: 1rem;
  margin: 0 1rem 1rem 1rem;
}

.back-btn,
.checkout-btn {
  position: relative;
  border: none;
  padding: 1rem 2rem;
  border-radius: 15px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  flex: 1;
}

.back-btn {
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.back-btn .btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ff8500;
}

.back-btn .btn-content span {
  font-size: 200%;
  font-weight: 700;
}

.checkout-btn {
  background: linear-gradient(135deg, #ff8500, #ff6f00);
  box-shadow: 0 5px 15px rgba(255, 133, 0, 0.2);
}

.checkout-btn .btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: white;
}

.checkout-btn .btn-content span {
  font-size: 200%;
  font-weight: 700;
}

.btn-shine {
  position: absolute;
  top: -180%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotateZ(45deg);
  animation: shine 3s infinite;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(255, 133, 0, 0.8) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.checkout-btn:hover {
  transform: translateY(-2px);
}

.checkout-btn:hover .btn-glow {
  opacity: 0.5;
}

@keyframes shine {
  0% {
    top: -180%;
  }

  100% {
    top: 150%;
  }
}

.error-message-box {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 15px;
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 750px;
  text-align: center;
  justify-content: center;
}

.error-text {
  color: #ff4d4f;
  font-size: 120%;
}
</style>
