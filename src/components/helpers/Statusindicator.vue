<script setup>


const props = defineProps({
  status: {
    type: String,
    required: true
  }
});

const statusColor = {
  active:'bg-green-500',
  pending:'bg-yellow-500',
  approved:'bg-blue-500',
  rejected:'bg-red-500',
  canceled:'bg-gray-500',
  completed:'bg-cyan-500',
};
</script>

<template>

  <span :class="`${statusColor[status.toLowerCase()]} text-white font-bold py-1 px-2 rounded`">{{ status }}</span>
</template>

<style scoped>

</style>