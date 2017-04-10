import React, { Component } from 'react'
import { Button, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { transformTime } from '../method/time'
import { addMessage, deleteMessage } from '../actions'

import '../css/Message.css'

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
    let id = this.props.message.length + 1 //after get id from service
    let content = this.value
    let time = Math.floor(new Date().getTime() / 1000)

    if (!content) return false
    this.props.addMessage({ id, content, time })
    this.value = ''
    this.setState({
      value: ''
    })
  }

  handleClickDeleteMessage = messageID => {
    this.props.deleteMessage(messageID)
  }

  render() {
    const { message } = this.props

    return (
      <div style={{ margin: '20px 30px' }}>
        <textarea
          className='textarea'
          placeholder='请输入您要发布的内容...'
          value={this.state.value}
          onChange={(e) => this.handleChangeValue(e)}
        >
        </textarea>

        <div className='save'>
          <Button
            type='primary'
            onClick={this.handleClickSaveMessage}
          >
            保存
          </Button>
        </div>
        {
          message.map((item, index) => {
            let time = transformTime(item.time)
            let messageID = item.id
            return (
              <div key={index} className='message-con' >
                <div>
                  <span style={{ display: 'inline-block', marginRight: 146 }}>{time}</span>
                  <Popconfirm
                    placement='bottom'
                    title='确认删除该信息吗？'
                    onConfirm={() => this.handleClickDeleteMessage(messageID)}
                  >
                    <Button type='danger'>
                      删除
                    </Button>
                  </Popconfirm>
                </div>

                <p className='content'>{item.content}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    message: state.message
  })
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addMessage,
    deleteMessage
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)