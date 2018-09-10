import React, { Component } from 'react';

class WireFrame extends Component {
    render() {
        return <div style={{border:"1px solid black", height:"100%", width:"100%"}}>{this.props.title}</div>
    }
}

export default WireFrame;