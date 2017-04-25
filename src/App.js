import React, { Component } from 'react'

import { Header, Footer } from './components'

import { BackTop } from 'antd'

class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <div style={{ width: 980, margin: '0 auto' }}>
          {this.props.children}
        </div>

        <Footer />

        <BackTop />
      </div>
    )
  }
}

export default App
