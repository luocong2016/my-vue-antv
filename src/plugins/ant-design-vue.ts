import type { App } from 'vue'

import 'ant-design-vue/dist/reset.css'

import { message } from 'ant-design-vue'

export default function (app: App) {
  app.config.globalProperties.$message = message
}
