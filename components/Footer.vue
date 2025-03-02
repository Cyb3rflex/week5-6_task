<template>
  <footer class="footer">Eventful Moments by {{ creatorName }}</footer>
</template>

<script setup>
const creatorName = "ABDULMUHEEZ QAZEEM"; // Change this to your actual name or use a prop
</script>

<style scoped>
.footer {
  background: teal;
  color: white;
  text-align: center;
  padding: 15px;
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>
