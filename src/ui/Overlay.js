import React, { Component } from 'react';
import withContext from '../ecs/withContext';

const style = {
    overlay: {
        height: "10%",
        width:"100%",
        backgroundColor:"white"
    }
}

class Overlay extends Component {
    render() {
        return <div style={style.overlay}>
            
        </div>
    }
}

export default withContext(Overlay);