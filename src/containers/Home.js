import React, { Component } from 'react'

import { Row, Carousel } from 'antd'

import '../css/Home.css'
import images from '../images'

class Home extends Component {
  render() {
    return (
      <div>
        <div style={{ margin: '5px 0 0 10px' }}>
          <Carousel effect='fade' autoplay={true}>
            <div><img className='img' src={images.banner1} alt="banner1" /></div>
            <div><img className='img' src={images.banner2} alt="banner2" /></div>
            <div><img className='img' src={images.banner3} alt="banner3" /></div>
          </Carousel>
        </div>

        <Row type='flex' justify='center' className='homeText'>
          欢迎HandsomeHan同学来到智慧教室管理系统！！！
        </Row>
      </div>
    )
  }
}

export default Home