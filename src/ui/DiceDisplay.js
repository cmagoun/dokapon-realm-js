import React, { Component } from 'react';
import {groupBy} from '../utils/utils';
import DiceDisplayRow from './DiceDisplayRow';

class DiceDisplay extends Component {
    render() {
        const diceMap = groupBy(this.props.dice, d => d.display);
        const diceArray = [];
        diceMap.forEach((v, k) => diceArray.push({name:k, length:v.length, image:v[0].image}));

        return <div>
           {diceArray.map((row,i) => <DiceDisplayRow key={i} name={row.name} length={row.length} image={row.image}/>)}
        </div>
    }
}

export default DiceDisplay;