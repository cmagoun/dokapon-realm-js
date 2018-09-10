import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import * as Vector from '../utils/vector';

const style = {
    main: {
        backgroundColor: "white", 
        position: "absolute",
        color: "black",
        bottom: "100px",
        left: "0"
        
    },
    hz: {
        display:"flex",
        flexDirection:"row",
        justifyContent: "center"
    }
}

class Arrows extends Component {
    constructor(props) {
        super(props);
        this.ecsUpdated = this.updateScreen.bind(this);
        this.state = {toggle:true};
    }

    componentDidMount() {
        document.addEventListener("ecs_updated", this.ecsUpdated);
    }

    componentWillUnmount() {
        document.removeEventListener("ecs_updated", this.ecsUpdated);
    }

    render() {
        return <div style={style.main}>
            <div style={style.hz}>
                <button onClick={this.handleMove.bind(this, "u")}>U</button>
            </div>
            <div style={style.hz}>
                <button onClick={this.handleMove.bind(this, "l")}>L</button>
                <button onClick={this.handleMove.bind(this, "r")}>R</button>
            </div>
            <div style={style.hz}>
                <button onClick={this.handleMove.bind(this, "d")}>D</button>
            </div>   
        </div>
    }

    updateScreen(evt) {
        this.setState({toggle:!this.state.toggle});
    }

    handleMove(dir, evt) {
        const g = this.props.game;

        g.stopEvent = true;  
        const mover = g.entity("r1");
        const from = Vector.from(mover.sprite);
        let add;

        switch(dir) {
            case "u":
                add = {x:0, y:-24};
                break;
            case "d":
                add = {x:0, y:24};
                break;
            case "r":
                add = {x:24, y:0};
                break;
            case "l":
                add = {x:-24, y:0};
                break;
        }

        const to = Vector.add(from)(add);
        g.animate(mover.id, mover.animations.walk(from, to, g));
    }
}

export default withContext(Arrows);