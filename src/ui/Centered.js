import React, { Component } from 'react';
import {centerInWindow} from '../utils/utils';

class Centered extends Component {
    constructor(props) {
        super(props);

        const obj = centerInWindow({height:props.height, width:props.width});

        this.centered = {
            position:"absolute",
            height: `${obj.height}px`,
            width: `${obj.width}px`,
            top: `${obj.y}px`,
            left: `${obj.x}px`     
        };
    }

    render() {
        return <div style={this.centered}>
            {this.props.children}
        </div>
    }
}

export default Centered;