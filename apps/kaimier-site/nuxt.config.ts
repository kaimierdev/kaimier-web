export default defineNuxtConfig({
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
  css: ["~/assets/main.css"],
  compatibilityDate: "2025-12-01",
  devtools: { enabled: false }
});
