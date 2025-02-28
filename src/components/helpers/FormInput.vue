<script setup>
import {defineProps, defineEmits} from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <div class="block">
    <label :for="name" class="font-bold">{{ title }}</label>
    <input :type="type" :name="name" :placeholder="label" class="w-full p-2 my-2 border border-gray-50 rounded-md" :class="error.length > 0 ? 'border-red-500' : ''"
           :value="modelValue" @input="updateValue">
    <p v-if="error.length > 0" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>

<style scoped>
</style>