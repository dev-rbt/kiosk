<template>
  <teleport to="body">
    <transition name="modal" appear>
      <div class="modal-overlay" v-if="modelValue">
        <transition name="modal-content" appear>
          <div class="modal-content">
            <!-- Product Header -->
            <div class="product-header">
              <div class="product-title">
                <h1>{{ selectedProduct?.MenuItemText }}</h1>
                <div class="animated-line"></div>
              </div>
              <div class="product-price">
                <span class="amount">{{ totalPrice }}</span>
                <span class="currency">TL</span>
              </div>
            </div>

            <div class="modal-body custom-scrollbar">
              <!-- Product Description -->
              <div class="product-description">
                <div class="description-icon">
                  <Info :width="24" :height="24" :fill="'#ff8500'" />
                </div>
                <p>
                  Onun lezzet durumu: karışık! Acıktığı an ortaya karışık bir
                  şeyler isteyenlere kıyma, peynir ve kuşbaşı etiyle Karışık
                  Pidem!
                </p>
              </div>

              <!-- Product Image -->
              <div class="product-image">
                <img
                  :src="`assets/products/${selectedProduct?.MenuItemKey}.jpg`"
                  :alt="selectedProduct?.name"
                />
                <div class="image-overlay"></div>
              </div>

              <!-- Choices Sections -->
              <div class="choices-container">
                <template v-if="selectedProduct?.Combo">
                  <div
                    v-for="(group, groupIndex) in selectedProduct.Combo"
                    :key="groupIndex"
                    class="choice-group"
                  >
                    <div class="group-header">
                      <h3>{{ group.GroupName }}</h3>
                      <div v-if="group.MaxQuantity > 0" class="group-info">
                        <span v-if="group.IsForcedGroup" class="required-badge"
                          >Zorunlu Seçim</span
                        >
                        <span class="max-quantity"
                          >Max: {{ group.MaxQuantity }}</span
                        >
                      </div>
                    </div>

                    <div class="items-grid">
                      <div
                        v-for="item in group.Items"
                        :key="item.MenuItemKey"
                        class="choice-item"
                        :class="{
                          'has-subitems': item.SubItems?.length > 0,
                          selected: isItemSelected(item),
                        }"
                        @click="handleItemClick(group, item)"
                      >
                        <div class="item-image">
                          <img
                            :src="`assets/products/${item.MenuItemKey}.jpg`"
                            :alt="item.MenuItemText"
                            @error="
                              $event.target.src = 'assets/products/default.png'
                            "
                          />
                          <div
                            v-if="isItemSelected(item)"
                            class="selected-check"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div class="item-content">
                          <div class="item-header">
                            <div class="item-name-container">
                              <span class="item-name">{{
                                item.MenuItemText
                              }}</span>
                              <span
                                v-if="item.ExtraPriceTakeOut_TL > 0"
                                class="item-price"
                              >
                                +{{ item.ExtraPriceTakeOut_TL }} TL
                              </span>
                            </div>
                            <div
                              v-if="getSelectedSubItem(item)"
                              class="selected-subitem"
                            >
                              ({{ getSelectedSubItem(item).MenuItemText }}
                              <template
                                v-if="
                                  getSelectedSubItem(item)
                                    .ExtraPriceTakeOut_TL > 0
                                "
                              >
                                +{{
                                  getSelectedSubItem(item).ExtraPriceTakeOut_TL
                                }}
                                TL
                              </template>
                              )
                            </div>

                            <span
                              v-if="isItemSelected(item)"
                              class="item-quantity"
                            >
                              <button
                                @click.stop="decreaseQuantity(group, item)"
                                :disabled="!canDecreaseQuantity(group, item)"
                              >
                                -
                              </button>
                              <span>{{ getItemQuantity(item) }}</span>
                              <button
                                @click.stop="increaseQuantity(group, item)"
                                :disabled="!canIncreaseQuantity(group)"
                              >
                                +
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <div class="notes-section">
                <div class="notes-header">
                  <h3>{{$t('menu.modal.productNote')}}</h3>
                  <button @click="showKeyboard = true" class="edit-note-btn">
                    <span v-if="!notes">{{$t('menu.modal.addNote')}}</span>
                    <span v-else>{{$t('menu.modal.editNote')}}</span>
                  </button>
                </div>
                <div class="notes-content" v-if="notes">
                  {{ notes }}
                </div>
              </div>

              <VirtualKeyboard
                v-model="notes"
                :show="showKeyboard"
                @close="showKeyboard = false"
              />
            </div>

            <!-- Action Footer -->
            <div class="modal-footer">
              <button
                class="cancel-btn"
                @click="$emit('update:modelValue', false)"
              >
                <Close :width="24" :height="24" :fill="'#fff'" />
                <span>{{ $t("menu.modal.cancel") }}</span>
              </button>

              <div class="quantity-controls">
                <button class="quantity-btn minus" @click="setQuantityMinus">
                  <Minus :width="24" :height="24" :fill="'#fff'" />
                </button>
                <span class="quantity">{{
                  selectedProduct?.quantity || 1
                }}</span>
                <button class="quantity-btn plus" @click="setQuantityPlus">
                  <Plus :width="24" :height="24" :fill="'#fff'" />
                </button>
              </div>

              <div class="action-buttons">
                <button class="payment-btn" @click="addToBasketAndClose(true)">
                  <CreditCard :width="24" :height="24" :fill="'#fff'" />
                  <span>{{ $t("menu.modal.direktPay") }}</span>
                </button>

                <button class="add-btn" @click="addToBasketAndClose(false)">
                  <Cart :width="24" :height="24" :fill="'#fff'" />
                  <span>{{ $t("menu.modal.addToBasket") }}</span>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- SubItem Modal -->
    <SubItemModal
      v-model="showSubItemModal"
      :title="currentParentItem?.MenuItemText"
      :items="currentSubItems"
      @select-item="handleSubItemSelect"
    />

    <!-- Warning Modal -->
    <WarningModal
      v-model="showWarningModal"
      message="Lütfen zorunlu seçimleri tamamlayın."
    />
  </teleport>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import Close from "../icons/Close.vue";
