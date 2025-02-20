<template>
  <main class="main">
    <div class="card">
      <h2 class="title">Create an account</h2>
      <sign-up-form />
      <p class="redirect">
        Already have an account?
        <router-link to="/auth/sign-in">Sign in</router-link>
      </p>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { SignUpForm } from "@/components";

export default defineComponent({
  name: "SignUpPage",
  components: { SignUpForm },
});
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: #f9fafb;
}

.card {
  width: 380px;
  padding: 24px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.redirect {
  text-align: center;
  margin-top: 14px;
  font-size: 14px;
}

.redirect a {
  color: black;
  text-decoration: none;
  font-weight: 500;
}

.redirect a:hover {
  text-decoration: underline;
}
</style>
