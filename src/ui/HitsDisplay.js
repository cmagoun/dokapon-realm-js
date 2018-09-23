import React, { Component } from 'react';
import filled from '../dist/heart_filled.png';
import empty from '../dist/heart_empty.png';

const style = {
    container: {
        display:"flex",
        flexDirection: "row"
    },
    left: {
        minWidth: "120px"
    }
}

class HitsDisplay extends Component {
    render() {
        const hearts = [];

        for(let i=0; i < this.props.max; i++) {
            const heart = i < this.props.current
                ? filled
                : empty

            hearts.push(heart);
        }

        return <div style={style.container}>
            <div style={style.left}>Hits:</div>
            <div>{hearts.map((h,i) => <img key={i} src={h}></img>)}</div>
        </div>
    }
}

export default HitsDisplay;