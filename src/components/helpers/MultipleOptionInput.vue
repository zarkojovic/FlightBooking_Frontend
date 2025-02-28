<script setup>
import FormInput from "@/components/helpers/FormInput.vue";
import {Button, Chip} from "primevue";
import {defineEmits, ref} from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
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
});

const inputText = ref('');

const addToList = () => {
  if (inputText.value.length === 0) {
    return;
  }
  if (props.modelValue.includes(inputText.value)) {
    return;
  }
  props.modelValue.push(inputText.value);
  inputText.value = '';
}

const emit = defineEmits(['update:modelValue']);

const removeItem = (item) => {
  emit('update:modelValue', props.modelValue.filter(actor => actor !== item));
}

</script>

<template>
  <Chip v-for="item in props.modelValue" :key="item" :label="item" removable
        @remove="removeItem(item)"/>
  <FormInput :title="title" :name="name" v-model="inputText" :placeholder="placeholder" :label="label"/>
  <Button label="Add Actor" @click="addToList" class="mb-4"/>
</template>

<style scoped>

</style>