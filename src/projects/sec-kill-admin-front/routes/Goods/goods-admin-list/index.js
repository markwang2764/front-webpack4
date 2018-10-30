import React, { Component } from 'react';
import {
    Button,
    Table,
    Modal,
    DatePicker,
    Input,
    message,
    Icon
} from 'antd'

import ToolBar from '@com/ToolBar'
export default class GoodsAdminList extends Component {
    state = {
        dataSource: [],
        visible: false,
        startDate: '',
        endDate: '',
        note: '',
        rewardFactorNum: '',
        id: '',
        operationInfo: '',
        curDate: '',
        total: 1,
        currentPage: 1
    }



    componentDidMount() {
        window.apush = this.props.history.push
        window.areplace = this.props.history.replace
        window.aback = this.props.history.goback
    }



    /**
*
*
* @memberof 1：定义表单列表
*/
    columns = () => {
        return ([
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            }, {
                title: '价格',
                dataIndex: 'price',
                key: 'price'
            }, {
                title: '名称',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '上架',
                dataIndex: 'puaway',
                key: 'puaway'
            }, {
                title: '下架',
                dataIndex: 'soldout',
                key: 'soldout'
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => {
                    return (
                        <div>
                            <span>编辑</span>
                            <span>删除</span>
                        </div>
                    )
                }
            }
        ])
    }


    render() {
        const pagination = {
            pageSize: 20,
            total: this.state.total,
            current: this.state.currentPage,
            onChange: (currentPage) => {
                // this.setState({
                //     currentPage
                // })
            }
        }
        return (
            <div className="admin-list">
                <ToolBar>

                    <Input
                        onPressEnter={() => {
                            this.getNewData()
                        }}
                        placeholder="ID搜索"
                        onChange={e => { this.props.handleChange('id', e.target.value) }}
                    />
                    <Button type="primary" onClick={this.searchDate}>新增</Button>

                </ToolBar>
                <Table dataSource={this.state.dataSource} columns={this.columns()} pagination={pagination} onChange={this.handleTableChange} />
            </div>
        )
    }
}
