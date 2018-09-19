import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import Centered from './Centered';
import SimpleDialog from './SimpleDialog';
import States from '../game/GameStates';

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
        this.props.game.updateGameState(States.TAKING_TURN);
    }
}

export default withContext(StartTurnBanner);