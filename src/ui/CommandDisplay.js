import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import ItemsDialog from './ItemsDialog';

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
            <div><button style={style.button} onClick={this.handleItemsClick.bind(this)}>Items</button></div>
            <div><button style={style.button} onClick={this.handleSpellsClick.bind(this)}>Spells</button></div>
            <div><button style={style.button} onClick={this.handlePowersClick.bind(this)}>Powers</button></div>
            <div><button style={style.button} onClick={this.handleMoveClick.bind(this)}>Move</button></div>
        </div>
    }

    handleItemsClick() {
        this.props.pushui(<ItemsDialog/>)
    }

    handleSpellsClick() {}
    handlePowersClick() {}
    handleMoveClick() {}
}

export default CommandDisplay;