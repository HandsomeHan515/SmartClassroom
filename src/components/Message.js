import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Popconfirm, Spin } from 'antd'

import { transformTime } from '../method/time'
import { getMessage, addMessage, deleteMessage } from '../actions'

import '../css/Message.css'

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  componentWillMount() {
    this.props.getMessage()
  }

  handleChangeValue = e => {
    this.setState({
      value: e.target.value
    })
  }

  handleClickSaveMessage = () => {
    let content = this.state.value
    let time = Date.parse(new Date()) / 1000

    let payload = {
      content,
      time,
    }

    if (content) {
      this.props.addMessage({ payload })
    }

    this.setState({
      value: ''
    })
  }

  handleClickDeleteMessage = payload => {
    this.props.deleteMessage({ payload })
  }

  render() {
    const { message, isFetching } = this.props

    return (
      <div style={{ margin: '20px 30px' }}>
        <textarea
          className='textarea'
          placeholder='请输入您要发布的内容...'
          value={this.state.value}
          onChange={e => this.handleChangeValue(e)}
        >
        </textarea>
        <div className='save'>
          <Button
            type='primary'
            onClick={this.handleClickSaveMessage}
          >
            发布
          </Button>
        </div>

        {
          isFetching ? null : <h3 style={{ lineHeight: '50px' }}>已发布信息</h3>
        }
        {
          isFetching ?
            <Spin>
              <div style={{ textAlign: 'center' }}>
                数据加载中...
              </div>
            </Spin>
            :
            message.map((item, index) => {
              let time = transformTime(item.time)

              return (
                <div key={index} className='message-con' >
                  <div>
                    <span style={{ display: 'inline-block' }}>{time}</span>
                    <div style={{ float: 'right', display: 'inline-block', marginRight: 22 }}>
                      <Popconfirm
                        placement='bottom'
                        title='确认删除该信息吗？'
                        onConfirm={() => this.handleClickDeleteMessage(item)}
                      >
                        <Button type='danger'>
                          删除
                        </Button>
                      </Popconfirm>
                    </div>
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
    message: state.result.message,
    isFetching: state.status.message.isFetching,
  })
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getMessage,
    addMessage,
    deleteMessage,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)