<template>
  <Loader v-if="loading" />
  <div v-else-if="movie">
    <div class="movie-header">
      <img
        v-if="movie.poster_path"
        :src="getPosterUrl(movie.poster_path)"
        alt="Movie Poster"
        class="movie-poster"
      />
      <div class="movie-info">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <p v-if="movie.tagline" class="movie-tagline">“{{ movie.tagline }}”</p>
        <div class="movie-meta">
          <span class="movie-release">
            Release Date: {{ movie.release_date }}
          </span>
          <br />
          <span class="movie-runtime">Runtime: {{ movie.runtime }} min</span>
        </div>
        <div class="movie-genres">
          <Badge v-for="genre in movie.genres" :key="genre.id">
            {{ genre.name }}
          </Badge>
        </div>
      </div>
    </div>
    <div class="movie-overview">
      <h2>Overview</h2>
      <p>{{ movie.overview }}</p>
    </div>
    <div class="movie-extra">
      <h2>Details</h2>
      <ul>
        <li><b>Original Title:</b> {{ movie.original_title }}</li>
        <li><b>Original Language:</b> {{ movie.original_language }}</li>
        <li><b>Budget:</b> {{ formatCurrency(movie.budget) }}</li>
        <li><b>Revenue:</b> {{ formatCurrency(movie.revenue) }}</li>
        <li>
          <b>Vote Average:</b> {{ movie.vote_average }} ({{ movie.vote_count }}
          votes)
        </li>
        <li><b>Status:</b> {{ movie.status }}</li>
        <li v-if="movie.homepage">
          <b>Homepage: </b>
          <a :href="movie.homepage" target="_blank">{{ movie.homepage }}</a>
        </li>
      </ul>
    </div>
    <div class="movie-production">
      <h2>Production</h2>
      <div class="production-companies">
        <h3>Companies:</h3>
        <ul>
          <li v-for="company in movie.production_companies" :key="company.id">
            {{ company.name }}
          </li>
        </ul>
      </div>
      <div class="production-countries">
        <h3>Countries:</h3>
        <ul>
          <li
            v-for="country in movie.production_countries"
            :key="country.iso_3166_1"
          >
            {{ country.name }}
          </li>
        </ul>
      </div>
      <div class="spoken-languages">
        <h3>Languages:</h3>
        <ul>
          <li v-for="lang in movie.spoken_languages" :key="lang.iso_639_1">
            {{ lang.english_name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Movie not found.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import axiosInstance from "@/utils/axios";
import { Badge } from "@/components";
import type { IMovie } from "@/utils/types";

export default defineComponent({
  components: {
    Badge,
  },
  data() {
    return {
      movie: {} as IMovie,
      loading: true,
    };
  },
  methods: {
    async fetchMovieDetails() {
      this.loading = true;
      try {
        const response = await axiosInstance.get(
          `/movie/${this.$route.params.id}`
        );
        this.movie = response.data;
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        this.loading = false;
      }
    },

    formatCurrency(amount: number): string {
      return "$" + amount.toLocaleString();
    },

    getPosterUrl(posterPath: string): string {
      return `https://image.tmdb.org/t/p/w500/${posterPath}`;
    },
  },
  mounted() {
    this.fetchMovieDetails();
  },
});
</script>

<style scoped>
.movie-header {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.movie-poster {
  width: 300px;
  border-radius: 8px;
}

.movie-info {
  flex: 1;
}

.movie-title {
  font-size: 2rem;
  margin: 0;
  color: #1f2937;
}

h2 {
  border-bottom: 1px solid #e5e7eb;
}

.movie-tagline {
  font-style: italic;
  color: #6b7280;
  margin: 8px 0;
}

.movie-meta {
  margin: 8px 0;
  font-size: 0.9rem;
  color: #4b5563;
}

.movie-genres {
  margin: 8px 0;
}

.movie-overview,
.movie-extra,
.movie-production {
  margin-bottom: 24px;
}

.production-companies,
.production-countries,
.spoken-languages {
  margin-bottom: 16px;
}
</style>
