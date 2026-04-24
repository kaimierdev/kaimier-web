<template>
  <main class="flex h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
    <!-- Header / Global Nav -->
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

    <!-- Main Debug Workspace -->
    <section class="flex-1 overflow-hidden p-0">
      <div ref="debugShellRef" class="debug-shell h-full w-full overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
      <!-- Desktop Toolbar -->
      <div class="debug-toolbar border-b border-slate-800 px-4 py-3">
        <div class="flex items-center gap-3">
          <span class="inline-block h-2 w-2 rounded-full bg-rose-400"></span>
          <span class="inline-block h-2 w-2 rounded-full bg-amber-300"></span>
          <span class="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
          <p class="text-sm font-medium text-slate-200">KAPIS API Desktop</p>
        </div>
      </div>

      <!-- 3-Pane Layout: Left / Center / Right -->
      <div class="debug-layout" :style="debugLayoutStyle">
        <!-- Left Pane: Workspace -->
        <aside class="debug-left border-b border-slate-800 bg-slate-950 p-5 md:border-b-0 md:border-r">
          <p class="text-xs font-semibold tracking-wide text-slate-400">워크스페이스</p>
          <div class="mt-3 grid grid-cols-3 gap-1 rounded-lg border border-slate-800 bg-slate-900/70 p-1">
            <button
              v-for="tab in workspaceTabs"
              :key="tab.id"
              class="rounded-md px-2 py-1.5 text-[11px] font-medium transition"
              :class="workspaceTab === tab.id ? 'bg-sky-500/20 text-sky-200' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'"
              @click="workspaceTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <div v-if="workspaceTab === 'quick'" class="mt-5">
            <p class="text-xs font-semibold tracking-wide text-slate-400">빠른 요청</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <button
                v-for="item in quickRequests"
                :key="item.label"
                class="rounded-md border border-slate-700 bg-slate-900/70 px-2.5 py-1.5 text-xs text-slate-200 transition hover:border-sky-400/60 hover:text-sky-300"
                @click="applyQuickRequest(item)"
              >
                {{ item.label }}
              </button>
            </div>
          </div>

          <div v-else-if="workspaceTab === 'modules'" class="mt-5">
            <p class="text-xs font-semibold tracking-wide text-slate-400">검색</p>
            <input
              v-model="moduleQuery"
              type="text"
              class="mt-2 h-9 w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400/60"
              placeholder="모듈 검색"
            />
            <div class="mt-4">
              <p class="text-xs font-semibold tracking-wide text-slate-400">모듈 목록</p>
              <ul class="mt-2 max-h-28 space-y-1.5 overflow-auto text-xs">
                <li
                  v-for="module in filteredModules"
                  :key="module"
                  class="rounded-md border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-slate-300"
                >
                  {{ module }}
                </li>
                <li v-if="filteredModules.length === 0" class="rounded-md border border-dashed border-slate-700 px-2.5 py-1.5 text-slate-500">
                  검색 결과가 없습니다
                </li>
              </ul>
            </div>
          </div>

          <div v-else class="mt-5 space-y-3 text-xs">
            <div class="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
              <p class="text-slate-400">현재 작업 공간</p>
              <p class="mt-1 text-slate-200">Development</p>
            </div>
            <div class="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
              <p class="text-slate-400">활성 경로</p>
              <p class="mt-1 break-all text-slate-200">{{ normalizedPath }}</p>
            </div>
          </div>

          <div class="mt-6 rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-xs text-slate-400">
            <p>BASE URL</p>
            <p class="mt-1 break-all text-sky-400">{{ apiBase }}</p>
          </div>
          <div class="mt-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-xs">
            <p class="text-slate-400">응답 포맷</p>
            <p class="mt-1 text-slate-200">JSON</p>
          </div>
        </aside>

        <!-- Left-Right Resizer -->
        <div class="splitter splitter-left" @mousedown="startResize('left', $event)"></div>

        <!-- Center Pane: Request Editor + Response -->
        <div class="debug-center border-b border-slate-800 md:border-b-0 md:border-r">
          <div ref="centerSplitRef" class="center-split" :style="centerSplitStyle">
            <div ref="centerTopRef" class="center-top">
              <!-- Request Session Tabs (Postman-like) -->
              <div class="http-tabs mb-3">
                <div
                  v-for="session in requestSessions"
                  :key="session.id"
                  class="http-tab-btn"
                  :class="{ 'http-tab-btn-active': activeSessionId === session.id }"
                  draggable="true"
                  @click="activateRequestSession(session.id)"
                  @dragstart="startTabDrag(session.id, $event)"
                  @dragover.prevent
                  @drop="dropTab(session.id)"
                  @dragend="endTabDrag"
                >
                  <span class="http-tab-method">{{ session.method }}</span>
                  <input
                    v-if="editingTabId === session.id"
                    v-model="editingTabTitle"
                    class="http-tab-input"
                    maxlength="40"
                    @click.stop
                    @keyup.enter="confirmRename(session.id)"
                    @keyup.esc="cancelRename"
                    @blur="confirmRename(session.id)"
                  />
                  <span v-else class="http-tab-path" @dblclick.stop="startRename(session)">
                    {{ session.title }}
                  </span>
                  <span v-if="isSessionDirty(session)" class="http-tab-dot" title="저장되지 않은 변경"></span>
                  <button class="http-tab-close" title="탭 닫기" @click.stop="removeRequestSession(session.id)">×</button>
                </div>
                <button class="http-tab-add" @click="addRequestSession">+</button>
                <button class="http-tab-more" title="탭 옵션">•••</button>
              </div>

              <!-- Request Bar -->
              <div class="request-bar mx-4 mb-4 md:mx-5">
                <div class="request-row">
                  <div class="method-wrap">
                    <select v-model="requestMethod" class="method-select">
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="PATCH">PATCH</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                  </div>

                  <input
                    v-model="requestPath"
                    type="text"
                    class="url-input"
                    placeholder="http://127.0.0.1:8080/actuator/health 또는 /actuator/health"
                  />

                  <button class="send-btn" :disabled="loading" @click="sendRequest">
                    {{ loading ? '요청 중...' : 'Send' }}
                  </button>
                </div>
              </div>

              <!-- Request Detail Tabs -->
              <div class="request-tabs">
                <button
                  v-for="tab in requestTabs"
                  :key="tab.id"
                  class="request-tab-btn"
                  :class="{ 'request-tab-btn-active': activeRequestTab === tab.id }"
                  @click="activeRequestTab = tab.id"
                >
                  {{ tab.label }}
                </button>
              </div>

              <!-- Request Detail Panels -->
              <div class="request-tab-panel">
                <div v-if="activeRequestTab === 'params'" class="kv-panel">
                  <div v-for="(row, idx) in paramsRows" :key="`param-${idx}`" class="kv-row">
                    <input v-model="row.key" class="kv-input" placeholder="Key" />
                    <input v-model="row.value" class="kv-input" placeholder="Value" />
                    <button class="kv-remove" @click="removeKvRow(paramsRows, idx)">삭제</button>
                  </div>
                  <button class="kv-add" @click="addKvRow(paramsRows)">+ Param 추가</button>
                </div>

                <div v-else-if="activeRequestTab === 'body'" class="tab-block">
                  <textarea
                    v-model="requestBody"
                    class="tab-textarea"
                    placeholder='JSON 본문을 입력하세요. 예) { "name": "kaimier" }'
                  ></textarea>
                </div>

                <div v-else-if="activeRequestTab === 'ui'" class="tab-grid">
                  <label class="tab-label">
                    테마
                    <select v-model="uiMode" class="tab-select">
                      <option value="default">Default</option>
                      <option value="compact">Compact</option>
                    </select>
                  </label>
                  <label class="tab-check">
                    <input v-model="showPrettyJson" type="checkbox" />
                    Pretty JSON 표시
                  </label>
                </div>

                <div v-else-if="activeRequestTab === 'headers'" class="kv-panel">
                  <div v-for="(row, idx) in headerRows" :key="`header-${idx}`" class="kv-row">
                    <input v-model="row.key" class="kv-input" placeholder="Header Key" />
                    <input v-model="row.value" class="kv-input" placeholder="Header Value" />
                    <button class="kv-remove" @click="removeKvRow(headerRows, idx)">삭제</button>
                  </div>
                  <button class="kv-add" @click="addKvRow(headerRows)">+ Header 추가</button>
                </div>

                <div v-else-if="activeRequestTab === 'cookies'" class="tab-block">
                  <input
                    v-model="cookiesText"
                    class="kv-input"
                    placeholder="쿠키 문자열 (예: session=abc123; locale=ko)"
                  />
                </div>

                <div v-else-if="activeRequestTab === 'authorization'" class="tab-grid">
                  <label class="tab-label">
                    타입
                    <select v-model="authType" class="tab-select">
                      <option value="none">None</option>
                      <option value="bearer">Bearer Token</option>
                    </select>
                  </label>
                  <label v-if="authType === 'bearer'" class="tab-label">
                    Token
                    <input v-model="bearerToken" class="kv-input" placeholder="eyJhbGciOi..." />
                  </label>
                </div>

                <div v-else class="tab-grid">
                  <label class="tab-label">
                    Timeout(ms)
                    <input v-model.number="requestTimeout" type="number" min="1000" class="kv-input" />
                  </label>
                  <label class="tab-check">
                    <input v-model="includeCredentials" type="checkbox" />
                    credentials 포함
                  </label>
                </div>
              </div>

            </div>

            <!-- Vertical Splitter -->
            <div class="splitter-horizontal" @mousedown="startVerticalResize($event)"></div>

            <!-- Response Viewer -->
            <div class="center-bottom">
              <p class="mb-1 text-xs font-semibold tracking-wide text-slate-400">RESPONSE</p>
              <pre class="response-scroll flex-1 overflow-auto border border-slate-800 bg-slate-950 p-4 text-xs leading-6 text-slate-200">{{ apiResponseText }}</pre>
            </div>
          </div>
        </div>

        <!-- Left-Right Resizer -->
        <div class="splitter splitter-right" @mousedown="startResize('right', $event)"></div>

        <!-- Right Pane: Status Panel -->
        <aside class="debug-right p-4">
          <p class="text-xs font-semibold tracking-wide text-slate-400">상태 패널</p>
          <div class="mt-3 grid gap-3 text-xs">
            <div class="status-card">
              <p class="text-slate-400">상태</p>
              <p v-if="apiOk" class="mt-1 text-emerald-400">정상 연결</p>
              <p v-else class="mt-1 text-rose-400">연결 실패</p>
            </div>
            <div class="status-card">
              <p class="text-slate-400">마지막 요청</p>
              <p class="mt-1 text-slate-200">{{ lastRequestLabel }}</p>
            </div>
            <div class="status-card">
              <p class="text-slate-400">점검 시간</p>
              <p class="mt-1 text-slate-200">{{ lastCheckedAt }}</p>
            </div>
            <div class="status-card">
              <p class="text-slate-400">오류 메시지</p>
              <p class="mt-1 break-words text-slate-200">{{ apiError || '-' }}</p>
            </div>
            <div class="status-card">
              <p class="text-slate-400">응답 길이</p>
              <p class="mt-1 text-slate-200">{{ apiResponseText.length }} chars</p>
            </div>
            <div class="status-card">
              <p class="text-slate-400">환경</p>
              <p class="mt-1 text-slate-200">Development</p>
            </div>
          </div>
        </aside>
      </div>
      </div>
    </section>
  </main>
