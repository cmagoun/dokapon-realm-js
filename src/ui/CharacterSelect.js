import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import PlayerSetup from './PlayerSetup';
import Centered from './Centered';

const style = {
    container: {
        backgroundColor: "tan",
        border: "3px solid grey",
        padding: "5px",
        width:"100%",
        height:"100%"
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
            players.push({
                index: i, 
                active: false, 
                name:`Player ${i+1}`, 
                profession:"", 
                control:"player", 
                image:""});
        }

        this.state={players};
    }

    render() {
        return <Centered height={450} width={700}>
            <div style={style.container}>
                <div style={style.title}>SELECT CHARACTERS</div>

                <div>
                    {this.state.players.map((p, i) => <PlayerSetup key={i} player={p} index={i} changePlayer={this.handleChangePlayer.bind(this)}/>)}
                </div>

                <div style={style.ws}/>

                <div style={style.buttonDiv}>
                    <button style={style.button} onClick={this.handleDone.bind(this)}>OK</button>
                </div>
            </div>
        </Centered>
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