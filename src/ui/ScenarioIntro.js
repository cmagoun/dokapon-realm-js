import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import {centerInWindow} from '../utils/utils';
import States from '../game/GameStates';

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
        this.onButtonClick = this.handleButton.bind(this);
    }

    render() {
        const {game} = this.props;

        return <div style={style.container} onClick={this.onDivClick} onMouseEnter={game.startModal.bind(game)} onMouseLeave={game.endModal.bind(game)}>

            <div style={style.text} dangerouslySetInnerHTML={{__html: this.props.game.scenario.introText}}></div>

            <div style={style.button}>
                <button onClick={this.onButtonClick}>OK</button>
            </div>
        </div>   
    }

    handleButton(evt) {
        this.props.game.updateGameState(States.START_GAME);
    }

    componentWillUnmount() {
        this.props.game.endModal();
    }
}

export default withContext(ScenarioIntro);