<script setup>

import FormInput from "@/components/helpers/FormInput.vue";
import {ref} from "vue";
import ListInput from "@/components/helpers/ListInput.vue";
import {Button} from "primevue";
import {useAuthStore} from "@/store/store.js";
import Loader from "@/components/helpers/Loader.vue";

const successMessage = ref('');

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role_id: '',
  error: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role_id: '',
  }
});

const store = useAuthStore();

const apiErrors = ref([]);

const roles = ref([
  {label: 'Admin', value: 1},
  {label: 'Visitor', value: 2},
  {label: 'Agent', value: 3},
]);

const submitForm = async () => {
  if (validateForm()) {
    try {
      apiErrors.value = [];
      showLoader.value = true;
      const result = await store.register({
        firstName: form.value.first_name,
        lastName: form.value.last_name,
        email: form.value.email,
        password: form.value.password,
        roleId: parseInt(form.value.role_id)
      });
      showLoader.value = false;
      formReset();
      successMessage.value = 'User created successfully';
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
};

const validateForm = () => {
  var valid = true;

  if (form.value.first_name.length === 0) {
    form.value.error.first_name = 'First name is required';
    valid = false;
  } else {
    form.value.error.first_name = '';
  }

  if (form.value.last_name.length === 0) {
    form.value.error.last_name = 'Last name is required';
    valid = false;
  } else {
    form.value.error.last_name = '';
  }

  if (form.value.email.length === 0) {
    form.value.error.email = 'Email is required';
    valid = false;
  } else {
    form.value.error.email = '';
  }

  if (form.value.password.length === 0) {
    form.value.error.password = 'Password is required';
    valid = false;
  } else {
    form.value.error.password = '';
  }

  if (form.value.role_id.length === 0) {
    form.value.error.role_id = 'Role is required';
    valid = false;
  } else {
    form.value.error.role_id = '';
  }
  return valid;
};


const showLoader = ref(false);
</script>

<template>
  <Loader :show="showLoader"/>
  <div>
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <h2 class="text-3xl font-bold mb-4">Add New User</h2>
      <form @submit.prevent="submitForm">
        <FormInput title="First Name" name="first_name" v-model="form.first_name" placeholder="Enter First name"
                   label="First Name" :error="form.error.first_name"/>
        <FormInput title="Last Name" name="last_name" v-model="form.last_name" placeholder="Enter Last name"
                   label="Last Name" :error="form.error.last_name"/>
        <FormInput title="Email" name="email" v-model="form.email" placeholder="Enter Email" label="Email"
                   :error="form.error.email"/>
        <FormInput title="Password" name="password" v-model="form.password" placeholder="Enter Password"
                   label="Password" type="password" :error="form.error.password"/>
        <ListInput v-model="form.role_id" :item-list="roles" :multiple="false" name="roles_list" label="Select a role"
                   :error="form.error.role_id"/>
        <p class="text-green-500" v-if="successMessage">{{successMessage}}</p>
        <Button label="Add User" class="mt-4"
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