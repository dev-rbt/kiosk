<template>
  <div class="choices-container">
    <template v-if="product?.Combo">
      <div
        v-for="(group, groupIndex) in product.Combo"
        :key="groupIndex"
        class="choice-group animate__animated animate__fadeIn"
        :style="{ animationDelay: `${groupIndex * 0.1}s` }"
      >
        <div class="group-header">
          <div class="group-title">
            <h3>{{ group.GroupName }}</h3>
            <div class="group-info">
              <span v-if="group.IsForcedGroup" class="required-badge">Zorunlu Seçim</span>
              <span v-if="group.MaxQuantity > 0" class="max-quantity">Max: {{ group.MaxQuantity }}</span>
            </div>
          </div>
          <div class="animated-line"></div>
        </div>

        <div class="items-grid">
          <div
            v-for="item in group.Items"
            :key="item.MenuItemKey"
            class="choice-item"
            :class="{
              'has-subitems': item.SubItems?.length > 0,
              'selected': isItemSelected(item),
            }"
            @click="handleItemClick(group, item)"
          >
            <div class="selection-indicator" v-if="isItemSelected(item)">
              <div class="indicator-content">
                <Check :width="20" :height="20" :fill="'#fff'" />
                <span>Seçildi</span>
                <div class="selected-quantity">{{ getItemQuantity(item) }}x</div>
              </div>
            </div>

            <div class="item-image">
              <img
                :src="`assets/products/${item.SubItems?.length > 0 ? item.MenuItemText : item.MenuItemKey}.jpg`"
                :alt="item.MenuItemText"
                @error="$event.target.src = 'assets/products/default.png'"
              />
              <div class="image-overlay">
                <div class="select-button">
                  <Check v-if="isItemSelected(item)" :width="24" :height="24" :fill="'#fff'" />
                  <span>{{ isItemSelected(item) ? 'Seçildi' : 'Seç' }}</span>
                </div>
              </div>
              <div v-if="item.ExtraPriceTakeOut_TL > 0" class="price-badge">
                <span class="price-amount">+{{ item.ExtraPriceTakeOut_TL }}</span>
                <span class="price-currency">TL</span>
              </div>
            </div>

            <div class="item-content">
              <div class="item-header">
                <div class="item-name-container">
                  <span class="item-name">{{ item.MenuItemText }}</span>
                </div>
                <div v-if="getSelectedSubItem(item)" class="selected-subitem">
                  <div class="subitem-info">
                    <span>{{ getSelectedSubItem(item).MenuItemText }}</span>
                    <div v-if="getSelectedSubItem(item).ExtraPriceTakeOut_TL > 0" class="subitem-price">
                      <span class="price-amount">+{{ getSelectedSubItem(item).ExtraPriceTakeOut_TL }}</span>
                      <span class="price-currency">TL</span>
                    </div>
                  </div>
                </div>

                <span v-if="isItemSelected(item)" class="item-quantity">
                  <button
                    @click.stop="$emit('decrease-quantity', group, item)"
                    :disabled="!canDecreaseQuantity(group, item)"
                    class="quantity-btn"
                  >
                    <Minus
                      :width="20"
                      :height="20"
                      :fill="canDecreaseQuantity(group, item) ? '#2d3436' : '#b2bec3'"
                    />
                  </button>
                  <span>{{ getItemQuantity(item) }}</span>
                  <button
                    @click.stop="$emit('increase-quantity', group, item)"
                    :disabled="!canIncreaseQuantity(group)"
                    class="quantity-btn"
                  >
                    <Plus
                      :width="20"
                      :height="20"
                      :fill="canIncreaseQuantity(group) ? '#2d3436' : '#b2bec3'"
                    />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import Check from '../../icons/Check.vue'
import Minus from '../../icons/Minus.vue'
import Plus from '../../icons/Plus.vue'

const props = defineProps({
  product: Object,
  selectedItems: {
    type: Map,
    required: true
  }
})

const emit = defineEmits([
  'item-click',
  'increase-quantity',
  'decrease-quantity'
])

const isItemSelected = (item) => {
  return props.selectedItems.has(item.MenuItemKey)
}

const getItemQuantity = (item) => {
  return props.selectedItems.get(item.MenuItemKey)?.quantity || 0
}

