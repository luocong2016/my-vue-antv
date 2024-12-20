import type { TableConfig } from './configure'

import { defineComponent } from 'vue'
import { Table } from 'ant-design-vue'

export default defineComponent({
  name: 'Dialog',

  props: {
    config: {
      type: Object as () => TableConfig,
      default: () => ({
        columns: [],
        dataSource: [],
      }),
    },
  },

  setup(props) {
    console.log(props.config)
    return () => (
      <Table
        columns={props.config.columns}
        dataSource={props.config.dataSource}
      />
    )
  },
})