</template>

<script setup>
/* Runtime / API Base */
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

/* Request State */
const loading = ref(false)
const apiOk = ref(false)
const apiError = ref('')
const apiResponseText = ref('{}')
const lastCheckedAt = ref('-')
const statusCode = ref('-')
const requestMethod = ref('GET')
const requestPath = ref('/actuator/health')
const lastRequestLabel = ref('GET /actuator/health')

/* Postman-like Session Tabs */
const requestSessions = ref([
  {
    id: 'req-1',
    title: 'Health Check',
    method: 'GET',
    path: '/actuator/health',
    savedTitle: 'Health Check',
    savedMethod: 'GET',
    savedPath: '/actuator/health',
  },
])
const activeSessionId = ref('req-1')
const draggedSessionId = ref(null)
const editingTabId = ref(null)
const editingTabTitle = ref('')

/* Request Config Tabs */
const requestTabs = [
  { id: 'params', label: 'Params' },
  { id: 'body', label: 'Body' },
  { id: 'ui', label: 'UI' },
  { id: 'headers', label: 'Headers' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'authorization', label: 'Authorization' },
  { id: 'settings', label: '설정' },
]
const activeRequestTab = ref('params')
const paramsRows = ref([{ key: '', value: '' }])
const headerRows = ref([{ key: '', value: '' }])
const requestBody = ref('')
const cookiesText = ref('')
const authType = ref('none')
const bearerToken = ref('')
const requestTimeout = ref(15000)
const includeCredentials = ref(false)
const uiMode = ref('default')
const showPrettyJson = ref(true)

