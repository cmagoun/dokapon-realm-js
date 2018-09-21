import React, { Component } from 'react';
import withContext from '../ecs/withContext';

const style = {
    overlay: {
        position:"absolute",
        height: "20%",
        width:"100%",
        backgroundColor:"tan",
        border:"2px solid maroon",
        bottom:"0"
    }
}

class Overlay extends Component {
    render() {
        return <div style={style.overlay}>
            TEST
        </div>
    }
}

export default withContext(Overlay);