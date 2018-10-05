import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import * as Dialog from './Dialog';
import * as Move from '../game/Move';

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
        return <div style={style.main}>
            <div><button style={style.button} onClick={this.handleDialog.bind(this, Dialog.itemsdialog)}>Items</button></div>
            <div><button style={style.button} onClick={this.handleDialog.bind(this, Dialog.spellsdialog)}>Spells</button></div>
            <div><button style={style.button} onClick={this.handleDialog.bind(this, Dialog.powersdialog)}>Powers</button></div>
            <div><button style={style.button} onClick={this.handleMove.bind(this)}>Move</button></div>
        </div>
    }

    handleDialog(dialog) {
        Dialog.show(dialog)
    }

    handleMove() {
        Move.roll(this.props.game);
        Dialog.show(Dialog.movedialog);
    }
}

export default withContext(CommandDisplay);