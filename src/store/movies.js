// stores/counter.js
import {defineStore} from 'pinia'
import apiClient from "@/services/apiClient.js";

export const useMoviesStore = defineStore('movies', {

    // could also be defined as
    state: () => ({movies: []}),
    getters: {
        getMovies() {
            return this.movies
        },
    },

    actions: {
        async fetchMovies() {
            try {
                const response = await apiClient.get('');
                this.movies = response.data.movies;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        addMovie(movie) {
            this.movies.unshift(movie);
        }

    },
})