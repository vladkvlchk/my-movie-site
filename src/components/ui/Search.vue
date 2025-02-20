<template>
  <input
    type="text"
    class="search-input"
    :value="query"
    @input="onInput"
    placeholder="Search by name"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Search",
  props: {
    query: {
      type: String,
      default: "",
    },
  },
  emits: ["update:query"],

  methods: {
    onInput(e: Event) {
      const input = e.target as HTMLInputElement | null;
      if (!input) return;
      this.$emit("update:query", input.value);
    },
  },
});
</script>

<style scoped>
.search-input {
  max-width: 320px;
}
</style>
