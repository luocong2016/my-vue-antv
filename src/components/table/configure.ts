type Column = {
  name: string
  dataIndex: string
  key: string
}

type Data = {
  key: string
  name: string
  age: number
  [key: string]: any
}

export interface TableConfig {
  startPosition?: string
  columns: Column[]
  dataSource: Data[]
}

export default function (el: HTMLElement): TableConfig {
  // HMI 配置项测试
  const startPosition = el.getAttribute('start-position') || 'right'
  const columns = JSON.parse(el.getAttribute('columns') || '[]')
  const dataSource = JSON.parse(el.getAttribute('data-source') || '[]')

  return {
    startPosition,
    columns,
    dataSource,
  }
}
