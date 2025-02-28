import { defineStore } from 'pinia';
import apiClient from "@/services/apiClient.js";
import {jwtDecode} from "jwt-decode";
import router from "@/router/router.js";
import { eventBus } from "@/services/eventBus.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        getUserRole: (state) => state.user?.role || null
    },

    actions: {
        async login(credentials) {
            try {
                const response = await apiClient.post('/user/login', credentials);
                this.token = response.data.token;
                // Decode and set user
                this.setUserFromToken(this.token);

                // Store token and user in localStorage
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));

                if (this.user.role === 'Admin') {
                    router.push('/admin');
                } else if (this.user.role === 'Agent') {
                    router.push('/agent');
                } else {
                    router.push('/user');
                }

                eventBus.emit('auth-change'); // 🔹 Notify navbar
            } catch (error) {
                console.error('Login failed', error);
                throw error;
            }
        },

        async register(newUser) {
            try {
                const response = await apiClient.post('/user', {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    password: newUser.password,
                    roleId: newUser.roleId
                });
                return response.data;
            } catch (error) {
                console.error('Registration failed', error);
                throw error;
            }
        },

        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            router.push('/login');

            eventBus.emit('auth-change'); // 🔹 Notify navbar
        },

        fetchUserProfile() {
            if (!this.token) {
                this.user = null;
                return;
            }

            try {
                this.setUserFromToken(this.token);
            } catch (error) {
                console.error('Invalid token', error);
                this.logout();
            }
        },

        setUserFromToken(token) {
            const decoded = jwtDecode(token);
            this.user = {
                id: decoded.Id, // Standard for user ID in JWT
                email: decoded.Email,
                role: decoded.Role, // Assuming your token has this field
                name: decoded.FirstName + ' ' + decoded.LastName,
                useCaseIds: decoded.UceCaseIds
            };
            localStorage.setItem('user', JSON.stringify(this.user));
        }
    }
});