/* Left Workspace Tabs */
const workspaceTab = ref('quick')
const workspaceTabs = [
  { id: 'quick', label: '빠른 요청' },
  { id: 'modules', label: '모듈' },
  { id: 'env', label: '환경' },
]
const moduleQuery = ref('')
const quickRequests = [
  { label: 'Health', method: 'GET', path: '/actuator/health' },
  { label: 'Info', method: 'GET', path: '/actuator/info' },
  { label: 'Metrics', method: 'GET', path: '/actuator/metrics' },
]
const moduleList = [
  'Auth',
  'Users',
  'Projects',
  'API Keys',
  'Billing',
  'Webhooks',
  'Monitoring',
]

/* Layout / Resize State */
const debugShellRef = ref(null)
const centerSplitRef = ref(null)
const centerTopRef = ref(null)
const leftPaneWidth = ref(260)
const rightPaneWidth = ref(320)
const centerTopHeight = ref(0)
const userResizedCenterSplit = ref(false)

const MIN_LEFT = 220
const MAX_LEFT = 420
const MIN_RIGHT = 260
const MAX_RIGHT = 460
const CENTER_SPLITTER = 2
const MIN_CENTER_TOP = 180
const MIN_CENTER_BOTTOM = 180

/* Computed / Derived State */
const debugLayoutStyle = computed(() => ({
  gridTemplateColumns: `${leftPaneWidth.value}px 4px minmax(0, 1fr) 4px ${rightPaneWidth.value}px`,
}))

