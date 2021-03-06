import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Input, Button, Icon } from 'antd'

import { transformTime, timeDuration } from '../method/time'

import { getDetail } from '../actions'

import '../css/CheckinStatistics.css'

class CheckinStatistics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchText: '',
      filterDropdownVisible: false,
      filtered: false,
    }
  }

  componentWillMount() {
    this.props.getDetail()
  }

  onInputChange = e => {
    this.setState({
      searchText: e.target.value
    })
  }

  onSearch = () => {
    const { detail } = this.props
    const { searchText } = this.state
    const reg = new RegExp(searchText, 'gi')

    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: detail.map(record => {
        const match = record.name.match(reg)

        if (!match) return false

        return {
          ...record,
          name: (
            <span>
              {
                record.name.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                ))
              }
            </span>
          ),
        }
      }).filter(record => !!record),
    })
  }

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize)
  }

  showTotal = total => {
    return `总共${total}条数据`
  }

  render() {
    const { detail } = this.props
    const columns = [
      {
        title: 'Name', dataIndex: 'name', id: 'name',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="输入姓名进行检索..."
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>查找</Button>
          </div>
        ),
        filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }, () => this.searchInput.focus()
        ),
        width: '10%'
      },
      { title: '开始时间', dataIndex: 'start', id: 'start', render: start => transformTime(start, '年'), width: '20%' },
      {
        title: '结束时间', dataIndex: 'end', id: 'end', render: end => {
          if (end) {
            return transformTime(end, '年')
          } else {
            return <span>未签退</span>
          }
        }, width: '20%'
      },
      { title: '在线时长', dataIndex: 'duration', id: 'duration', render: duration => timeDuration(duration), width: '20%' },
      { title: 'IP地址', dataIndex: 'ip', id: 'ip', width: '20%' },
      { title: '日期', dataIndex: 'date', id: 'date' }
    ]

    return (
      <div style={{ marginTop: 30 }}>
        <Table
          rowKey='id'
          bordered
          scroll={{ x: true, y: 530 }}
          dataSource={detail}
          columns={columns}
          pagination={{
            defaultPageSize: 15,
            pageSizeOptions: ['10', '15', '20', '30'],
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange,
            defaultCurrent: 1,
            total: detail.length,
            showTotal: this.showTotal
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    detail: state.result.detail
  })
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getDetail
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckinStatistics)