import { createApp } from 'vue'
import App from './App'
import register from './plugins'

const app = createApp(App)

register(app)

app.mount('#app')
