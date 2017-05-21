import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Icon, Menu, Affix, Popover, Button } from 'antd'

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
          </Row>
        </Affix>
      </div>
    )
  }
}

export default Header
