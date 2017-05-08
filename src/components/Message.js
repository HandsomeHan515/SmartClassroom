import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Popconfirm } from 'antd'

import { transformTime } from '../method/time'
import { addMessage, deleteMessage } from '../actions'

import '../css/Message.css'

class Message extends Component {
  constructor() {
    super()

    this.state = {
      value: ''
    }
  }

  componentWillMount() {

  }

  handleChangeValue = e => {
    this.setState({
      value: e.target.value
    })
  }

  handleClickSaveMessage = () => {
    let id = this.props.message.length + 1 //after get id from service
    let content = this.state.value
    let time = Date.parse(new Date()) / 1000

    console.log(time)

    if (content) {
      this.props.addMessage({ id, content, time })
    }

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

                <p className='content'>
                  {item.content}
                </p>
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
    message: state.result.message
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