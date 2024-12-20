import type { App } from 'vue'

import registerAntDesignVue from './ant-design-vue'
import registerRouter from './router'
import './style'

export default function (app: App) {
  registerAntDesignVue(app)
  registerRouter(app)
}
