<template>
  <main class="min-h-screen bg-slate-950 text-slate-100">
    <div class="mx-auto max-w-6xl px-6 py-16 md:px-8">
      <HomeHero />
      <HomeStats :stats="stats" />
      <HomeFeatures :features="features" />
      <SiteFooter />
    </div>
  </main>
</template>

<script setup>
useSeoMeta({
  title: 'KAPIS.dev',
  description: 'AI 기반 API 자동화 플랫폼',
})

const stats = [
  { value: '70%', label: 'API 개발 시간 단축' },
  { value: '3x', label: '테스트 커버리지 효율 향상' },
  { value: '99.9%', label: '서비스 가용성 목표' },
]

const features = [
  { title: 'AI API 생성', desc: '요구사항을 입력하면 OpenAPI, 요청 예시, 백엔드 골격 코드를 빠르게 생성합니다.' },
  { title: 'AI 테스트 자동화', desc: '정상/예외/경계 테스트 케이스를 자동 생성해 회귀 테스트와 안정성을 강화합니다.' },
  { title: '문서·SDK 자동 동기화', desc: 'API 변경 사항을 문서에 즉시 반영하고 다국어 예제 코드를 제공해 협업 비용을 낮춥니다.' },
  { title: '호출 모니터링·알림', desc: '에러율, 지연 요청, 트래픽 급증을 실시간 감지하고 임계치 기반 알림을 제공합니다.' },
  { title: 'API 키·권한 관리', desc: '팀 권한을 세분화하고 환경별 키를 관리하며 감사 로그로 운영 리스크를 줄입니다.' },
  { title: '자동화 워크플로', desc: '빌드, 배포, 회귀, 알림을 연결해 API 전달 과정을 지속 가능한 자동화 루프로 만듭니다.' },
]
</script>
