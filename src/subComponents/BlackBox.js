import React, {Component} from "react";
import './css/BlackBox.css';

class BlackBox extends Component{
    render() {
        return(
            <div className="black-container-display black-container-background">
                <div className="brown-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default BlackBox;
