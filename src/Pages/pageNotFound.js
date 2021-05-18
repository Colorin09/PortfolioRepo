import React, {Component} from "react";
import {Link} from "react-router-dom";
import BlackBox from "../subComponents/BlackBox";

class pageNotFound extends Component{

    render() {
        return(
            <div className={"text-center col-lg-6 col-md-8 col-sm-8 m-auto"}>
                <BlackBox>
                    <h1>404!</h1>
                    <h2>Page Not Found!</h2>

                    <p className={"m-auto col-7 mt-5"}>
                        It looks like the page you searched: <code>{this.props.location.pathname}</code>, is not available at the moment.
                        Please verify the URL address or try to come back later!
                    </p>

                    <div className={"text-center mt-5"}>
                        <button className={"btn reset-btn text-uppercase m-1"}
                        onClick={() => this.props.history.goBack()}>
                        Go back to last page
                    </button>
                    <Link to={"/home"}>
                        <button className={"btn main-button text-uppercase m-1"}>
                            Return to Home Page
                        </button>
                    </Link>
                    </div>
                </BlackBox>
            </div>
        );
    }

}
export default pageNotFound;

/*Links and visual done*/
