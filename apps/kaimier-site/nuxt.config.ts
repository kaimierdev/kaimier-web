// @ts-nocheck

export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "@nuxtjs/tailwindcss"],
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ["/", "/en", "/zh"]
    }
  },
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "ko",
    locales: [
      { code: "ko", iso: "ko-KR", name: "Korean", file: "ko.ts" },
      { code: "en", iso: "en-US", name: "English", file: "en.ts" },
      { code: "zh", iso: "zh-CN", name: "Chinese", file: "zh.ts" }
    ],
    langDir: "locales",
    detectBrowserLanguage: false
  },
  runtimeConfig: {
    public: {
      // 生产环境默认走同域 /admin/；本地开发可用 NUXT_PUBLIC_ADMIN_URL 覆盖（例如 http://localhost:3003/）
      adminUrl: process.env.NUXT_PUBLIC_ADMIN_URL ?? "/admin/"
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: "ko" },
      title: "Kaimier | AI Product Studio",
      meta: [
        {
          name: "description",
          content:
            "Kaimier는 제품 전략부터 개발, 운영 자동화까지 빠르게 실행하는 AI 기반 제품 스튜디오입니다."
        }
      ]
    }
  },
  css: ["~/assets/css/tailwind.css"],
  compatibilityDate: "2025-12-01",
  devtools: { enabled: false }
});