const centerSplitStyle = computed(() => {
  if (!centerTopHeight.value) return null
  return {
    gridTemplateRows: `${centerTopHeight.value}px ${CENTER_SPLITTER}px minmax(0,1fr)`,
  }
})

const normalizedPath = computed(() => {
  const raw = (requestPath.value || '').trim()
  if (!raw) return '/'

  if (/^https?:\/\//i.test(raw)) {
    return raw
  }

  return raw.startsWith('/') ? raw : `/${raw}`
})

const filteredModules = computed(() => {
  const keyword = moduleQuery.value.trim().toLowerCase()
  if (!keyword) return moduleList
  return moduleList.filter((item) => item.toLowerCase().includes(keyword))
})

/* Session Tab Actions */
const activateRequestSession = (sessionId) => {
  const target = requestSessions.value.find((item) => item.id === sessionId)
  if (!target) return
  activeSessionId.value = target.id
  requestMethod.value = target.method
  requestPath.value = target.path
}

const isSessionDirty = (session) => {
  return (
    session.title !== session.savedTitle ||
    session.method !== session.savedMethod ||
    session.path !== session.savedPath
  )
}

const addRequestSession = () => {
  const nextId = `req-${Date.now()}`
  const nextCount = requestSessions.value.length + 1
  const defaultTitle = `새 요청 ${nextCount}`
  const newSession = {
    id: nextId,
    title: defaultTitle,
    method: 'GET',
    path: '/api/new-endpoint',
    savedTitle: defaultTitle,
    savedMethod: 'GET',
    savedPath: '/api/new-endpoint',
  }
  requestSessions.value.push(newSession)
  activateRequestSession(nextId)
}

const removeRequestSession = (sessionId) => {
  const idx = requestSessions.value.findIndex((item) => item.id === sessionId)
  if (idx < 0) return

  requestSessions.value.splice(idx, 1)
  if (requestSessions.value.length === 0) {
    addRequestSession()
    return
  }

  if (activeSessionId.value === sessionId) {
    const fallback = requestSessions.value[Math.max(0, idx - 1)]
    activateRequestSession(fallback.id)
  }
}

const startRename = (session) => {
  editingTabId.value = session.id
  editingTabTitle.value = session.title
}

const confirmRename = (sessionId) => {
  const target = requestSessions.value.find((item) => item.id === sessionId)
  if (!target) return
  const nextTitle = editingTabTitle.value.trim()
  target.title = nextTitle || target.title
  editingTabId.value = null
  editingTabTitle.value = ''
}

const cancelRename = () => {
  editingTabId.value = null
  editingTabTitle.value = ''
}

