import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import States from '../game/GameStates';
import ScenarioIntro from './ScenarioIntro';

class Main extends Component {
    constructor(props) {
        super(props);
        this.ecsUpdated = this.updateScreen.bind(this);
        this.state = {components:[]};
    }

    componentDidMount() {
        document.addEventListener("game_state_changed", this.ecsUpdated);
    }

    componentWillUnmount() {
        document.removeEventListener("game_state_changed", this.ecsUpdated);
    }

    render() {
        const length = this.state.components.length;
        return <div>
            {this.state.components
                .map((c,i) => React.cloneElement(c, {key:i, events:i===length-1}))}
        </div>
    }

    updateScreen(evt) {
        const gameState = evt.detail.state;
        switch(gameState) {
            case States.SCENARIO_START_SCREEN:
                this.props.game.startModal();
                this.setState({components:[<ScenarioIntro/>]});
                break;
            case States.START_GAME:
                this.props.game.endModal();
                this.setState({components:[]});
                break;
        }
    }
}

export default withContext(Main);