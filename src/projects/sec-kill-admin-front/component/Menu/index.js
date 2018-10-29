import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, browserHistory } from 'react-router-dom';

import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;


import json from './menu.json'
import './index.less';

class MenuList extends Component {

    componentDidMount = () => {

    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return false
    }

    handleClick = e => {
        console.log(window);

        console.log(this.props);
        console.log(window);


        if (e.key.indexOf('/') != -1) {
            window.apush(e.key)
        }
    }
    /**
     *
     * @param data 菜单数据
     * @memberof MenuList 递归渲染菜单数据
     * @returns antd menu.item
     */
    menuList = data =>
        data.map((v, i) => {
            if (v.child && v.child.length > 0) {
                return (<SubMenu
                    key={v.path || v.title}
                    title={<span>{v.icon ? <Icon type={v.icon} /> : ''}<span>{v.title}</span></span>}>
                    {this.menuList(v.child)}
                </SubMenu>)
            } else {
                if (v.icon) {
                    return (<Menu.Item key={v.path || v.title}>
                        <Icon type={v.icon} />
                        <span>{v.title}</span>
                    </Menu.Item>)
                }
            }
            return (<Menu.Item key={v.path || v.title}>{v.title}</Menu.Item>)
        })

    render() {
        return (
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                onClick={this.handleClick}
            >
                {this.menuList(json)}
            </Menu>
        );
    }
}

export default MenuList;
