<template>
  <main class="root">
    <button @click="$router.push('/')" class="go-back-button">
      {{ "< go back" }}
    </button>

    <full-movie />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { FullMovie } from "@/components";

export default defineComponent({
  name: "MoviePage",
  components: { FullMovie },
});
</script>

<style scoped>
.root {
  max-width: 900px;
  margin: 0 auto;
  padding: 72px 16px 36px 16px;
}

.go-back-button {
  margin: 8px 0;
}
</style>
