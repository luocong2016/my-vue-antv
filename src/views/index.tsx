import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',

  meta: {
    title: '首页',
  },

  setup() {
    return () => (
      <div>
        <h1>Home1</h1>
      </div>
    )
  },
})
