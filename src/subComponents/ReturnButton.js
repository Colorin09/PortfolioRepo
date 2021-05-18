import React, {Component} from "react";
import {Link} from "react-router-dom";

class ReturnButton extends Component{
    render(){
        return(
            <Link to={"/home"}>
                <button className={"btn back-button"}>

                        Back to Home page
                </button>
            </Link>
        );
    }
}
export default ReturnButton;

