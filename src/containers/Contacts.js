import React, { Component } from 'react'

import { Message } from '../components'

class Contacts extends Component {
  render() {
    return (
      <div>
        <div style={{ float: 'left', borderRight: '3px dotted #ccc' }}>
          <h2 style={{ textAlign: 'center', lineHeight: '50px' }}>教师发布内容</h2>
          <Message />
        </div>
        <div style={{ float: 'left' }}>
          <h2 style={{ textAlign: 'center', lineHeight: '50px' }}>学生发布内容</h2>
          <Message />
        </div>
      </div>
    )
  }
}

export default Contacts