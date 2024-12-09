<template>
  <div class="basket">
    <div class="logo">
      <Logo :width="200" />
    </div>

    <div class="basket-content">
      <div class="basket-header animate__animated animate__fadeInDown">
        <div class="title-container">
          <div class="title-icon">
            <BasketIcon :width="32" :height="32" :fill="'#ff8500'" />
          </div>
          <h1>
            {{ $t("basket.myOrder") }}
            <span class="count">({{ basket?.count || 0 }})</span>
          </h1>
          <div class="animated-line"></div>
        </div>
      </div>

      <div class="basket-items-container custom-scrollbar">
        <TransitionGroup name="list" tag="div" class="basket-items">
          <div
            v-for="product in basket?.products"
            :key="product.index"
            class="basket-item animate__animated animate__fadeIn"
          >
            <div class="item-image">
              <img
                :src="`assets/products/${product.MenuItemKey}.jpg`"
                @error="$event.target.src = 'assets/products/default.png'"
              />
            </div>

            <div class="item-details">
              <div class="item-header">
                <h3>{{ product.MenuItemText }}</h3>
                <div class="item-options">
                  <div
                    v-for="selectedItem in product.selectedItems"
                    :key="selectedItem.item.MenuItemKey"
                    class="option"
                  >
                    <span class="option-dot"></span>
                    {{ selectedItem.item.MenuItemText }}
                    <span v-if="selectedItem.item.price > 0">
                      +{{ selectedItem.item.price }} TL
                    </span>
                  </div>
                </div>
              </div>

              <div class="item-actions">
                <div class="quantity-controls">
                  <button
                    @click="setQuantityMinus(product)"
                    class="quantity-btn"
                  >
                    <Trash
                      v-if="product.quantity == 1"
                      :width="28"
                      :height="28"
                      :fill="'#ff4757'"
                    />
                    <Minus v-else :width="28" :height="28" :fill="'#2d3436'" />
                  </button>

                  <span class="quantity">{{ product.quantity }}</span>

                  <button
                    @click="setQuantityPlus(product)"
                    class="quantity-btn"
                  >
                    <Plus :width="28" :height="28" :fill="'#2d3436'" />
                  </button>
                </div>

                <div class="price">
                  <span class="amount">{{
                    product.price * product.quantity
                  }}</span>
                  <span class="currency">TL</span>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <div class="basket-summary animate__animated animate__fadeInUp">
        <div class="summary-card">
          <div class="summary-header">
            <h3>{{ $t("basket.summary.caption") }}</h3>
            <div class="header-line"></div>
          </div>

          <div class="summary-content">
            <div class="summary-item">
              <span>{{ $t("basket.summary.subtotal") }}</span>
              <span>{{ basket.total.toFixed(2) }} TL</span>
            </div>
            <div class="summary-item">
              <span>{{ $t("basket.summary.discount") }}</span>
              <span>{{ basket.total.toFixed(2) }} TL</span>
            </div>
            <div class="summary-total">
              <span>{{ $t("basket.summary.grandTotal") }}</span>
              <span>{{ basket.total.toFixed(2) }} TL</span>
            </div>

            <div class="summary-total">
              <span>{{ $t("basket.summary.orderNote") }}</span>
              <div>
                <button @click="showKeyboard = true" class="edit-note-btn">
                  <span v-if="!basket.notes">{{ $t("basket.summary.addNote") }}</span>
                  <span v-else>{{ $t("basket.summary.editNote") }}</span>
                </button>
              </div>
            </div>
            <div>
              {{ basket.notes }}
            </div>
          </div>
        </div>
      </div>

      <div class="basket-footer animate__animated animate__fadeInUp">
        <button class="back-btn" @click="goMenu">
          <div class="btn-content">
            <ArrowLeft :width="36" :height="36" :fill="'#ff8500'" />
            <span>{{ $t("basket.goMenu") }}</span>
          </div>
          <div class="btn-shine"></div>
        </button>

        <button class="checkout-btn" @click="goPayment">
          <div class="btn-content">
            <span>{{ $t("basket.goPayment") }}</span>
            <ArrowRight :width="36" :height="36" :fill="'#fff'" />
          </div>
          <div class="btn-shine"></div>
          <div class="btn-glow"></div>
        </button>
      </div>

      <VirtualKeyboard
        v-model="basket.notes"
        :show="showKeyboard"
        @close="showKeyboard = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useApplicationStore } from "@/stores/application";
