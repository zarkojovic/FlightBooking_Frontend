<script setup>
import Menubar from 'primevue/menubar';
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import { useAuthStore } from "@/store/store.js";
import { eventBus } from "@/services/eventBus.js";
import router from "@/router/router.js";

const store = useAuthStore();
const items = ref([]);

const updateMenuItems = () => {
  items.value = []; // Reset menu items
  if (!store.isAuthenticated) {
    items.value.push({
      label: 'Login',
      route: '/login',
    });
  } else {
    // Add role-based links
    const userRole = store.getUserRole;

    if(userRole === 'Agent') {
      items.value.push({
        label: 'Flight List',
        route: '/agent',
      });
      items.value.push({
        label: 'Reservations',
        route: '/agent/reservations',
      });
      items.value.push({
        label: 'New Flight',
        route: '/agent/flight/create',
      });
    } else if(userRole === 'Visitor') {
      items.value.push({
        label: 'Home',
        route: '/user',
      });
      items.value.push({
        label: 'Reservations',
        route: '/user/reservations',
      });
    }else if(userRole === 'Admin') {
      items.value.push({
        label: 'Admin',
        route: '/admin',
      });
      items.value.push({
        label: 'Add User',
        route: '/admin/create-user',
      });
      items.value.push({
        label: 'Flights',
        route: '/admin/flights',
      });
    }

    items.value.push({
      label: 'Logout',
      command: () => store.logout(), // Properly trigger logout
    });
  }
};

const reloadNavbar = () => {
  updateMenuItems();
};

onMounted(() => {
  eventBus.on('auth-change', reloadNavbar);
  updateMenuItems();
});

onUnmounted(() => {
  eventBus.off('auth-change', reloadNavbar);
});

// Watch for authentication changes and update the menu
watchEffect(() => {
  updateMenuItems();
});
</script>

<template>
  <Menubar :model="items">
    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon"/>
          <span>{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else-if="item.command" href="#" v-bind="props.action" @click="item.command">
        <span :class="item.icon"/>
        <span>{{ item.label }}</span>
      </a>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon"/>
        <span>{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down"/>
      </a>
    </template>
  </Menubar>
</template>
