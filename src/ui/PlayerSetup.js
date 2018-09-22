import React, { Component } from 'react';
import ColorSelect from './ColorSelect';
import CharacterImage from './CharacterImage';

const style = {
    main: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        height: "48px",
        marginTop: "10px",
    },
    namebox: {
        backgroundColor: "tan",
        fontFamily:"pericles",
        fontSize: "large",
        marginRight:"2px"
    },
    select:{
        fontFamily:"pericles",
        fontSize: "large",
        marginRight:"2px"
    },
    check: {
        marginTop:"0px",
        marginRight:"2px"
    },
    img: {
        minWidth:"48px"
    }
}

class PlayerSetup extends Component {
    constructor(props) {
        super(props);
        this.changeActive = this.handleChangeActive.bind(this);
        this.changeName = this.handleNameChange.bind(this);
        this.changeProfession = this.handleChangeProfession.bind(this);
        this.changeControl = this.handleChangeControl.bind(this);
        this.changeColor = this.handleChangeColor.bind(this);
    }

    render() {
        const {player} = this.props;
        const img = player.active
            ? <i style={style.check} className="far fa-check-square fa-3x" onClick={this.changeActive}></i>
            : <i style={style.check} className="far fa-square fa-3x" onClick={this.changeActive}></i>

        return <div style={style.main}>
            {img}

            <input style={style.namebox} type="text" name="name" value={this.props.player.name} onChange={this.changeName}/>

            <select style={style.select} onChange={this.changeProfession} value={this.props.player.profession}>
                <option value="">Select Profession</option>
                <option value="berserker">Berserker</option>
                <option value="elf">Elf</option>
                <option value="whiteknight">White Knight</option>
                <option value="witchking">Witch King</option>
            </select>

            <div style={style.img}>
                <CharacterImage profession={player.profession}/>
            </div>

            <ColorSelect onChange={this.changeColor}/>
            
            <select style={style.select} onChange={this.changeControl}>
                <option value="human">Human</option>
                <option value="ai">AI</option>
            </select>
        </div>
    }

    handleChangeActive() {
        const player = this.props.player;
        player.active = !player.active
        this.props.changePlayer(player);
    }

    handleNameChange(evt) {
        const player = this.props.player;
        player.name = evt.target.value;
        player.active = true;
        this.props.changePlayer(player);
    }

    handleChangeProfession(evt) {
        const player = this.props.player;
        player.profession = evt.target.value;
        player.active = true;
        this.props.changePlayer(player);
    }

    handleChangeControl(evt) {
        const player = this.props.player;
        player.control = evt.target.value;
        player.active = true;
        this.props.changePlayer(player);
    }

    handleChangeColor(color) {
        const player = this.props.player;
        player.color = color.tint;
        player.active = true;
        this.props.changePlayer(player);
    }
}

export default PlayerSetup;