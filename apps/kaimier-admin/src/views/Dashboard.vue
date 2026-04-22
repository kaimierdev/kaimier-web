<template>
  <el-space direction="vertical" alignment="stretch" :size="16" style="width: 100%">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>欢迎</span>
          <el-tag type="success" effect="plain">Element Plus</el-tag>
        </div>
      </template>

      <el-alert
        title="这是最常见、最省心的后台技术栈组合：Vue 3 + Vite + Element Plus + SCSS。"
        type="info"
        show-icon
        :closable="false"
      />

      <div class="mt-16">
        <el-descriptions title="项目信息" :column="1" border>
          <el-descriptions-item label="应用">kaimier-admin</el-descriptions-item>
          <el-descriptions-item label="路由">Vue Router</el-descriptions-item>
          <el-descriptions-item label="UI">Element Plus（全量引入，先求稳）</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss">
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.mt-16 {
  margin-top: 16px;
}
</style>
