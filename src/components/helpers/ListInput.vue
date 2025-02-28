<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  itemList: {
    type: Array,
    required: true
  },
  modelValue: {
    type: [Array, String, Number, Boolean],
    required: true
  },
  multiple: {
    type: Boolean,
    default: true
  },
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  error:{
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const nameOfInput = props.name ?? String(Math.random());

const updateValue = (event) => {
  const newValue = event.target.value;
  if (props.multiple) {
    if (event.target.checked) {
      emit('update:modelValue', [...props.modelValue, newValue]);
    } else {
      emit('update:modelValue', props.modelValue.filter(item => item !== newValue));
    }
  } else {
    emit('update:modelValue', newValue);
  }
};
</script>

<template>
  <label class="font-bold">{{ label }}</label>
  <div v-for="item in itemList" :key="item.value">
    <input :type="multiple ? 'checkbox' : 'radio'" :id="item.value" :value="item.value" class="me-2"
           :name="nameOfInput"
           :checked="multiple ? modelValue.includes(item.value) : modelValue === item.value"
           @change="updateValue">
    <label :for="item.value">{{ item.label }}</label>
  </div>
  <p v-if="error.length > 0" class="text-red-500 text-sm">{{ error }}</p>
</template>

<style scoped>

</style>