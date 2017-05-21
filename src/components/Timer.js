import React, { Component } from 'react'

import '../css/Timer.css'

class Timer extends Component {
  constructor(props) {
    super(props)

    const { time, start } = this.props
    this.state = {
      time,
      start,
    }

    this.timer = null
  }

  componentWillMount() {
    const { start } = this.state
    if (start) {
      this.start()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  countDown = () => {
    let newTime = this.state.time - 1

    if (newTime < 0) {
      return false
    }

    this.setState({
      time: newTime
    })
  }

  start = () => {
    clearInterval(this.timer)
    this.timer = setInterval(this.countDown, 1000)
  }

  render() {
    const { time } = this.state

    return (
      <span className="content">
        {time}
      </span>
    )
  }
}

export default Timer