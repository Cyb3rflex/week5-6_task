<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>

    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label class="block font-medium">Email</label>
        <input
          v-model="credentials.email"
          type="email"
          class="w-full px-4 py-2 border rounded"
          required />
      </div>

      <div class="mb-4">
        <label class="block font-medium">Password</label>
        <input
          v-model="credentials.password"
          type="password"
          class="w-full px-4 py-2 border rounded"
          required />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
        {{ loading ? "Logging in..." : "Login" }}
      </button>
    </form>

    <p class="text-center mt-4">
      Don't have an account?
      <NuxtLink to="/register" class="text-teal-600 hover:underline">
        Register here
      </NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const router = useRouter();
const token = useCookie("token"); // Store token in cookies
const user = useCookie("user");

const credentials = ref({
  email: "",
  password: "",
});

const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      "https://eventful-moments-api.onrender.com/api/v1/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials.value),
      }
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Login failed");

    // Store token & user data in cookies
    token.value = data.token;
    user.value = JSON.stringify(data.user);

    alert("Login successful!");
    router.push("/dashboard");
  } catch (error) {
    console.error("Login error:", error.message);
    alert(error.message);
  } finally {
    loading.value = false;
  }
};
</script>