const getGroupSelectedQuantity = (group) => {
  let total = 0
  group.Items.forEach((item) => {
    total += getItemQuantity(item)
  })
  return total
}

const canIncreaseQuantity = (group) => {
  const currentQuantity = getGroupSelectedQuantity(group)
  return group.MaxQuantity === 0 || currentQuantity < group.MaxQuantity
}

const canDecreaseQuantity = (group, item) => {
  const currentQuantity = getItemQuantity(item)
  if (group.IsForcedGroup && getGroupSelectedQuantity(group) <= group.ForcedQuantity) {
    return false
  }
  return currentQuantity > 0
}

const getSelectedSubItem = (parentItem) => {
  const selectedItem = props.selectedItems.get(parentItem.MenuItemKey)
  if (!selectedItem) return null

  if (selectedItem.item.parentItem) {
    return selectedItem.item
  }
  return null
}

const handleItemClick = (group, item) => {
  emit('item-click', group, item)
}
</script>

<style scoped>
.choices-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;
}

.choice-group {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.choice-group:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.group-header {
  margin-bottom: 1.5rem;
}

.group-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.group-title h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3436;
  margin: 0;
}

.group-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.required-badge {
  background: rgba(255, 71, 87, 0.1);
  color: #ff4757;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.max-quantity {
  color: #636e72;
  font-size: 0.9rem;
  font-weight: 500;
}

.animated-line {
  height: 2px;
  background: linear-gradient(90deg, #ff8500, transparent);
  position: relative;
  overflow: hidden;
}

.animated-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 133, 0, 0.5), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  to {
    left: 100%;
  }
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.25rem;
}

.choice-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.choice-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.choice-item.selected {
  border: 2px solid #2ecc71;
  box-shadow: 0 8px 20px rgba(46, 204, 113, 0.2);
}

.selection-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.95), rgba(39, 174, 96, 0.95));
  padding: 0.5rem;
  z-index: 3;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.choice-item.selected .selection-indicator {
  transform: translateY(0);
}

.indicator-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: white;
  font-weight: 600;
}

.selected-quantity {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
}

.item-image {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.choice-item:hover .item-image img {
  transform: scale(1.1);
}

.price-badge {
  position: absolute;
  top: 10px;
  right: -5px;
  background: linear-gradient(135deg, #ff8500, #ff6f00);
  padding: 0.5rem 1rem;
  border-radius: 8px 0 0 8px;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(255, 133, 0, 0.3);
  z-index: 2;
  transform: translateX(0);
  transition: all 0.3s ease;
}

.price-badge::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 13px 10px 13px 0;
  border-color: transparent #ff6f00 transparent transparent;
}

.price-badge .price-amount {
  font-size: 1.2rem;
}

.price-badge .price-currency {
  font-size: 0.9rem;
  margin-left: 0.2rem;
  opacity: 0.9;
}

.choice-item:hover .price-badge {
  transform: translateX(-5px);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.9), rgba(39, 174, 96, 0.9));
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.select-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.select-button span {
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
}

.choice-item:hover .image-overlay {
  opacity: 1;
}

.choice-item:hover .select-button {
  transform: translateY(0);
}

.item-content {
  padding: 1rem;
}

.item-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-name-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.item-name {
  font-weight: 600;
  color: #2d3436;
  font-size: 1rem;
  line-height: 1.4;
}

.selected-subitem {
  background: rgba(46, 204, 113, 0.05);
  padding: 0.8rem;
  border-radius: 10px;
  margin-top: 0.5rem;
}

.subitem-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #636e72;
}

.subitem-price {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  box-shadow: 0 2px 4px rgba(46, 204, 113, 0.2);
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 25px;
  margin-top: 0.5rem;
}

.quantity-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:not(:disabled):hover {
  background: rgba(0, 0, 0, 0.05);
}

.quantity-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.item-quantity span {
  font-weight: 600;
  color: #2d3436;
  min-width: 2ch;
  text-align: center;
}

@media (max-width: 768px) {
  .items-grid {
    grid-template-columns: 1fr;
  }

  .price-badge {
    padding: 0.4rem 0.8rem;
  }

  .price-badge .price-amount {
    font-size: 1rem;
  }

  .selection-indicator {
    padding: 0.4rem;
  }

  .selected-quantity {
    font-size: 0.8rem;
  }
}
</style>