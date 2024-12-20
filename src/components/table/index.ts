import { createApp, type Component } from 'vue'
import Table from './Table'
import configure from './configure'

// 工厂模式，用于创建实例
function factory(el: HTMLElement, Comp: Component) {
  if (!el) {
    console.error(`The element does not exist.`)
    return
  }
  const config = configure(el)
  const app = createApp(Comp, { config })
  app.mount(el)
}

export default function (el: HTMLElement) {
  factory(el, Table)
}
