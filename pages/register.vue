<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md b p-6 shadow-md bg-gray-200 rounded-lg">
      <h2 class="text-2xl font-bold text-center text-gray-700">Register</h2>
      <form @submit.prevent="registerUser" class="mt-4 text-center">
        <div class="mb-4">
          <label class="block text-gray-600 text-left">Full Name</label>
          <input
            v-model="form.fullname"
            type="text"
            required
            class="input-field w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-600 text-left">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="input-field w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-600 text-left">Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            class="input-field w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
        </div>

        <button type="submit" class="btn">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({ fullname: "", email: "", password: "" });

const registerUser = async () => {
  try {
    const response = await fetch(
      "https://eventful-moments-api.onrender.com/api/v1/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.value),
      }
    );

    if (!response.ok) throw new Error("Registration failed");
    console.log(response);
    alert("Registration successful! Please log in.");
    router.push("/login");
  } catch (error) {
    alert(error.message);
  }
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.btn {
  width: 100%;
  background-color: blue;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
