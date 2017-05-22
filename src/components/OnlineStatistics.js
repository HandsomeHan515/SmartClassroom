import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Button, Modal } from 'antd'

import RandomName from './RandomName'

import { getStudent } from '../actions'

import '../css/OnlineStatistics.css'

class OnlineStatistics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }
  }

  componentWillMount() {
    this.props.getStudent()
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  cancelSend = () => {
    this.setState({
      visible: false
    })
  }

  renderModal = props => {
    const { offline } = props
    const columns = [
      { title: '姓名', dataIndex: 'name', id: 'name', width: '30%' },
      { title: '学号', dataIndex: 'studentID', id: 'sid' },
      { title: '职务', dataIndex: 'duty', id: 'duty' },
      { title: '手机号码', dataIndex: 'phone', id: 'phone' },
      { title: '邮箱', dataIndex: 'email', id: 'email' },
    ]

    return (
      <Modal
        width={980}
        visible={this.state.visible}
        onCancel={this.cancelSend}
        title='未出勤人员名单'
        footer={null}
      >
        <Table
          rowKey='id'
          bordered
          dataSource={offline}
          columns={columns}
        />
      </Modal>
    )
  }

  render() {
    const { student } = this.props
    const columns = [
      { title: '姓名', dataIndex: 'name', id: 'name', width: '30%' },
      { title: '学号', dataIndex: 'studentID', id: 'sid' },
      { title: '职务', dataIndex: 'duty', id: 'duty' },
      { title: '状态', dataIndex: 'status', id: 'status' },
    ]

    let online = 0, offline = 0
    for (let item of student) {
      if (item.status === 'online') {
        online++
      } else {
        offline++
      }
    }

    const offlineStudents = student.filter(item => item.status === 'offline')
    const onlineStudents = student.filter(item => item.status === 'online')

    return (
      <div>
        <div style={{ margin: '10px 0' }}>
          <span>该班级总人数：{student.length}</span>
          <span className="header">当前在线人数： {online}</span>
          <span className="header">当前离线人数： {offline}</span>
          <RandomName online={onlineStudents} />
          {
            !offline ? null :
              <Button
                type='danger'
                style={{ float: 'right', marginRight: 30 }}
                onClick={this.showModal}
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
        <this.renderModal offline={offlineStudents} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    student: state.result.student
  })
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getStudent
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnlineStatistics)