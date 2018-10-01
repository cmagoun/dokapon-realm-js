import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import CharacterDisplay from './CharacterDisplay';
import CommandDisplay from './CommandDisplay';

const style = {
    overlay: {
        position:"absolute",
        height: "20%",
        width:"100%",
        backgroundColor:"tan",
        border:"2px solid maroon",
        bottom:"0",

        display:"flex",
        flexDirection: "row",
    }
}

class Overlay extends Component {
    constructor(props) {
        super(props);
        this.mouseOver = this.handleMouseOver.bind(this);
        this.mouseOut = this.handleMouseOut.bind(this);
    }

    render() {
        const {game} = this.props;
        const player = game.currentPlayer();

        return <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} style={style.overlay}>
            <CharacterDisplay entity={player}/>
            <CommandDisplay/>
        </div>
    }

    handleMouseOver(evt) {
        this.props.game.startModal();
    }

    handleMouseOut(evt) {
        this.props.game.endModal();
    }
}

export default withContext(Overlay);