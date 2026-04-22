<template>
  <header class="top-header">
    <a class="logo" href="/">
      <span class="logo-mark" aria-hidden="true">K</span>
      <span class="logo-text">Kaimier</span>
    </a>

    <nav class="top-nav" aria-label="Primary">
      <a class="top-nav__link" :href="adminUrl">Admin</a>
    </nav>
  </header>

  <main class="site">
    <section class="hero">
      <p class="badge">Kaimier.com</p>
      <h1>아이디어를<br />서비스 성과로 만듭니다.</h1>
      <p class="subtitle">
        Kaimier는 AI 제품을 빠르게 설계하고 출시하는 팀입니다.
        전략, 개발, 자동화를 한 흐름으로 연결해 실행 속도를 높입니다.
      </p>
      <div class="cta-row">
        <a class="btn btn-primary" href="#contact">프로젝트 상담하기</a>
        <a class="btn btn-ghost" href="#services">서비스 살펴보기</a>
      </div>
    </section>

    <section id="services" class="card-grid">
      <article class="card">
        <h2>제품 전략</h2>
        <p>시장 가설 검증, MVP 범위 정의, 데이터 기반 우선순위 설정을 지원합니다.</p>
      </article>
      <article class="card">
        <h2>개발 실행</h2>
        <p>웹/백엔드/인프라를 통합해 빠른 릴리즈와 안정적인 운영 구조를 만듭니다.</p>
      </article>
      <article class="card">
        <h2>AI 자동화</h2>
        <p>콘텐츠 생성, 운영 워크플로, 내부 도구 자동화를 통해 팀 생산성을 높입니다.</p>
      </article>
    </section>

    <section class="stats">
      <div class="stat">
        <strong>2주</strong>
        <span>첫 MVP 릴리즈 목표</span>
      </div>
      <div class="stat">
        <strong>99.9%</strong>
        <span>운영 안정성 지향</span>
      </div>
      <div class="stat">
        <strong>24/7</strong>
        <span>모니터링 기반 대응</span>
      </div>
    </section>

    <section id="contact" class="contact">
      <h2>빠른 실행이 필요한가요?</h2>
      <p>신규 서비스 런칭, 기능 고도화, 운영 자동화까지 함께 설계합니다.</p>
      <a class="btn btn-primary" href="mailto:hi@kaimier.com">hi@kaimier.com</a>
    </section>

    <footer class="footer">
      <p>© {{ year }} Kaimier. All rights reserved.</p>
    </footer>
  </main>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();

const runtimeConfig = useRuntimeConfig();
const adminUrl = computed(() => String(runtimeConfig.public.adminUrl));
</script>
