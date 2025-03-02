<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMoments } from "@/composables/useMoments";

const { getMomentById } = useMoments();
const route = useRoute();
const moment = ref(null);

onMounted(async () => {
  moment.value = await getMomentById(route.params.id);
});
</script>

<template>
  <div v-if="moment">
    <h2>{{ moment.title }}</h2>
    <p>{{ moment.details }}</p>
    <p>Future Date: {{ moment.futureDate }}</p>
  </div>
</template>
