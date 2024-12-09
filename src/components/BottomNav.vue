<template>
  <div class="bottom-fixed" id="bottom-nav">
    <div ref="refBasket" class="basket" v-if="showBasket">
      <div class="basket-header" @click="basketToggle">
        <div class="header-content">
          <div class="left">
            <BasketUp v-if="!basketIsOpen" :width="40" height="40" :fill="'#fff'" />
            <BasketDown v-else :width="40" height="40" :fill="'#fff'" />
            <span class="title">{{ $t('bottom.myOrder')}}</span>
          </div>

          <div class="right">
            <div class="basket-info">
              <Basket :width="30" height="30" :fill="'#fff'" />
              <div class="details">
                <span class="count">{{ $t('bottom.summary.productCount', { count: basket.count }) }}</span>
                <span class="total">{{ $t('bottom.summary.amount', { total: basket.total.toFixed(2), currency: 'TL' }) }}</span>
              </div>
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
            <div class="basket-items-wrapper custom-scrollbar">
              <div class="basket-items">
                <div v-for="product in basket.products" 
                     :key="product.index"
                     class="basket-item animate__animated animate__fadeIn">
                  <div class="item-image">
                    <img :src="`assets/products/${product.MenuItemKey}.jpg`" :alt="product.MenuItemText" />
                  </div>
                  <div class="item-info">
                    <div class="item-name">{{ product.MenuItemText }}</div>
                    <div class="item-price">{{ product.price }} TL</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="basket-actions">
            <button class="cancel-btn" @click="orderCancelConfirmOpen">
              <Trash :width="24" :height="24" :fill="'#fff'" />
              <span>{{$t('bottom.cancelOrder')}}</span>
            </button>
            <button class="show-btn" @click="goShowBasket">
              <Eye :width="24" :height="24" :fill="'#fff'" />
              <span>{{$t('bottom.showBasket')}}</span>
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
                  <span>{{ $t('bottom.cancelOrderConfirm.question')}}</span>
                </div>
                <div class="actions">
                  <button class="cancel" @click="orderCancelConfirmCancel">{{ $t('bottom.cancelOrderConfirm.no')}}</button>
                  <button class="confirm" @click="orderCancelConfirmOk">{{ $t('bottom.cancelOrderConfirm.yes')}}</button>
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
          <div @click="goBack">
            <Back :width="40" :height="40" />
            <span>{{ $t('bottom.goback') }}</span>
          </div>
        </div>

        <div class="language-selector">
          <a href="#" v-for="lang in languageStore.availableLanguages" :key="lang.code"
            :class="{ active: languageStore.currentLanguage === lang.code }"
            @click.prevent="languageStore.setLanguage(lang.code)">
            <component :is="lang.flag" :width="lang.width" :height="lang.height" />
          </a>
        </div>

        <div class="impaired-selector">
          <div @click="impairedToggle" :class="{ active: impairedActive }">
            <span>{{ $t('bottom.barrierFreeMenu') }}</span>
            <WhellChair :width="40" :height="40" />
          </div>
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
}

.basket-header {
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.basket-header:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.title {
  color: #fff;
  font-weight: 600;
  font-size: 1.2rem;
}

.right {
  display: flex;
  align-items: center;
}

.basket-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 50px;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.count {
  color: #fff;
  font-size: 0.9rem;
  opacity: 0.8;
}

.total {
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
}

.basket-area {
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}



.basket-items-wrapper {
  overflow-x: auto;
}

.basket-items {
  display: flex;
}

.basket-item {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.8rem;
  border-radius: 10px;
  width: 150px;
  transition: transform 0.3s ease;
  margin: 1rem 0 1rem 1rem;
}

.basket-item:hover {
  transform: translateY(-2px);
}

.item-image img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.item-info {
  text-align: center;
  margin-top: 0.5rem;
}

.item-name {
  color: #fff;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  display: -webkit-box;
  line-clamp: 2;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-price {
  color: #ff8500;
  font-weight: 700;
  font-size: 1rem;
}

.basket-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.basket-actions button {
  border: none;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.2rem;
}

.cancel-btn {
  background: #ff4757;
  color: white;
}

.show-btn {
  background: #2ecc71;
  color: white;
}

.cancel-btn:hover, .show-btn:hover {
  filter: brightness(1.1);
}

.basket-cancel {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.cancel-content {
  background: white;
  padding: 2rem;
  border-radius: 15px;
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
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.actions .cancel {
  background: #f1f2f6;
  color: #2d3436;
}

.actions .confirm {
  background: #ff4757;
  color: white;
}

.actions button:hover {
  transform: translateY(-2px);
}

/* Bottom Navigation */
.bottom-nav {
  background: #ff8500;
  padding: 0.5rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.go-back > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.go-back > div:hover {
  background: rgba(255, 255, 255, 0.1);
}

.go-back span {
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
}

.language-selector {
  display: flex;
  gap: 1rem;
}

.language-selector a {
  position: relative;
  display: flex;
  padding: 0.3rem;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.language-selector a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.language-selector a.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
}

.impaired-selector > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.impaired-selector > div:hover {
  background: rgba(255, 255, 255, 0.1);
}

.impaired-selector > div.active {
  background: rgba(0, 0, 0, 0.1);
}

.impaired-selector span {
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 133, 0, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff8500, #ff6f00);
  border-radius: 4px;
}
/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<script setup>
import WhellChair from './icons/WhellChair.vue'
import Back from './icons/Back.vue'
import BasketUp from './icons/BasketUp.vue'
import BasketDown from './icons/BasketDown.vue'
import Basket from './icons/Basket.vue'
import Trash from './icons/Trash.vue'
import Eye from './icons/Eye.vue'
import Warning from './icons/Warning.vue'

import { useApplicationStore } from '@/stores/application'
import { useLanguageStore } from '@/stores/language'

import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import 'animate.css'

const router = useRouter()
const applicationStore = useApplicationStore()
const { impairedActive, basket, basketIsOpen, orderCancelConfirmIsOpen } = storeToRefs(applicationStore)
const { impairedToggle, basketToggle, orderCancelConfirmOpen, orderCancelConfirmOk, orderCancelConfirmCancel } = applicationStore

const languageStore = useLanguageStore()


const goBack = () => {
  history.go(-1)
}

const goShowBasket = () => {
  if (basket.value.count > 0) {
    router.push({ name: 'basket' })
  }
}

defineProps(['showBasket'])
</script>