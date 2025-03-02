<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation Bar -->
    <header class="bg-teal-600 text-white py-4">
      <div class="container mx-auto flex justify-between items-center px-4">
        <NuxtLink to="/" class="text-xl font-bold">Eventful Moments</NuxtLink>
        <nav>
          <NuxtLink v-if="!user" to="/register" class="mx-2">Register</NuxtLink>
          <NuxtLink v-if="!user" to="/auth/login" class="mx-2">Login</NuxtLink>

          <NuxtLink v-if="user" to="/dashboard" class="mx-2"
            >Dashboard</NuxtLink
          >
          <button v-if="user" @click="logout" class="mx-2 text-red-300">
            Logout
          </button>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto p-4">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-teal-800 text-white py-4 text-center">
      © 2025 Eventful Moments. All Rights Reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useCookie } from "#app";
import { useRouter } from "vue-router";

const router = useRouter();
const token = useCookie("token");
const user = useCookie("user");

const userData = ref(null);
watchEffect(() => {
  userData.value = token.value && user.value ? JSON.parse(user.value) : null;
});

const logout = () => {
  token.value = null;
  user.value = null;
  router.push("/auth/login");
};
</script>
