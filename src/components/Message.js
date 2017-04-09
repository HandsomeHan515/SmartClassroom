import React, { Component } from 'react'
import { Button, Popconfirm } from 'antd'

import { transformTime } from '../method/time'

import { message } from '../data'

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: message,
      value: '',
    }

    this.value = ''
  }

  handleChangeValue = e => {
    this.value = e.target.value
    this.setState({
      value: this.value
    })
  }

  handleClickSaveMessage = () => {
    let tmpMessage = this.state.message.slice()
    let id = this.state.message.length + 1
    let content = this.value
    let time = Math.floor(new Date().getTime() / 1000)
    if(!content) return false
    tmpMessage.unshift({ id, content, time })
    this.value = ''
    this.setState({
      message: tmpMessage,
      value: ''
    })
  }

  handleClickDeleteMessage = i => {
    let tmpMessage = this.state.message.slice()
    tmpMessage.splice(i, 1)
    this.setState({
      message: tmpMessage
    })
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <textarea
          value={this.state.value}
          onChange={(e) => this.handleChangeValue(e)}
        >
        </textarea>
        <div>
          <Button
            type='primary'
            onClick={this.handleClickSaveMessage}
          >
            保存
          </Button>
          <Button type='ghost'>取消</Button>
        </div>
        {
          this.state.message.map((item, index) => {
            let time = transformTime(item.time)

            return (
              <div key={index}>
                <div>{item.content}</div>
                <div>
                  <Popconfirm
                    placement='right'
                    title='确认删除该信息吗？'
                    onConfirm={() => this.handleClickDeleteMessage(index)}
                  >
                    <Button type='danger'>
                      删除
                    </Button>
                  </Popconfirm>
                  <span>{time}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Message