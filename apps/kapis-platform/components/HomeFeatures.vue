<template>
  <section class="mt-14">
    <h2 class="text-2xl font-semibold">핵심 기능</h2>
    <div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="feature in features"
        :key="feature.title"
        class="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
      >
        <h3 class="text-lg font-semibold text-indigo-200">{{ feature.title }}</h3>
        <p class="mt-2 text-sm text-slate-300">{{ feature.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  features: {
    type: Array,
    required: true,
  },
})
</script>
