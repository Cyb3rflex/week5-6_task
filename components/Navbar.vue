<template>
  <nav class="flex justify-between items-center p-4 bg-gray-800 text-white">
    <h1 class="text-xl font-bold">EventfulMoments</h1>

    <ul class="flex space-x-4">
      <li>
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
      </li>

      <li v-if="!isAuthenticated">
        <NuxtLink to="/register" class="hover:underline">Register</NuxtLink>
      </li>
      <li v-if="!isAuthenticated">
        <NuxtLink to="/auth/login" class="hover:underline">Login</NuxtLink>
      </li>

      <li v-if="isAuthenticated">
        <NuxtLink to="/create-event" class="hover:underline"
          >Create Event</NuxtLink
        >
      </li>
      <li v-if="isAuthenticated">
        <button @click="logout" class="hover:underline">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useCookie } from "#app";
import { useRouter } from "vue-router";

const router = useRouter();
const token = useCookie("token");

// Check if the user is authenticated
const isAuthenticated = !!token.value;

// Logout function
const logout = () => {
  token.value = null; // Clear the token
  router.push("/auth/login"); // Redirect to login page
};
</script>

<style scoped>
/* Add styling if needed */
</style>
