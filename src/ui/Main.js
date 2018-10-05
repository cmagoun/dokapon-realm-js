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
        this.pushUiElement = this.handlePush.bind(this);
        this.popUiElement = this.handlePop.bind(this);
        this.state = {components:[]};
    }

    componentDidMount() {
        document.addEventListener("game_state_changed", this.ecsUpdated);
        document.addEventListener("push_ui_element", this.pushUiElement);
        document.addEventListener("pop_ui_element", this.popUiElement);
    }

    componentWillUnmount() {
        document.removeEventListener("game_state_changed", this.ecsUpdated);
        document.removeEventListener("push_ui_element", this.pushUiElement);
        document.removeEventListener("pop_ui_element", this.popUiElement);
    }

    render() {
        const length = this.state.components.length;

        return <div>
            {this.state.components
                .map((c,i) => React.cloneElement(c, 
                    {
                        key:i, 
                        events:i===length-1
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
            case States.SHOW_MOVE:
                this.props.game.endModal();
                this.setState({components:[<Overlay/>]});
        }
    }

    handlePush(evt) {
        const ui = evt.detail;
        const components = this.state.components;

        components.push(ui);
        this.setState({components});
    }

    handlePop() {
        const components = this.state.components;
        components.pop();
        this.setState({components});
    }
}

export default withContext(Main);