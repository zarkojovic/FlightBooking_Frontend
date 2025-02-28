<script setup>
import {onMounted, ref} from 'vue';

import {useRoute} from "vue-router";
import apiClient from "@/services/apiClient.js";

const route = useRoute()
const movieId = ref(null);
const movie = ref(null);

const getMovie = async function () {
  try {
    const response = await apiClient.get('');

    movie.value = response.data.movies[route.params.id];
    console.log(movie.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {
  await getMovie();
});

</script>

<template>

  <div v-if="movie">
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        <div class="rounded overflow-hidden shadow-lg">
          <div class="relative">
            <a href="#">
              <img class="w-full min-h-64" :src="movie.posterUrl" alt="Sunset in the mountains">
              <div
                  class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            </a>
            <a href="#!">
              <div
                  class="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                {{ movie.director }}
              </div>
            </a>
            <a href="!#">
              <div
                  class="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                <small>year</small>
                <span class="font-bold">{{ movie.year }}.</span>
              </div>
            </a>
          </div>
          <div class="px-6 py-4">
            <a href="#"
               class="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{{
                movie.title
              }}</a>
            <p class="text-gray-500 text-sm">{{ movie.genres.join(', ') }}</p>
          </div>
          <div class="px-6 pb-4">
            <div class="flex-1 text-sm">
              <p class="text-gray-500 text-sm">{{ movie.plot }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>