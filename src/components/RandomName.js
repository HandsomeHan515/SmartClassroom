import React, { Component } from 'react'
import { Row, Col, Button, Modal } from 'antd'

class RandomName extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      student: '点击开始按钮',
      time: 0,
      peopleNum: 0,
    }

    //定时器
    this.timer = null
  }

  showModal = () => {
    clearTimeout(this.timer)

    this.setState({
      visible: true
    })
  }

  cancelSend = () => {
    clearTimeout(this.timer)

    this.setState({
      visible: false,
      student: '点击开始按钮',
    })
  }

  reset = () => {
    clearTimeout(this.timer)

    this.setState({
      student: '点击开始按钮'
    })
  }

  start = () => {
    clearTimeout(this.timer)

    let arr = []
    let newStu = []
    while (arr.length < this.state.peopleNum) {
      let flag = true
      let selectNum = Math.floor(Math.random() * students.length)
      if (!arr.length) {
        arr.push(selectNum)
        newStu.push(students[selectNum].name)
      }

      for (let i = 0; i < arr.length; i++) {
        if (selectNum === arr[i]) {
          flag = false
        }
      }

      if (flag) {
        arr.push(selectNum)
        newStu.push(students[selectNum].name)
      }
    }

    this.setState({
      student: newStu.map((item, index) => <span key={index} style={{ display: 'inline-block', marginLeft: 10 }}>{item}</span>)
    })
  }

  timeChange = e => {
    clearTimeout(this.timer)

    if (e.target.value < 0) {
      e.target.value = 0
    }

    this.setState({
      time: e.target.value
    })
  }

  peopleNumChange = e => {
    clearTimeout(this.timer)

    if (e.target.value < 0) {
      e.target.value = 0
    }

    this.setState({
      peopleNum: e.target.value
    })
  }

  select = () => {
    clearTimeout(this.timer)

    this.timer = setTimeout(this.start, this.state.time * 1000)
  }

  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <span onClick={this.showModal}>随机点名</span>
        <Modal
          style={{ top: 300 }}
          footer={false}
          visible={this.state.visible}
          onCancel={this.cancelSend}
        >
          <Row type='flex' style={{ height: 60, lineHeight: '60px' }}>
            <Col span={6} style={{ fontSize: 18 }}>随机点名</Col>
            <Col span={4} offset={8}>
              <span>人数：</span>
              <input
                type="number"
                value={this.state.peopleNum}
                onChange={this.peopleNumChange}
                style={{ width: 30, lineHeight: '14px', outline: 'none' }}
              />
            </Col>
            <Col span={6}>
              <span>倒数计数：</span>
              <input
                type="number"
                value={this.state.time}
                onChange={this.timeChange}
                style={{ width: 30, lineHeight: '14px', outline: 'none' }}
              />
              <span>秒</span>
            </Col>
          </Row>
          <div style={{ height: 100, lineHeight: '100px', fontSize: 20, textAlign: 'center' }}>
            {this.state.student}
          </div>
          <Row type='flex'>
            <Col span={3} offset={15}><Button onClick={this.cancelSend}>退出</Button></Col>
            <Col span={3}><Button onClick={this.reset}>重设</Button></Col>
            <Col span={3}><Button onClick={this.select}>开始</Button></Col>
          </Row>
        </Modal>
      </div >
    )
  }
}

export default RandomName