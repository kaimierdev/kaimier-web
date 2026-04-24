<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-400">
    API 플레이그라운드로 이동 중…
  </div>
</template>

<script setup>
await navigateTo('/playground', { replace: true })
</script>
