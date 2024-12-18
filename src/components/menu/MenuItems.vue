<template>
  <div class="menu-details">
    <MenuHeader 
      ref="menuCaption"
      :title="selectedGroup?.MenuGroupText"
    />

    <div ref="menuContent" class="menu-content custom-scrollbar">
      <div class="menu-grid">
        <MenuItem 
          v-for="menuItem in selectedGroup.Items" 
          :key="menuItem.MenuItemKey"
          :item="menuItem"
          :order-type="orderType"
          @select="$emit('select-product', menuItem)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import MenuItem from './items/MenuItem.vue'
import MenuHeader from './items/MenuHeader.vue'
import 'animate.css'

const props = defineProps({
  selectedGroup: {
    type: Object,
    required: true
  },
  orderType: {
    type: String,
    required: true
  }
})

const menuCaption = ref(null)
const menuContent = ref(null)

watch(() => props.selectedGroup, () => {
  if (menuContent.value) {
    const menuContentParent = menuContent.value.closest('.menu-content')
    if (menuContentParent) {
      menuContentParent.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
})

defineEmits(['select-product'])
defineExpose({ menuCaption, menuContent })
</script>

<style scoped>
.menu-details {
  flex: 10;
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.menu-content {
  overflow-y: auto;
  padding: 1rem;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 0.5rem;
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
  .menu-details {
    padding-right: 0;
  }

  .menu-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
}

/* Impaired Mode */
body.impaired .menu-grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
</style>