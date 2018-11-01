import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Layout, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider, Footer } = Layout;
import MenuList from './components/Menu'


import './app.less';
@withRouter
class App extends Component {
    state = {
        collapsed: false,
    };

    componentDidMount() {
        if (sessionStorage.token == null || sessionStorage.token == 'undefined') {
            this.props.history.push('/sec-kill-admin-front/login')
        }
    }

    handleClick = e => {
        console.log('list', e);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }


    render() {
        return (
            <Layout className="page">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo">logo 爆款试用</div>
                    <MenuList />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: '0 15px' }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div className="login fr">管理员</div>
                    </Header>
                    <Breadcrumb style={{ margin: '16px' }}>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>商品列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ margin: '0 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        ©2018-10 Created by wangyuefeng
          </Footer>
                </Layout>
            </Layout >
        );
    }
}

export default App;
