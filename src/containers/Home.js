import React, { Component } from 'react'

import { Carousel, Row } from 'antd'
import { appCore } from '../service'

import '../css/Home.css'
import images from '../images'

class Home extends Component {
  render() {
    return (
      <div>
        <div style={{ margin: '5px 0 0 10px' }}>
          <Carousel effect='fade' autoplay={true}>
            <div style={{ position: 'relative' }}>
              <img className='img' src={images.banner1} alt="banner1" />
              <h2 className="text-center">智慧教室管理系统</h2>
            </div>
            <div><img className='img' src={images.banner2} alt="banner2" /></div>
            <div><img className='img' src={images.banner3} alt="banner3" /></div>
          </Carousel>
        </div>
        <Row type='flex' justify='center' className='homeText'>
          欢迎{appCore.username}来到智慧教室管理系统！！！
        </Row>
      </div>
    )
  }
}

export default Home