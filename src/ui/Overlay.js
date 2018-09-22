import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import CharacterDisplay from './CharacterDisplay';

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
    render() {
        const {game} = this.props;
        const player = game.currentPlayer();

        return <div style={style.overlay}>
            <CharacterDisplay entity={player}/>
        </div>
    }
}

export default withContext(Overlay);