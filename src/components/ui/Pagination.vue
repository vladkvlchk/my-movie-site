<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="changePage(1)">«</button>
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
      ‹
    </button>

    <button
      v-for="page in pages"
      :key="page"
      :class="page === currentPage ? 'currentPageButton' : 'pageButton'"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <button
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      ›
    </button>
    <button
      :disabled="currentPage === totalPages"
      @click="changePage(totalPages)"
    >
      »
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page: number) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit("pageChange", page);
      }
    },
  },
  computed: {
    pages() {
      const range: number[] = [];
      const { totalPages, currentPage } = this;
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + 4);
      if (end - start < 4) start = Math.max(1, end - 4);

      for (let i = start; i <= end; i++) range.push(i);
      return range;
    },
  },
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.currentPageButton {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.currentPageButton:hover {
  background-color: #2563eb;
}

.currentPageButton:disabled {
  background-color: #93c5fd;
  border-color: #93c5fd;
  color: white;
}
</style>
