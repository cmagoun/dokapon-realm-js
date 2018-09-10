import GameContext from "./GameContext";
import React from 'react';

export default function withContext(Component) {
    return function ContextComponent(props) {
        return <GameContext.Consumer>
            {ctx => <Component {...props} game={ctx}/>}
        </GameContext.Consumer>
    }
}

