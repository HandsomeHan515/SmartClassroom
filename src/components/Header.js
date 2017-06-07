import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Row, Col, Icon, Menu, Affix, Button } from 'antd'

import { navMenu } from '../data'

import '../css/Header.css'

class Header extends Component {
  render() {
    return (
      <div>
        <Affix>
          <Row>
            <Col span={20} offset={2}>
              <Menu mode='horizontal'>
                {
                  navMenu.map((item, index) => {
                    return (
                      <Menu.Item key={index} style={{ width: `${100 / navMenu.length}%` }} >
                        <Link className='nav' to={item.link} >
                          <Icon type={item.type} />
                          {item.name}
                        </Link>
                      </Menu.Item>
                    )
                  })
                }
              </Menu>
              <Button
                style={{ float: 'right', marginRight: -100, marginTop: -45 }}
                onClick={() => {
                  localStorage.clear()
                  browserHistory.push({ pathname: '/signin' })
                }}
              >
                注销
              </Button>
            </Col>
          </Row>
        </Affix>
      </div>
    )
  }
}

export default Header
