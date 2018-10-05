import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import Centered from './Centered';
import SimpleDialog from './SimpleDialog';

class ItemsDialog extends Component {
    render() {
        const {game} = this.props;
        const currentPlayer = game.currentPlayer();
        return <Centered height={300} width={400}>
            <SimpleDialog
                title={`Inventory`}
                html= {`<p>${currentPlayer.character.name} has tons of crap`}
                onOk={this.handleDone.bind(this)}/>
        </Centered>

    }

    handleDone() {
        this.props.game.popDialog();
    }
}

export default withContext(ItemsDialog);