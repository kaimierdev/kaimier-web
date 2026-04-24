<template>
  <main class="flex h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
    <header class="w-full border-b border-slate-800 bg-slate-950">
      <div class="flex h-16 w-full items-center justify-between px-6 md:px-8">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 rounded-lg outline-none ring-indigo-400/40 transition hover:opacity-90 focus-visible:ring-2"
        >
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-200">K</span>
          <span class="text-sm font-semibold tracking-wide text-slate-100">KAPIS</span>
        </NuxtLink>

        <div class="flex items-center gap-6 text-sm md:gap-8">
          <nav class="hidden items-center gap-5 md:flex">
            <NuxtLink to="/playground" class="text-sky-300 transition hover:text-sky-200">API 플레이그라운드</NuxtLink>
            <NuxtLink to="/chat" class="text-violet-300 transition hover:text-violet-200">AI 채팅</NuxtLink>
          </nav>
          <div class="flex items-center gap-3">
            <NuxtLink to="/login" class="text-slate-300 transition hover:text-white">로그인</NuxtLink>
            <NuxtLink
              to="/signup"
              class="rounded-lg border border-indigo-500/40 bg-indigo-500/15 px-3 py-1.5 text-indigo-200 transition hover:border-indigo-400/60 hover:bg-indigo-500/25"
            >
              회원가입
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <section class="flex min-h-0 flex-1 overflow-hidden">
      <aside class="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-950/90 p-4 md:block">
        <button class="mb-4 w-full rounded-lg border border-indigo-500/40 bg-indigo-500/15 px-4 py-2 text-sm text-indigo-200 transition hover:bg-indigo-500/25">
          + 새 채팅
        </button>
        <p class="mb-2 text-xs font-semibold tracking-wide text-slate-500">최근 대화</p>
        <ul class="space-y-2 text-sm">
          <li class="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-2 text-violet-200">API 설계 질문</li>
          <li class="rounded-lg border border-slate-800 px-3 py-2 text-slate-400">테스트 자동화 전략</li>
          <li class="rounded-lg border border-slate-800 px-3 py-2 text-slate-400">SDK 생성 가이드</li>
        </ul>
      </aside>

      <div class="flex min-h-0 flex-1 flex-col">
        <div ref="messagesRef" class="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-8">
          <div class="mx-auto flex w-full max-w-3xl flex-col gap-4">
          <article
            v-for="message in messages"
            :key="message.id"
            :class="[
              'max-w-3xl rounded-2xl px-4 py-3 text-sm leading-6',
              message.role === 'user'
                ? 'ml-auto border border-indigo-500/30 bg-indigo-500/15 text-indigo-100'
                : 'border border-slate-800 bg-slate-900 text-slate-200'
            ]"
          >
            <p class="mb-1 text-xs uppercase tracking-wide" :class="message.role === 'user' ? 'text-indigo-300' : 'text-slate-400'">
              {{ message.role === 'user' ? '나' : 'KAPIS AI' }}
            </p>
            <p class="whitespace-pre-wrap">{{ message.content }}</p>
          </article>
          </div>
        </div>

        <form class="bg-slate-950/90 px-4 pb-5 pt-3 md:px-8 md:pb-6" @submit.prevent="submitPrompt">
          <div class="mx-auto w-full max-w-3xl rounded-2xl bg-slate-900/95 p-3 shadow-lg shadow-black/20">
            <textarea
              v-model="prompt"
              rows="3"
              class="w-full resize-none rounded-xl border border-slate-700/80 bg-slate-950/60 p-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-violet-400/60"
              placeholder="KAPIS AI에게 질문해보세요..."
            ></textarea>
            <div class="mt-3 flex items-center justify-between">
              <p class="text-xs text-slate-500">Shift+Enter 줄바꿈 · Enter 전송</p>
              <button
                type="submit"
                class="rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="!prompt.trim()"
              >
                전송
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

const messagesRef = ref<HTMLElement | null>(null);
const prompt = ref('');
const seq = ref(2);

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    role: 'assistant',
    content: '안녕하세요. KAPIS AI 채팅입니다. API 설계, 테스트 자동화, 문서화에 대해 질문해 주세요.'
  },
  {
    id: 2,
    role: 'assistant',
    content: '예: "Spring Boot 기준으로 결제 API 스펙 초안을 만들어줘"'
  }
]);

const scrollToBottom = async () => {
  await nextTick();
  if (!messagesRef.value) return;
  messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
};

const buildMockReply = (question: string) => {
  return [
    '요청을 이해했습니다.',
    `질문: ${question}`,
    '',
    '다음 단계 제안:',
    '1) 요구사항을 엔드포인트/입출력으로 분해',
    '2) 실패 케이스를 포함한 테스트 시나리오 정의',
    '3) OpenAPI와 예제 요청/응답을 함께 생성'
  ].join('\n');
};

const submitPrompt = async () => {
  const question = prompt.value.trim();
  if (!question) return;

  messages.value.push({
    id: ++seq.value,
    role: 'user',
    content: question
  });
  prompt.value = '';
  await scrollToBottom();

  setTimeout(async () => {
    messages.value.push({
      id: ++seq.value,
      role: 'assistant',
      content: buildMockReply(question)
    });
    await scrollToBottom();
  }, 300);
};

useSeoMeta({
  title: 'KAPIS.dev AI 채팅',
  description: 'KAPIS AI 어시스턴트 채팅 페이지'
});

onMounted(scrollToBottom);
</script>