import Minus from "../icons/Minus.vue";
import Plus from "../icons/Plus.vue";
import Info from "../icons/Info.vue";
import CreditCard from "../icons/CreditCard.vue";
import Cart from "../icons/Cart.vue";
import SubItemModal from "./SubItemModal.vue";
import WarningModal from "./WarningModal.vue";
import { useApplicationStore } from "@/stores/application";
import VirtualKeyboard from "../common/VirtualKeyboard.vue";

const applicationStore = useApplicationStore();
const { basket } = storeToRefs(applicationStore);

const props = defineProps({
  modelValue: Boolean,
  selectedProduct: Object,
  modifiers: Array,
});

const selectedItems = ref(new Map());
const selectedSubItems = ref(new Map()); // Alt ürün seçimlerini takip etmek için
const showSubItemModal = ref(false);
const currentSubItems = ref([]);
const currentParentItem = ref(null);
const currentGroup = ref(null);
const showWarningModal = ref(false);
const notes = ref("");
const showKeyboard = ref(false);

// Modal açıldığında state'i sıfırla
const resetState = () => {
  selectedItems.value.clear();
  selectedSubItems.value.clear(); // Alt ürün seçimlerini de sıfırla
  showSubItemModal.value = false;
  currentSubItems.value = [];
  currentParentItem.value = null;
  currentGroup.value = null;
  notes.value = "";
  showKeyboard.value = false;
};

// modelValue değiştiğinde kontrol et
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      // Modal açıldığında
      resetState();

      // Default seçimleri yap
      if (props.selectedProduct?.Combo) {
        props.selectedProduct.Combo.forEach((group) => {
          // Her grup için default item'ları seç
          group.Items.forEach((item) => {
            if (item.IsDefault) {
              selectedItems.value.set(item.MenuItemKey, {
                item: item,
                quantity: item.DefaultQuantity || 1,
                group: group,
              });

              // Eğer alt öğeleri varsa ve default seçili alt öğe varsa onu da seç
              if (item.SubItems?.length > 0) {
                const defaultSubItem = item.SubItems.find(
                  (subItem) => subItem.IsDefault
                );
                if (defaultSubItem) {
                  const subItemWithParent = {
                    ...defaultSubItem,
                    parentItem: item,
                  };
                  selectedItems.value.set(item.MenuItemKey, {
                    item: subItemWithParent,
                    quantity: defaultSubItem.DefaultQuantity || 1,
                    group: group,
                  });
                }
              }
            }
          });
        });
      }
    }
  }
);

const isItemSelected = (item) => {
  return selectedItems.value.has(item.MenuItemKey);
};

const getItemQuantity = (item) => {
  return selectedItems.value.get(item.MenuItemKey)?.quantity || 0;
};

const getGroupSelectedQuantity = (group) => {
  let total = 0;
  group.Items.forEach((item) => {
    total += getItemQuantity(item);
  });
  return total;
};

const canIncreaseQuantity = (group) => {
  const currentQuantity = getGroupSelectedQuantity(group);
  return group.MaxQuantity === 0 || currentQuantity < group.MaxQuantity;
};

const canDecreaseQuantity = (group, item) => {
  const currentQuantity = getItemQuantity(item);
  if (
    group.IsForcedGroup &&
    getGroupSelectedQuantity(group) <= group.ForcedQuantity
  ) {
    return false;
  }
  return currentQuantity > 0;
};

