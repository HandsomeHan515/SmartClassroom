import React, { Component } from 'react'

import { Header, Footer } from './components'

import { BackTop } from 'antd'

class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <div style={{ minHeight: document.body.clientHeight - 240, width: 980, margin: '0 auto' }}>
          {this.props.children}
        </div>

        <Footer />

        <BackTop />
      </div>
    )
  }
}

export default App
