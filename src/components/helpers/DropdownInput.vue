<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  itemList: {
    type: Array,
    required: true
  },
  modelValue: {
    type: [Array, String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  error: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  const selectedOptions = Array.from(event.target.selectedOptions).map(opt => opt.value);
  emit('update:modelValue', selectedOptions[0]);
};
</script>

<template>
  <label class="font-bold mb-1 block">{{ label }}</label>
  <select
      :name="name"
      class="border rounded px-3 py-2 w-full"
      :class="error.length > 0 ? 'border-red-500' : ''"
      @change="updateValue"
  >
    <option value="">Select</option>
    <option v-for="item in itemList" :key="item.value" :value="item.value">
      {{ item.label }}
    </option>
  </select>
  <p v-if="error.length > 0" class="text-red-500 text-sm mt-1">{{ error }}</p>
</template>

<style scoped>
select {
  min-height: 36px;
}
</style>