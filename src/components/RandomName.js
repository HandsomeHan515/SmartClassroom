import React, { Component } from 'react'
import { Row, Col, Button, Modal } from 'antd'

import Timer from './Timer'

import { student } from '../data'

import '../css/RandomName.css'

class RandomName extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      time: 3,
      number: 1,
      text: '请点击开始按钮',
      timerVisible: false,
    }

    this.timer = null
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
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
      time: 3,
      number: 1,
      text: '请点击开始按钮'
    })
  }

  reset = () => {
    clearTimeout(this.timer)

    this.setState({
      time: 3,
      number: 1,
      text: '请点击开始按钮',
    })
  }

  start = () => {
    clearTimeout(this.timer)

    let arr = [], newStu = []
    while (arr.length < this.state.number) {
      let flag = true
      const select = Math.floor(Math.random() * student.length)

      if (!arr.length) {
        arr.push(select)
        newStu.push(student[select].name)
      }

      for (let i = 0; i < arr.length; i++) {
        if (select === arr[i]) {
          flag = false
        }
      }

      if (flag) {
        arr.push(select)
        newStu.push(student[select].name)
      }
    }

    const text = newStu.map((item, index) => {
      if (index === newStu.length - 1) {
        return (
          <span key={index} className="select-con">{item}</span>
        )
      }
      return (
        <span key={index} className="select-con">{item}、 </span>
      )
    })
    this.setState({
      timerVisible: false,
      text,
    })
  }

  timeChange = e => {
    clearTimeout(this.timer)

    let time = e.target.value
    if (time < 0) {
      time = 0
    }

    this.setState({
      time
    })
  }

  numberChange = e => {
    clearTimeout(this.timer)

    let number = e.target.value
    if (number < 0) {
      number = 0
    }

    this.setState({
      number
    })
  }

  select = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(this.start, this.state.time * 1000)

    this.setState({
      timerVisible: true,
      text: '',
    })
  }

  render() {
    const { text, time, number, visible, timerVisible } = this.state

    return (
      <div style={{ display: 'inline-block', marginLeft: 30, float: 'right' }}>
        <Button type='primary' onClick={this.showModal}>随机点名</Button>
        <Modal
          style={{ top: 300 }}
          footer={false}
          visible={visible}
          title='随机点名'
          onCancel={this.cancelSend}
        >
          <Row type='flex' style={{ height: 40, lineHeight: '40px' }}>
            <Col span={4} offset={13}>
              <span>人数：</span>
              <input
                type="number"
                className="number"
                value={number}
                onChange={this.numberChange}
              />
              <span>人</span>
            </Col>
            <Col span={6} offset={1}>
              <span>倒数计数：</span>
              <input
                type="number"
                className="number"
                value={time}
                onChange={this.timeChange}
              />
              <span>秒</span>
            </Col>
          </Row>
          <div className="select">
            {text ? <span>{text}</span> : <Timer time={time} start={timerVisible} />}
          </div>
          <Row type='flex'>
            <Col span={3} offset={13}><Button onClick={this.select}>开始</Button></Col>
            <Col span={3} offset={1}><Button onClick={this.reset}>重设</Button></Col>
            <Col span={3} offset={1}><Button onClick={this.cancelSend}>退出</Button></Col>
          </Row>
        </Modal>
      </div >
    )
  }
}

export default RandomName
