import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import Centered from './Centered';
import SimpleDialog from './SimpleDialog';
import * as Dialog from './Dialog';

class MoveDialog extends Component {
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
        Dialog.pop();
    }
}

export default withContext(MoveDialog);