import Home from "@/components/pages/user/Home.vue";
import Login from "@/components/pages/auth/Login.vue";
import Admin from "@/components/pages/admin/Admin.vue";
import CreateUser from "@/components/pages/admin/CreateUser.vue";
import Flights from "@/components/pages/admin/Flights.vue";
import Flight from "@/components/pages/user/Flight.vue";
import FlightList from "@/components/pages/agent/FlightList.vue";
import Reservations from "@/components/pages/user/Reservations.vue";
import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/store/store.js";
import CreateFlight from "@/components/pages/agent/CreateFlight.vue";
import ReservationList from "@/components/pages/agent/ReservationList.vue";

// spisak ruta
// admin: kreiranje usera, pregled letova i otkazivanje leta
// user pregled i pretraga letova, rezervacija letova, pregled rezervacija
// agent: unos novih letova, pregled letova, pregled rezervacija, otkazivanje rezervacija

const routes = [

    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
        meta: {
            requiresGuest: true,
            title: 'Login User'
        }
    },
    {
        path: '/user',
        component: Home,
        meta: {
            requiresAuth: true,
            role: 'Visitor',
            title: 'Search Flights'
        }
    },
    {
        path: '/flight/:id', // Changed to relative path
        component: Flight,
        meta: {
            requiresAuth: true,
            role: 'Visitor',
            title: 'Flight Details'
        }
    },
    {
        path: '/user/reservations', // Changed to relative path
        component: Reservations,
        meta: {
            requiresAuth: true,
            role: 'Visitor',
            title: 'My Reservations'
        }
    },
    {
        path: '/admin',
        component: Admin,
        meta: {
            requiresAuth: true,
            role: 'Admin',
            title: 'Admin Dashboard'
        }
    },
    {
        path: '/admin/create-user', // Changed to relative path
        component: CreateUser,
        meta: {
            requiresAuth: true,
            role: 'Admin',
            title: 'Create User'
        }
    },
    {
        path: '/admin/flights', // Changed to relative path
        component: Flights,
        meta: {
            requiresAuth: true,
            role: 'Admin',
            title: 'Flight Management'
        }
    },
    {
        path: '/agent',
        component: FlightList,
        meta: {
            requiresAuth: true,
            role: 'Agent',
            title: 'Agent Dashboard'
        }
    },
    {
        path: '/agent/flight/create', // Changed to relative path
        component: CreateFlight,
        meta: {
            requiresAuth: true,
            role: 'Agent',
            title: 'Create Flight'
        }
    },
    {
        path: '/agent/reservations', // Changed to relative path
        component: ReservationList,
        meta: {
            requiresAuth: true,
            role: 'Agent',
            title: 'Reservation Management'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Global navigation guard
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;
    const userRole = authStore.getUserRole;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('login'); // Redirect to login if not authenticated
    } else if (to.meta.requiresGuest && isAuthenticated) {
        next('/'); // Redirect to dashboard if already logged in
    } else if (to.meta.role && to.meta.role !== userRole) {
        next('/'); // Redirect unauthorized users
    } else {
        next(); // Allow access
    }

    if (to.meta.title) {
        document.title = to.meta.title;
    }
});

export default router