<template>
  <div ref="menuGroups" class="menu-groups">
    <a v-for="group in groups" 
       :key="group.id" 
       :class="{ active: (group.MenuGroupKey == modelValue?.MenuGroupKey) }"
       @click="$emit('select-group', group)">
      <img :src="`assets/groups/${group.MenuGroupKey}.jpg`" @error="$event.target.src = 'assets/products/default.png'" />
    </a>
  </div>
</template>

<script setup>

import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  groups: {
    type: Array,
    required: true
  }
})

const menuGroups = ref(null)

defineEmits(['select-group'])
defineExpose({ menuGroups })

</script>

<style scoped>
.menu-groups {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem;
  justify-content: flex-start;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  height: 100vh;
}

.menu-groups::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.menu-groups img {
  width: 100%;
  border-radius: 1.3rem;
  transition: all 0.3s ease;
}

.menu-groups a.active img,
.menu-groups a:active img {
  box-shadow: 0px 0px 9px 3px #d96000;
  transform: scale(1.02);
}
</style>