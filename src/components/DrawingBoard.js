import React, { Component } from 'react'
import _ from 'lodash'
import { Button } from 'antd'

class DrawingBoard extends Component {
  constructor(props) {
    super(props)

    this.cvs = null
    this.ctx = null
    //判断鼠标是否按下，默认为false即鼠标没按下
    this.isDrawing = false
    //涂鸦路径
    this.current = []
    this.moveMem = []
    //涂鸦开始时的时间
    this.start = 0
  }

  componentDidMount() {
    this.cvs = this.refs.canvas
    this.ctx = this.cvs.getContext('2d')
  }

  getCursorPosition = e => {
    const { top, left } = this.cvs.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top

    return { x, y }
  }

  onMouseDown = e => {
    this.current.splice(0, this.current.length)

    this.isDrawing = true
    this.start = new Date().getTime()

    this.ctx.beginPath()
    const { x, y } = this.getCursorPosition(e)
    const delta = 0
    this.current = [{ x, y, delta }]
    console.log('current: %o', this.current)
  }

  onMouseMove = e => {
    if (!this.isDrawing) {
      return false
    }

    const { x, y } = this.getCursorPosition(e)
    //鼠标移动距离开始的时间
    const delta = new Date().getTime() - this.start

    //画笔画路径
    this.ctx.lineTo(x, y)
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = 10
    this.ctx.strokeStyle = 'red'
    this.ctx.stroke()

    //当前位置及时间
    const curPos = { x, y, delta }
    this.current.push(curPos)
  }

  onMouseUp = e => {
    this.ctx.closePath()

    const current = _.cloneDeep(this.current)
    this.moveMem.push(current)
    console.log('this.moveMem: %o', this.moveMem)

    this.isDrawing = false
  }

  resetBoard = () => {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
  }

  drawPoint = (x, y, isBegining = false) => {
    isBegining ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y)
    this.ctx.stroke()
  }

  back = () => {
    this.resetBoard()
    this.ctx.beginPath()
    this.ctx.lineWidth = 12
    this.ctx.strokeStyle = 'green'
    this.ctx.fillStyle = 'green'

    const start = new Date().getTime()
    let lineIndex = 0
    let pointIndex = 0

    this.redrawTimer = setInterval(
      () => {
        if (lineIndex === this.moveMem.length) {
          clearInterval(this.redrawTimer)
          return false
        }

        if (pointIndex === this.moveMem[lineIndex].length) {
          lineIndex++
          pointIndex = 0
          return false
        }

        let point = this.moveMem[lineIndex][pointIndex]
        if (!point) {
          clearInterval(this.redrawTimer)
          return false
        }

        if (new Date().getTime() - start >= point.delta) {
          this.drawPoint(point.x, point.y, pointIndex === 0)
          pointIndex++
        }
      }, 0)
  }

  delete = () => {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
    this.current.splice(0, this.current.length)
    this.moveMem.splice(0, this.moveMem.length)
    console.log('cur: o%, mov: o%', this.current, this.moveMem)
  }

  render() {
    return (
      <div style={{ lineHeight: '30px', color: '#fff', position: 'fixed', top: 0, left: 0, width: '100%', fontSize: 14 }}>
        <canvas
          ref="canvas"
          width={document.body.clientWidth}
          height={document.body.clientHeight}
          style={{ dispaly: 'block', background: '#ccc', opacity: .3, cursor: 'pointer' }}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
        />
        <Button onClick={this.back}>点击回放</Button>
      </div>
    )
  }
}

export default DrawingBoard