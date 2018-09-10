import React, { Component } from 'react';
import GameContext from './GameContext';


class TurnLoop extends Component {
    render() {
        const gm = this.props.ctx;

        return <GameContext.Provider value={gm}>
            {this.props.children}
        </GameContext.Provider>
    }
}

export default TurnLoop;