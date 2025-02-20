<template>
  <div class="loader-container">
    <img :src="loaderIcon" alt="Loading..." class="loader" />
  </div>
</template>

<script setup lang="ts">
import loaderIcon from "@/assets/loader.svg";
</script>

<style scoped>
.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.loader {
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
