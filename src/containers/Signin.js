import React, { Component } from 'react'
import { Link } from 'react-router'
import { Form, Icon, Input, Button, Checkbox, Carousel } from 'antd'

import '../css/Login.css'

const FormItem = Form.Item

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      remember: false,
      name: 'han',
      password: '123456'
    }
  }

  componentDidMount() {
    this.props.form.validateFields()
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields((err, val) => {
      console.log('err: %o, val: %o', err, val)
      this.setState({
        remember: val.remember
      })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { name, password } = this.state

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
                getFieldDecorator('userName', {
                  initialValue: name,
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
              <Link className="login-form-forgot">忘记密码？</Link>
              <Button type="primary" htmlType="submit" className="login-form-button loginbtn">
                登录
              </Button>
              <Link to='/signup'>马上注册</Link>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const Signin = Form.create()(Login)

export default Signin