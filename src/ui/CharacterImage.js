import React, { Component } from 'react';
import elf from '../dist/elf.png';
import berserker from '../dist/berserker.png';
import whiteknight from '../dist/whiteknight.png';
import witchking from '../dist/witchking.png';
import blank from '../dist/blank.png';

class CharacterImage extends Component {
    constructor(props) {
        super(props);

        this.dc = {
            berserker,
            blank,
            elf,
            whiteknight,
            witchking
        }
    }
 
    render() {
        const style = {
            height: this.props.height || "auto",
            width: this.props.width || "auto"
        }

        return <img style={style} src={this.dc[this.props.profession]}></img>
    }
}

export default CharacterImage;