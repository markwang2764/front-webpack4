import React, { Component } from 'react';

import { Layout, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider, Footer } = Layout;
import MenuList from '../../component/Menu'
import route from '../index.js';
import './index.less';

class Home extends Component {
  state = {
    collapsed: false,
  };

  componentDidMount = () => {
    console.log(this.porps);

    // window.apush = this.props.history.push
    // window.areplace = this.props.history.replace
    // window.aback = this.props.history.goback
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
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ margin: '0 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2018-10 Created by wangyuefeng
          </Footer>
        </Layout>
      </Layout >
    );
  }
}

export default Home;
