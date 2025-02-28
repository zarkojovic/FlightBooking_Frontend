<script setup>

import {ref} from "vue";
import FormInput from "@/components/helpers/FormInput.vue";
import ListInput from "@/components/helpers/ListInput.vue";
import {Button, Chip} from "primevue";
import MultipleOptionInput from "@/components/helpers/MultipleOptionInput.vue";
import {useMoviesStore} from "@/store/movies.js";

const form = ref({
  title: '',
  director: '',
  year: '',
  genres: [],
  posterUrl: '',
  plot: '',
  actors: [],
  runtime: '',
  error: []
});

const movieStore = useMoviesStore();

const genres = ref([
  'Action',
  'Adventure',
  'Comedy',
  'Crime',
  'Drama',
  'Fantasy',
  'Historical',
  'Horror',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Thriller',
  'Western',
]);

const submitForm = () => {
  if (form.value.title.length === 0) {
    form.value.error.title = 'Title is required';
  } else {
    form.value.error.title = '';
  }

  if (form.value.director.length === 0) {
    form.value.error.director = 'Director is required';
  } else {
    form.value.error.director = '';
  }

  if (form.value.year.length === 0) {
    form.value.error.year = 'Year is required';
  } else {
    form.value.error.year = '';
  }

  if (form.value.plot.length === 0) {
    form.value.error.plot = 'Plot is required';
  } else {
    form.value.error.plot = '';
  }

  if (form.value.runtime.length === 0) {
    form.value.error.runtime = 'Runtime is required';
  } else {
    form.value.error.runtime = '';
  }

  if (form.value.title.length === 0 || form.value.director.length === 0 || form.value.year.length === 0 || form.value.plot.length === 0 || form.value.runtime.length === 0) {
    return;
  }

  movieStore.addMovie(form.value);
  form.value = {
    title: '',
    director: '',
    year: '',
    genres: [],
    posterUrl: '',
    plot: '',
    actors: [],
    runtime: '',
    error: []
  };
}


</script>

<template>
  <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
    <h1 class="text-3xl font-bold">
      Add Movie
    </h1>

    <form action="" class="mt-4">
      <FormInput title="Title" name="title" v-model="form.title" placeholder="Enter Title" label="Title"
                 :error="form.error.title"/>
      <FormInput title="Director" name="director" v-model="form.director" placeholder="Enter Director"
                 :error="form.error.director"
                 label="Director"/>
      <FormInput title="Year" name="year" v-model="form.year" placeholder="Enter Year" label="Year" type="number"
                 :error="form.error.year"/>

      <MultipleOptionInput title="Actors" name="actor" label="Actor list" placeholder="Write to add to actor list"
                           v-model="form.actors"/>

      <FormInput title="Poster" name="poster" v-model="form.posterUrl" placeholder="Enter poster" label="Poster"
                 type="text"
                 :error="form.error.posterUrl"/>
      <img :src="form.posterUrl" alt="Poster" class="w-32" v-if="form.posterUrl"/>
      <p>Genres</p>
      <ListInput :item-list="genres" v-model="form.genres"/>

      <FormInput title="Plot" name="plot" v-model="form.plot" placeholder="Enter Plot" label="Plot"
                 type="textarea" :error="form.error.plot"
      />
      <FormInput title="Runtime" name="runtime" v-model="form.runtime" placeholder="Enter Runtime" label="Runtime"
                 :error="form.error.runtime"
                 type="number"/>
      <Button label="Add Movie" class="mt-4"
              @click="submitForm"
      />
    </form>

  </div>
</template>

<style scoped>

</style>