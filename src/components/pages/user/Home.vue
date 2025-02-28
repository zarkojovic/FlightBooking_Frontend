<script setup>
import {onMounted, ref} from "vue";
import apiClient from "@/services/apiClient.js";
import {useRouter} from "vue-router";
import DropdownInput from "@/components/helpers/DropdownInput.vue";
import {Button} from "primevue";
import ListInput from "@/components/helpers/ListInput.vue";

const flightsData = ref([]);
const router = useRouter();

const fetchFlights = async () => {
  const response = await apiClient.get('/flight');
  flightsData.value = response.data.data;
};

const searchFlights = async () => {
  if (validateSearchForm()) {
    const response = await apiClient.get('/flight', {
      params: {
        departureId: parseInt(searchForm.value.departureId),
        destinationId: parseInt(searchForm.value.destinationId),
        layovers: typeof searchForm.value.layovers === 'boolean' ?
            searchForm.value.layovers :
            !!parseInt(searchForm.value.layovers),
      }
    });
    flightsData.value = response.data.data;
  }
};

const validateSearchForm = () => {
  if (searchForm.value.departureId.length === 0) {
    searchForm.value.errors.departureId = 'Departure is required';
  } else {
    searchForm.value.errors.departureId = '';
  }

  if (searchForm.value.destinationId.length === 0) {
    searchForm.value.errors.destinationId = 'Destination is required';
  } else if (searchForm.value.destinationId === searchForm.value.departureId) {
    searchForm.value.errors.destinationId = 'Destination cannot be the same as departure';
  } else {
    searchForm.value.errors.destinationId = '';
  }

  return !Object.values(searchForm.value.errors).some(error => error);
};

const cities = ref([
  {label: 'Beograd', value: 1},
  {label: 'Kraljevo', value: 2},
  {label: 'Nis', value: 3},
  {label: 'Pristina', value: 4},
]);

const layovers = ref([
  {label: 'Yes', value: 1},
  {label: 'No', value: 0},
]);

const searchForm = ref({
  departureId: '',
  destinationId: '',
  layovers: true,
  errors: {
    departureId: '',
    destinationId: '',
  }
});

const reserveSeats = (id) => {
  console.log(id);
  router.push(`flight/${id}`);
};

onMounted(async () => {
  fetchFlights();
});

</script>

<template>
  <div>
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <h2 class="text-3xl font-bold mb-4">Search Flights</h2>

      <DropdownInput name="departure" label="Departure" v-model="searchForm.departureId" :item-list="cities"
                     :error="searchForm.errors.departureId"
      />
      <DropdownInput name="destination" label="Destination" v-model="searchForm.destinationId" :item-list="cities"
                     :error="searchForm.errors.destinationId"
      />
      <ListInput v-model="searchForm.layovers" :item-list="layovers" :multiple="false" name="layovers"
                 label="You want layovers?"
                 :error="searchForm.errors.layovers"/>
      <Button label="Search Flights" class="mt-4"
              @click="searchFlights"
      />
      <div v-for="flight in flightsData" :key="flight.id" class="border shadow-md rounded-lg p-6 my-4"
           v-if="flightsData.length">
        <p class="mb-2"><strong>Departure:</strong> {{ flight.departure }}</p>
        <p class="mb-2"><strong>Destination:</strong> {{ flight.destination }}</p>
        <p class="mb-2"><strong>Departure Date:</strong> {{ new Date(flight.departureDate).toLocaleDateString() }}</p>
        <p class="mb-2"><strong>Layovers:</strong> {{ flight.layovers }}</p>
        <p class="mb-2"><strong>Seats:</strong> {{ flight.seats }}</p>
        <p class="mb-2"><strong>Seats Left:</strong> {{ flight.seatsLeft }}</p>
        <p class="mb-2"><strong>Status:</strong> {{ flight.status }}</p>
        <div v-if="new Date(flight.departureDate) > new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) && !!parseInt(flight.seatsLeft)">
          <button @click="reserveSeats(flight.id)" class="bg-blue-500 text-white px-4 py-2 rounded">Reserve Seats
          </button>
        </div>
        <div v-else>
          <p class="text-red-500">You are unable to reserve this flight</p>
        </div>
      </div>
      <div v-else>
        <p class="h-2 text-center">No flights found...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.p-6 {
  padding: 1.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-xl {
  font-size: 1.25rem;
}

.font-semibold {
  font-weight: 600;
}

.mb-2 {
  margin-bottom: 0.5rem;
}
</style>