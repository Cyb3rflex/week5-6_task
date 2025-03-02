<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md p-6">
      <h1 class="text-2xl font-bold mb-4 text-center">Welcome back</h1>
      <p class="py-4 text-black">
        Hi, my name is Eventful Moments, i am a bucket.. no, not the bucket of
        water but i store awesome moments you will like to have in coming years.
      </p>
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const router = useRouter();
const token = useCookie("token");
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

    console.log("Token received from API:", data.token);

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
