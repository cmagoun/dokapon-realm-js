import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import * as Dialog from './Dialog';
import * as Move from '../game/Move';
import States from '../game/GameStates';

const style = {
    main: {
        border:"2px solid maroon",
        padding: "5px",
        display:"flex",
        flexDirection:"column"
    },
    button: {
        marginTop:"4px",
        fontFamily: "pericles",
        width:"100px"
    }
}

class CommandDisplay extends Component {
    render() {
        const player = this.props.game.currentPlayer();
        const moveDisabled = player.turntaker.moveroll;

        return <div style={style.main}>
            <div><button style={style.button} onClick={this.handleDialog.bind(this, Dialog.itemsdialog)}>Items</button></div>
            <div><button style={style.button} onClick={this.handleDialog.bind(this, Dialog.spellsdialog)}>Spells</button></div>
            <div><button style={style.button} onClick={this.handleDialog.bind(this, Dialog.powersdialog)}>Powers</button></div>
            <div><button style={style.button} disabled={moveDisabled} onClick={this.handleMove.bind(this)}>Move</button></div>
        </div>
    }

    handleDialog(dialog) {
        Dialog.show(dialog)
    }

    handleMove() {
        this.props.game.updateGameState(States.ROLL_MOVE);
        // this.props.game.calculateMove();
        // Dialog.show(Dialog.movedialog);
    }
}

export default withContext(CommandDisplay);