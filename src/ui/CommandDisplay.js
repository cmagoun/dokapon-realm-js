import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import {Dialogs} from '../utils/constants';

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
        const game = this.props.game;
        return <div style={style.main}>
            <div><button style={style.button} onClick={this.handleDialog.bind(this, Dialogs.itemsdialog)}>Items</button></div>
            <div><button style={style.button} onClick={this.handleDialog.bind(this, Dialogs.spellsdialog)}>Spells</button></div>
            <div><button style={style.button} onClick={this.handleDialog.bind(this, Dialogs.powersdialog)}>Powers</button></div>
            <div><button style={style.button}>Move</button></div>
        </div>
    }

    handleDialog(dialog) {
        this.props.game.showDialog(dialog);
    }
}

export default withContext(CommandDisplay);