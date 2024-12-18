```vue
<template>
  <div class="product-description">
    <div class="description-icon">
      <Info :width="24" :height="24" :fill="'#ff8500'" />
    </div>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
import Info from '../../icons/Info.vue'

defineProps({
  description: {
    type: String,
    default: 'Onun lezzet durumu: karışık! Acıktığı an ortaya karışık bir şeyler isteyenlere kıyma, peynir ve kuşbaşı etiyle Karışık Pidem!'
  }
})
</script>

<style scoped>
.product-description {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.description-icon {
  background: rgba(255, 133, 0, 0.1);
  padding: 0.8rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.product-description p {
  margin: 0;
  font-size: 1.1rem;
  color: #2d3436;
  line-height: 1.6;
}
</style>
```