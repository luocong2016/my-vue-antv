import { createWebHistory, createRouter } from 'vue-router'

import emitter from '../tools/event-emitter'

interface ComponentInfo {
  name?: string
  meta?: Record<string, string | number>
  [key: string]: any
}

const compModules = import.meta.glob('../views/**/*.tsx')
const compInfoModules: Record<string, ComponentInfo> = import.meta.glob(
  '../views/**/*.tsx',
  {
    eager: true,
    import: 'default',
  }
)

const routes = Object.entries(compInfoModules).map(([key, config]) => {
  const path =
    key.replace('../views', '').replace(/(index.tsx|.tsx)$/, '') || '/'
  const name =
    config?.name ?? (path.replace(/^\//, '').replace(/\//g, '-') || '/')

  return {
    path,
    name,
    meta: config?.meta,
    component: compModules[key],
  }
})

console.log(routes)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
})

/* 触发路由功能 */
// 无登录权限
emitter.on('API:UN_AUTH', () => {
  router.push('/login')
})

// 无效权限
emitter.on('API:INVALID', () => {
  router.push('/login')
})

// 动态加载路由 addRoute

// 删除路由 removeRoute

// 重置路由权限 app.config.globalProperties.$router

export default router
