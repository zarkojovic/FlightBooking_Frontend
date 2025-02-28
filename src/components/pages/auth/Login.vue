<script setup>
import {Button} from "primevue";
import FormInput from "@/components/helpers/FormInput.vue";
import {ref} from "vue";
import {useAuthStore} from "@/store/store.js";
import router from "@/router/router.js";
import Loader from "@/components/helpers/Loader.vue";

const store = useAuthStore();

const form = ref({
  email: '',
  password: '',
  error: {
    email: '',
    password: ''
  }
});

const showLoader = ref(false);


const submitForm = async () => {
  try {
    if (validateForm()){
      showLoader.value = true;
      await store.login({
        email: form.value.email,
        password: form.value.password
      });
    }
  } catch (error) {
    showLoader.value = false;
    form.value.error.password = error.response?.data || 'Invalid credentials'; // Handle error
    form.value.password = '';
  }
};

const validateForm = () => {
  var valid = true;

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
  return valid;
};

</script>

<template>
  <Loader :show="showLoader"/>
  <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
    <h1 class="text-3xl font-bold">
      Login
    </h1>

    <form action="" class="mt-4">
      <FormInput title="Email" name="email" v-model="form.email" placeholder="Enter Email" label="Email"
                 :error="form.error.email"/>
      <FormInput title="Password" name="password" v-model="form.password" placeholder="Password"
                 :error="form.error.password" type="password"
                 label="Enter Password"/>
      <Button label="Login" class="mt-4"
              @click="submitForm"
      />
    </form>

  </div>
</template>

<style scoped>

</style>