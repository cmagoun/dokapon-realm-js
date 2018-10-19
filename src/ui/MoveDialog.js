import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import Centered from './Centered';
import SimpleDialog from './SimpleDialog';
import States from '../game/GameStates';

class MoveDialog extends Component {
    componentDidMount() {
        const currentPlayer = this.props.game.currentPlayer();
        if(currentPlayer.turntaker.control === "ai") {
            window.setTimeout(this.handleDone.bind(this), 1000);
        }
    }
    render() {
        const {game} = this.props;
        const currentPlayer = game.currentPlayer();
        const roll = currentPlayer.turntaker.moveroll;

        return <Centered height={300} width={400}>
            <SimpleDialog
                title={`Inventory`}
                html= {`<p>You rolled a ${roll} for movement</p>`}
                onOk={this.handleDone.bind(this)}/>
        </Centered>

    }

    handleDone() {
        this.props.game.updateGameState(States.SHOW_MOVE);
    }
}

export default withContext(MoveDialog);