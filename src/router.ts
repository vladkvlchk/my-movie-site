import { createRouter, createWebHistory } from "vue-router";

import { SignInPage, SignUpPage, DiscoverMovies, MoviePage } from "@/pages";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: DiscoverMovies },
    {
      path: "/auth/sign-up",
      component: SignUpPage,
      meta: { showHeader: false },
    },
    {
      path: "/auth/sign-in",
      component: SignInPage,
      meta: { showHeader: false },
    },
    { path: "/movie/:id", component: MoviePage },
  ],
});

export default router;
