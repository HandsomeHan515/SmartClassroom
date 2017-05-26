import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Modal, Table } from 'antd'

import { getNameSerch, getTimeSearch } from '../actions'

import { transformTime } from '../method/time'

import '../css/SearchCon.css'

const Search = Input.Search

class SearchCon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      time: null,
      visible: false,
      type: 0,
    }
  }

  renderModal = () => {
    const { nameSearch, timeSearch } = this.props
    const { type } = this.state
    let students = [], title = ''
    if (type === 1) {
      students = nameSearch
      title = '按名称--查询名单'
    } else if (type === 2) {
      students = timeSearch
      title = '按学号--查询名单'
    }


    const columns = [
      { title: '姓名', dataIndex: 'name', id: 'name', width: '20%', render: name => name.username },
      { title: '开始时间', dataIndex: 'start', id: 'start', render: start => transformTime(start, '年') },
      { title: '结束时间', dataIndex: 'end', id: 'end', render: end => transformTime(end, '年') },
      { title: 'IP地址', dataIndex: 'ip', id: 'ip' },
    ]

    return (
      <Modal
        visible={this.state.visible}
        onCancel={() => this.setState({ visible: false })}
        footer={null}
        width={980}
        title={title}
      >
        <Table
          rowKey='id'
          bordered
          dataSource={students}
          columns={columns}
        />
      </Modal>
    )
  }

  componentWillReceiveProps(nextProps) {
    const { nameIsFetching, timeIsFetching } = nextProps
    if (!nameIsFetching) {
      this.setState({
        visible: true,
      })
    } else if (!timeIsFetching) {
      this.setState({
        visible: true
      })
    }
  }

  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <Search
          placeholder='按姓名检索 模糊查询'
          value={this.state.name}
          style={{ width: 666 }}
          className='search'
          onChange={e => this.setState({ name: e.target.value })}
          onSearch={name => {
            if (name) {
              this.props.getNameSerch({ name })

              this.setState({
                type: 1,
                name: '',
              })
            }
          }}
        />
        <Search
          placeholder='按时间检索 格式：XXXX-X-X'
          style={{ width: 666, marginTop: 50 }}
          value={this.state.time}
          className='search'
          onChange={e => this.setState({ time: e.target.value })}
          onSearch={time => {
            if (time) {
              this.props.getTimeSearch({ time })

              this.setState({
                type: 2,
                time: null,
              })
            }
          }}
        />
        <this.renderModal />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    nameSearch: state.result.nameSearch,
    timeSearch: state.result.timeSearch,
    nameIsFetching: state.status.nameSearch.isFetching,
    timeIsFetching: state.status.timeSearch.isFetching,
  })
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getNameSerch,
    getTimeSearch,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchCon)
