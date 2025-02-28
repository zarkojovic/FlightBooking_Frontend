<script setup>
import ListInput from "@/components/helpers/ListInput.vue";
import FormInput from "@/components/helpers/FormInput.vue";
import {Button} from "primevue";
import {ref} from "vue";
import DropdownInput from "@/components/helpers/DropdownInput.vue";
import apiClient from "@/services/apiClient.js";
import Loader from "@/components/helpers/Loader.vue";

const form = ref({
  departure_date: '',
  seats: '',
  layovers: '',
  departure_id: '',
  destination_id: '',
  errors: {
    departure_date: '',
    seats: '',
    layovers: '',
    departure_id: '',
    destination_id: '',
  }
});

const successMessage = ref('');
const apiErrors = ref([]);

const showLoader = ref(false);

const cities = ref([
  {label: 'Beograd',value:1},
  {label:'Kraljevo',value:2},
  {label: 'Nis',value:3},
  {label:'Pristina',value:4},
]);


const submitForm = async () => {
  if (validateForm()) {
    console.log(parseInt( form.value.layovers));
    try {
      showLoader.value = true;
      const result = await apiClient.post('/flight', {
        departureDate: form.value.departure_date,
        seats: parseInt(form.value.seats),
        layovers: parseInt( form.value.layovers),
        departureId: parseInt(form.value.departure_id),
        destinationId: parseInt(form.value.destination_id),
      });
      showLoader.value = false;
      formReset();
      successMessage.value = 'Flight created successfully';
    } catch (error) {
      apiErrors.value = error.response?.data;
      showLoader.value = false;
      form.value.password = '';
    }
  }
};

const formReset = () => {
  form.value.first_name = '';
  form.value.last_name = '';
  form.value.email = '';
  form.value.password = '';
  form.value.role_id = '';
  form.value.errors.first_name = '';
  form.value.errors.last_name = '';
  form.value.errors.email = '';
  form.value.errors.password = '';
  form.value.errors.role_id = '';
}

const validateForm = () => {
  let isValid = true;
  if(form.value.seats.length === 0) {
    form.value.errors.seats = 'Seats is required';
    isValid = false;
  }else if( form.value.seats < 10 || form.value.seats > 100) {
    form.value.errors.seats = 'Seats must be greater than 10 and less than 100';
    isValid = false;

  }else {
    form.value.errors.seats = '';
  }
  if(form.value.layovers.length === 0) {
    form.value.errors.layovers = 'Layovers is required';
    isValid = false;
  }else if( form.value.layovers < 0 || form.value.layovers > 3) {
    form.value.errors.layovers = 'Layovers must be from 0 to 3';
    isValid = false;

  }else{
    form.value.errors.layovers = '';
  }
  if(form.value.departure_date.length === 0) {
    form.value.errors.departure_date = 'Departure date is required';
    isValid = false;
  }else if(new Date(form.value.departure_date) < new Date()) {
    form.value.errors.departure_date = 'Departure date must be in the future';
    isValid = false;
  }else {
    form.value.errors.departure_date = '';
  }
  if(form.value.departure_id.length === 0) {
    form.value.errors.departure_id = 'Departure is required';
    isValid = false;
  }else if(form.value.departure_id === form.value.destination_id) {
    form.value.errors.departure_id = 'Departure and destination must be different';
    isValid = false;
  }else {
    form.value.errors.departure_id = '';
  }
  if(form.value.destination_id.length === 0) {
    form.value.errors.destination_id = 'Destination is required';
    isValid = false;
  }else if(form.value.departure_id === form.value.destination_id) {
    form.value.errors.destination_id = 'Departure and destination must be different';
    isValid = false;
  }else{
    form.value.errors.destination_id = '';
  }
  return isValid;

}

</script>

<template>

  <Loader :show="showLoader"/>
  <div>
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <h2 class="text-3xl font-bold mb-4">Create User</h2>
      <form @submit.prevent="submitForm">
        <FormInput title="Seats" name="seats" v-model="form.seats" placeholder="Enter Seat Numbers"
                   label="Seats Number" :error="form.errors.seats" type="number" />
        <FormInput title="Layovers" name="layovers" v-model="form.layovers" placeholder="Enter number of layovers"
                   label="Layovers" :error="form.errors.layovers" type="number" />
        <FormInput title="Departure date" name="departure_date" v-model="form.departure_date" placeholder="Enter Departure date" label="Departure Date" :error="form.errors.departure_date" type="date"/>

        <DropdownInput name="departure" label="Departure" v-model="form.departure_id" :item-list="cities"
          :error="form.errors.departure_id"
        />
        <DropdownInput name="destination" label="Destination" v-model="form.destination_id" :item-list="cities"
          :error="form.errors.destination_id"
        />
        <p class="text-green-500" v-if="successMessage">{{successMessage}}</p>
        <Button label="Add Flight" class="mt-4"
                @click="submitForm"
        />
        <ul v-if="apiErrors.length > 0" class="mt-4">
          <li v-for="error in apiErrors" :key="error" class="text-red-500">{{error.error}}</li>
        </ul>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>