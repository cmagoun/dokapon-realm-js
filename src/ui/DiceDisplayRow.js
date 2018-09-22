import React, { Component } from 'react';

const style = {
    container: {
        display:"flex",
        flexDirection: "row"
    },
    left: {
        minWidth: "120px"
    }
}

class DiceDisplayRow extends Component {
    render() {
        const images = [];
        for(let i = 0; i < this.props.length; i++) {
            images.push(this.props.image);
        }

        return <div style={style.container}>
            <div style={style.left}>{this.props.name}:</div>
            <div>{images.map((x,i) => <img key={i} src={x}></img>)}</div>      
        </div>
    }
}

export default DiceDisplayRow;