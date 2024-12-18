<template>
  <div class="bottom-fixed" id="bottom-nav">
    <div ref="refBasket" class="basket" v-if="showBasket">
      <div class="basket-header" @click="basketToggle">
        <div class="header-content">
          <div class="left">
            <div class="basket-icon-wrapper">
              <BasketUp
                v-if="!basketIsOpen"
                :width="40"
                height="40"
                :fill="'#fff'"
              />
              <BasketDown v-else :width="40" :height="40" :fill="'#fff'" />
              <div class="icon-glow"></div>
            </div>
            <span class="title">{{ $t("bottom.myOrder") }}</span>
          </div>

          <div class="right">
            <div class="basket-info">
              <div class="basket-icon">
                <Basket :width="30" height="30" :fill="'#fff'" />
                <div class="basket-count" v-if="basket.count > 0">
                  {{ basket.count }}
                </div>
              </div>
              <div class="details">
                <div class="total-wrapper">
                  <span class="total">{{ basket.total.toFixed(2) }}</span>
                  <span class="currency">TL</span>
                </div>
              </div>
              <div class="info-shine"></div>
            </div>
          </div>
        </div>
      </div>

      <Transition
        enter-active-class="animate__animated animate__fadeInLeft animate__faster"
        leave-active-class="animate__animated animate__fadeOutRight animate__faster"
        mode="out-in"
      >
        <div class="basket-area" v-if="basketIsOpen">
          <div class="basket-detail">
            <div class="basket-items-wrapper custom-scrollbar-y">
              <div class="basket-items">
                <div
                  v-for="product in basket.products"
                  :key="product.index"
                  class="basket-item animate__animated animate__fadeIn"
                >
                  <div class="item-image">
                    <img
                      :src="`assets/products/${product.MenuItemKey}.jpg`"
                      :alt="product.MenuItemText"
                      @error="$event.target.src = 'assets/products/default.png'"
                    />
                    <div class="item-quantity">{{ product.quantity }}x</div>
                  </div>
                  <div class="item-info">
                    <div class="item-name">{{ product.MenuItemText }}</div>
                    <div class="item-price">
                      <span class="amount">{{ product.price }}</span>
                      <span class="currency">TL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="basket-actions">
            <button
              class="cancel-btn ripple-btn"
              @click="orderCancelConfirmOpen"
            >
              <div class="btn-content">
                <Trash :width="24" :height="24" :fill="'#fff'" />
                <span>{{ $t("bottom.cancelOrder") }}</span>
              </div>
              <div class="ripple-effect"></div>
            </button>
            <button class="show-btn ripple-btn" @click="goShowBasket">
              <div class="btn-content">
                <Eye :width="24" :height="24" :fill="'#fff'" />
                <span>{{ $t("bottom.showBasket") }}</span>
              </div>
              <div class="ripple-effect"></div>
            </button>
          </div>

          <Transition
            enter-active-class="animate__animated animate__fadeInLeft animate__faster"
            leave-active-class="animate__animated animate__fadeOutRight animate__faster"
            mode="out-in"
          >
            <div class="basket-cancel" v-if="orderCancelConfirmIsOpen">
              <div class="cancel-content">
                <div class="question">
                  <Warning :width="32" :height="32" :fill="'#ff4757'" />
                  <span>{{ $t("bottom.cancelOrderConfirm.question") }}</span>
                </div>
                <div class="actions">
                  <button
                    class="cancel ripple-btn"
                    @click="orderCancelConfirmCancel"
                  >
                    {{ $t("bottom.cancelOrderConfirm.no") }}
                  </button>
                  <button
                    class="confirm ripple-btn"
                    @click="orderCancelConfirmOk"
                  >
                    {{ $t("bottom.cancelOrderConfirm.yes") }}
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>

    <div class="bottom-nav">
      <div class="nav-content">
        <div class="go-back">
          <button class="back-btn ripple-btn" @click="goBack">
            <div class="btn-content">
              <Back :width="40" :height="40" />
              <span>{{ $t("bottom.goback") }}</span>
            </div>
            <div class="ripple-effect"></div>
          </button>
        </div>

        <div class="language-selector">
          <button
            v-for="lang in languageStore.availableLanguages"
            :key="lang.code"
            :class="{ active: languageStore.currentLanguage === lang.code }"
            class="lang-btn ripple-btn"
            @click="languageStore.setLanguage(lang.code)"
          >
            <div class="btn-content">
              <component
                :is="lang.flag"
                :width="lang.width"
                :height="lang.height"
              />
            </div>
            <div class="ripple-effect"></div>
          </button>
        </div>

        <div class="impaired-selector">
          <button
            @click="impairedToggle"
            :class="{ active: impairedActive }"
            class="impaired-btn ripple-btn"
          >
            <div class="btn-content">
              <span>{{ $t("bottom.barrierFreeMenu") }}</span>
              <WhellChair :width="40" :height="40" />
            </div>
            <div class="ripple-effect"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bottom-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  width: 100vw;
}

.basket {
  background: linear-gradient(to bottom, #2d3436, #1e272e);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.basket-header {
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.basket-header:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.basket-header::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 60%
  );
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.5s ease;
}

.basket-header:hover::after {
  transform: translate(-50%, -50%) scale(2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.basket-icon-wrapper {
  position: relative;
  padding: 0.5rem;
}

.icon-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

.title {
  color: #fff;
  font-weight: 700;
  font-size: 1.3rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.right {
  display: flex;
  align-items: center;
}

.basket-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem 1.2rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
}

.basket-info:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
}

.basket-icon {
  position: relative;
}

.basket-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff8500;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.count {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.total-wrapper {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
}

.total {
  color: #fff;
  font-weight: 800;
  font-size: 1.4rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.currency {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 600;
}

.info-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 70%
  );
  transform: rotate(45deg);
  transition: 0.6s;
}

.basket-info:hover .info-shine {
  transform: rotate(45deg) translate(50%, 50%);
}

.basket-area {
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.basket-items-wrapper {
  overflow-x: auto;
  padding: 1rem;
}

.basket-items {
  display: flex;
  gap: 1rem;
}

.basket-item {
  flex: 0 0 auto;
  width: 180px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.basket-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.item-image {
  position: relative;
  width: 100%;
  height: 120px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.basket-item:hover .item-image img {
  transform: scale(1.1);
}

.item-quantity {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 133, 0, 0.9);
  color: white;
  font-weight: 700;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.item-info {
  padding: 1rem;
}

.item-name {
  color: white;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-price {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
}

.item-price .amount {
  color: #ff8500;
  font-weight: 800;
  font-size: 1.2rem;
}

.item-price .currency {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.basket-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
}

/* Ripple Button Styles */
.ripple-btn {
  position: relative;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.2rem;
}

.ripple-btn .btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: white;
}

.ripple-btn .ripple-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 60%
  );
  transform: translate(-50%, -50%);
  border-radius: 50%;
  transition: width 0.6s ease-out, height 0.6s ease-out;
}

.ripple-btn:hover .ripple-effect {
  width: 300%;
  height: 300%;
}

.ripple-btn:active {
  transform: scale(0.98);
}

/* Button Variants */
.cancel-btn {
  background: linear-gradient(135deg, #ff4757, #ff6b81);
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
}

.show-btn {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
}

.back-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.lang-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 0.5rem;
}

.lang-btn.active {
  background: rgba(255, 255, 255, 0.2);
}

.impaired-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.impaired-btn.active {
  background: rgba(255, 255, 255, 0.2);
}

/* Bottom Navigation */
.bottom-nav {
  background: linear-gradient(135deg, #ff8500, #ff6f00);
  padding: 0.5rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem;
}

/* Custom Scrollbar */
.custom-scrollbar-y::-webkit-scrollbar {
  height: 8px;
}

.custom-scrollbar-y::-webkit-scrollbar-track {
  background: rgba(255, 133, 0, 0.1);
  border-radius: 4px;
}

.custom-scrollbar-y::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff8500, #ff6f00);
  border-radius: 4px;
}

/* Basket Cancel Dialog */
.basket-cancel {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.cancel-content {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
}

.question {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  color: #2d3436;
  font-size: 1.2rem;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 1rem;
}

.actions button {
  flex: 1;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
}

.actions .cancel {
  background: #f1f2f6;
  color: #2d3436;
}

.actions .confirm {
  background: #ff4757;
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    gap: 1rem;
  }

  .back-btn,
  .impaired-btn {
    width: 100%;
  }

  .language-selector {
    width: 100%;
    justify-content: center;
  }

  .basket-actions {
    grid-template-columns: 1fr;
  }

  .basket-item {
    width: 150px;
  }

  .item-image {
    height: 100px;
  }
}
</style>

<script setup>
import WhellChair from "./icons/WhellChair.vue";
import Back from "./icons/Back.vue";
import BasketUp from "./icons/BasketUp.vue";
import BasketDown from "./icons/BasketDown.vue";
import Basket from "./icons/Basket.vue";
import Trash from "./icons/Trash.vue";
import Eye from "./icons/Eye.vue";
import Warning from "./icons/Warning.vue";

import { useApplicationStore } from "@/stores/application";
import { useLanguageStore } from "@/stores/language";

import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import "animate.css";

const router = useRouter();
const applicationStore = useApplicationStore();
const { impairedActive, basket, basketIsOpen, orderCancelConfirmIsOpen } =
  storeToRefs(applicationStore);
const {
  impairedToggle,
  basketToggle,
  orderCancelConfirmOpen,
  orderCancelConfirmOk,
  orderCancelConfirmCancel,
} = applicationStore;

const languageStore = useLanguageStore();

const goBack = () => {
  history.go(-1);
};

const goShowBasket = () => {
  if (basket.value.count > 0) {
    router.push({ name: "basket" });
  }
};

defineProps(["showBasket"]);
</script>
```
