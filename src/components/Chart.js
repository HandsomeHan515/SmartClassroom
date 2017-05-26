import React, { Component } from 'react'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'

import { Row } from 'antd'

class Chart extends Component {
  render() {
    const data = [
      { name: '在线人数', date: '5月12日', frequency: 0, online: 12, offline: 18 },
      { name: '在线人数', date: '5月13日', frequency: 20, online: 15, offline: 15 },
      { name: '在线人数', date: '5月14日', frequency: 40, online: 20, offline: 10 },
      { name: '在线人数', date: '5月15日', frequency: 80, online: 27, offline: 3 },
      { name: '在线人数', date: '5月16日', frequency: 100, online: 89, offline: 11 },
    ]

    return (
      <div>
        <Row type='flex' justify='center' style={{ color: '#333' }}>
          学生在线数据展示
        </Row>
        <AreaChart
          style={{ fontSize: 14 }}
          width={980}
          height={200}
          data={data}
          margin={{ top: 10, right: 10, bottom: 0 }}
        >
          <XAxis dataKey="date" />
          <YAxis dataKey="frequency" />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip />
          <Area
            name='离线人数'
            type='monotone'
            dataKey='offline'
            stroke='#ff6696'
            fill='#ff6696'
            activeDot={{ r: 6 }}
          />
          <Area
            name="在线人数"
            type='monotone'
            dataKey='online'
            stroke='#66ccff'
            fill='#66ccff'
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </div>
    )
  }
}

export default Chart