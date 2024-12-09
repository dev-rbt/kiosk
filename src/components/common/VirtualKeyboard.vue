<template>
  <div class="virtual-keyboard" v-if="show">
    <div class="keyboard-container">
      <div class="keyboard-input">
        <input type="text" :value="modelValue" readonly />
      </div>

      <div class="keyboard-rows">
        <div
          class="keyboard-row"
          v-for="(row, index) in currentLayout"
          :key="index"
        >
          <button
            v-for="key in row"
            :key="key.value"
            @click="handleKeyPress(key)"
            :class="{ 'special-key': key.special }"
          >
            {{ key.label }}
          </button>
        </div>
      </div>

      <div class="keyboard-actions">
        <button @click="$emit('update:modelValue', '')" class="clear-btn">
          {{ $t("virtualKeyboard.clear") }}
        </button>
        <button @click="$emit('close')" class="close-btn">
          {{ $t("virtualKeyboard.close") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLanguageStore } from "@/stores/language";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const languageStore = useLanguageStore();

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const turkishLayout = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((v) => ({
    value: v,
    label: v,
  })),
  ["q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "ü"].map((v) => ({
    value: v,
    label: v,
  })),
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "i"].map((v) => ({
    value: v,
    label: v,
  })),
  ["z", "x", "c", "v", "b", "n", "m", "ö", "ç"].map((v) => ({
    value: v,
    label: v,
  })),
  [
    { value: " ", label: t("virtualKeyboard.space"), special: true },
    { value: "backspace", label: "⌫", special: true },
  ],
];

const englishLayout = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((v) => ({
    value: v,
    label: v,
  })),
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((v) => ({
    value: v,
    label: v,
  })),
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((v) => ({
    value: v,
    label: v,
  })),
  ["z", "x", "c", "v", "b", "n", "m"].map((v) => ({ value: v, label: v })),
  [
    { value: " ", label: t("virtualKeyboard.space"), special: true },
    { value: "backspace", label: "⌫", special: true },
  ],
];

const currentLayout =
  languageStore.currentLanguage == "tr" ? turkishLayout : englishLayout;

const handleKeyPress = (key) => {
  if (key.value === "backspace") {
    emit("update:modelValue", props.modelValue.slice(0, -1));
  } else {
    emit("update:modelValue", props.modelValue + key.value);
  }
};
</script>

<style scoped>
.virtual-keyboard {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  padding: 20px;
}

.keyboard-container {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
  width: 100%;
}

.keyboard-input {
  margin-bottom: 15px;
}

.keyboard-input input {
  width: 100%;
  padding: 10px;
  font-size: 180%;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.keyboard-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.keyboard-row button {
  border: none;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 180%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0.6rem 1.3rem;
}

.keyboard-row button.special-key {
  flex: 2;
}

.keyboard-row button:hover {
  background-color: #f0f0f0;
}

.keyboard-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.keyboard-actions button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 180%;
}

.clear-btn {
  background-color: #ff6b6b;
  color: white;
}

.layout-btn {
  background-color: #4dabf7;
  color: white;
}

.close-btn {
  background-color: #868e96;
  color: white;
}
</style>
