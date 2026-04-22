<template>
  <footer class="mt-16 border-t border-slate-800 pt-6 text-sm text-slate-400">
    <p>© {{ year }} KAPIS.dev · 한국 시장을 위한 AI API 자동화 플랫폼</p>
    <a class="mt-1 inline-block text-indigo-300 hover:text-indigo-200" href="mailto:kaimier@msn.com">
      kaimier@msn.com
    </a>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
