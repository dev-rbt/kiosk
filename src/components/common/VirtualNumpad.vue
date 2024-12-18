<template>
  <div class="virtual-numpad" v-if="show">
    <div class="numpad-backdrop" @click="$emit('close')"></div>
    <div class="numpad-container animate__animated animate__fadeInUp animate__faster">
      <div class="numpad-input">
        <div class="input-wrapper">
          <input type="text" :value="modelValue" readonly />
          <div class="input-line"></div>
        </div>
      </div>

      <div class="numpad-rows">
        <div class="numpad-row" v-for="(row, index) in numpadLayout" :key="index">
          <button
            v-for="key in row"
            :key="key.value"
            @click="handleKeyPress(key)"
            :class="[
              'numpad-key',
              { 'special-key': key.special },
              { 'ripple': true }
            ]"
          >
            <span class="key-content">{{ key.label }}</span>
            <div class="key-ripple"></div>
          </button>
        </div>
      </div>

      <div class="numpad-actions">
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
import { useI18n } from "vue-i18n";
const { t } = useI18n();

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

const numpadLayout = [
  ["7", "8", "9"].map((v) => ({ value: v, label: v })),
  ["4", "5", "6"].map((v) => ({ value: v, label: v })),
  ["1", "2", "3"].map((v) => ({ value: v, label: v })),
  [
    "0",
    { value: ".", label: "." },
    { value: "backspace", label: "⌫", special: true }
  ].map((v) => (typeof v === "string" ? { value: v, label: v } : v)),
];

const handleKeyPress = (key) => {
  if (key.value === "backspace") {
    emit("update:modelValue", props.modelValue.slice(0, -1));
  } else {
    emit("update:modelValue", props.modelValue + key.value);
  }
};
</script>

<style scoped>
.virtual-numpad {
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

.numpad-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.numpad-container {
  position: relative;
  background: linear-gradient(135deg, #2d3436 0%, #1e272e 100%);
  border-radius: 20px 20px 0 0;
  padding: 1.5rem;
  width: 85%;
  max-width: 400px;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.numpad-input {
  margin-bottom: 1.5rem;
}

.input-wrapper {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 0.5rem;
}

.numpad-input input {
  width: 100%;
  padding: 1rem;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  color: white;
  outline: none;
  text-align: right;
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

.numpad-rows {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.numpad-row {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.numpad-key {
  position: relative;
  flex: 1;
  aspect-ratio: 1;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.numpad-key:hover {
  background: rgba(255, 255, 255, 0.1);
}

.numpad-key:active {
  transform: scale(0.95);
}

.special-key {
  background: rgba(255, 136, 0, 0.1);
  color: #ff8800;
}

.special-key:hover {
  background: rgba(255, 136, 0, 0.2);
}

.numpad-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.action-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.clear-btn {
  background: rgba(255, 59, 48, 0.1);
  color: #ff3b30;
  border: 1px solid rgba(255, 59, 48, 0.2);
}

.clear-btn:hover {
  background: rgba(255, 59, 48, 0.2);
}

.close-btn {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.ripple {
  position: relative;
  overflow: hidden;
}

.key-content,
.btn-content {
  position: relative;
  z-index: 1;
}

.key-ripple,
.btn-ripple {
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 50%;
  animation: ripple 0.6s linear;
  width: 0;
  height: 0;
}

@keyframes ripple {
  to {
    width: 200px;
    height: 200px;
    opacity: 0;
  }
}
</style>
