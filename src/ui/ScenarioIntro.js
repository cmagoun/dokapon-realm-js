import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import {centerInWindow} from '../utils/utils';

const obj = {height:300, width:400};
centerInWindow(obj);

const style = {
    container: {
        position:"absolute",
        backgroundColor: "tan",
        height: `${obj.height}px`,
        width: `${obj.width}px`,
        top: `${obj.y}px`,
        left: `${obj.x}px`,
        border: "3px solid grey"
    },
    text: {
        height: "80%",
        width: "100%"
    },
    button: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        height:"10%"
    }
}

class ScenarioIntro extends Component {
    constructor(props) {
        super(props);
        this.onDivClick = this.handleClick.bind(this);
        this.onButtonClick = this.handleButton.bind(this);
    }

    render() {
        return <div style={style.container} onClick={this.onDivClick}>

            <div style={style.text} dangerouslySetInnerHTML={{__html: this.props.game.scenario.introText}}></div>

            <div style={style.button} onClick={this.onButtonClick}>
                <button>OK</button>
            </div>
        </div>   
    }

    handleClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.props.game.stopEvent = true;
    }

    handleButton(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.props.game.stopEvent = true;
    }
}

export default withContext(ScenarioIntro);