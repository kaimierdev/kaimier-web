<template>
  <div class="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -right-24 -top-28 h-[34rem] w-[34rem] rounded-full bg-blue-200/20 blur-3xl"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -left-28 top-8 h-[30rem] w-[30rem] rounded-full bg-emerald-200/15 blur-3xl"
    />
    <header
      class="fixed inset-x-0 top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200/80 bg-slate-50/70 px-6 backdrop-blur-md"
    >
      <a
        class="inline-flex items-center gap-2.5 rounded-full bg-transparent px-3 py-2"
        href="/"
      >
        <span
          aria-hidden="true"
          class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-sm font-bold text-white"
        >K</span>
        <span class="text-base font-bold tracking-wide">Kaimier</span>
      </a>

      <nav aria-label="Primary" class="flex items-center gap-3 py-2.5">
        <a
          :href="adminUrl"
          class="rounded-full border border-blue-200 bg-white px-3 py-2 text-[0.92rem] font-semibold text-blue-900 transition-colors hover:border-blue-300"
        >{{ t("nav.admin") }}</a>
      </nav>
    </header>

    <main class="relative z-10 mx-auto w-full max-w-[1080px] px-6 pb-8 pt-24">
      <section
        class="rounded-[28px] border border-blue-100 bg-gradient-to-b from-white to-blue-50/60 px-6 py-16 text-center md:px-10"
      >
        <p class="m-0 inline-block rounded-full border border-blue-200 px-3 py-1.5 text-[13px] text-blue-800">
          {{ t("hero.badge") }}
        </p>
        <h1
          class="mb-[14px] mt-[18px] text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.12] tracking-[-0.02em]"
        >
          {{ t("hero.titleLine1") }}<br />{{ t("hero.titleLine2") }}
        </h1>
        <p class="mx-auto max-w-[720px] text-[1.08rem] leading-[1.75] text-slate-500">
          {{ t("hero.subtitle") }}
        </p>
        <div class="mt-[26px] flex flex-wrap justify-center gap-3">
          <a
            class="inline-flex min-w-[170px] items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-blue-600 to-blue-400 px-[18px] py-3 font-semibold text-white"
            href="#contact"
            @click.prevent="scrollToSection('contact')"
          >{{ t("hero.ctaConsult") }}</a>
          <a
            class="inline-flex min-w-[170px] items-center justify-center rounded-xl border border-blue-200 bg-white px-[18px] py-3 font-semibold text-slate-800"
            href="#services"
            @click.prevent="scrollToSection('services')"
          >{{ t("hero.ctaServices") }}</a>
        </div>
      </section>

      <section id="services" class="mt-6 scroll-mt-24 grid gap-4 md:grid-cols-3">
        <article class="rounded-[18px] border border-blue-100 bg-gradient-to-b from-white to-blue-50/40 px-5 py-[22px]">
          <h2 class="mb-2.5 text-[1.1rem] font-semibold">{{ t("services.strategyTitle") }}</h2>
          <p class="m-0 leading-[1.7] text-slate-500">{{ t("services.strategyDesc") }}</p>
        </article>
        <article class="rounded-[18px] border border-blue-100 bg-gradient-to-b from-white to-blue-50/40 px-5 py-[22px]">
          <h2 class="mb-2.5 text-[1.1rem] font-semibold">{{ t("services.deliveryTitle") }}</h2>
          <p class="m-0 leading-[1.7] text-slate-500">{{ t("services.deliveryDesc") }}</p>
        </article>
        <article class="rounded-[18px] border border-blue-100 bg-gradient-to-b from-white to-blue-50/40 px-5 py-[22px]">
          <h2 class="mb-2.5 text-[1.1rem] font-semibold">{{ t("services.automationTitle") }}</h2>
          <p class="m-0 leading-[1.7] text-slate-500">{{ t("services.automationDesc") }}</p>
        </article>
      </section>

      <section class="mt-4 grid gap-3 md:grid-cols-3">
        <div class="rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-[18px]">
          <strong class="block text-2xl text-blue-900">2주</strong>
          <span class="text-[0.95rem] text-slate-500">{{ t("stats.mvpLabel") }}</span>
        </div>
        <div class="rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-[18px]">
          <strong class="block text-2xl text-blue-900">99.9%</strong>
          <span class="text-[0.95rem] text-slate-500">{{ t("stats.stabilityLabel") }}</span>
        </div>
        <div class="rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-[18px]">
          <strong class="block text-2xl text-blue-900">24/7</strong>
          <span class="text-[0.95rem] text-slate-500">{{ t("stats.monitoringLabel") }}</span>
        </div>
      </section>

      <section
        id="contact"
        class="mt-4 scroll-mt-24 rounded-[18px] border border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50 px-[18px] py-7 text-center"
      >
        <h2 class="m-0 text-[1.55rem] font-semibold">{{ t("contact.title") }}</h2>
        <p class="mb-4 mt-2.5 text-slate-500">{{ t("contact.desc") }}</p>
        <a
          class="inline-flex min-w-[170px] items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-blue-600 to-blue-400 px-[18px] py-3 font-semibold text-white"
          href="mailto:hi@kaimier.com"
        >hi@kaimier.com</a>
      </section>

      <footer class="mt-[22px] text-center text-slate-500">
        <p>© {{ year }} {{ t("footer.copyright") }}</p>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const year = new Date().getFullYear();

const runtimeConfig = useRuntimeConfig();
const adminUrl = computed(() => String(runtimeConfig.public.adminUrl));
const scrollToSection = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};
onMounted(() => {
  if (!window.location.hash) return;
  const cleanUrl = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, "", cleanUrl);
  window.scrollTo({ top: 0, behavior: "auto" });
});

useSeoMeta({
  title: () => t("meta.title"),
  description: () => t("meta.description")
});
</script>
