<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useState } from "#app";

definePageMeta({
  layout: "dashboard-layout",
});

const router = useRouter();
const user = ref(null);
const events = useState("events", () => ref([]));
const loading = ref(true);

const fetchEvents = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const response = await fetch(
      "https://eventful-moments-api.onrender.com/api/v1/moment",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) throw new Error(`Server Error: ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid response format.");

    events.value = data;
  } catch (error) {
    console.error("Error fetching events:", error.message);
    alert("Failed to load events.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchEvents);
</script>
