<template>
  <main class="site">
    <header class="hero">
      <p class="badge">kapis.dev · AI 기반 API 자동화 플랫폼</p>
      <h1>API 출시 주기를<br />며칠에서 몇 시간으로</h1>
      <p class="subtitle">
        KAPIS는 개발 팀을 위한 AI 자동화 플랫폼입니다. API 생성, 테스트, 문서화,
        모니터링과 알림까지 한 번에 연결해 더 빠르고 안정적인 출시를 돕습니다.
      </p>
      <div class="hero-actions">
        <a href="#pricing" class="btn btn-primary">지금 무료로 시작하기</a>
        <a href="#features" class="btn btn-ghost">핵심 기능 보기</a>
      </div>
      <div class="hero-stats">
        <div>
          <strong>70%</strong>
          <span>API 개발 시간 단축</span>
        </div>
        <div>
          <strong>3x</strong>
          <span>테스트 커버리지 효율 향상</span>
        </div>
        <div>
          <strong>99.9%</strong>
          <span>서비스 가용성 목표</span>
        </div>
      </div>
    </header>

    <section id="features" class="section">
      <h2>수익화를 만드는 핵심 기능</h2>
      <div class="grid three">
        <article class="card">
          <h3>AI API 생성</h3>
          <p>요구사항을 입력하면 OpenAPI, 요청 예시, 백엔드 골격 코드를 빠르게 생성합니다.</p>
        </article>
        <article class="card">
          <h3>AI 테스트 자동화</h3>
          <p>정상/예외/경계 테스트 케이스를 자동 생성해 회귀 테스트와 안정성을 강화합니다.</p>
        </article>
        <article class="card">
          <h3>문서·SDK 자동 동기화</h3>
          <p>API 변경 사항을 문서에 즉시 반영하고 다국어 예제 코드를 제공해 협업 비용을 낮춥니다.</p>
        </article>
        <article class="card">
          <h3>호출 모니터링·알림</h3>
          <p>에러율, 지연 요청, 트래픽 급증을 실시간 감지하고 임계치 기반 알림을 제공합니다.</p>
        </article>
        <article class="card">
          <h3>API 키·권한 관리</h3>
          <p>팀 권한을 세분화하고 환경별 키를 관리하며 감사 로그로 운영 리스크를 줄입니다.</p>
        </article>
        <article class="card">
          <h3>자동화 워크플로</h3>
          <p>빌드, 배포, 회귀, 알림을 연결해 API 전달 과정을 지속 가능한 자동화 루프로 만듭니다.</p>
        </article>
      </div>
    </section>

    <section class="section">
      <h2>이런 팀에 적합합니다</h2>
      <div class="grid two">
        <article class="panel">
          <h3>1인 개발자 / 소규모 팀</h3>
          <p>낮은 비용으로 상용 API를 빠르게 구축하고 제품 가설을 검증할 수 있습니다.</p>
        </article>
        <article class="panel">
          <h3>SI·외주·납품 조직</h3>
          <p>표준화된 전달 프로세스로 재사용률과 납기 속도를 높여 수익성을 개선합니다.</p>
        </article>
      </div>
    </section>

    <section id="pricing" class="section">
      <h2>요금제</h2>
      <div class="grid three">
        <article class="price-card">
          <p class="tier">Free</p>
          <p class="price">₩0<span>/월</span></p>
          <ul>
            <li>프로젝트 1개</li>
            <li>기본 AI 생성 크레딧</li>
            <li>공개 문서</li>
          </ul>
          <a href="#" class="btn btn-ghost">무료 시작</a>
        </article>
        <article class="price-card price-card--hot">
          <p class="tier">Pro</p>
          <p class="price">₩49,000<span>/월</span></p>
          <ul>
            <li>프로젝트 10개</li>
            <li>확장 AI 크레딧</li>
            <li>비공개 문서·모니터링</li>
          </ul>
          <a href="#" class="btn btn-primary">Pro 시작하기</a>
        </article>
        <article class="price-card">
          <p class="tier">Team</p>
          <p class="price">₩199,000<span>/월부터</span></p>
          <ul>
            <li>멀티 멤버 협업</li>
            <li>권한 관리·감사 로그</li>
            <li>엔터프라이즈 SLA</li>
          </ul>
          <a href="mailto:kaimier@msn.com" class="btn btn-ghost">영업 문의</a>
        </article>
      </div>
    </section>

    <section class="section faq">
      <h2>자주 묻는 질문</h2>
      <div class="grid two">
        <article class="panel">
          <h3>온프레미스(사내) 설치가 가능한가요?</h3>
          <p>가능합니다. 보안 정책에 맞춘 전용 배포와 맞춤 기술 지원을 제공합니다.</p>
        </article>
        <article class="panel">
          <h3>기존 백엔드와 연동할 수 있나요?</h3>
          <p>가능합니다. 기존 OpenAPI를 가져와 테스트, 문서, 모니터링을 단계적으로 붙일 수 있습니다.</p>
        </article>
      </div>
    </section>

    <footer class="footer">
      <p>© {{ year }} KAPIS.dev · 한국 시장을 위한 AI API 자동화 플랫폼</p>
      <a href="mailto:kaimier@msn.com">kaimier@msn.com</a>
    </footer>
  </main>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
