import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import Centered from './Centered';
import SimpleDialog from './SimpleDialog';
import States from '../game/GameStates';
import * as Character from '../game/Character';
import {centerCameraOn} from '../utils/utils';

class StartTurnBanner extends Component {
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
        const camera = centerCameraOn(pixiPos);
        game.sceneMgr.moveCamera(camera.x, camera.y);

        this.props.game.updateGameState(States.TAKING_TURN);
    }
}

export default withContext(StartTurnBanner);