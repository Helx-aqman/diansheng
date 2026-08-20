import { reactive } from 'vue'
import { books } from '@/mock/books'
import { tasks as taskSeed } from '@/mock/tasks'
import { user as userSeed } from '@/mock/user'
import { load, save } from '@/utils/storage'

const THEME_KEY = 'ttbd_theme'
const EASY_KEY = 'ttbd_easy'
const BEAN_KEY = 'ttbd_beans'
const TASK_KEY = 'ttbd_tasks'
const LOGIN_KEY = 'ttbd_login'
const POINTS_KEY = 'ttbd_points_log'

export const state = reactive({
  theme: 'warm',
  easy: true,
  login: false,
  beans: 0,
  user: { name: userSeed.name, avatar: userSeed.avatar },
  books: books,
  tasks: JSON.parse(JSON.stringify(taskSeed)),
  pointsLog: []
})

function nowStr() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getMonth() + 1}/${d.getDate()} ${p(d.getHours())}:${p(d.getMinutes())}`
}

export function initApp() {
  const t = load(THEME_KEY)
  if (t) state.theme = t
  const e = load(EASY_KEY)
  state.easy = e !== '0' // 默认开启
  const b = load(BEAN_KEY)
  if (b !== null && b !== '') state.beans = Number(b)
  const lg = load(LOGIN_KEY)
  state.login = lg === '1'
  const tk = load(TASK_KEY)
  if (tk) { try { state.tasks = JSON.parse(tk) } catch (e) {} }
  const pl = load(POINTS_KEY)
  if (pl) { try { state.pointsLog = JSON.parse(pl) } catch (e) {} }
  applyTheme()
  applyEasy()
}

export function applyTheme() {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', state.theme)
  }
  save(THEME_KEY, state.theme)
}
export function setTheme(k) {
  state.theme = k
  applyTheme()
}
export function applyEasy() {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('easy', state.easy)
  }
  save(EASY_KEY, state.easy ? '1' : '0')
}
export function toggleEasy() {
  state.easy = !state.easy
  applyEasy()
}

export function addBeans(n, reason) {
  state.beans += n
  save(BEAN_KEY, state.beans)
  state.pointsLog.unshift({ time: nowStr(), delta: n, reason: reason || '获取' })
  save(POINTS_KEY, state.pointsLog)
}
export function useBeans(n, reason) {
  if (state.beans < n) return false
  state.beans -= n
  save(BEAN_KEY, state.beans)
  state.pointsLog.unshift({ time: nowStr(), delta: -n, reason: reason || '消耗' })
  save(POINTS_KEY, state.pointsLog)
  return true
}
export function claimTask(id) {
  const t = state.tasks.find((x) => x.id === id)
  if (t && !t.done) {
    t.done = true
    save(TASK_KEY, state.tasks)
    addBeans(t.reward, t.name)
    return true
  }
  return false
}
export function resetDailyTasks() {
  state.tasks.forEach((t) => { if (t.type === 'daily') t.done = false })
  save(TASK_KEY, state.tasks)
}

export function doLogin() {
  state.login = true
  save(LOGIN_KEY, '1')
}
export function doLogout() {
  state.login = false
  save(LOGIN_KEY, '0')
}
