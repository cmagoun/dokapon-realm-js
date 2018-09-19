import React, { Component } from 'react';

class SimpleDialog extends Component {
    constructor(props) {
        super(props);
        this.style = {
            container: {
                position: props.position || "relative",
                top: props.top || "0",
                left: props.left || "0",
                backgroundColor: "tan",
                border: "3px solid grey",
                height: props.height || "100%",
                width: props.width || "100%"
            },
            title: {
                height:"10%",
                width: "100%",
                textAlign:"center",
                fontSize: "14pt",
                fontWeight:"bold"
            },
            text: {
                height: "75%",
                width: "100%"
            },
            button: {
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                height:"10%",
            }
        }
    }

    render() {
        const style = this.style;
        const {title, html, onOk} = this.props;

        return <div style={style.container}>
            <div style={style.title}>{title}</div>

            <div style={style.text} dangerouslySetInnerHTML={{__html: html}}></div>

            <div style={style.button}>
                <button style={{width:"50%"}} onClick={onOk}>OK</button>
            </div>
        </div>
    }
}

export default SimpleDialog;