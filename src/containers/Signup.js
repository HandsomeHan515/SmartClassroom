import React, { Component } from 'react'
import { Form, Input, Carousel, Button } from 'antd'

import '../css/Login.css'

const FormItem = Form.Item

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      passwordDirty: false,
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, val) => {
      if (!err) {
        console.log('Received values of form: ', val)
      }
    })
  }

  handlePasswordBlur = e => {
    const { value } = e.target

    this.setState({
      passwordDirty: this.state.passwordDirty || !!value
    })
  }

  checkPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('您输入的两个密码不一致!')
    } else {
      callback()
    }
  }

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }

    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    }

    return (
      <div>
        <Carousel effect="fade" autoplay={true} dots={false}>
          <div className='loginbg1' style={{ height: document.body.clientHeight }}></div>
          <div className='loginbg2' style={{ height: document.body.clientHeight }}></div>
        </Carousel>
        <div className="login-position">
          <h2 className="login-header">智慧教室管理系统</h2>
          <FormItem
            {...formItemLayout}
            label='用&nbsp;&nbsp;户&nbsp;&nbsp;名'
            hasFeedback
          >
            {
              getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请输入您的用户名!' }],
              })(<Input placeholder="请输入用户名..." />)
            }
          </FormItem>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="邮箱账号"
              hasFeedback
            >
              {
                getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: '输入的邮箱账号无效!',
                  }, {
                    required: true, message: '请输入你的邮箱账号!',
                  }],
                })(<Input placeholder="请输入邮箱地址..." />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码"
              hasFeedback
            >
              {
                getFieldDecorator('password', {
                  rules: [{
                    required: true, message: '请输入您的密码!',
                  }, {
                    validator: this.checkConfirm,
                  }],
                })(<Input type="password" onBlur={this.handlePasswordBlur} placeholder="请输入密码..." />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认密码"
              hasFeedback
            >
              {
                getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: '请再次确认密码!',
                  }, {
                    validator: this.checkPassword,
                  }],
                })(<Input type="password" placeholder="请再次输入密码..." />)
              }
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" size="large" className='loginbtn'>立即注册</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const Signup = Form.create()(Register)

export default Signup