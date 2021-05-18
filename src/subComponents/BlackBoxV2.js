import React, {Component} from "react";

class BlackBoxV2 extends Component{

    render(){
        return(
            <div className="black-container-display black-container-background-shorter short-text">
                <div className="brown-container-shorter">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default BlackBoxV2;
