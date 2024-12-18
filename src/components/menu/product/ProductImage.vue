```vue
<template>
  <div class="product-image">
    <img :src="`assets/products/${productKey}.jpg`" :alt="productName" />
    <div class="image-overlay"></div>
  </div>
</template>

<script setup>
defineProps({
  productKey: String,
  productName: String
})
</script>

<style scoped>
.product-image {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.product-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-image:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 100%);
}
</style>
```