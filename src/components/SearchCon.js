import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Modal, Table } from 'antd'

import { getNameSerch, getSidSearch } from '../actions'

import '../css/SearchCon.css'

const Search = Input.Search

class SearchCon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      studentID: null,
      visible: false,
      type: 0,
    }
  }

  renderModal = () => {
    const { nameSearch, sidSearch } = this.props
    const { type } = this.state
    let students = []
    if (type === 1) {
      students = nameSearch
    } else if (type === 2) {
      students = sidSearch
    }

    const columns = [
      { title: '姓名', dataIndex: 'name', id: 'name', width: '20%', render: name => name.username },
      { title: '学号', dataIndex: 'studentID', id: 'sid' },
      { title: '职务', dataIndex: 'duty', id: 'duty' },
      { title: '手机号码', dataIndex: 'phone', id: 'phone' },
      { title: '邮箱', dataIndex: 'email', id: 'email' },
    ]

    return (
      <Modal
        visible={this.state.visible}
        onCancel={() => this.setState({ visible: false })}
        footer={null}
        width={980}
        title='按名称--查询名单'
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
    const { nameIsFetching, sidIsFetching } = nextProps
    if (!nameIsFetching) {
      this.setState({
        visible: true,
      })
    } else if (!sidIsFetching) {
      this.setState({
        visible: true
      })
    }
  }

  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <Search
          placeholder='按姓名检索'
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
          placeholder='按学号检索'
          style={{ width: 666, marginTop: 50 }}
          value={this.state.studentID}
          className='search'
          onChange={e => this.setState({ studentID: e.target.value })}
          onSearch={studentID => {
            if (studentID) {
              this.props.getSidSearch({ studentID })

              this.setState({
                type: 2,
                studentID: null,
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
    sidSearch: state.result.sidSearch,
    nameIsFetching: state.status.nameSearch.isFetching,
    sidIsFetching: state.status.sidSearch.isFetching,
  })
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getNameSerch,
    getSidSearch,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchCon)