import { storeToRefs } from "pinia";
import Logo from "../components/icons/Logo.vue";
import BasketIcon from "../components/icons/Basket.vue";
import Minus from "../components/icons/Minus.vue";
import Plus from "../components/icons/Plus.vue";
import Trash from "../components/icons/Trash.vue";
import ArrowLeft from "../components/icons/ArrowLeft.vue";
import ArrowRight from "../components/icons/ArrowRight.vue";
import VirtualKeyboard from "../components/common/VirtualKeyboard.vue";
import "animate.css";

const router = useRouter();
const applicationStore = useApplicationStore();
const { basket } = storeToRefs(applicationStore);
const { updateBasketTotals, removeBasketItem } = applicationStore;
const showKeyboard = ref(false);

const setQuantityMinus = (product) => {
  if (product.quantity > 1) {
    product.quantity--;
  } else {
    removeBasketItem(product);
  }
  updateBasketTotals();
};

const setQuantityPlus = (product) => {
  if (product.quantity > 0) {
    product.quantity++;
  }
  updateBasketTotals();
};

const goMenu = () => {
  router.push({ name: "menu" });
};

const goPayment = () => {
  if (basket.value.count > 0) {
    router.push({ name: "payment" });
  }
};
</script>

<style scoped>
.basket {
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

.basket-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.basket-header {
  text-align: center;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.title-icon {
  background: rgba(255, 133, 0, 0.1);
  padding: 1rem;
  border-radius: 50%;
}

h1 {
  font-size: 2rem;
  color: #2d3436;
  margin: 0;
}

.count {
  color: #ff8500;
  font-size: 1.8rem;
}

.animated-line {
  height: 3px;
  background: linear-gradient(90deg, #ff8500, transparent);
  margin-top: 0.5rem;
  border-radius: 2px;
}

.basket-items-container {
  flex: 1;
  overflow-y: auto;
}

.basket-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-right: 1rem;
  height: 100px;
}

.basket-item {
  display: flex;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.item-image img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-header h3 {
  font-size: 1.4rem;
  color: #2d3436;
  margin: 0 0 0.5rem 0;
}

.item-options {
  display: flex;
  gap: 1rem;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #636e72;
  font-size: 0.9rem;
}

.option-dot {
  width: 6px;
  height: 6px;
  background: #ff8500;
  border-radius: 50%;
}

.item-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f5f6fa;
  padding: 0.5rem 1rem;
  border-radius: 50px;
}

.quantity-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.quantity-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.quantity {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3436;
  min-width: 2ch;
  text-align: center;
}

.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ff8500;
}

.currency {
  font-size: 1rem;
  margin-left: 0.2rem;
}

.summary-card {
  background: linear-gradient(145deg, #2d3436, #1e272e);
  border-radius: 20px;
  padding: 1.5rem;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.summary-header {
  margin-bottom: 1.5rem;
}

.summary-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff8500;
  margin: 0;
}

.header-line {
  height: 3px;
  background: linear-gradient(90deg, #ff8500, transparent);
  margin-top: 0.5rem;
  border-radius: 2px;
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  color: #b2bec3;
  font-size: 1.1rem;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 700;
  color: #ff8500;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.basket-footer {
  display: flex;
  gap: 1rem;
  margin-top: auto;
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

.separator {
  width: 2px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
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

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Custom Scrollbar */
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

.notes-section {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.notes-header h3 {
  margin: 0;
  color: #343a40;
}

.edit-note-btn {
  background-color: #ff8500;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.edit-note-btn:hover {
  background-color: #e67700;
}

.notes-content {
  padding: 0.5rem;
  background-color: white;
  border-radius: 4px;
  min-height: 40px;
  white-space: pre-wrap;
  word-break: break-word;
}

@media (max-width: 768px) {
  .basket-content {
    padding: 1rem;
  }

  .basket-item {
    flex-direction: column;
  }

  .item-image img {
    width: 100%;
    height: 200px;
  }

  .basket-footer {
    flex-direction: column;
  }
}
</style>
