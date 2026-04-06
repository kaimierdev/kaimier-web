<template>
  <main class="home">
    <h1 class="home__title">KAPIS Platform</h1>
    <p class="home__desc">
      面向 API 与集成的轻量平台入口，可在此逐步接入能力、配置与运维视图。
    </p>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  text-align: center;
}

.home__title {
  margin: 0 0 1rem;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.home__desc {
  margin: 0;
  max-width: 36rem;
  line-height: 1.6;
  color: var(--color-muted);
  font-size: 1rem;
}
</style>
