import React, { Component } from 'react'
import { Table, Button, Modal } from 'antd'

import { student } from '../data'

import '../css/OnlineStatistics.css'

class OnlineStatistics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  send = () => {
    this.setState({
      visible: false
    })
  }

  cancelSend = () => {
    this.setState({
      visible: false
    })
  }

  renderModal = props => {
    const { students } = props
    const columns = [
      { title: '姓名', dataIndex: 'name', id: 'name', width: '30%' },
      { title: '学号', dataIndex: 'studentID', id: 'sid' },
      { title: '职务', dataIndex: 'duty', id: 'duty' },
      { title: '手机号码', dataIndex: 'phone', id: 'phone' },
    ]

    return (
      <Modal
        width={980}
        visible={this.state.visible}
        onCancel={this.send}
        onOk={this.cancelSend}
        title='未出勤人员名单'
      >
        <Table
          rowKey='id'
          bordered
          dataSource={students}
          columns={columns}
        />
      </Modal>
    )
  }

  render() {
    const columns = [
      { title: '姓名', dataIndex: 'name', id: 'name', width: '30%' },
      { title: '学号', dataIndex: 'studentID', id: 'sid' },
      { title: '职务', dataIndex: 'duty', id: 'duty' },
      { title: '状态', dataIndex: 'status', id: 'status' },
    ]

    let online = 0, offline = 0
    for (let item of student) {
      if (item.status === '在线') {
        online++
      } else {
        offline++
      }
    }

    const offlineStudens = student.filter(item => item.status === '离线')

    console.log('status: %o', offlineStudens, online, offline)

    return (
      <div>
        <div style={{ margin: '10px 0' }}>
          <span>该班级总人数：{student.length}</span>
          <span className="header">当前在线人数： {online}</span>
          <span className="header">当前离线人数： {offline}</span>
          {
            !offline ? null :
              <Button
                type='danger'
                style={{ float: 'right', marginRight: 30 }}
                onClick={() => { this.setState({ visible: true }) }}
              >
                点击查看缺勤学生信息
              </Button>
          }
        </div>
        <Table
          rowKey='id'
          bordered
          dataSource={student}
          columns={columns}
        />
        <this.renderModal students={offlineStudens} />
      </div>
    )
  }
}

export default OnlineStatistics