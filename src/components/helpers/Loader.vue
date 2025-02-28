<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-80 z-50" v-if="show">
    <ProgressSpinner class="w-6 h-6" strokeWidth="4" fill="transparent" animationDuration="1s" aria-label="Custom ProgressSpinner"/>
  </div>
</template>

<script setup>
import ProgressSpinner from 'primevue/progressspinner';

defineProps({
  show:{
    type: Boolean,
    required: true,
    default: true
  }
});

</script>