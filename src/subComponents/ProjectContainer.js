import React, {Component} from "react";
import "./css/ProjectContainer.css";
import {Link} from "react-router-dom";
import BlackBoxV2 from "./BlackBoxV2";

class ProjectContainer extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        let {projectDisplay} = this.props;

        return(
            <div className={"col-lg-3 col-md-6 col-sm-6"}
                style={{maxHeight: "20%"}}>
                <Link to={`/project/${projectDisplay._id}`}>
                    <BlackBoxV2>
                        <h1>{projectDisplay.projectName}</h1>
                        <hr/>
                        <img src={"http://localhost:5000/storedImages/" + projectDisplay.projectMedia}
                             className={"project-img-holder"} alt={"Project Image"}/>
                        <p className={"mt-2 text-center"}>{projectDisplay.description.substring(0, 100) + "..."}</p>
                    </BlackBoxV2>
                </Link>
            </div>
        );
    }
}
export default ProjectContainer;