// Zorunlu ve tek seçimli gruplarda seçimin kaldırılmasını engelle
const canDeselectItem = (group, item) => {
  // Grup zorunlu seçim ve max seçim 1 ise ve grupta sadece 1 ürün varsa ve bu ürün seçili ise false döndür
  if (
    group.IsForcedGroup &&
    group.MaxQuantity === 1 &&
    group.Items.length === 1 &&
    isItemSelected(item)
  ) {
    return false;
  }
  return true;
};

const handleItemClick = (group, item) => {
  if (item.SubItems?.length > 0) {
    currentSubItems.value = item.SubItems;
    currentParentItem.value = item;
    currentGroup.value = group;
    showSubItemModal.value = true;
    return;
  }

  // Eğer grup MaxQuantity=1 ise ve başka bir ürün seçiliyse
  if (group.MaxQuantity === 1) {
    // Eğer ürün seçili ve seçimin kaldırılması engelleniyorsa işlemi durdur
    if (isItemSelected(item) && !canDeselectItem(group, item)) {
      return;
    }

    // Gruptaki diğer seçili ürünleri kaldır
    group.Items.forEach((groupItem) => {
      if (groupItem.MenuItemKey !== item.MenuItemKey) {
        selectedItems.value.delete(groupItem.MenuItemKey);
      }
    });

    // Yeni ürünü seç veya seçili ise kaldır
    if (isItemSelected(item)) {
      selectedItems.value.delete(item.MenuItemKey);
    } else {
      selectedItems.value.set(item.MenuItemKey, {
        item,
        quantity: 1,
        group,
      });
    }
  } else {
    // Normal seçim mantığı
    if (!isItemSelected(item)) {
      if (canIncreaseQuantity(group)) {
        increaseQuantity(group, item);
      }
    }
  }
};

const increaseQuantity = (group, item) => {
  if (!canIncreaseQuantity(group)) return;

  const current = selectedItems.value.get(item.MenuItemKey);
  if (current) {
    selectedItems.value.set(item.MenuItemKey, {
      ...current,
      quantity: current.quantity + 1,
    });
  } else {
    selectedItems.value.set(item.MenuItemKey, {
      item,
      quantity: 1,
      group,
    });
  }
};

const decreaseQuantity = (group, item) => {
  if (!canDecreaseQuantity(group, item)) return;

  const current = selectedItems.value.get(item.MenuItemKey);
  if (current) {
    if (current.quantity > 1) {
      selectedItems.value.set(item.MenuItemKey, {
        ...current,
        quantity: current.quantity - 1,
      });
    } else {
      selectedItems.value.delete(item.MenuItemKey);
    }
  }
};

const handleSubItemSelect = (subItem) => {
  if (currentGroup.value && currentParentItem.value) {
    const group = currentGroup.value;

    // MaxQuantity=1 ise diğer seçimleri temizle
    if (group.MaxQuantity === 1) {
      // Gruptaki tüm seçimleri temizle
      group.Items.forEach((groupItem) => {
        selectedItems.value.delete(groupItem.MenuItemKey);
      });
    } else if (!canIncreaseQuantity(group)) {
      // Grup maksimum seçim limitine ulaşmışsa yeni seçime izin verme
      return;
    }

    // Alt ürün seçimini parentItem bilgisiyle birlikte kaydet
    const subItemWithParent = {
      ...subItem,
      parentItem: currentParentItem.value,
    };

    subItemWithParent.price =
      // Yeni seçimi ekle
      selectedItems.value.set(currentParentItem.value.MenuItemKey, {
        item: subItemWithParent,
        quantity: 1,
        group: currentGroup.value,
      });
  }
};

const getSelectedSubItem = (parentItem) => {
  const selectedItem = selectedItems.value.get(parentItem.MenuItemKey);
  if (!selectedItem) return null;

  // Seçilen item bir alt ürün ise (yani bir parentItem'a sahipse)
  if (selectedItem.item.parentItem) {
    return selectedItem.item;
  }
  return null;
};

const isValidSelection = computed(() => {
  if (!props.selectedProduct?.Combo) return true;

  return props.selectedProduct.Combo.every((group) => {
    if (group.IsForcedGroup) {
      const selectedCount = getGroupSelectedQuantity(group);
      return selectedCount >= group.ForcedQuantity;
    }
    return true;
  });
});

const getSelectedItemsArray = () => {
  const items = [];
  selectedItems.value.forEach((value, key) => {
    value.item.price =
      (basket.value.orderType === "TakeOut"
        ? value.item.ExtraPriceTakeOut_TL
        : value.item.ExtraPriceDelivery_TL) * value.quantity;

    items.push({
      item: value.item,
      quantity: value.quantity,
      group: value.group,
    });
  });
  return items;
};

