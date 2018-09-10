import React, { Component } from 'react';
import withContext from '../ecs/withContext';

const style = {
    main: {
        backgroundColor: "blue", 
        position: "absolute",
        color: "white",
        bottom: "100px",
        left: "100px"
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.ecsUpdated = this.updateScreen.bind(this);
        this.state = {toggle:true};
    }

    componentDidMount() {
        document.addEventListener("ecs_updated", this.ecsUpdated);
    }

    componentWillUnmount() {
        document.removeEventListener("ecs_updated", this.ecsUpdated);
    }

    render() {
        const pally = this.props.game.entity("p1");
        return <div style={style.main}>{pally.sprite.x}, {pally.sprite.y}</div>
    }

    updateScreen(evt) {
        this.setState({toggle:!this.state.toggle});
    }
}

export default withContext(Main);