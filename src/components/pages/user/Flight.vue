<script setup>
import {useRoute} from 'vue-router';
import {onMounted, ref} from "vue";
import apiClient from "@/services/apiClient.js";
import router from "@/router/router.js";
import FormInput from "@/components/helpers/FormInput.vue";

const route = useRoute();
const flightId = route.params.id;

const flightsData = ref([]);
const fetchFlights = async () => {
  // Fetch the flight data using the flight ID
  var flights = await apiClient.get('/flight', {
    params: {
      flightId: flightId
    }
  });
  if (flights.data.data.length === 0) {
    router.push('/users');
  }
  flightsData.value = flights.data.data;
};

const reservationForm = ref({
  flightId: flightId,
  seatsReserved: '',
  errors: {
    seatsReserved: ''
  }
});

const reserveSeats = async (id) => {
  if (validateForm()) {
    try {
      const result = await apiClient.post('/reservation', {
        flightId: id,
        seatsReserved: parseInt(reservationForm.value.seatsReserved),
      });
      router.push('/user/reservations');
    } catch (error) {
      reservationForm.value.errors.seatsReserved = error.response?.data?.message;
    }
  }
};

const validateForm = () => {
  if (!reservationForm.value.seatsReserved) {
    reservationForm.value.errors.seatsReserved = 'Seats is required';
  } else if (reservationForm.value.seatsReserved <= 0 || reservationForm.value.seatsReserved > flightsData.value[0].seatsLeft) {
    reservationForm.value.errors.seatsReserved = 'Invalid number of seats';
  } else if (reservationForm.value.seatsReserved > 5) {
    reservationForm.value.errors.seatsReserved = 'Cannot reserve more than 5 seats';
  } else {
    reservationForm.value.errors.seatsReserved = '';
  }

  return !Object.values(reservationForm.value.errors).some(error => error);
};

onMounted(async () => {
  await fetchFlights();
});

</script>

<template>
  <div>
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <h2 class="text-3xl font-bold mb-4">Search Flights</h2>
      <div v-for="flight in flightsData" :key="flight.id" class=" shadow-md rounded-lg p-6 mb-4">
        <p class="mb-2"><strong>Departure:</strong> {{ flight.departure }}</p>
        <p class="mb-2"><strong>Destination:</strong> {{ flight.destination }}</p>
        <p class="mb-2"><strong>Departure Date:</strong> {{ new Date(flight.departureDate).toLocaleDateString() }}</p>
        <p class="mb-2"><strong>Layovers:</strong> {{ flight.layovers }}</p>
        <p class="mb-2"><strong>Seats:</strong> {{ flight.seats }}</p>
        <p class="mb-2"><strong>Seats Left:</strong> {{ flight.seatsLeft }}</p>
        <p class="mb-2"><strong>Status:</strong> {{ flight.status }}</p>
        <div v-if="flight.seatsLeft > 0 && new Date(flight.departureDate) > new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)">
          <FormInput title="Number Of seats" name="seats" type="number" v-model="reservationForm.seatsReserved" placeholder="Seats" label="Seats" :error="reservationForm.errors.seatsReserved" />
          <button @click="reserveSeats(flight.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Reserve Seats
          </button>
        </div>
        <div v-else>
          <span v-if="flight.seatsLeft === 0" class="text-red-500">No seats left</span>
          <span v-else>Cannot reserve seats for this flight</span>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
/* Add your styles here */
</style>