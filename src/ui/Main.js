import React, { Component } from 'react';
import withContext from '../ecs/withContext';

class Main extends Component {
    constructor(props) {
        super(props);
        this.setUiElements = this.handleSetUi.bind(this);
        this.pushUiElement = this.handlePush.bind(this);
        this.popUiElement = this.handlePop.bind(this);
        this.state = {components:[]};
    }

    componentDidMount() {
        document.addEventListener("set_ui_elements", this.setUiElements);
        document.addEventListener("push_ui_element", this.pushUiElement);
        document.addEventListener("pop_ui_element", this.popUiElement);
    }

    componentWillUnmount() {
        document.removeEventListener("set_ui_elements", this.setUiElements);
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

    handleSetUi(evt) {
        const {ui, modal} = evt.detail;

        if(modal) {
            this.props.game.startModal();
        } else {
            this.props.game.endModal();
        }

        this.setState({components:ui});
    }
}

export default withContext(Main);