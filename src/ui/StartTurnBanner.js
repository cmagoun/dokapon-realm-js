import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import Centered from './Centered';
import SimpleDialog from './SimpleDialog';
import States from '../game/GameStates';
import * as Character from '../game/Character';

class StartTurnBanner extends Component {
    constructor(props) {
        super(props);
        this.mgr = props.game.service("mgr");
        this.camera = props.game.service("camera");
    }

    componentDidMount() {
        const currentPlayer = this.props.game.currentPlayer();
        if(currentPlayer.turntaker.control === "ai") {
            window.setTimeout(this.handleDone.bind(this), 1000);
        }
    }
    
    render() {
        const {game} = this.props;
        const currentPlayer = game.currentPlayer();

        return <Centered height={300} width={400}>
            <SimpleDialog
                title={`Turn ${game.turn}`}
                html= {`<p>${currentPlayer.character.name} it is your turn!`}
                onOk={this.handleDone.bind(this)}/>
        </Centered>
    }

    handleDone() {
        const game = this.props.game;

        const pixiPos = Character.getPixiPos(game.currentPlayer(), game.scenario);
        this.camera.centerOn(pixiPos);
        this.props.game.updateGameState(States.PRE_MOVE);
    }
}

export default withContext(StartTurnBanner);