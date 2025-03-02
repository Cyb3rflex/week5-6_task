<template>
  <div class="min-h-screen flex flex-col">
    <!-- Dashboard Navigation Bar -->
    <header class="bg-teal-600 text-white py-4">
      <div class="container mx-auto flex justify-between items-center px-4">
        <NuxtLink to="/dashboard" class="text-xl font-bold"
          >Eventful Moments</NuxtLink
        >
        <nav>
          <NuxtLink to="/create-event" class="mx-2">Create Event</NuxtLink>
          <button @click="logout" class="mx-2 text-red-300">Logout</button>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto p-4">
      <h2 class="text-xl font-bold">Welcome, {{ userData?.name || "User" }}</h2>

      <div v-if="loading">Loading events...</div>
      <ul v-else>
        <li
          v-for="event in events"
          :key="event.id"
          class="border p-4 my-2 rounded">
          {{ event.name }} - {{ event.date }}
        </li>
      </ul>
    </main>

    <!-- Footer -->
    <footer class="bg-teal-800 text-white py-4 text-center">
      © 2025 Eventful Moments. All Rights Reserved.
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const router = useRouter();
const token = useCookie("token");
const user = useCookie("user");

const userData = ref(user.value ? JSON.parse(user.value) : null);
const events = ref([]);
const loading = ref(false);

// Redirect if not logged in
if (!token.value) {
  router.push("/auth/login");
}

// Fetch events
const fetchEvents = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      "https://eventful-moments-api.onrender.com/api/v1/moment",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`, // SEND TOKEN
        },
      }
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Failed to load events");

    console.log("Fetched events:", data);
    events.value = data.data;
  } catch (error) {
    console.error("Error loading events:", error.message);
    alert(error.message);
  } finally {
    loading.value = false;
  }
};

// Fetch events on mount
onMounted(fetchEvents);

// Logout function
const logout = () => {
  token.value = null;
  user.value = null;
  router.push("/auth/login");
};
</script>
