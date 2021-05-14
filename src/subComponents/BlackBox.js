import React, {Component} from "react";
import '../css/BlackBox.css';
import './MainButton';

class BlackBox extends Component{

    constructor(props) {
        super(props);
    }

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
