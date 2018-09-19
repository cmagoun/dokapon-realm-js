import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import {centerInWindow} from '../utils/utils';
import PlayerSetup from './PlayerSetup';

const obj = {height:450, width:700};
centerInWindow(obj);

const style = {
    container: {
        position:"absolute",
        backgroundColor: "tan",
        height: `${obj.height}px`,
        width: `${obj.width}px`,
        top: `${obj.y}px`,
        left: `${obj.x}px`,
        border: "3px solid grey",
        padding: "5px"
    },
    title: {
        fontWeight:"bold",
        fontSize: "16pt",
        fontFamily: "pericles",
        textAlign:"center",
        marginBottom: "20px"
    },
    text: {
        height: "80%",
        width: "100%"
    },
    buttonDiv: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        height:"10%"
    },
    button: {
        width: "50%",
        fontSize: "12pt",
        fontFamily: "pericles"
    },
    ws: {
        height:"20px"
    }
}

class CharacterSelect extends Component {
    constructor(props) {
        super(props);

        const players = [];
        for(let i = 0; i < 6; i++) {
            players.push({index: i, active: false,  name:`Player ${i+1}`, profession:"", control:"player", image:""});
        }

        this.state={players};
    }

    render() {
        return <div style={style.container}>
            <div style={style.title}>SELECT CHARACTERS</div>

            <div>
                {this.state.players.map((p, i) => <PlayerSetup key={i} player={p} index={i} changePlayer={this.handleChangePlayer.bind(this)}/>)}
            </div>

            <div style={style.ws}/>

            <div style={style.buttonDiv}>
                <button style={style.button} onClick={this.handleDone.bind(this)}>OK</button>
            </div>
        </div>
    }

    handleChangePlayer(player) {
        const players = this.state.players;
        players[player.index] = player;
        this.setState({players});
    }

    handleDone() {
        this.props.game.setPlayers(this.state.players);
    }
}

export default withContext(CharacterSelect);