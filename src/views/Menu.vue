<template>
  <div>
    <div class="menu-view">
      <MenuHeader ref="header" />

      <div class="menu">
        <MenuGroups
          ref="refGroups"
          v-model="selectedGroup"
          :groups="groups"
          @select-group="setSelectedGroup"
        />

        <MenuItems
          ref="items"
          :selected-group="selectedGroup"
          :order-type="orderType"
          @select-product="setSelectedProduct"
        />
      </div>
    </div>

    <ProductModal
      v-model="modalIsOpen"
      :selected-product="selectedProduct"
      :order-type="orderType"
      :modifiers="modifiers"
      @add-to-basket="handleAddToBasket"
    />

    <BottomNav :showBasket="true" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useApplicationStore } from "@/stores/application";
import { useMenuStore } from "@/stores/menu";
import { storeToRefs } from "pinia";

import BottomNav from "../components/BottomNav.vue";
import MenuHeader from "../components/menu/MenuHeader.vue";
import MenuGroups from "../components/menu/MenuGroups.vue";
import MenuItems from "../components/menu/MenuItems.vue";
import ProductModal from "../components/menu/ProductModal.vue";

const router = useRouter();
const route = useRoute();
const applicationStore = useApplicationStore();
const menuStore = useMenuStore();

const orderType = route.query.orderType;

const { impairedActive } = storeToRefs(applicationStore);
const { addToBasket } = applicationStore;

const header = ref(null);
const items = ref(null);
const refGroups = ref(null);

const selectedGroup = ref({ MenuGroupKey: "", MenuGroupText: "", Items: [] });
const selectedProduct = ref(null);
const modalIsOpen = ref(false);

const groups = menuStore.getMenu();
const modifiers = menuStore.getModifiers();

onMounted(() => {
  const firstGroup = groups[0];
  selectedGroup.value = firstGroup;

  setTimeout(calculateHeights, 500);
});

watch(impairedActive, () => {
  setTimeout(calculateHeights, 500);
});

const setSelectedGroup = (group) => {
  selectedGroup.value = group;
};

const setSelectedProduct = (product) => {
  selectedProduct.value = { ...product, quantity: 1 };
  modalIsOpen.value = true;
};

const handleAddToBasket = ({ product, selectedItems, withPayment, totalPrice, notes }) => {
  addToBasket(selectedProduct.value, selectedItems, orderType, totalPrice, notes);

  if (withPayment) {
    router.push({ name: "payment" });
  }
};

const calculateHeights = () => {
  if (
    header.value?.logo &&
    header.value?.carousel &&
    items.value?.menuCaption
  ) {
    const app = document.getElementById("app");
    const appStyle = getComputedStyle(app);
    const appMarginTop = parseFloat(appStyle.marginTop);

    const bottomNav = document.getElementById("bottom-nav");
    const bottomNavStyle = getComputedStyle(bottomNav);
    const bottomNavHeight = parseFloat(bottomNavStyle.height);

    const logoHeight = header.value.logo.clientHeight;
    const carouselHeight = header.value.carousel.clientHeight;
    const menuCaptionHeight = items.value.menuCaption.clientHeight;

    const totalHeight =
      logoHeight +
      carouselHeight +
      menuCaptionHeight +
      bottomNavHeight +
      appMarginTop +
      20;

    if (items.value?.menuContent) {
      items.value.menuContent.style.height = `calc(100vh - ${totalHeight}px)`;
    }

    if (refGroups.value?.menuGroups) {
      refGroups.value.menuGroups.style.height = `calc(100vh - ${
        totalHeight - menuCaptionHeight
      }px)`;
    }
  }
};
</script>

<style scoped>
.menu-view {
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.menu {
  flex: 8;
  display: flex;
  flex-direction: row;
  padding-bottom: 5rem;
}
</style>
