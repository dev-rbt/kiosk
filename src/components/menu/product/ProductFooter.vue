```vue
<template>
  <div class="modal-footer">
    <button class="cancel-btn" @click="$emit('cancel')">
      <Close :width="24" :height="24" :fill="'#fff'" />
      <span>{{ $t("menu.modal.cancel") }}</span>
    </button>

    <div class="quantity-controls">
      <button class="quantity-btn minus" @click="$emit('quantity-minus')">
        <Minus :width="24" :height="24" :fill="'#fff'" />
      </button>
      <span class="quantity">{{ quantity }}</span>
      <button class="quantity-btn plus" @click="$emit('quantity-plus')">
        <Plus :width="24" :height="24" :fill="'#fff'" />
      </button>
    </div>

    <div class="action-buttons">
      <button class="payment-btn" @click="$emit('add-to-basket', true)">
        <CreditCard :width="24" :height="24" :fill="'#fff'" />
        <span>{{ $t("menu.modal.direktPay") }}</span>
      </button>

      <button class="add-btn" @click="$emit('add-to-basket', false)">
        <Cart :width="24" :height="24" :fill="'#fff'" />
        <span>{{ $t("menu.modal.addToBasket") }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import Close from '../../icons/Close.vue'
import Minus from '../../icons/Minus.vue'
import Plus from '../../icons/Plus.vue'
import CreditCard from '../../icons/CreditCard.vue'
import Cart from '../../icons/Cart.vue'

defineProps({
  quantity: {
    type: Number,
    default: 1
  }
})

defineEmits(['cancel', 'quantity-minus', 'quantity-plus', 'add-to-basket'])
</script>

<style scoped>
.modal-footer {
  background: #2d3436;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.cancel-btn {
  background: #636e72;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #2d3436;
  transform: translateY(-2px);
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
}

.quantity-controls .quantity-btn {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-controls .quantity-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.quantity-controls .quantity {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  min-width: 3ch;
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.action-buttons button {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.payment-btn {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
}

.add-btn {
  background: linear-gradient(135deg, #ff8500, #ff6f00);
}

.action-buttons button:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.action-buttons button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  transform: rotate(45deg);
  transition: 0.3s;
}

.action-buttons button:hover::after {
  transform: rotate(45deg) translate(50%, 50%);
}

@media (max-width: 768px) {
  .modal-footer {
    flex-direction: column;
    gap: 1rem;
  }

  .cancel-btn,
  .quantity-controls,
  .action-buttons {
    width: 100%;
  }

  .action-buttons {
    flex-direction: column;
  }

  .quantity-controls {
    justify-content: center;
  }
}
</style>
```