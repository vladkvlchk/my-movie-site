<template>
  <header class="header">
    <div class="header-content">
      <div class="site-name">My Movie Site</div>
      <nav class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/auth/sign-up" class="nav-link">Sign Up</router-link>
        <router-link to="/auth/sign-in" class="nav-link">Sign In</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
  background-color: #ffffff;
  padding: 16px 64px;
  border-bottom: 1px solid #e5e7eb;
  position: fixed;
  z-index: 1;
  display: flex;
  width: 100vw;
}

.header-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-link {
  text-decoration: none;
}
</style>
