<template>
  <teleport to="body">
    <transition name="modal" appear>
      <div class="modal-overlay" v-if="modelValue">
        <transition name="modal-content" appear>
          <div class="modal-content">
            <ProductHeader
              :product="selectedProduct"
              :total-price="totalPrice"
              @close="$emit('update:modelValue', false)"
            />

            <div class="modal-body custom-scrollbar">
              <ProductDescription />

              <ProductImage
                :product-key="selectedProduct?.MenuItemKey"
                :product-name="selectedProduct?.MenuItemText"
              />

              <ProductChoices
                :product="selectedProduct"
                :selected-items="selectedItems"
                @item-click="handleItemClick"
                @increase-quantity="increaseQuantity"
                @decrease-quantity="decreaseQuantity"
              />

              <ProductNotes
                :notes="notes"
                @show-keyboard="showKeyboard = true"
              />

              <VirtualKeyboard
                v-model="notes"
                :show="showKeyboard"
                @close="showKeyboard = false"
              />
            </div>

            <ProductFooter
              :quantity="selectedProduct?.quantity"
              @cancel="$emit('update:modelValue', false)"
              @quantity-minus="setQuantityMinus"
              @quantity-plus="setQuantityPlus"
              @add-to-basket="addToBasketAndClose"
            />
          </div>
        </transition>
      </div>
    </transition>

    <SubItemModal
      v-model="showSubItemModal"
      :title="currentParentItem?.MenuItemText"
      :items="currentSubItems"
      @select-item="handleSubItemSelect"
    />

    <WarningModal v-model="showWarningModal" :message="warningModalMessage" />
  </teleport>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useApplicationStore } from "@/stores/application";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import ProductHeader from "./product/ProductHeader.vue";
import ProductDescription from "./product/ProductDescription.vue";
import ProductImage from "./product/ProductImage.vue";
import ProductChoices from "./product/ProductChoices.vue";
import ProductNotes from "./product/ProductNotes.vue";
import ProductFooter from "./product/ProductFooter.vue";
import SubItemModal from "./SubItemModal.vue";
import WarningModal from "../common/WarningModal.vue";
import VirtualKeyboard from "../common/VirtualKeyboard.vue";

const props = defineProps({
  modelValue: Boolean,
  selectedProduct: Object,
  modifiers: Array,
});

const selectedItems = ref(new Map());
const showSubItemModal = ref(false);
const currentSubItems = ref([]);
const currentParentItem = ref(null);
const currentGroup = ref(null);
const showWarningModal = ref(false);
const warningModalMessage = ref("");
const notes = ref("");
const showKeyboard = ref(false);

const applicationStore = useApplicationStore();
const { basket } = storeToRefs(applicationStore);

const totalPrice = computed(() => {
  let total =
    basket.value.orderType === "TakeOut"
      ? props.selectedProduct?.TakeOutPrice_TL || 0
      : props.selectedProduct?.DeliveryPrice_TL || 0;

  if (props.selectedProduct?.Combo) {
    props.selectedProduct.Combo.forEach((group) => {
      group.Items.forEach((item) => {
        const selectedItem = selectedItems.value.get(item.MenuItemKey);
        if (selectedItem) {
          const extraPrice =
            basket.value.orderType === "TakeOut"
              ? item.ExtraPriceTakeOut_TL || 0
              : item.ExtraPriceDelivery_TL || 0;
          total += extraPrice * selectedItem.quantity;

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

const handleItemClick = (group, item) => {
  if (item.SubItems?.length > 0) {
    currentSubItems.value = item.SubItems;
    currentParentItem.value = item;
    currentGroup.value = group;
    showSubItemModal.value = true;
    return;
  }

  if (group.MaxQuantity === 1) {
    if (isItemSelected(item) && !canDeselectItem(group, item)) {
      return;
    }

    group.Items.forEach((groupItem) => {
      if (groupItem.MenuItemKey !== item.MenuItemKey) {
        selectedItems.value.delete(groupItem.MenuItemKey);
      }
    });

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
    if (!isItemSelected(item)) {
      if (canIncreaseQuantity(group)) {
        increaseQuantity(group, item);
      }
    }
  }
};

const handleSubItemSelect = (subItem) => {
  if (currentGroup.value && currentParentItem.value) {
    const group = currentGroup.value;

    if (group.MaxQuantity === 1) {
      group.Items.forEach((groupItem) => {
        selectedItems.value.delete(groupItem.MenuItemKey);
      });
    } else if (!canIncreaseQuantity(group)) {
      return;
    }

    const subItemWithParent = {
      ...subItem,
      parentItem: currentParentItem.value,
    };

    selectedItems.value.set(currentParentItem.value.MenuItemKey, {
      item: subItemWithParent,
      quantity: 1,
      group: currentGroup.value,
    });
  }
  showSubItemModal.value = false;
};

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

const canDeselectItem = (group, item) => {
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

const getSelectedSubItem = (parentItem) => {
  const selectedItem = selectedItems.value.get(parentItem.MenuItemKey);
  if (!selectedItem) return null;

  if (selectedItem.item.parentItem) {
    return selectedItem.item;
  }
  return null;
};

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

const addToBasketAndClose = (withPayment = false) => {
  if (!isValidSelection.value) {
    showWarningModal.value = true;
    warningModalMessage.value = t(
      "warningMessages.pleaseCompleteTheTequiredSelections"
    );
    return;
  }

  emit("add-to-basket", {
    product: props.selectedProduct,
    selectedItems: getSelectedItemsArray(),
    withPayment,
    totalPrice: totalPrice.value,
    notes: notes.value,
  });
  emit("update:modelValue", false);
};

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

const emit = defineEmits(["update:modelValue", "add-to-basket"]);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      resetState();

      if (props.selectedProduct?.Combo) {
        props.selectedProduct.Combo.forEach((group) => {
          group.Items.forEach((item) => {
            if (item.IsDefault) {
              selectedItems.value.set(item.MenuItemKey, {
                item: item,
                quantity: item.DefaultQuantity || 1,
                group: group,
              });

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

const resetState = () => {
  selectedItems.value.clear();
  showSubItemModal.value = false;
  currentSubItems.value = [];
  currentParentItem.value = null;
  currentGroup.value = null;
  notes.value = "";
  showKeyboard.value = false;
};
</script>

<style scoped>
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
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

/* Modal Animations */
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

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 133, 0, 0.1);
  border-radius: 5px;
  margin: 5px 0;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff8500, #ff6f00);
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #ff6f00, #ff5f00);
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
}
</style>
