<template>
  <div class="virtual-keyboard" v-if="show">
    <div class="keyboard-backdrop" @click="$emit('close')"></div>
    <div class="keyboard-container animate__animated animate__fadeInUp animate__faster">
      <div class="keyboard-input">
        <div class="input-wrapper">
          <input type="text" :value="modelValue" readonly />
          <div class="input-line"></div>
        </div>
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
            :class="[
              'keyboard-key',
              { 'special-key': key.special },
              { 'ripple': true }
            ]"
          >
            <span class="key-content">{{ key.label }}</span>
            <div class="key-ripple"></div>
          </button>
        </div>
      </div>

      <div class="keyboard-actions">
        <button @click="$emit('update:modelValue', '')" class="action-btn clear-btn ripple">
          <span class="btn-content">{{ $t("virtualKeyboard.clear") }}</span>
          <div class="btn-ripple"></div>
        </button>
        <button @click="$emit('close')" class="action-btn close-btn ripple">
          <span class="btn-content">{{ $t("virtualKeyboard.close") }}</span>
          <div class="btn-ripple"></div>
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
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
}

.keyboard-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.keyboard-container {
  position: relative;
  background: linear-gradient(135deg, #2d3436 0%, #1e272e 100%);
  border-radius: 20px 20px 0 0;
  padding: 1.5rem;
  width: 85%;
  max-width: 1200px;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.keyboard-input {
  margin-bottom: 1.5rem;
}

.input-wrapper {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 0.5rem;
}

.keyboard-input input {
  width: 100%;
  padding: 1rem;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  color: white;
  outline: none;
}

.input-line {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff8500, transparent);
  transition: width 0.3s ease;
}

.input-wrapper:focus-within .input-line {
  width: 100%;
}

.keyboard-rows {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.keyboard-key {
  position: relative;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1.2rem;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  overflow: hidden;
  text-transform: uppercase;
}

.keyboard-key:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.keyboard-key:active {
  transform: translateY(0);
}

.keyboard-key.special-key {
  flex: 2;
  background: rgba(255, 133, 0, 0.2);
  font-weight: 600;
}

.keyboard-key.special-key:hover {
  background: rgba(255, 133, 0, 0.3);
}

.key-content {
  position: relative;
  z-index: 1;
}

.key-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 60%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  transition: width 0.6s ease-out, height 0.6s ease-out;
}

.keyboard-key:hover .key-ripple {
  width: 300%;
  height: 300%;
}

.keyboard-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.action-btn {
  position: relative;
  flex: 1;
  padding: 1.2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  overflow: hidden;
}

.btn-content {
  position: relative;
  z-index: 1;
}

.btn-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 60%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  transition: width 0.6s ease-out, height 0.6s ease-out;
}

.action-btn:hover .btn-ripple {
  width: 300%;
  height: 300%;
}

.clear-btn {
  background: linear-gradient(135deg, #ff4757, #ff6b81);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
}

.close-btn {
  background: linear-gradient(135deg, #ff8500, #ff6f00);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 133, 0, 0.3);
}

.action-btn:hover {
  transform: translateY(-2px);
}

.action-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .keyboard-container {
    width: 100%;
    padding: 1rem;
  }

  .keyboard-key {
    font-size: 1.2rem;
    padding: 0.8rem;
  }

  .keyboard-rows {
    gap: 0.5rem;
  }

  .keyboard-row {
    gap: 0.5rem;
  }

  .action-btn {
    font-size: 1.1rem;
    padding: 0.8rem;
  }
}
</style>
```