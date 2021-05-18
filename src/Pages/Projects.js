import React, {Component} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import ProjectContainer from "../subComponents/ProjectContainer";
import ReturnButton from "../subComponents/ReturnButton";
import Tabs from "../subComponents/Tabs.js";

class Projects extends Component{

    constructor(props) {
        super(props);
        this.state = {
            schoolProjects:[],
            workProjects:[]
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/projects")
            .then(response =>{
                console.log(response.data);
                this.filterProjects(response.data);
            }).catch(error =>{
            this.errorToast("Sorry, the projects could not be loaded: " + error.response.data);
        });
    }

    //Separating projects by section
    filterProjects = (projects) => {
        const schoolProjects = projects.filter((project) => project.type === "school");
        const workProjects = projects.filter((project) => project.type === "work");

        this.setState({
           schoolProjects, workProjects
        });
    }

    errorToast = (content) =>{
        toast.error(content, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    render(){

        let {workProjects, schoolProjects} = this.state;

        return(
            <div className={"col-10 m-auto"}>
                <div className={"row"}>
                    <div className={"col-lg-10 col-md-8 col-sm-8"}>
                        <h1>My projects</h1>
                        <p className={"little-brownish"}>View my old and current projects here:).</p>
                    </div>
                    <div className={"col-lg-2 col-md-4 col-sm-4 float-right"}>
                        <ReturnButton/>
                    </div>
                </div>
                <hr/>

                <Tabs>
                    <div label={"School Projects"}>
                        <div className={"row m-0 p-0"}>
                            {schoolProjects.length > 0 ?
                                schoolProjects.map((project, index) => {
                                return <ProjectContainer key={index} projectDisplay={project}/>
                                }) : <div className={"info-div"}>No projects were
                            found under this category!</div>}
                        </div>
                    </div>
                    <div label={"Work Projects"}>
                        <div className={"row m-0 p-0 "}>
                            {workProjects.length > 0 ?
                                workProjects.map((project, index) => {
                                return <ProjectContainer key={index} projectDisplay={project}/>
                            }) : <div className={"info-div"}>No projects were
                                found under this category!</div>}
                        </div>
                    </div>
                </Tabs>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }
}
export default Projects;
