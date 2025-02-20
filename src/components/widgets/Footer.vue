<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="site-name">My Movie Site</div>
      <div class="rights">© 2025 All rights reserved</div>
      <div class="links">
        <a
          href="https://github.com/vladkvlchk/my-movie-site"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Project
        </a>
        <a
          href="https://github.com/vladkvlchk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developer GitHub
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f4f4f4;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.site-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1f2937;
}

.rights {
  font-size: 0.9rem;
  color: #4b5563;
}

.links a {
  margin: 0 8px;
  text-decoration: none;
  font-size: 0.9rem;
}
</style>
