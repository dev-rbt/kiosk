```vue
<template>
  <div class="product-header">
    <div class="header-content">
      <div class="header-text">
        <div class="title-container">
          <h1>{{ product?.MenuItemText }}</h1>
          <div class="title-blur"></div>
        </div>
      </div>
    </div>

    <div class="price-container">
      <div class="price-badge">
        <span class="amount">{{ totalPrice }}</span>
        <span class="currency">TL</span>
      </div>
      <div class="price-glow"></div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  product: Object,
  totalPrice: Number
})

defineEmits(['close'])
</script>

<style scoped>
.product-header {
  background: linear-gradient(135deg, #ff8500 0%, #ff6f00 100%);
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: white;
  position: relative;
  overflow: hidden;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.header-icon {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.2rem;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.header-text {
  flex: 1;
}

.title-container {
  position: relative;
  max-width: 70%;
}

.title-container h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
}

.title-blur {
  position: absolute;
  inset: -20px;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(20px);
  z-index: 1;
}

.price-container {
  position: relative;
}

.price-badge {
  background: rgba(255, 255, 255, 0.15);
  padding: 1rem 1.5rem;
  border-radius: 15px 15px 0 0;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

.price-badge:hover {
  transform: translateY(-8px);
}

.price-glow {
  position: absolute;
  inset: -10px;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3), transparent 70%);
  filter: blur(10px);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.price-container:hover .price-glow {
  opacity: 1;
}

.amount {
  font-size: 2.5rem;
  font-weight: 800;
}

.currency {
  font-size: 1.4rem;
  opacity: 0.9;
}

.close-btn {
  background: white;
  border: 2px solid #ff4757;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.2);
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.close-btn:hover {
  background: #ff4757;
  transform: rotate(90deg);
}

.close-btn:hover svg path {
  stroke: white;
}

@media (max-width: 768px) {
  .product-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
  }

  .title-container {
    max-width: 100%;
  }

  .title-container h1 {
    font-size: 1.8rem;
  }

  .price-container {
    margin-right: 0;
    align-self: flex-end;
  }

  .price-badge {
    padding: 0.8rem 1.2rem;
  }

  .amount {
    font-size: 2rem;
  }
}
</style>
```