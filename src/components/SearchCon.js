import React, { Component } from 'react'
import { Input } from 'antd'

import '../css/SearchCon.css'

const Search = Input.Search

class SearchCon extends Component {
  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <Search
          placeholder='按姓名检索'
          style={{ width: 666 }}
          className='search'
          onSearch={value => {
            console.log(value)
          }}
        />

        <Search
          placeholder='按时间检索'
          style={{ width: 666, marginTop: 50 }}
          className='search'
          onSearch={value => {
            console.log(value)
          }}
        />
      </div>
    )
  }
}

export default SearchCon