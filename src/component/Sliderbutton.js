import React, { Component } from 'react'
import "../style/Sliderbutton.css";
export default class Sliderbutton extends Component {

    render(){
        return(
            <div style={{width:this.props.mainWidth}}>
                    
                <div className="buttonDom">
                <span className="both_button_span"
                style={{background:this.props.background,left:this.props.left}}>
                {this.props.spaninner}
                </span>
                <button className="yesButton" style={{width:this.props.button}}onClick={this.props.clickForAllow}>{this.props.buttonNameAllow}</button>
                <button className="noButton" style={{width:this.props.button}} onClick={this.props.clickFordeny}>{this.props.buttonNameDeny}</button>
                </div> 

            </div>    
        )
    }

}