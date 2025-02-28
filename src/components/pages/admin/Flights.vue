<script setup>
import { onMounted, ref } from "vue";
import apiClient from "@/services/apiClient.js";

const flightsData = ref([]);

const cancelFlight = async (id) => {
  const confirmed = window.confirm("Are you sure you want to cancel this flight?");
  if (confirmed) {
    const response = await apiClient.delete(`/flight/${id}`);
    fetchFlights();
  }
};

const fetchFlights = async () => {
  const response = await apiClient.get('/flight');
  flightsData.value = response.data.data;
};

onMounted(async () => {
  fetchFlights();
});
</script>

<template>
  <div>
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <h2 class="text-3xl font-bold mb-4">Flights</h2>
      <table class="min-w-full ">
        <thead>
        <tr>
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">Departure</th>
          <th class="py-2 px-4 border-b">Destination</th>
          <th class="py-2 px-4 border-b">Departure Date</th>
          <th class="py-2 px-4 border-b">Layovers</th>
          <th class="py-2 px-4 border-b">Seats</th>
          <th class="py-2 px-4 border-b">Seats Left</th>
          <th class="py-2 px-4 border-b">Status</th>
          <th class="py-2 px-4 border-b">Change Status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="flight in flightsData" :key="flight.id">
          <td class="py-2 px-4 border-b">{{ flight.id }}</td>
          <td class="py-2 px-4 border-b">{{ flight.departure }}</td>
          <td class="py-2 px-4 border-b">{{ flight.destination }}</td>
          <td class="py-2 px-4 border-b">{{ new Date(flight.departureDate).toLocaleDateString() }}</td>
          <td class="py-2 px-4 border-b">{{ flight.layovers }}</td>
          <td class="py-2 px-4 border-b">{{ flight.seats }}</td>
          <td class="py-2 px-4 border-b">{{ flight.seatsLeft }}</td>
          <td class="py-2 px-4 border-b">{{ flight.status }}</td>
          <td class="py-2 px-4 border-b">
            <button @click="cancelFlight(flight.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" v-if="flight.status === 'Active'">
              Cancel flight
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 8px;
}
</style>