const addToBasketAndClose = (withPayment = false) => {
  if (!isValidSelection.value) {
    showWarningModal.value = true;
    return;
  }

  emit("add-to-basket", {
    product: props.selectedProduct,
    selectedItems: getSelectedItemsArray(),
    withPayment,
    totalPrice: totalPrice.value,
    notes: notes.value
  });
  emit("update:modelValue", false);
};

const emit = defineEmits(["update:modelValue", "add-to-basket"]);

const setQuantityMinus = () => {
  if (props.selectedProduct.quantity > 1) {
    props.selectedProduct.quantity--;
  }
};

const setQuantityPlus = () => {
  if (props.selectedProduct.quantity > 0) {
    props.selectedProduct.quantity++;
  }
};

// Toplam fiyat hesaplama (ürün + ekstralar)
const totalPrice = computed(() => {
  // Ana ürün fiyatı
  let total =
    basket.value.orderType === "TakeOut"
      ? props.selectedProduct?.TakeOutPrice_TL || 0
      : props.selectedProduct?.DeliveryPrice_TL || 0;

  // Seçili ürünlerin ekstra fiyatlarını topla
  if (props.selectedProduct?.Combo) {
    props.selectedProduct.Combo.forEach((group) => {
      group.Items.forEach((item) => {
        const selectedItem = selectedItems.value.get(item.MenuItemKey);
        if (selectedItem) {
          // Seçili ürünün ekstra fiyatını ekle
          const extraPrice =
            basket.value.orderType === "TakeOut"
              ? item.ExtraPriceTakeOut_TL || 0
              : item.ExtraPriceDelivery_TL || 0;
          total += extraPrice * selectedItem.quantity;

          // Alt ürünün ekstra fiyatını ekle (eğer varsa)
          const selectedSubItem = getSelectedSubItem(item);
          if (selectedSubItem) {
            const subItemExtraPrice =
              basket.value.orderType === "TakeOut"
                ? selectedSubItem.ExtraPriceTakeOut_TL || 0
                : selectedSubItem.ExtraPriceDelivery_TL || 0;
            total += subItemExtraPrice;
          }
        }
      });
    });
  }

  return total;
});
</script>

<style scoped>
/* Stil kısmı */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.modal-content {
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border-radius: 20px;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.product-header {
  background: linear-gradient(135deg, #ff8500 0%, #ff6f00 100%);
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  border-radius: 20px 20px 0 0;
}

.product-title h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.animated-line {
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  margin-top: 0.5rem;
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

.product-price {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.product-price .amount {
  font-size: 2.5rem;
  font-weight: 800;
}

.product-price .currency {
  font-size: 1.5rem;
  margin-left: 0.5rem;
  opacity: 0.9;
}

.product-description {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
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

.choices-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;
}

.choice-group {
  background: rgba(255, 255, 255, 0.05);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid rgba(255, 133, 0, 0.2);
}

.group-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ff8500;
  margin: 0;
}

.group-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.required-badge {
  background: rgba(255, 133, 0, 0.15);
  color: #ff8500;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.max-quantity {
  color: #666;
  font-size: 0.85rem;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.25rem;
}

.choice-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.choice-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 133, 0, 0.3);
}

.choice-item.selected {
  background: rgba(255, 133, 0, 0.08);
  border-color: #ff8500;
  box-shadow: 0 4px 12px rgba(255, 133, 0, 0.2);
}

.item-image {
  width: 100%;
  height: 120px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  position: relative;
}

.item-image::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.choice-item:hover .item-image img {
  transform: scale(1.08);
}

.selected-check {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  background: #ff8500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  animation: scaleIn 0.3s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.selected-check svg {
  width: 20px;
  height: 20px;
  color: white;
}

.item-content {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.item-name {
  font-weight: 500;
  color: #fff;
  font-size: 0.9rem;
  line-height: 1.2;
  transition: color 0.3s ease;
}

.choice-item:hover .item-name {
  color: #ff8500;
}

.item-price {
  color: #ff8500;
  font-weight: 600;
  font-size: 0.85rem;
  background: rgba(255, 133, 0, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
}

.selected-subitem {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 8px;
  border-radius: 4px;
}

.modal-footer {
  background: #2d3436;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border-radius: 0 0 20px 20px;
}

.cancel-btn {
  background: #636e72;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #2d3436;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
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
  background: rgba(255, 255, 255, 0.1);
}

.quantity {
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
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-btn {
  background: #2ecc71;
}

.add-btn {
  background: #ff8500;
}

.action-buttons button:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.action-buttons button:active {
  transform: translateY(0);
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

/* Responsive Design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 0;
  }

  .modal-content {
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }

  .product-header {
    border-radius: 0;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .modal-footer {
    border-radius: 0;
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

  .items-grid {
    grid-template-columns: 1fr;
  }
}

/* Modal Animasyonları */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: translateY(20px);
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

</style>
