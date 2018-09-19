import React, { Component } from 'react';
import withContext from '../ecs/withContext';
import States from '../game/GameStates';
import Centered from './Centered';
import SimpleDialog from './SimpleDialog';

class ScenarioIntro extends Component {
    constructor(props) {
        super(props);
        this.onButtonClick = this.handleButton.bind(this);
    }

    render() {
        const {game} = this.props;
        const scenario = game.scenario;

        return <Centered height={300} width={400}>
            <SimpleDialog
                title={scenario.introTitle}
                html={scenario.introText}
                onOk={this.onButtonClick}/>
        </Centered>
    }

    handleButton(evt) {
        this.props.game.updateGameState(States.START_GAME);
    }

    componentWillUnmount() {
        this.props.game.endModal();
    }
}

export default withContext(ScenarioIntro);