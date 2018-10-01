import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import States from '../game/GameStates';
import ScenarioIntro from './ScenarioIntro';
import CharacterSelect from './CharacterSelect';
import StartTurnBanner from './StartTurnBanner';
import Overlay from './Overlay';

class Main extends Component {
    constructor(props) {
        super(props);
        this.ecsUpdated = this.updateScreen.bind(this);
        this.pushui = (ui) => this.handlePushUi.bind(this, ui);
        this.popui = () => this.handlePopUi.bind(this);
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
                .map((c,i) => React.cloneElement(c, 
                    {
                        key:i, 
                        events:i===length-1,
                        pushui: this.pushui,
                        popui: this.popui
                    }))}
        </div>
    }

    updateScreen(evt) {
        const gameState = evt.detail.state;
        switch(gameState) {

            case States.CHARACTER_SELECT:
                this.props.game.startModal();
                this.setState({components:[<CharacterSelect/>]});
                break;

            case States.SCENARIO_START_SCREEN:
                this.props.game.startModal();
                this.setState({components:[<ScenarioIntro/>]});
                break;

            case States.START_GAME:
                this.props.game.endModal();
                this.setState({components:[]});
                break;

            case States.START_TURN:
                this.props.game.startModal();
                this.setState({components:[<StartTurnBanner/>]});
                break;

            case States.TAKING_TURN:
                this.props.game.endModal();
                this.setState({components:[<Overlay/>]});
        }
    }

    handlePushUi(ui) {
        const components = this.state.components;
        components.push(ui);
        this.setState({components});
    }

    handlePopUi() {
        const components = this.state.components;
        components.pop();
        this.setState({components});
    }
}

export default withContext(Main);