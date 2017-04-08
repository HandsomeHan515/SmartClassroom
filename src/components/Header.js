import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Icon, Menu, Affix, Popover, Button } from 'antd'

import { navMenu } from '../data'

import '../css/Header.css'

const content = (
  <div className='change-button-con'>
    <p><Link>登录</Link></p>
    <p><Link>注册</Link></p>
    <p><Link>修改密码</Link></p>
  </div>
)

class Header extends Component {
  render() {
    return (
      <div>
        <Affix>
          <Row>
            <Col span={4}></Col>
            <Col span={16}>
              <Menu mode='horizontal'>
                {
                  navMenu.map((item, index) => {
                    return (
                      <Menu.Item key={index} >
                        <Link className='nav' to={item.link} >
                          <Icon type={item.type} />
                          {item.name}
                        </Link>
                      </Menu.Item>
                    )
                  })
                }
              </Menu>
            </Col>
            <Col className='change-button' span={4}>
              <Popover content={content} placement='bottom' trigger='click' >
                <Button type='primary'>个人设置</Button>
              </Popover>
            </Col>
          </Row>
        </Affix>
      </div>
    )
  }
}

export default Header
