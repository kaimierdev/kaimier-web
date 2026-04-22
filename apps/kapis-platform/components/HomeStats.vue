<template>
  <section class="mt-12 grid gap-4 sm:grid-cols-3">
    <article
      v-for="item in stats"
      :key="item.label"
      class="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
    >
      <p class="text-3xl font-semibold text-indigo-300">{{ item.value }}</p>
      <p class="mt-1 text-slate-300">{{ item.label }}</p>
    </article>
  </section>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    required: true,
  },
})
</script>
