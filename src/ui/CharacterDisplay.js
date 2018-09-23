import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import CharacterImage from './CharacterImage';
import HitsDisplay from './HitsDisplay';
import DiceDisplay from './DiceDisplay';

const style = {
    main: {
        width:"30%",
        border:"2px solid maroon",
        padding: "5px",
        display:"flex",
        flexDirection:"row"
    },
    left: {
        width:"40%"
    },
    name: {
        fontSize:"14pt",
        fontWeight:"bold"
    }
}

class CharacterDisplay extends Component {
    render() {
        const {entity} = this.props;

        return <div style={style.main}>
            <div style={style.left}>
                <div style={style.name}>{entity.character.name}</div>
                <div style={style.name}>Level {entity.character.level} {entity.character.profession}</div>
                <CharacterImage height="72px" width="72px" profession={entity.character.profession}/>
            </div>

            <div>
                <HitsDisplay max={entity.hits.max} current={entity.hits.current}/>
                <DiceDisplay dice={entity.hasdice.dice}/>
            </div>
        </div>
    }
}

export default withContext(CharacterDisplay);