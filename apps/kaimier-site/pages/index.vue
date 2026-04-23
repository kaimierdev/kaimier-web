<template>
  <header class="top-header">
    <a class="logo" href="/">
      <span class="logo-mark" aria-hidden="true">K</span>
      <span class="logo-text">Kaimier</span>
    </a>

    <nav class="top-nav" aria-label="Primary">
      <a class="top-nav__link" :href="adminUrl">{{ t("nav.admin") }}</a>
    </nav>
  </header>

  <main class="site">
    <section class="hero">
      <p class="badge">{{ t("hero.badge") }}</p>
      <h1>{{ t("hero.titleLine1") }}<br />{{ t("hero.titleLine2") }}</h1>
      <p class="subtitle">
        {{ t("hero.subtitle") }}
      </p>
      <div class="cta-row">
        <a class="btn btn-primary" href="#contact">{{ t("hero.ctaConsult") }}</a>
        <a class="btn btn-ghost" href="#services">{{ t("hero.ctaServices") }}</a>
      </div>
    </section>

    <section id="services" class="card-grid">
      <article class="card">
        <h2>{{ t("services.strategyTitle") }}</h2>
        <p>{{ t("services.strategyDesc") }}</p>
      </article>
      <article class="card">
        <h2>{{ t("services.deliveryTitle") }}</h2>
        <p>{{ t("services.deliveryDesc") }}</p>
      </article>
      <article class="card">
        <h2>{{ t("services.automationTitle") }}</h2>
        <p>{{ t("services.automationDesc") }}</p>
      </article>
    </section>

    <section class="stats">
      <div class="stat">
        <strong>2주</strong>
        <span>{{ t("stats.mvpLabel") }}</span>
      </div>
      <div class="stat">
        <strong>99.9%</strong>
        <span>{{ t("stats.stabilityLabel") }}</span>
      </div>
      <div class="stat">
        <strong>24/7</strong>
        <span>{{ t("stats.monitoringLabel") }}</span>
      </div>
    </section>

    <section id="contact" class="contact">
      <h2>{{ t("contact.title") }}</h2>
      <p>{{ t("contact.desc") }}</p>
      <a class="btn btn-primary" href="mailto:hi@kaimier.com">hi@kaimier.com</a>
    </section>

    <footer class="footer">
      <p>© {{ year }} {{ t("footer.copyright") }}</p>
    </footer>
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n();
const year = new Date().getFullYear();

const runtimeConfig = useRuntimeConfig();
const adminUrl = computed(() => String(runtimeConfig.public.adminUrl));

useSeoMeta({
  title: () => t("meta.title"),
  description: () => t("meta.description")
});
</script>
