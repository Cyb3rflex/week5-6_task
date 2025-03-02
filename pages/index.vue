<template>
  <div>
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-4">Eventful Moments</h1>
      <p class="text-2xl font-bold-sm mb-4">
        Hello User please create your Eventful Account
      </p>
      <p class="text-2xl font-bold-sm mb-4">
        use the Register at the Navbar. or Login if your an existing user.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="event in events"
          :key="event.id"
          :to="`/moment/${event.id}`"
          class="border p-4 rounded-lg shadow-md hover:shadow-lg">
          <img
            :src="event.image"
            alt="Event Image"
            class="w-full h-48 object-cover rounded-md" />
          <h2 class="text-lg font-semibold mt-2">{{ event.title }}</h2>
          <p class="text-sm text-gray-600">{{ event.date }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
const { data: events } = await useFetch("/moment");
</script>
