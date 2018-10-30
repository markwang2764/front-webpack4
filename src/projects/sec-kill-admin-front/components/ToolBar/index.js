import React, { Component } from 'react';
import './index.less';
class TooBar extends Component {
    render() {
        return (
            <div className="toolbar">
                {this.props.children}
            </div>
        );
    }
}

export default TooBar;