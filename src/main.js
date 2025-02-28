import './assets/main.css'
import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import './index.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import router from "@/router/router.js";

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(createPinia())
app.use(router)
app.mount('#app')