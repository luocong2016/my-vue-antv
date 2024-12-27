import type { TableConfig } from './configure'

import { defineComponent, reactive, ref } from 'vue'
import { DownOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import {
  type CarouselProps,

  StyleProvider, ConfigProvider, legacyLogicalPropertiesTransformer,
  Table, Space, Menu, MenuItem, Dropdown, Form, Input, Checkbox, Button, ButtonGroup,
  Tag, Tabs, Watermark, Progress, Modal, Drawer,
  RadioGroup, Radio, Carousel,
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

    const defaultPercent = ref(0)
    const increase = () => {
      const percent = defaultPercent.value + 10;
      defaultPercent.value = percent > 100 ? 100 : percent;
    };

    const decline = () => {
      const percent = defaultPercent.value - 10;
      defaultPercent.value = percent < 0 ? 0 : percent;
    };


    const open = ref(false)
    const toggle = (show?: boolean) => {
      open.value = show ?? !open.value
    }
    const handleOk = (e: MouseEvent) => {
      console.log(e);
      toggle()
    };

    const dotPosition = ref<CarouselProps['dotPosition']>('top')

    const drawerOpen = ref(false)
    const drawerToggle = (show?: boolean) => {
      drawerOpen.value = show ?? !drawerOpen.value
    }

    return () => (
      <StyleProvider hash-priority="high" transformers={[legacyLogicalPropertiesTransformer]}>
        <ConfigProvider componentSize="large">
          <Tabs v-model={[activeKey.value, 'activeKey']}>
            <Tabs.TabPane key="1" tab="表格">
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
            <Tabs.TabPane key="2" tab="水印">
              <Watermark content="Ant Design Vue">
                <div style="height: 500px">
                  Content of Tab Pane 2
                  <Modal v-model={[open.value, 'open']} title="Basic Modal" onOk={handleOk}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                  </Modal>
                  <Drawer
                    title="Basic Drawer"
                    placement={dotPosition.value}
                    closable={false}
                    open={drawerOpen.value}
                    onClose={() => drawerToggle(false)}
                  >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                  </Drawer>
                  <Space direction='vertical' style={{ width: '100%' }}>
                    <Button onClick={() => toggle()}>Open Modal</Button>
                    <Space>
                      <RadioGroup v-model={[dotPosition.value, 'value']} style={{ marginRight: '8px' }}>
                        <Radio value="top">top</Radio>
                        <Radio value="bottom">bottom</Radio>
                        <Radio value="left">left</Radio>
                        <Radio value="right">right</Radio>
                      </RadioGroup>
                      <Button type="primary" danger onClick={() => drawerToggle(true)}>Open Drawer</Button>
                    </Space>
                  </Space>
                </div>
              </Watermark>
            </Tabs.TabPane>
            <Tabs.TabPane key="3" tab="进度条">
              <Space direction='vertical' style={{ width: '100%' }}>
                <Progress type="dashboard" percent={70} />
                <Space>
                  <Progress type="circle" percent={defaultPercent.value} />
                  <ButtonGroup>
                    <Button v-slots={{ icon: () => <MinusOutlined /> }} onClick={decline} />
                    <Button v-slots={{ icon: () => <PlusOutlined /> }} onClick={increase} />
                  </ButtonGroup>
                </Space>
                <Space>
                  <Progress steps={3} percent={50} />
                  <Progress steps={3} percent={50} size="small" />
                  <Progress steps={3} percent={50} size={20} />
                  <Progress steps={3} percent={50} size={[20, 30]} />
                </Space>
              </Space>
            </Tabs.TabPane>
            <Tabs.TabPane key="4" tab="走马灯">
              <RadioGroup v-model={[dotPosition.value, 'value']} style={{ marginBottom: '8px' }}>
                <Radio.Button value="top">top</Radio.Button>
                <Radio.Button value="bottom">bottom</Radio.Button>
                <Radio.Button value="left">left</Radio.Button>
                <Radio.Button value="right">right</Radio.Button>
              </RadioGroup>
              <Carousel
                dotPosition={dotPosition.value}
                autoplay
                style={{
                  textAlign: 'center',
                  background: '#364d79',
                  height: '160px',
                  lineHeight: '160px',
                  overflow: 'hidden',
                  color: '#fff'
                }}>
                <div><h3>1</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
              </Carousel>
            </Tabs.TabPane>
          </Tabs>
        </ConfigProvider>
      </StyleProvider >
    )
  },
})
