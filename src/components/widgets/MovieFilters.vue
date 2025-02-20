<template>
  <div class="filters-card">
    <div class="filter-field">
      <label for="year" class="label">Year</label>
      <input
        type="number"
        id="year"
        v-model="localFilters.year"
        placeholder="e.g. 2022"
      />
    </div>

    <div class="filter-field">
      <label for="genres" class="label">Genres</label>
      <select
        id="genres"
        multiple
        :value="selectedGenres"
        @change="updateSelectedGenres"
      >
        <option v-for="genre in genresList" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>
    </div>

    <div class="filter-field">
      <label for="voteAverageGte" class="label">Min Vote Average</label>
      <input
        type="number"
        step="0.1"
        id="voteAverageGte"
        v-model="localFilters.voteAverageGte"
        placeholder="0 - 10"
      />
    </div>

    <div class="include-adult">
      <input
        type="checkbox"
        id="includeAdult"
        v-model="localFilters.includeAdult"
      />
      <label for="includeAdult">Include Adult</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

import type { IGenre } from "@/utils/types";

export default defineComponent({
  name: "MovieFilters",
  props: {
    filters: {
      type: Object as PropType<{
        year: string;
        voteAverageGte: string;
        includeAdult: boolean;
        query?: string;
      }>,
      required: true,
    },
    genresList: {
      type: Array as PropType<IGenre[]>,
      default: () => [],
    },
    selectedGenres: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
  },
  data() {
    return {
      localFilters: {
        year: this.filters.year || "",
        voteAverageGte: this.filters.voteAverageGte || "",
        includeAdult: this.filters.includeAdult || false,
      },
    };
  },
  methods: {
    updateSelectedGenres(event: Event) {
      const select = event.target as HTMLSelectElement | null;
      if (!select) return;
      const selectedOptions = Array.from(select.selectedOptions).map(
        (option) => (option as HTMLOptionElement).value
      );
      this.$emit("update:selectedGenres", selectedOptions);
    },
  },
  watch: {
    filters: {
      deep: true,
      handler(newVal) {
        const { year, voteAverageGte, includeAdult } = newVal;
        const local = this.localFilters;
        if (
          year !== local.year ||
          voteAverageGte !== local.voteAverageGte ||
          includeAdult !== local.includeAdult
        ) {
          this.localFilters = { year, voteAverageGte, includeAdult };
        }
      },
    },
    localFilters: {
      deep: true,
      handler(newVal) {
        const updated = {
          ...this.filters,
          year: newVal.year,
          voteAverageGte: newVal.voteAverageGte,
          includeAdult: newVal.includeAdult,
        };
        if (JSON.stringify(updated) !== JSON.stringify(this.filters)) {
          this.$emit("update:filters", updated);
        }
      },
    },
  },
});
</script>

<style scoped>
.filters-card {
  padding: 24px;
  margin: 8px 32px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(4, 1fr);
}

.filter-field {
  margin-bottom: 14px;
}

.label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #111;
}

.include-adult {
  grid-row-start: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  height: min-content;
}
@media screen and (max-width: 800px) {
  .filters-card {
    grid-template-columns: 1fr;
  }
  .include-adult {
    grid-row-start: unset;
  }
}
</style>
