import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { Chart } from '@antv/g2'

export default defineComponent({
  name: 'g2-01',

  setup() {
    const container = ref<HTMLDivElement>()
    let chart: Chart | null = null

    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]

    onMounted(() => {
      chart = new Chart({
        container: container.value,
      })

      chart
        .interval() // 创建一个 Interval 标记
        .data(data) // 绑定数据
        .encode('x', 'genre') // 编码 x 通道
        .encode('y', 'sold') // 编码 y 通道

      chart.render()
    })

    onUnmounted(() => {
      chart?.destroy()
    })

    return () => <div ref={container} />
  },
})
