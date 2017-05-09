import React, { Component } from 'react'

import { Message } from '../components'

class Contacts extends Component {
  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center', lineHeight: '50px' }}>通知</h2>
        <Message />
      </div>
    )
  }
}

export default Contacts