const startTabDrag = (sessionId, event) => {
  draggedSessionId.value = sessionId
  if (event?.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

const dropTab = (targetSessionId) => {
  const sourceId = draggedSessionId.value
  if (!sourceId || sourceId === targetSessionId) return

  const list = requestSessions.value
  const from = list.findIndex((item) => item.id === sourceId)
  const to = list.findIndex((item) => item.id === targetSessionId)
  if (from < 0 || to < 0) return

  const [moved] = list.splice(from, 1)
  list.splice(to, 0, moved)
  draggedSessionId.value = null
}

const endTabDrag = () => {
  draggedSessionId.value = null
}

/* Left Pane Actions */
const applyQuickRequest = (item) => {
  requestMethod.value = item.method
  requestPath.value = item.path
}

/* Request Execution */
const sendRequest = async () => {
  loading.value = true
  apiError.value = ''
  lastRequestLabel.value = `${requestMethod.value} ${normalizedPath.value}`

  try {
    const targetUrl = /^https?:\/\//i.test(normalizedPath.value)
      ? normalizedPath.value
      : `${apiBase}${normalizedPath.value}`

    const urlObject = new URL(targetUrl)
    for (const row of paramsRows.value) {
      if (row.key?.trim()) {
        urlObject.searchParams.set(row.key.trim(), row.value ?? '')
      }
    }

    const headers = {}
    for (const row of headerRows.value) {
      if (row.key?.trim()) {
        headers[row.key.trim()] = row.value ?? ''
      }
    }

    if (authType.value === 'bearer' && bearerToken.value.trim()) {
      headers.Authorization = `Bearer ${bearerToken.value.trim()}`
    }

    const requestOptions = {
      method: requestMethod.value,
      headers,
      timeout: requestTimeout.value || 15000,
      credentials: includeCredentials.value ? 'include' : 'same-origin',
    }

    const shouldSendBody = ['POST', 'PUT', 'PATCH'].includes(requestMethod.value)
    if (shouldSendBody && requestBody.value.trim()) {
      try {
        requestOptions.body = JSON.parse(requestBody.value)
        if (!headers['Content-Type']) {
          headers['Content-Type'] = 'application/json'
        }
      } catch {
        requestOptions.body = requestBody.value
      }
    }

    const response = await $fetch.raw(urlObject.toString(), requestOptions)
    const result = response._data
    apiOk.value = true
    statusCode.value = String(response.status)
    apiResponseText.value = showPrettyJson.value
      ? JSON.stringify(result, null, 2)
      : JSON.stringify(result)
  } catch (error) {
    apiOk.value = false
    statusCode.value = String(error?.response?.status || '-')
    apiResponseText.value = '{}'
    apiError.value = error?.data?.message || error?.message || '백엔드 서버에 연결할 수 없습니다'
  } finally {
    markActiveSessionSaved()
    lastCheckedAt.value = new Date().toLocaleString('ko-KR')
    loading.value = false
  }
}

/* Shared Helpers */
const addKvRow = (target) => {
  target.value.push({ key: '', value: '' })
}

const removeKvRow = (target, index) => {
  if (target.value.length === 1) {
    target.value[0] = { key: '', value: '' }
    return
  }
  target.value.splice(index, 1)
}

/* Pane Resize Handlers */
const startResize = (side, event) => {
  if (!debugShellRef.value) return

  event.preventDefault()
  const shellRect = debugShellRef.value.getBoundingClientRect()
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'col-resize'

  const onMove = (moveEvent) => {
    if (side === 'left') {
      const nextLeft = moveEvent.clientX - shellRect.left
      leftPaneWidth.value = Math.min(MAX_LEFT, Math.max(MIN_LEFT, nextLeft))
      return
    }

    const distanceFromRight = shellRect.right - moveEvent.clientX
    rightPaneWidth.value = Math.min(MAX_RIGHT, Math.max(MIN_RIGHT, distanceFromRight))
  }

  const onUp = () => {
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

/* Center Split Handlers */
const initCenterSplit = () => {
  if (!centerSplitRef.value || !centerTopRef.value) return

  const totalHeight = centerSplitRef.value.clientHeight
  const available = totalHeight - CENTER_SPLITTER
  if (available <= 0) return

  const contentHeight = centerTopRef.value.scrollHeight + 8
  centerTopHeight.value = Math.max(
    MIN_CENTER_TOP,
    Math.min(available - MIN_CENTER_BOTTOM, contentHeight),
  )
}

const startVerticalResize = (event) => {
  if (!centerSplitRef.value) return

  event.preventDefault()
  userResizedCenterSplit.value = true
  const rect = centerSplitRef.value.getBoundingClientRect()
  const available = rect.height - CENTER_SPLITTER
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'row-resize'

  const onMove = (moveEvent) => {
    const nextTop = moveEvent.clientY - rect.top
    centerTopHeight.value = Math.max(MIN_CENTER_TOP, Math.min(available - MIN_CENTER_BOTTOM, nextTop))
  }

  const onUp = () => {
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

/* Page Meta / Lifecycle */
useSeoMeta({
  title: 'KAPIS.dev API 플레이그라운드',
  description: 'KAPIS API 플레이그라운드 워크스페이스',
})

onMounted(() => {
  sendRequest()
  nextTick(() => {
    initCenterSplit()
  })
})

/* Watchers */
watch(activeRequestTab, async () => {
  if (userResizedCenterSplit.value) return
  await nextTick()
  initCenterSplit()
})

watch([requestMethod, requestPath], ([method, path]) => {
  const target = requestSessions.value.find((item) => item.id === activeSessionId.value)
  if (!target) return
  target.method = method
  target.path = path
})

const markActiveSessionSaved = () => {
  const target = requestSessions.value.find((item) => item.id === activeSessionId.value)
  if (!target) return
  target.savedTitle = target.title
  target.savedMethod = target.method
  target.savedPath = target.path
}
</script>

<style scoped>
/* Request Session Tabs */
.http-tabs {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  border: 1px solid #334155;
  border-radius: 8px 8px 0 0;
}

.http-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 180px;
  max-width: 280px;
  height: 34px;
  border: none;
  border-right: 1px solid #334155;
  border-top: 2px solid transparent;
  border-radius: 0;
  background: #0f172a;
  color: #cbd5e1;
  padding: 0 10px;
  transition: all 0.15s ease;
  cursor: pointer;
}

.http-tab-btn-active {
  border-top-color: #38bdf8;
  background: #13243a;
  color: #e0f2fe;
}

.http-tab-method {
  font-size: 11px;
  font-weight: 700;
  color: #4ade80;
  flex: 0 0 auto;
}

.http-tab-path {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}

.http-tab-input {
  flex: 1 1 auto;
  min-width: 0;
  height: 24px;
  border: 1px solid #475569;
  border-radius: 6px;
  background: #020617;
  color: #e2e8f0;
  font-size: 12px;
  padding: 0 8px;
  outline: none;
}

.http-tab-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #f59e0b;
  flex: 0 0 auto;
}

.http-tab-close {
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #94a3b8;
  font-size: 14px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.http-tab-close:hover {
  background: rgba(71, 85, 105, 0.4);
  color: #e2e8f0;
}

.http-tab-add {
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  border: none;
  border-right: 1px solid #334155;
  background: #0f172a;
  color: #cbd5e1;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.http-tab-more {
  flex: 0 0 auto;
  width: 44px;
  height: 34px;
  border: none;
  background: #0f172a;
  color: #cbd5e1;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
}

.http-tab-btn:hover,
.http-tab-add:hover,
.http-tab-more:hover {
  filter: brightness(1.08);
}

/* Request Bar */
.request-bar {
  border: 1px solid #2b3a50;
  border-radius: 6px;
  background: #0b1322;
  padding: 6px;
}

.status-inline {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  border: 1px solid #334155;
  background: #0f172a;
  padding: 6px 10px;
  font-size: 12px;
  color: #cbd5e1;
  white-space: nowrap;
  overflow: hidden;
}

.status-inline-path {
  background: #0b1220;
  color: #cbd5e1;
  padding: 4px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-inline-time {
  color: #94a3b8;
}

.status-inline-ok {
  margin-left: auto;
  color: #34d399;
  font-weight: 600;
}

.status-inline-error {
  margin-left: auto;
  color: #fb7185;
  overflow: hidden;
  text-overflow: ellipsis;
}

.request-row {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr) 96px;
  gap: 6px;
  align-items: center;
}

/* Request Detail Tabs */
.request-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 0;
  padding: 4px;
  border: 1px solid #243246;
  border-bottom: none;
  background: #0b1322;
}

.request-tab-btn {
  border: 1px solid #273449;
  background: #0f1b2e;
  color: #a9b8cc;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  height: 30px;
  padding: 0 12px;
  transition: all 0.15s ease;
}

.request-tab-btn-active {
  border-color: #38bdf8;
  color: #e0f2fe;
  background: linear-gradient(180deg, #0b3a5f, #0a2f4d);
  box-shadow: inset 0 1px 0 rgba(186, 230, 253, 0.25);
  position: relative;
  z-index: 2;
  margin-bottom: -1px;
  border-bottom-color: #0b1322;
}

.request-tab-btn:hover {
  border-color: #3b4f68;
  color: #d6e2f0;
}

.request-tab-panel {
  border: 1px solid #2b3a50;
  background: linear-gradient(180deg, #0b1322, #0a1220);
  padding: 12px;
  margin-bottom: 0;
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.kv-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.kv-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 66px;
  gap: 8px;
}

.kv-input {
  width: 100%;
  height: 38px;
  border: 1px solid #34475f;
  background: #0f1a2d;
  color: #e8f0fa;
  padding: 0 12px;
  outline: none;
}

.kv-add,
.kv-remove {
  height: 38px;
  border: 1px solid #3a4e68;
  background: #122034;
  color: #d8e3ef;
  font-size: 12px;
  transition: all 0.15s ease;
}

.kv-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
}

.kv-add:hover,
.kv-remove:hover {
  border-color: #4f6582;
  background: #162741;
}

.kv-input:focus,
.tab-textarea:focus,
.tab-select:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.25);
}

.tab-block {
  display: block;
}

.tab-textarea {
  width: 100%;
  min-height: 110px;
  border: 1px solid #475569;
  background: #0f172a;
  color: #e2e8f0;
  padding: 10px;
  outline: none;
}

.tab-grid {
  display: grid;
  gap: 10px;
}

.tab-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;
}

.tab-select {
  height: 36px;
  border: 1px solid #475569;
  background: #0f172a;
  color: #e2e8f0;
  padding: 0 10px;
  outline: none;
}

.tab-check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #cbd5e1;
}

.method-wrap,
.url-input,
.send-btn {
  height: 36px;
}

.method-select {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #065f46;
  font-weight: 600;
  padding: 0 8px;
  outline: none;
}

.url-input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #0f172a;
  padding: 0 10px;
  outline: none;
}

