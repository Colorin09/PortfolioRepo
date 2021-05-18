import React, {Component} from "react";
import BlackBox from "../subComponents/BlackBox";
import ReturnButton from "../subComponents/ReturnButton";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import * as AiIcons from "react-icons/ai";

class D_Project extends Component{
    constructor(props) {
        super(props);
        this.state = {
            projectList: [],
            isLoading:true
        }
        this.deleteChosenProject = this.deleteChosenProject.bind(this);
    }

    componentDidMount() {
        //is the user logged in?
        let isLogged = JSON.parse(localStorage.getItem("authTokenX4E"));
        if(!isLogged){
            this.props.history.push("/home");
        }

        this.fetchProjectList();
    }

    fetchProjectList = () =>{
        axios.get("http://localhost:5000/projects")
            .then(response =>{
                this.setState({projectList:response.data} , () =>{
                    this.setState({isLoading:false});
                });
            }).catch(error =>{
            let message = "";

            if(error.response){
                message = error.response.data;
            }
            else{
                message = "Error - We could not receive an appropriate response from our server. Please" +
                    " review your Internet connection or try again later.";
            }
            this.errorToast(message);
        });
    }

    //Delete the target project
    deleteChosenProject = (proj) =>{
        if(window.confirm("Are you sure to delete this project?/n" + proj.projectName)){
            if(proj.projectMediaId.length){
                this.deleteChosenImage(proj.projectMediaId);
            }

            axios.delete(`http://localhost:5000/projects/${proj._id}`)
                .then(response =>{
                    this.successToast(response.data);
                    this.fetchProjectList();
                }).catch(error =>{
                let message = "";

                if(error.response){
                    message = error.response.data;
                }
                else{
                    message = "Error - We could not receive an appropriate response from our server. Please" +
                        " review your Internet connection or try again later.";
                }
                this.errorToast(message);
            });
        }
    }

    //Delete the image related to that project
    deleteChosenImage = (imgId) => {
        axios.delete(`http://localhost:5000/storedImages/delete/${imgId}`)
            .then(response =>{
            this.successToast(response.data.success);
        }).catch(error =>{
            let message = "";

            if(error.response){
                message = error.response.data;
            }
            else{
                message = "Error - We could not receive an appropriate response from our server. Please" +
                    " review your Internet connection or try again later.";
            }
            this.errorToast(message);
        });
    }

    successToast = (content) => {
        toast.success(content, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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

        let {isLoading, projectList} = this.state;

        return(
            <main className={"col-lg-6 col-md-10 col-sm-10 m-auto"}>
                <BlackBox>
                    <h2>Delete an existing project</h2>
                    <p className={"pl-3"}>Delete the projects from the list below. Choose wisely.</p>
                    <hr/>
                        {!projectList.length ? (
                            <div className={"info-div"}>
                                <div className={"mr-2 float-left"}>
                                    <AiIcons.AiFillInfoCircle color={"#fff"}/>
                                </div>
                                No projects were currently found. Add new ones&nbsp;
                                <a href={"http://localhost:3000/add_project"} style={{color: "white", textDecoration:"underline"}}>
                                    in this page!
                                </a>
                            </div>
                        ) : (
                            <div className={"table-wrapper"}>
                                <table className={"projectDisplayTab mt-3"}>
                                    <thead>
                                    <tr>
                                        <th>To be deleted?</th>
                                        <th>Project Name</th>
                                        <th>Date Created</th>
                                        <th>Short Description</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {projectList.map((project, index) =>{
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <button className={"del-btn"}
                                                            onClick={() =>{
                                                                this.deleteChosenProject(project)
                                                            }}>
                                                        Delete Project
                                                    </button>
                                                </td>
                                                <td style={{wordBreak:"break-word"}}>
                                                    "{project.projectName}"
                                                </td>
                                                <td>{project.createdAt.substring(0, 10)}</td>
                                                <td style={{wordBreak:"break-all"}}>
                                                    {project.description.substring(0, 80) + "..."}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {isLoading && (
                            <div className={"info-div"}>
                                Loading...
                            </div>
                        )}
                </BlackBox>

                <div className={"container ml-2"}>
                    <ReturnButton/>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </main>
        );
    }
}

export default D_Project;

