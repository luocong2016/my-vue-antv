import type { TableConfig } from './configure'

import { defineComponent, reactive, ref } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import {
  StyleProvider, ConfigProvider, legacyLogicalPropertiesTransformer,
  Table, Space, Menu, MenuItem, Dropdown, Form, Input, Checkbox, Button, Tag,
  Tabs,
} from 'ant-design-vue'

interface FormState {
  username: string
  password: string
  remember: boolean
}

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

    const activeKey = ref('1')

    const formState = reactive<FormState>({
      username: '',
      password: '',
      remember: true,
    });

    const onFinish = (values: any) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return () => (
      <StyleProvider hash-priority="high" transformers={[legacyLogicalPropertiesTransformer]}>
        <ConfigProvider componentSize="large">
          <Tabs v-model={[activeKey.value, 'activeKey']}>
            <Tabs.TabPane key="1" tab="Tab 1">
              <Space direction='vertical' style={{ width: '100%' }}>
                <Dropdown v-slots={{
                  overlay: () => <Menu>
                    <MenuItem key='1'>1st menu item</MenuItem>
                    <MenuItem key='2'>2st menu item</MenuItem>
                    <MenuItem key='3'>3st menu item</MenuItem>
                  </Menu>
                }}>
                  <a onClick={e => e.preventDefault()}>
                    Hover me <DownOutlined />
                  </a>
                </Dropdown>

                <Form
                  name="basic"
                  model={formState}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 8 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input v-model={[formState.username, 'value']} />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password v-model={[formState.password, 'value']} />
                  </Form.Item>

                  <Form.Item name="remember" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox v-model={[formState.remember, 'checked']}>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" html-type="submit">Submit</Button>
                  </Form.Item>
                </Form>

                <Table
                  bordered
                  style={{ width: '100%' }}
                  columns={props.config.columns}
                  dataSource={props.config.dataSource}
                  v-slots={{
                    bodyCell: ({ column, text }: any) => {
                      switch (column.key) {
                        case "tags":
                          return text.map((tag: string) => <Tag color={tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'}>{tag}</Tag>)
                        case "action":
                          return <a>action</a>
                        default:
                          return null
                      }
                    }
                  }}
                />
              </Space>
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab="Tab 2">
              Content of Tab Pane 2
            </Tabs.TabPane>
          </Tabs>
        </ConfigProvider>
      </StyleProvider >
    )
  },
})
