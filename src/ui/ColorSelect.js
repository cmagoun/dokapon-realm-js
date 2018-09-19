import React, { Component } from 'react';

class ColorSelect extends Component {
    constructor(props) {
        super(props);

        this.style = {
            main: {
                minHeight:"48px",
                minWidth: "48px",
                border:"1px black solid",
                display:"inline-block",
                marginRight: "2px"
            }
        };

        this.colors = [
            {web:"#FFFFFF", tint:0xffffff},
            {web:"#FF0000", tint:0xff0000},
            {web:"#008000", tint:0x008000},
            {web:"#0000FF", tint:0x0000ff},
            {web:"#FFFF00", tint:0xffff00},
            {web:"#800080", tint:0x800080}
        ];
        
        this.state={index:0};
    }

    render() {
        const bg = this.colors[this.state.index];
        const style = Object.assign({}, this.style.main, {backgroundColor:bg.web});
        return <div style={style} onClick={this.handleClick.bind(this)}></div>
    }

    handleClick() {
        let index = this.state.index;
        index++;
        if(index > this.colors.length-1) index = 0;

        this.props.onChange(this.colors[index]);
        this.setState({index});
    }
}

export default ColorSelect;