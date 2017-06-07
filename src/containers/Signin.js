import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Form, Icon, Input, Button, Checkbox, Carousel, message } from 'antd'

import { request } from '../service/utils'
import { address } from '../service/address'
import { appCore } from '../service'

import '../css/Login.css'

const FormItem = Form.Item

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  signin = body => {
    return request({
      url: address.login,
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then(resp => {
        console.log('resp: %o', resp)
        if (resp.username) {
          message.success('登录成功', 3)
          browserHistory.push({ pathname: '/' })
        }
      })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields((err, val) => {
      if (!err) {
        const { username, remember } = val

        appCore.username = username
        if (remember) {
          if (window.localStorage) {
            localStorage.setItem('username', username)
          }
        }

        browserHistory.push({ pathname: '/' })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { username, password } = this.state

    return (
      <div>
        <Carousel effect="fade" autoplay={true} dots={false}>
          <div className='loginbg1' style={{ height: document.body.clientHeight }}></div>
          <div className='loginbg2' style={{ height: document.body.clientHeight }}></div>
        </Carousel>
        <div className="login-position">
          <h2 className="login-header">智慧教室管理系统</h2>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {
                getFieldDecorator('username', {
                  initialValue: username,
                  rules: [{ required: true, message: '请输入您的账号!' }],
                })(<Input addonBefore={<Icon type="user" />} type="text" placeholder="账号" />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  initialValue: password,
                  rules: [{ required: true, message: '请输入您的密码!' }],
                })(<Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>记住密码</Checkbox>)
              }
              <Link to='/signup' className="login-form-forgot">注册</Link>
              <Button type="primary" htmlType="submit" className="login-form-button loginbtn">
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const Signin = Form.create()(Login)

export default Signin