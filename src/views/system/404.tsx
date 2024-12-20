import { defineComponent } from 'vue'

export default defineComponent({
  name: '404',

  meta: {
    title: '404',
  },

  setup() {
    return () => (
      <div>
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    )
  },
})
