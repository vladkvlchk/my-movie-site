<template>
  <select :value="sortBy" @change="onChange">
    <option value="popularity.desc">Most Popular</option>
    <option value="popularity.asc">Least Popular</option>
    <option value="release_date.desc">Newest</option>
    <option value="release_date.asc">Oldest</option>
    <option value="vote_average.desc">Top Rated</option>
    <option value="vote_average.asc">Lowest Rated</option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SelectSortBy",
  props: {
    sortBy: {
      type: String,
      default: "popularity.desc",
    },
  },
  emits: ["update:sortBy"],
  methods: {
    onChange(event: Event) {
      const select = event.target as HTMLSelectElement | null;
      if (!select) return;
      this.$emit("update:sortBy", select.value);
    },
  },
});
</script>

<style scoped>
select {
  width: fit-content;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  background-color: white;
  transition: border-color 0.2s ease-in-out;
}
select:focus {
  outline: none;
  border-color: black;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
}
</style>
