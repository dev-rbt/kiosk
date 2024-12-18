```vue
<template>
  <div class="menu-item animate__animated animate__fadeIn" @click="$emit('select')">
    <div class="item-image-container">
      <div class="item-image">
        <img 
          :src="`assets/products/${item.MenuItemKey}.jpg`" 
          :alt="item.MenuItemText"
          @error="$event.target.src = 'assets/products/default.png'"
        />
        <div class="image-overlay">
          <div class="order-button">
            <Cart :width="24" :height="24" :fill="'#fff'" />
            <span v-html="$t('menu.addToBasket')"></span>
          </div>
        </div>
      </div>

      <div class="price-tag">
        <div class="price-content">
          <span class="amount">{{ getPrice }}</span>
          <span class="currency">TL</span>
        </div>
        <div class="price-shine"></div>
      </div>
    </div>

    <div class="item-content">
      <div class="content-wrapper">
        <div class="title-area">
          <h3 class="item-title">{{ item.MenuItemText }}</h3>
          <div class="title-underline"></div>
        </div>

        <div class="item-description" v-if="item.Description">
          {{ item.Description }}
        </div>

        <div class="item-badges" v-if="item.Badges">
          <span 
            v-for="badge in item.Badges" 
            :key="badge"
            class="badge"
            :class="badge.toLowerCase()"
          >
            {{ badge }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Cart from '../../icons/Cart.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  orderType: {
    type: String,
    required: true
  }
})

const getPrice = computed(() => {
  return props.orderType === 'TakeOut' 
    ? props.item.TakeOutPrice_TL 
    : props.item.DeliveryPrice_TL
})

defineEmits(['select'])
</script>

<style scoped>
.menu-item {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.menu-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 30px rgba(255, 133, 0, 0.2);
}

.item-image-container {
  position: relative;
  width: 100%;
}

.item-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-item:hover .item-image img {
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

.order-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.order-button span {
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
}

.menu-item:hover .image-overlay {
  opacity: 1;
}

.menu-item:hover .order-button {
  transform: translateY(0);
}

.price-tag {
  position: absolute;
  top: 20px;
  right: -5px;
  background: linear-gradient(135deg, #ff8500, #ff6f00);
  padding: 0.8rem 1.5rem;
  border-radius: 8px 0 0 8px;
  box-shadow: 0 4px 15px rgba(255, 133, 0, 0.2);
  transform: translateX(5px);
  transition: all 0.3s ease;
  z-index: 2;
  overflow: hidden;
}

.price-tag::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 20px 10px 20px 0;
  border-color: transparent #ff6f00 transparent transparent;
}

.price-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.price-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  transform: rotate(45deg);
  transition: 0.3s;
}

.menu-item:hover .price-tag {
  transform: translateX(0);
}

.menu-item:hover .price-shine {
  transform: rotate(45deg) translate(50%, 50%);
}

.amount {
  color: white;
  font-size: 1.8rem;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.currency {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  opacity: 0.9;
}

.item-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #fff 0%, #f8f9fa 100%);
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title-area {
  margin-bottom: 0.5rem;
}

.item-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #2d3436;
  margin: 0;
  line-height: 1.4;
  background: linear-gradient(45deg, #2d3436, #2d3436);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.title-underline {
  height: 3px;
  background: linear-gradient(90deg, #ff8500, transparent);
  margin-top: 0.5rem;
  border-radius: 2px;
  width: 50%;
  transition: width 0.3s ease;
}

.menu-item:hover .title-underline {
  width: 100%;
}

.item-description {
  color: #636e72;
  font-size: 0.95rem;
  line-height: 1.6;
}

.item-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.badge {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.badge:hover {
  transform: translateY(-2px);
}

.new {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.spicy {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.vegetarian {
  background: rgba(155, 89, 182, 0.1);
  color: #9b59b6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .item-image {
    height: 180px;
  }

  .item-title {
    font-size: 1.3rem;
  }

  .price-tag {
    padding: 0.7rem 1.2rem;
  }

  .amount {
    font-size: 1.6rem;
  }

  .item-content {
    padding: 1.2rem;
  }
}
</style>
```