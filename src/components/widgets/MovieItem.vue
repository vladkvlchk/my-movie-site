<template>
  <div class="card">
    <img
      v-if="movie.poster_path"
      class="card__picture"
      :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
      alt="Movie Poster"
    />
    <div v-else class="card__picture">
      {{ `[no image]` }}
    </div>
    <div class="card__about">
      <div>
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.overview }}</p>
      </div>
      <div>
        <div class="card__about__votes">
          <img :src="starIcon" alt="Star Icon" />
          {{ movie.vote_average }}
          <i class="card__about__voteCount"
            >{{ `(${movie.vote_count}` }}
            <img :src="userIcon" alt="User Icon" />{{ `)` }}
          </i>
        </div>
        <p>
          Date of release: <b>{{ movie.release_date }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import starIcon from "@/assets/star.svg";
import userIcon from "@/assets/user.svg";
import type { IMovie } from "@/utils/types";

export default defineComponent({
  name: "MovieItem",
  props: {
    movie: {
      type: Object as () => IMovie,
      required: true,
    },
  },
  data() {
    return {
      starIcon,
      userIcon,
    };
  },
});
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  cursor: pointer;
}

.card__picture {
  width: 100%;
  max-width: 300px;
  height: fit-content;
  min-height: 300px;
  border-radius: 8px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
}

.card__about {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card__about__votes {
  display: flex;
  align-items: center;
  gap: 4px;
}

.card__about__voteCount {
  display: inline-flex;
}
</style>
