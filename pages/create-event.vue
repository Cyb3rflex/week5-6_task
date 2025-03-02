<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Create Event</h1>

    <form @submit.prevent="submitEvent">
      <div class="mb-4">
        <label class="block font-medium">Event Title</label>
        <input
          v-model="eventData.title"
          type="text"
          class="w-full px-4 py-2 border rounded"
          required />
      </div>

      <div class="mb-4">
        <label class="block font-medium">Future Date</label>
        <input
          v-model="eventData.futureDate"
          type="date"
          class="w-full px-4 py-2 border rounded"
          required />
      </div>

      <div class="mb-4">
        <label class="block font-medium">Details</label>
        <textarea
          v-model="eventData.details"
          class="w-full px-4 py-2 border rounded"
          required></textarea>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
        {{ loading ? "Creating..." : "Create Event" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useState } from "#app"; // Nuxt's state management

const router = useRouter();
const events = useState("events", () => ref([])); // Global state for events

const eventData = ref({
  title: "",
  futureDate: "",
  details: "",
});

const loading = ref(false);

// Fetch events to ensure UI updates correctly
const fetchEvents = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await fetch(
      "https://eventful-moments-api.onrender.com/api/v1/events",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    console.log("📢 Fetched Events Response:", data);

    if (!response.ok) throw new Error(data.message || "Failed to load events");

    events.value = data.data || []; // Ensure correct data structure
    console.log("✅ Updated Events List:", events.value);
  } catch (error) {
    console.error("❌ Error fetching events:", error.message);
  }
};

onMounted(fetchEvents);

const submitEvent = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You need to be logged in to create an event.");
    return;
  }

  // ✅ Ensure future date validation
  const selectedDate = new Date(eventData.value.futureDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate <= today) {
    alert("Please select a future date.");
    return;
  }

  loading.value = true;
  try {
    const response = await fetch(
      "https://eventful-moments-api.onrender.com/api/v1/moment", // ✅ Fixed API endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData.value),
      }
    );

    const data = await response.json();
    console.log("📢 Server Response:", data); // ✅ Debug response

    if (!response.ok) throw new Error(data.message || "Failed to create event");

    alert("✅ Event created successfully!");

    // ✅ Update event list instantly
    if (data.data) {
      events.value.unshift(data.data); // Ensure correct event structure
      console.log("✅ Updated Events List:", events.value);
    }

    // Refresh event list
    await fetchEvents();
    router.push("/dashboard");
  } catch (error) {
    console.error("❌ Error:", error.message);
    alert(error.message);
  } finally {
    loading.value = false;
  }
};
</script>
