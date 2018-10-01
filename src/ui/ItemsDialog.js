import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import Centered from './Centered';
import SimpleDialog from './SimpleDialog';
import States from '../game/GameStates';
import * as Character from '../game/Character';
import {centerCameraOn} from '../utils/utils';

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
        this.props.popui();
    }
}

export default ItemsDialog;