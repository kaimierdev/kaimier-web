<template>
  <el-container class="layout">
    <el-aside width="220px" class="layout__aside">
      <div class="brand">
        <div class="brand__title">KAPIS</div>
        <div class="brand__sub">Admin</div>
      </div>

      <el-menu :default-active="active" router>
        <el-menu-item index="/">概览</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="layout__header">
        <div class="layout__header-title">运营后台</div>
      </el-header>

      <el-main class="layout__main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const active = computed(() => route.path)
</script>

<style scoped lang="scss">
.layout {
  height: 100%;
}

.layout__aside {
  border-right: 1px solid var(--el-border-color);
}

.brand {
  padding: 16px 16px 8px;
}

.brand__title {
  font-weight: 700;
  letter-spacing: 0.02em;
}

.brand__sub {
  margin-top: 2px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.layout__header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color);
}

.layout__header-title {
  font-weight: 600;
}

.layout__main {
  background: var(--el-bg-color-page);
}
</style>
