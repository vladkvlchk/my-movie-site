<template>
  <main class="root">
    <div class="top-container">
      <h1 class="page-title">Discover Movies</h1>
      <Search :query="filters.query" @update:query="updateQuery" />
    </div>

    <div class="top-container">
      <div class="filters-toggle">
        <button @click="toggleFilters">
          {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
        </button>
      </div>
      <SelectSortBy :sortBy="sortBy" @update:sortBy="updateSortBy" />
    </div>

    <movie-filters
      v-if="showFilters"
      :filters="filters"
      :genresList="genresList"
      :selectedGenres="selectedGenres"
      @update:filters="updateFilters"
      @update:selectedGenres="selectedGenres = $event"
    />

    <Loader v-if="loading" />
    <div v-else>
      <div v-if="movies.length" class="movie-list">
        <movie-item
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @click="goToMoviePage(movie.id)"
        />
      </div>
      <div v-else>
        <p>No movies found.</p>
      </div>

      <div v-if="movies.length" class="pagination-container">
        <Pagination
          :totalPages="totalPages"
          :currentPage="currentPage"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import axiosInstance from '@/utils/axios';
import {
  MovieItem,
  Pagination,
  Loader,
  MovieFilters,
  Search,
  SelectSortBy,
} from '@/components';
import type { IMovie, IFilters } from '@/utils/types';

export default defineComponent({
  name: 'DiscoverMovies',
  components: {
    MovieItem,
    Pagination,
    Loader,
    MovieFilters,
    Search,
    SelectSortBy,
  },

  data() {
    return {
      movies: [] as IMovie[],

      showFilters: false,
      loading: false,
      totalPages: 1,
      currentPage: 1,

      sortBy: 'popularity.desc',

      filters: {
        includeAdult: false,
        year: '',
        voteAverageGte: '',
        query: '',
      } as IFilters,

      genresList: [] as { id: number; name: string }[],

      selectedGenres: [] as number[],

      debounceTimer: null as ReturnType<typeof setTimeout> | null,
    };
  },

  methods: {
    toggleFilters(): void {
      this.showFilters = !this.showFilters;
    },

    async fetchGenres(): Promise<void> {
      try {
        const response = await axiosInstance.get('/genre/movie/list');
        this.genresList = response.data.genres || [];
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    },

    async fetchMovies(): Promise<void> {
      try {
        this.loading = true;
        if (this.filters.query) {
          const response = await axiosInstance.get('/search/movie', {
            params: {
              page: this.currentPage,
              query: this.filters.query,
              include_adult: this.filters.includeAdult || false,
            },
          });
          let results = (response.data.results || []) as IMovie[];

          if (this.filters.year) {
            results = results.filter((movie: IMovie) => {
              if (!movie.release_date) return false;
              return (
                new Date(movie.release_date).getFullYear() ===
                parseInt(this.filters.year)
              );
            });
          }
          if (this.filters.voteAverageGte) {
            results = results.filter(
              (movie: IMovie) =>
                (movie.vote_average || 0) >=
                parseFloat(this.filters.voteAverageGte)
            );
          }
          if (this.selectedGenres.length > 0) {
            results = results.filter((movie: IMovie) => {
              if (!movie.genre_ids) return false;
              return this.selectedGenres.every((genreId) =>
                movie.genre_ids!.includes(genreId)
              );
            });
          }
          results = this.sortResults(results, this.sortBy);
          this.movies = results;
          this.totalPages = 1;
        } else {
          const response = await axiosInstance.get('/discover/movie', {
            params: {
              page: this.currentPage,
              sort_by: this.sortBy,
              include_adult: this.filters.includeAdult || false,
              year: this.filters.year || undefined,
              'vote_average.gte': this.filters.voteAverageGte || undefined,
              with_genres: this.selectedGenres.length
                ? this.selectedGenres.join(',')
                : undefined,
            },
          });
          this.movies = (response.data.results || []) as IMovie[];
          this.totalPages = response.data.total_pages || 1;
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        this.loading = false;
      }
    },

    sortResults(movies: IMovie[], sortBy: string): IMovie[] {
      const [field, direction] = sortBy.split('.');
      const factor = direction === 'desc' ? -1 : 1;
      return movies.sort((a: IMovie, b: IMovie) => {
        let A: number = 0;
        let B: number = 0;
        switch (field) {
          case 'popularity':
            A = (a.popularity || 0);
            B = (b.popularity || 0);
            break;
          case 'release_date':
            A = a.release_date ? new Date(a.release_date).getTime() : 0;
            B = b.release_date ? new Date(b.release_date).getTime() : 0;
            break;
          case 'vote_average':
            A = (a.vote_average || 0);
            B = (b.vote_average || 0);
            break;
          default:
            A = (a.popularity || 0);
            B = (b.popularity || 0);
        }
        if (A < B) return -1 * factor;
        if (A > B) return 1 * factor;
        return 0;
      });
    },

    handlePageChange(page: number): void {
      if (page !== this.currentPage) {
        this.currentPage = page;
      }
    },

    goToMoviePage(id: number): void {
      this.$router.push(`/movie/${id}`);
    },

    updateFilters(updatedFilters: IFilters): void {
      if (JSON.stringify(this.filters) !== JSON.stringify(updatedFilters)) {
        this.filters = { ...updatedFilters };
        this.currentPage = 1;
        this.fetchMovies();
      }
    },

    updateQuery(updatedQuery: string): void {
      this.filters.query = updatedQuery;
    },

    updateSortBy(value: string): void {
      this.sortBy = value;
    },

    debounceFetchMovies(): void {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.currentPage = 1;
        this.fetchMovies();
      }, 1000);
    },
  },

  watch: {
    sortBy: {
      handler: 'debounceFetchMovies',
      immediate: false,
    },
    selectedGenres: {
      handler: 'debounceFetchMovies',
      immediate: false,
    },
    'filters.query': {
      handler: 'debounceFetchMovies',
      immediate: false,
    },
    currentPage() {
      this.fetchMovies();
    },
  },

  mounted() {
    this.fetchGenres();
    this.fetchMovies();
  },
});
</script>

<style scoped>
.root {
  padding-top: 70px;
}
.top-container {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 32px;
}
.page-title {
  margin: 0;
}

.movie-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px 32px;
}
.pagination-container {
  margin-bottom: 24px;
  padding: 0 16px;
}
@media screen and (max-width: 1000px) {
  .movie-list {
    grid-template-columns: 1fr;
  }
}
</style>
