import React, {Component} from "react";
import {Link} from "react-router-dom";

class ReturnProjectButton extends Component{
    render() {
        return(
            <Link to={"/projects"}>
                <button className={"back-button"}>
                    Return to Project Menu
                </button>
            </Link>
        );
    }
}
export default ReturnProjectButton;
