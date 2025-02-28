<script setup>
import {onMounted, ref} from "vue";
import * as signalR from "@microsoft/signalr";
import apiClient from "@/services/apiClient.js";
import Statusindicator from "@/components/helpers/Statusindicator.vue";

const reservationData = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const fetchUserReservations = async (page = 1) => {
  const response = await apiClient.get(`/reservation?page=${page}`);
  reservationData.value = response.data.data;
  currentPage.value = response.data.currentPage;
  totalPages.value = response.data.pages;
};

const approveReservation = async (id) => {
  if (!id) {
    console.error("Reservation ID is required");
    return;
  }

  try {
    const response = await apiClient.patch(`/reservation/${id}/approve`);
    fetchUserReservations(currentPage.value);
  } catch (error) {
    console.error("Failed to approve reservation:", error);
  }
};

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    fetchUserReservations(page);
  }
};

onMounted(async () => {
  await fetchUserReservations();

  const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7275/reservation-hub")
      .build();

  connection.on("NewReservationCreated", async () => {
    await fetchUserReservations(currentPage.value);
  });

  try {
    await connection.start();
    console.log("SignalR connected.");
  } catch (err) {
    console.error("Error while starting SignalR connection: ", err);
  }
});
</script>

<template>
  <div>
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <h2 class="text-3xl font-bold mb-4">Reservations</h2>
      <table class="min-w-full ">
        <thead>
        <tr>
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">Flight Departure</th>
          <th class="py-2 px-4 border-b">Flight Destination</th>
          <th class="py-2 px-4 border-b">Departure Date</th>
          <th class="py-2 px-4 border-b">Reservation Date</th>
          <th class="py-2 px-4 border-b">Seats Reserved</th>
          <th class="py-2 px-4 border-b">Status</th>
          <th class="py-2 px-4 border-b">Change status of reservation</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="reservation in reservationData" :key="reservation.id">
          <td class="py-2 px-4 border-b">{{ reservation.id }}</td>
          <td class="py-2 px-4 border-b">{{ reservation.flightDeparture }}</td>
          <td class="py-2 px-4 border-b">{{ reservation.flightDestination }}</td>
          <td class="py-2 px-4 border-b">{{ new Date(reservation.departureDate).toLocaleDateString() }}</td>
          <td class="py-2 px-4 border-b">{{ new Date(reservation.reservationDate).toLocaleDateString() }}</td>
          <td class="py-2 px-4 border-b">{{ reservation.seatsReserved }}</td>
          <td class="py-2 px-4 border-b">
           <Statusindicator :status="reservation.status"/>
          </td>
          <td class="py-2 px-4 border-b">
            <button @click="approveReservation(reservation.id)"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    v-if="reservation.status === 'Pending'">
              Approve Status
            </button>
            <span v-else>
              You can't change this reservation
            </span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="flex justify-between mt-4">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class=" px-4 py-2 rounded">Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class=" px-4 py-2 rounded">
          Next
        </button>
      </div>
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