.url-input::placeholder {
  color: #94a3b8;
}

.send-btn {
  border-radius: 4px;
  border: 1px solid #1d4ed8;
  background: #1677ff;
  color: #ffffff;
  font-weight: 600;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 3-Pane Layout */
.debug-layout {
  flex: 1;
  min-height: 0;
  display: grid;
}

.splitter {
  width: 4px;
  cursor: col-resize;
  background: #0f172a;
  border-left: 1px solid #1e293b;
  border-right: 1px solid #1e293b;
}

.splitter:hover {
  background: #1e293b;
}

.debug-left,
.debug-center,
.debug-right {
  min-height: 0;
}

.debug-right {
  background: #020617;
  overflow: auto;
}

.debug-shell {
  display: flex;
  flex-direction: column;
}

.debug-toolbar {
  flex: 0 0 auto;
}

.debug-left,
.debug-center {
  overflow: auto;
}

.center-split {
  height: 100%;
  min-height: 0;
  display: grid;
}

.center-top,
.center-bottom {
  min-height: 0;
}

.center-top {
  display: flex;
  flex-direction: column;
  padding-bottom: 6px;
  overflow: auto;
}

.center-bottom {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Response Scrollbar */
.response-scroll {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.response-scroll:hover {
  scrollbar-color: rgba(148, 163, 184, 0.45) transparent;
}

.response-scroll::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.response-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.response-scroll::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.response-scroll:hover::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.45);
  background-clip: padding-box;
}

.response-scroll::-webkit-scrollbar-corner {
  background: transparent;
}


.splitter-horizontal {
  height: 2px;
  cursor: row-resize;
  background: #1e293b;
}

.splitter-horizontal:hover {
  background: #334155;
}

.status-card {
  border: 1px solid rgba(71, 85, 105, 0.45);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.75));
  border-radius: 10px;
  padding: 12px;
  box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.08);
}

@media (max-width: 1023px) {
  .debug-layout {
    grid-template-columns: 1fr;
  }

  .splitter {
    display: none;
  }

  .debug-left,
  .debug-center,
  .debug-right {
    min-height: auto;
  }

  .request-row {
    grid-template-columns: 1fr;
  }

  .splitter-horizontal {
    display: none;
  }
}
</style>
